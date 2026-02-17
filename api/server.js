const express = require('express');
const { neon } = require('@neondatabase/serverless');
const cors = require('cors');
const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '../.env') });

const app = express();
const PORT = process.env.API_PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());

// Database connection
const sql = neon(process.env.DATABASE_URL);

// PayPal Configuration
const PAYPAL_CLIENT_ID = process.env.PAYPAL_CLIENT_ID;
const PAYPAL_CLIENT_SECRET = process.env.PAYPAL_CLIENT_SECRET;
const PAYPAL_API = 'https://api-m.paypal.com';

// Authoritative Product List (Server-Side Price Validation)
const PRODUCTS = {
    // Ranks
    'Yule': { price: '4.98', category: 'SkyGen' },
    'Crystal': { price: '14.99', category: 'SkyGen' },
    'Frost': { price: '29.98', category: 'SkyGen' },
    'Blizzard': { price: '49.96', category: 'SkyGen' },
    'Borea': { price: '74.99', category: 'SkyGen' },
    'Yukio': { price: '99.50', category: 'SkyGen' },
    // Crates
    //'1 Key': { price: '0.99', category: 'SkyGen' },
    //'5 Keys': { price: '3.99', category: 'SkyGen' },
    //'10 Keys': { price: '6.99', category: 'SkyGen' },
    //'25 Keys': { price: '14.99', category: 'SkyGen' },
    // Prime
    'Join': { price: '9.99', category: 'Globale' },
    'Migrazione Account': { price: '4.99', category: 'Globale' },
    'Credito Utente': { price: '9.99', category: 'Globale' },
};

// PayPal Helper Functions
async function getPayPalAccessToken() {
    const auth = Buffer.from(PAYPAL_CLIENT_ID + ':' + PAYPAL_CLIENT_SECRET).toString('base64');
    const response = await fetch(`${PAYPAL_API}/v1/oauth2/token`, {
        method: 'POST',
        body: 'grant_type=client_credentials',
        headers: {
            Authorization: `Basic ${auth}`,
        },
    });
    const data = await response.json();
    return data.access_token;
}

// PayPal Endpoints

// 1. Create Order
app.post('/api/paypal/create-order', async (req, res) => {
    try {
        const { productName } = req.body;
        const product = PRODUCTS[productName];

        if (!product) {
            return res.status(400).json({ error: 'Prodotto non valido' });
        }

        const accessToken = await getPayPalAccessToken();
        const response = await fetch(`${PAYPAL_API}/v2/checkout/orders`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${accessToken}`,
            },
            body: JSON.stringify({
                intent: 'CAPTURE',
                purchase_units: [
                    {
                        description: productName,
                        amount: {
                            currency_code: 'EUR',
                            value: product.price,
                        },
                    },
                ],
            }),
        });

        const data = await response.json();
        res.json(data);
    } catch (error) {
        console.error('PayPal Create Order Error:', error);
        res.status(500).json({ error: 'Errore creazione ordine PayPal' });
    }
});

// 2. Capture Order & Record Purchase
app.post('/api/paypal/capture-order', async (req, res) => {
    try {
        const { orderID, mcUsername, productName } = req.body;
        const accessToken = await getPayPalAccessToken();

        // Capture payment
        const response = await fetch(`${PAYPAL_API}/v2/checkout/orders/${orderID}/capture`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${accessToken}`,
            },
        });

        const data = await response.json();

        if (data.status === 'COMPLETED') {
            // Verify DB User
            const user = await sql`
                SELECT * FROM users WHERE mc_username = ${mcUsername}
            `;

            if (user.length === 0) {
                // Should create user if not exists? Or fail? 
                // Assuming user exists from login flow, but let's be safe
                return res.status(404).json({ error: 'Utente non trovato nel database' });
            }

            const product = PRODUCTS[productName]; // Trust server price
            const category = product ? product.category : 'Sconosciuto';

            // Record in Database
            const purchase = await sql`
                INSERT INTO purchases (mc_username, purchase_date, product_name, product_category, product_price, user_id, delivered)
                VALUES (${mcUsername}, NOW(), ${productName}, ${category}, ${product.price}, ${user[0].id}, false)
                RETURNING *
            `;

            res.json({ success: true, purchase: purchase[0] });
        } else {
            res.status(400).json({ error: 'Pagamento non completato' });
        }

    } catch (error) {
        console.error('PayPal Capture Order Error:', error);
        res.status(500).json({ error: 'Errore cattura pagamento' });
    }
});

// Test database connection
app.get('/api/health', async (req, res) => {
    try {
        const result = await sql`SELECT NOW()`;
        res.json({ status: 'ok', timestamp: result[0].now });
    } catch (error) {
        res.status(500).json({ status: 'error', message: error.message });
    }
});

// Get or create user
app.post('/api/auth/login', async (req, res) => {
    try {
        const { mcUsername } = req.body;

        if (!mcUsername || !mcUsername.trim()) {
            return res.status(400).json({ error: 'Username richiesto' });
        }

        const username = mcUsername.trim();

        // Check if user exists
        const existingUser = await sql`
            SELECT * FROM users WHERE mc_username = ${username}
        `;

        if (existingUser.length > 0) {
            return res.json({
                success: true,
                user: existingUser[0],
                isNew: false
            });
        }

        // Create new user
        const newUser = await sql`
            INSERT INTO users (mc_username)
            VALUES (${username})
            RETURNING *
        `;

        res.json({
            success: true,
            user: newUser[0],
            isNew: true
        });
    } catch (error) {
        console.error('Login error:', error);
        res.status(500).json({ error: 'Errore server' });
    }
});

// Get user purchases
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



async function initDB() {
    try {

        // Create table with new schema
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
                delivered_at TIMESTAMP
            )
        `;
        console.log('Database initialized successfully with new schema');
    } catch (err) {
        console.error('Error initializing database:', err);
    }
}

initDB().then(() => {
    app.listen(PORT, () => {
        console.log(`🚀 API Server running on port ${PORT}`);
    });
});
