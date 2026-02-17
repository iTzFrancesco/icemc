const express = require('express');
const { neon } = require('@neondatabase/serverless');
const cors = require('cors');
const crypto = require('crypto');
const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '../.env') });

const app = express();
const PORT = process.env.API_PORT || 3001;

// Database connection
const sql = neon(process.env.DATABASE_URL);

// IMPORTANTE: il webhook Tebex ha bisogno del raw body per verificare la firma
// Quindi usiamo bodyParser con verify PRIMA di express.json()
app.use((req, res, next) => {
    if (req.path === '/api/tebex/webhook') {
        let data = '';
        req.setEncoding('utf8');
        req.on('data', (chunk) => { data += chunk; });
        req.on('end', () => {
            req.rawBody = data;
            next();
        });
    } else {
        next();
    }
});

app.use(cors());
app.use(express.json());

// ─────────────────────────────────────────────
// TEBEX WEBHOOK
// ─────────────────────────────────────────────

// Webhook secret — prendilo da Tebex Dashboard → Developers → Webhooks → Endpoints
const TEBEX_WEBHOOK_SECRET = process.env.TEBEX_WEBHOOK_SECRET || '';

function verifyTebexSignature(rawBody, signatureHeader) {
    if (!TEBEX_WEBHOOK_SECRET) {
        console.warn('⚠️  TEBEX_WEBHOOK_SECRET non configurato, skip verifica firma');
        return true;
    }
    // Tebex: SHA256(body) poi HMAC-SHA256 con il secret
    const bodyHash = crypto.createHash('sha256').update(rawBody, 'utf8').digest('hex');
    const expectedSig = crypto.createHmac('sha256', TEBEX_WEBHOOK_SECRET).update(bodyHash).digest('hex');
    return crypto.timingSafeEqual(
        Buffer.from(signatureHeader || '', 'hex'),
        Buffer.from(expectedSig, 'hex')
    );
}

app.post('/api/tebex/webhook', async (req, res) => {
    const signature = req.headers['x-signature'];
    const rawBody = req.rawBody || '';

    // 1. Verifica firma
    if (!verifyTebexSignature(rawBody, signature)) {
        console.warn('❌ Firma webhook Tebex non valida');
        return res.status(401).json({ error: 'Invalid signature' });
    }

    let payload;
    try {
        payload = JSON.parse(rawBody);
    } catch {
        return res.status(400).json({ error: 'Invalid JSON' });
    }

    console.log(`📨 Webhook Tebex ricevuto: ${payload.type}`);

    // 2. Gestisci validazione iniziale endpoint (Tebex la manda quando aggiungi il webhook)
    if (payload.type === 'validation.webhook') {
        return res.status(200).json({ id: payload.id });
    }

    // 3. Gestisci pagamento completato
    if (payload.type === 'payment.completed') {
        const subject = payload.subject;

        const transactionId = subject.transaction_id;
        const mcUsername = subject.customer?.username?.username || null;
        const products = subject.products || [];
        const pricePaid = subject.price_paid?.amount || subject.price?.amount || 0;
        const currency = subject.price_paid?.currency || 'EUR';

        if (!mcUsername) {
            console.warn('⚠️  Username MC non trovato nel webhook');
            // Rispondi 200 comunque per non far ritentare Tebex
            return res.status(200).json({ received: true });
        }

        try {
            for (const product of products) {
                const productName = product.name;
                const productPrice = product.paid_price?.amount || pricePaid;

                // Trova o crea utente
                let user = await sql`SELECT * FROM users WHERE mc_username = ${mcUsername}`;
                if (user.length === 0) {
                    user = await sql`
                        INSERT INTO users (mc_username) VALUES (${mcUsername}) RETURNING *
                    `;
                }

                // Controlla se questo transaction_id è già stato processato (idempotenza)
                const existing = await sql`
                    SELECT id FROM purchases WHERE transaction_id = ${transactionId} AND product_name = ${productName}
                `;
                if (existing.length > 0) {
                    console.log(`⏭️  Acquisto già registrato: ${transactionId}`);
                    continue;
                }

                // Salva acquisto nel DB
                const purchase = await sql`
                    INSERT INTO purchases (
                        mc_username,
                        purchase_date,
                        product_name,
                        product_category,
                        product_price,
                        user_id,
                        delivered,
                        transaction_id
                    ) VALUES (
                        ${mcUsername},
                        NOW(),
                        ${productName},
                        ${'Tebex'},
                        ${String(productPrice)},
                        ${user[0].id},
                        false,
                        ${transactionId}
                    ) RETURNING *
                `;

                console.log(`✅ Acquisto salvato: ${mcUsername} → ${productName} (${transactionId})`);
            }

            return res.status(200).json({ received: true });
        } catch (error) {
            console.error('❌ Errore salvataggio acquisto:', error);
            // Restituiamo 500 così Tebex ritenta
            return res.status(500).json({ error: 'Database error' });
        }
    }

    // Per tutti gli altri tipi di webhook rispondi 200
    return res.status(200).json({ received: true });
});

