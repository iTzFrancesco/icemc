


// API Client - calls backend API
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001';

const apiClient = {
    // Health check
    async healthCheck() {
        try {
            const response = await fetch(`${API_BASE_URL}/api/health`);
            if (!response.ok) {
                throw new Error(`Health check failed: ${response.status}`);
            }
            return await response.json();
        } catch (error) {
            console.error('Health check error:', error);
            throw error;
        }
    },

    // Login / Get or create user
    async login(mcUsername) {
        try {
            const response = await fetch(`${API_BASE_URL}/api/auth/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ mcUsername }),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.error || 'Login failed');
            }

            return data;
        } catch (error) {
            console.error('Login error:', error);
            throw error;
        }
    },

    // Get user purchases
    async getUserPurchases(mcUsername) {
        try {
            const response = await fetch(`${API_BASE_URL}/api/purchases/${mcUsername}`);

            if (!response.ok) {
                throw new Error(`Failed to get purchases: ${response.status}`);
            }

            const data = await response.json();
            return data;
        } catch (error) {
            console.error('Get purchases error:', error);
            throw error;
        }
    },
};

// User API - calls backend API (secure)
export const userApi = {
    // Get or create user
    async getOrCreateUser(mcUsername) {
        try {
            const result = await apiClient.login(mcUsername);
            return result.user;
        } catch (error) {
            console.error('Error in getOrCreateUser:', error);
            throw error;
        }
    },

    // Get user by username
    async getUser(mcUsername) {
        try {
            // Try to get user by attempting login (which returns existing user)
            const result = await apiClient.login(mcUsername);
            return result.user;
        } catch (error) {
            console.error('Error in getUser:', error);
            return null;
        }
    }
};

// Purchases API - calls backend API (secure)
export const purchaseApi = {
    // Get all purchases for a user
    async getUserPurchases(mcUsername) {
        try {
            const result = await apiClient.getUserPurchases(mcUsername);
            return result.purchases;
        } catch (error) {
            console.error('Error in getUserPurchases:', error);
            return [];
        }
    },


};