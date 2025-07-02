'use client';

import { AuthProvider } from '@/context/AuthContext';
// import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useState } from 'react';


export function Providers({ children }: { children: React.ReactNode }) {

    const [queryClient] = useState(() => new QueryClient())
    
    return (
        <AuthProvider>
            <QueryClientProvider client={queryClient}>
                {children}
            </QueryClientProvider>
        </AuthProvider>
    );
}