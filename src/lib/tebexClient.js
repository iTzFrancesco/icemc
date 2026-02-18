// Tebex Headless API Client
// Docs: https://docs.tebex.io/developers/headless-api/overview

// Token from environment variable (VITE_ prefix required by Vite)
const TEBEX_TOKEN = import.meta.env.VITE_TEBEX_TOKEN;

if (!TEBEX_TOKEN) {
    console.error('❌ VITE_TEBEX_TOKEN non configurato! Copia .env.example in .env e inserisci il token.');
}

const TEBEX_BASE_URL = 'https://headless.tebex.io/api';

class TebexClient {
    async request(endpoint, options = {}) {
        const url = `${TEBEX_BASE_URL}${endpoint}`;
        console.log(`🔵 Tebex API: ${options.method || 'GET'} ${url}`);

        const response = await fetch(url, {
            headers: {
                'Content-Type': 'application/json',
            },
            ...options,
        });

        const text = await response.text();
        let data;
        try {
            data = JSON.parse(text);
        } catch {
            throw new Error(`Risposta non JSON da Tebex: ${text}`);
        }

        if (!response.ok) {
            console.error('❌ Tebex error response:', data);
            throw new Error(data?.error || data?.message || `Tebex API Error: ${response.status}`);
        }

        return data;
    }

    /**
     * Ottieni tutti i pacchetti dello store
     */
    async getPackages() {
        const data = await this.request(`/accounts/${TEBEX_TOKEN}/packages`);
        return data.data || [];
    }

    /**
     * Ottieni le categorie con pacchetti inclusi
     */
    async getCategories() {
        const data = await this.request(`/accounts/${TEBEX_TOKEN}/categories?includePackages=1`);
        return data.data || [];
    }

    /**
     * Crea un nuovo basket
     * Lo username va passato qui per i server Minecraft
     */
    async createBasket(username, completeUrl, cancelUrl) {
        const data = await this.request(`/accounts/${TEBEX_TOKEN}/baskets`, {
            method: 'POST',
            body: JSON.stringify({
                complete_url: completeUrl,
                cancel_url: cancelUrl,
                complete_auto_redirect: true,
                username: username,
            }),
        });
        console.log('🧺 Basket creato:', data.data?.ident, '| username_id:', data.data?.username_id);
        return data.data;
    }

    /**
     * Aggiungi un pacchetto al basket
     * Passa username_id nel variable_data per associarlo al giocatore MC
     */
    async addPackageToBasket(basketIdent, packageId, usernameId) {
        const body = {
            package_id: String(packageId),
            quantity: 1,
        };

        // Se abbiamo lo username_id (da Minecraft), lo passiamo nel variable_data
        if (usernameId) {
            body.variable_data = { username_id: usernameId };
        }

        const data = await this.request(`/baskets/${basketIdent}/packages`, {
            method: 'POST',
            body: JSON.stringify(body),
        });
        console.log('📦 Pacchetto aggiunto al basket');
        return data.data;
    }

    /**
     * Ottieni basket aggiornato (con links.checkout)
     */
    async getBasket(basketIdent) {
        const data = await this.request(`/accounts/${TEBEX_TOKEN}/baskets/${basketIdent}`);
        return data.data;
    }

    /**
     * Flusso completo checkout:
     * 1. Crea basket con username
     * 2. Aggiungi pacchetto con username_id
     * 3. Recupera basket aggiornato
     * 4. Restituisce URL checkout
     */
    async createCheckout(username, packageId) {
        const completeUrl = `${window.location.origin}/store?purchase=success`;
        const cancelUrl = `${window.location.origin}/store?purchase=cancelled`;

        // 1. Crea basket — Tebex risolve lo username MC e restituisce username_id
        const basket = await this.createBasket(username, completeUrl, cancelUrl);

        if (!basket?.ident) {
            throw new Error('Basket non creato correttamente da Tebex.');
        }

        // 2. Aggiungi pacchetto passando username_id per associarlo al giocatore
        await this.addPackageToBasket(basket.ident, packageId, basket.username_id);

        // 3. Recupera basket aggiornato per ottenere links.checkout
        const updatedBasket = await this.getBasket(basket.ident);
        console.log('🛒 Basket aggiornato:', JSON.stringify(updatedBasket, null, 2));

        const checkoutUrl = updatedBasket?.links?.checkout;

        if (!checkoutUrl) {
            throw new Error('Checkout URL non trovato. Verifica che il pacchetto sia configurato correttamente su Tebex Dashboard.');
        }

        return checkoutUrl;
    }
}

export const tebexClient = new TebexClient();