// ─────────────────────────────────────────────
// AUTH
// ─────────────────────────────────────────────

app.post('/api/auth/login', async (req, res) => {
    try {
        const { mcUsername } = req.body;
        if (!mcUsername?.trim()) {
            return res.status(400).json({ error: 'Username richiesto' });
        }

        const username = mcUsername.trim();
        const existingUser = await sql`SELECT * FROM users WHERE mc_username = ${username}`;

        if (existingUser.length > 0) {
            return res.json({ success: true, user: existingUser[0], isNew: false });
        }

        const newUser = await sql`
            INSERT INTO users (mc_username) VALUES (${username}) RETURNING *
        `;
        res.json({ success: true, user: newUser[0], isNew: true });
    } catch (error) {
        console.error('Login error:', error);
        res.status(500).json({ error: 'Errore server' });
    }
});

// ─────────────────────────────────────────────
// ACQUISTI
// ─────────────────────────────────────────────

app.get('/api/purchases/:username', async (req, res) => {
    try {
        const { username } = req.params;
        const purchases = await sql`
            SELECT p.*
            FROM purchases p
            JOIN users u ON p.user_id = u.id
            WHERE u.mc_username = ${username}
            ORDER BY p.purchase_date DESC
        `;
        res.json({ success: true, purchases });
    } catch (error) {
        console.error('Get purchases error:', error);
        res.status(500).json({ error: 'Errore server' });
    }
});

// ─────────────────────────────────────────────
// HEALTH CHECK
// ─────────────────────────────────────────────

app.get('/api/health', async (req, res) => {
    try {
        const result = await sql`SELECT NOW()`;
        res.json({ status: 'ok', timestamp: result[0].now });
    } catch (error) {
        res.status(500).json({ status: 'error', message: error.message });
    }
});

// ─────────────────────────────────────────────
// DB INIT
// ─────────────────────────────────────────────

async function initDB() {
    try {
        await sql`
            CREATE TABLE IF NOT EXISTS purchases (
                id SERIAL PRIMARY KEY,
                mc_username TEXT NOT NULL,
                purchase_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                product_name TEXT NOT NULL,
                product_category TEXT,
                product_price TEXT NOT NULL,
                user_id UUID REFERENCES users(id),
                delivered BOOLEAN DEFAULT false,
                delivered_at TIMESTAMP,
                transaction_id TEXT UNIQUE
            )
        `;

        // Aggiungi colonna transaction_id se non esiste (per DB già esistenti)
        await sql`
            ALTER TABLE purchases ADD COLUMN IF NOT EXISTS transaction_id TEXT UNIQUE
        `;

        console.log('✅ Database inizializzato correttamente');
    } catch (err) {
        console.error('❌ Errore inizializzazione database:', err);
    }
}

initDB().then(() => {
    app.listen(PORT, () => {
        console.log(`🚀 API Server in esecuzione sulla porta ${PORT}`);
    });
});