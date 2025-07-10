'use client';

import { AuthProvider } from '@/context/AuthContext';
import { GOOGLE_OAUTH_CLIENT_ID } from '@/lib/env';
// import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { GoogleOAuthProvider } from '@react-oauth/google';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useState } from 'react';


export function Providers({ children }: { children: React.ReactNode }) {

    const [queryClient] = useState(() => new QueryClient())

    return (
        // TODO: move client id to env
        <GoogleOAuthProvider clientId={GOOGLE_OAUTH_CLIENT_ID}>
            <AuthProvider>
                <QueryClientProvider client={queryClient}>
                    {children}
                </QueryClientProvider>
            </AuthProvider>
        </GoogleOAuthProvider>
    );
}