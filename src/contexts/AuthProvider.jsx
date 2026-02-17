import React, { useState, useEffect } from 'react';
import { AuthContext } from './AuthContext.js';
import { userApi, purchaseApi } from '../lib/api.js';
import { apiClient } from '../lib/api-client.js';

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [loading, setLoading] = useState(true);
    const [dbConnected, setDbConnected] = useState(false);

    useEffect(() => {
        const initAuth = async () => {
            // Test API connection on load
            try {
                await apiClient.healthCheck();
                setDbConnected(true);
                console.log('✅ API connection successful');
            } catch (error) {
                console.warn('⚠️ API connection failed:', error.message);
                setDbConnected(false);
            }

            // Check if there's a saved user in localStorage
            const savedUser = localStorage.getItem('icemc_user');
            if (savedUser) {
                const userData = JSON.parse(savedUser);
                setUser(userData);
                setIsAuthenticated(true);
            }
            setLoading(false);
        };
        
        initAuth();
    }, []);

    const login = async (mcUsername) => {
        try {
            // Get or create user in database
            const dbUser = await userApi.getOrCreateUser(mcUsername);
            
            const userData = {
                mcUsername: dbUser.mc_username,
                id: dbUser.id,
                createdAt: dbUser.created_at,
                loginDate: new Date().toISOString()
            };
            
            setUser(userData);
            setIsAuthenticated(true);
            localStorage.setItem('icemc_user', JSON.stringify(userData));
            
            return userData;
        } catch (error) {
            console.error('Login error:', error);
            throw error;
        }
    };

    const logout = () => {
        setUser(null);
        setIsAuthenticated(false);
        localStorage.removeItem('icemc_user');
    };

    const getUserPurchases = async () => {
        if (!user) return [];
        try {
            return await purchaseApi.getUserPurchases(user.mcUsername);
        } catch (error) {
            console.error('Error getting purchases:', error);
            return [];
        }
    };

    const addPurchase = async (product) => {
        if (!user) return false;
        
        try {
            await purchaseApi.addPurchase(user.mcUsername, product);
            return true;
        } catch (error) {
            console.error('Error adding purchase:', error);
            return false;
        }
    };

    return (
        <AuthContext.Provider value={{ 
            user, 
            isAuthenticated, 
            login, 
            logout, 
            getUserPurchases,
            addPurchase,
            loading
        }}>
            {children}
        </AuthContext.Provider>
    );
};