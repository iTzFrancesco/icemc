import React, { useState, useEffect } from 'react';
import { AuthContext } from './AuthContext.js';

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const initAuth = async () => {
            // Controlla se c'è un utente salvato in localStorage
            const savedUser = localStorage.getItem('icemc_user');
            if (savedUser) {
                try {
                    const userData = JSON.parse(savedUser);
                    setUser(userData);
                    setIsAuthenticated(true);
                } catch (e) {
                    localStorage.removeItem('icemc_user');
                }
            }
            setLoading(false);
        };

        initAuth();
    }, []);

    const login = async (mcUsername) => {
        const userData = {
            mcUsername: mcUsername.trim(),
            loginDate: new Date().toISOString()
        };

        setUser(userData);
        setIsAuthenticated(true);
        localStorage.setItem('icemc_user', JSON.stringify(userData));

        return userData;
    };

    const logout = () => {
        setUser(null);
        setIsAuthenticated(false);
        localStorage.removeItem('icemc_user');
    };

    return (
        <AuthContext.Provider value={{
            user,
            isAuthenticated,
            login,
            logout,
            loading
        }}>
            {children}
        </AuthContext.Provider>
    );
};
