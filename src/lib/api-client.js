// API Client - calls backend instead of database directly
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001/api';

class ApiClient {
    async request(endpoint, options = {}) {
        const response = await fetch(`${API_URL}${endpoint}`, {
            headers: {
                'Content-Type': 'application/json',
            },
            ...options,
        });

        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.error || 'API Error');
        }

        return response.json();
    }

    // Auth
    async login(mcUsername) {
        return this.request('/auth/login', {
            method: 'POST',
            body: JSON.stringify({ mcUsername }),
        });
    }

    // Purchases
    async getUserPurchases(username) {
        return this.request(`/purchases/${encodeURIComponent(username)}`);
    }



    // PayPal
    async createPayPalOrder(productName) {
        return this.request('/paypal/create-order', {
            method: 'POST',
            body: JSON.stringify({ productName }),
        });
    }

    async capturePayPalOrder(orderID, mcUsername, productName) {
        return this.request('/paypal/capture-order', {
            method: 'POST',
            body: JSON.stringify({ orderID, mcUsername, productName }),
        });
    }

    // Health check
    async healthCheck() {
        return this.request('/health');
    }
}

export const apiClient = new ApiClient();