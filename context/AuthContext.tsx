'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { apiCall } from '@/lib/axios';
import type { User, AuthTokens, LoginCredentials } from '@/types/auth';

interface AuthContextType {
    user: User | null;
    tokens: AuthTokens | null;
    // siteSettings: SiteSettings | null;
    isAuthenticated: boolean;
    isLoading: boolean;
    login: (credentials: LoginCredentials) => Promise<void>;
    logout: () => Promise<void>;
    refreshToken: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
    const router = useRouter();
    const [user, setUser] = useState<User | null>(null);
    const [tokens, setTokens] = useState<AuthTokens | null>(null);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    // const [siteSettings, setSiteSettings] = useState<SiteSettings | null>(null);

    useEffect(() => {
        initializeAuth();
    }, []);

    const initializeAuth = async () => {
        try {
            const storedTokens = localStorage.getItem('auth_tokens');
            const storedUserData = localStorage.getItem('user_data');
            const storedSiteSettings = localStorage.getItem('site_settings');
            
            if (storedTokens && storedUserData) {
                const parsedTokens: AuthTokens = JSON.parse(storedTokens);
                const parsedUserData: User = JSON.parse(storedUserData);
                // const parsedSiteSettings: SiteSettings = JSON.parse(storedSiteSettings || '{}');
                
                setTokens(parsedTokens);
                // setSiteSettings(parsedSiteSettings);

                try {
                    // Verify token validity with the backend
                    const userData = await apiCall<User>('get', '/user/me/');
                    setUser(userData);
                    setIsAuthenticated(true);
                } catch (error) {
                    // If token verification fails, try to refresh
                    try {
                        await refreshToken();
                        setUser(parsedUserData);
                        setIsAuthenticated(true);
                    } catch (refreshError) {
                        throw refreshError;
                    }
                }
            }
        } catch (error) {
            console.error('Auth initialization error:', error);
            await logout();
        } finally {
            setIsLoading(false);
        }
    };

    const refreshToken = async () => {
        try {
            const response = await apiCall<{ access_token: string; refresh_token: string }>(
                'post',
                '/auth/refresh/',
                { refresh: tokens?.refresh }
            );

            const newTokens: AuthTokens = {
                access: response.access_token,
                refresh: response.refresh_token
            };
            setTokens(newTokens);
            localStorage.setItem('auth_tokens', JSON.stringify(newTokens));
        } catch (error) {
            await logout();
            throw error;
        }
    };

    const login = async (credentials: LoginCredentials) => {
        try {
            const response = await apiCall<any>('post', '/auth/login/', credentials);
            
            const authTokens: AuthTokens = {
                access: response.access_token,
                refresh: response.refresh_token
            };

            const userData: User = {
                id: response.id,
                email: response.email,
            }

            
            setTokens(authTokens);
            setUser(userData);
            setIsAuthenticated(true);

            localStorage.setItem('auth_tokens', JSON.stringify(authTokens));
            localStorage.setItem('user_data', JSON.stringify(userData));

            router.push('/');

        } catch (error) {
            console.error('Login error:', error);
            throw error;
        }
    };

    const logout = async () => {
        try {
            if (tokens?.refresh) {
                await apiCall<void>('post', '/auth/logout/', {
                    refresh: tokens.refresh,
                });
            }
        } catch (error) {
            console.error('Logout error:', error);
        } finally {
            setUser(null);
            setTokens(null);
            setIsAuthenticated(false);
            // setSiteSettings(null);
            localStorage.removeItem('auth_tokens');
            localStorage.removeItem('user_data');
            localStorage.removeItem('site_settings');
            router.push('/');
        }
    };

    const value = {
        user,
        tokens,
        // siteSettings,
        isAuthenticated,
        isLoading,
        login,
        logout,
        refreshToken,
    };

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};