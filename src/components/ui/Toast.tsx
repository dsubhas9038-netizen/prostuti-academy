'use client';

import { Toaster } from 'react-hot-toast';

export function ToastProvider() {
    return (
        <Toaster
            position="top-center"
            toastOptions={{
                duration: 4000,
                style: {
                    background: '#fff',
                    color: '#374151',
                    padding: '12px 16px',
                    borderRadius: '12px',
                    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
                },
                success: {
                    iconTheme: {
                        primary: '#10B981',
                        secondary: '#fff',
                    },
                },
                error: {
                    iconTheme: {
                        primary: '#EF4444',
                        secondary: '#fff',
                    },
                },
            }}
        />
    );
}

// Re-export toast for convenience
export { toast } from 'react-hot-toast';
