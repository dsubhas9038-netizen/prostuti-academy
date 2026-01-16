'use client';

import { useEffect } from 'react';
import { RefreshCw, Home, AlertTriangle } from 'lucide-react';
import { Button } from '@/components/ui';
import Logo from '@/components/shared/Logo';

export default function Error({
    error,
    reset,
}: {
    error: Error & { digest?: string };
    reset: () => void;
}) {
    useEffect(() => {
        // Log the error to an error reporting service
        console.error('Application Error:', error);
    }, [error]);

    return (
        <div className="min-h-screen bg-white dark:bg-gray-900 flex flex-col">
            {/* Simple Header */}
            <header className="p-4 border-b border-gray-200 dark:border-gray-800">
                <div className="container mx-auto">
                    <Logo size="md" />
                </div>
            </header>

            {/* Content */}
            <main className="flex-1 flex items-center justify-center p-4">
                <div className="text-center max-w-md">
                    {/* Error Icon */}
                    <div className="mb-6 inline-flex items-center justify-center w-20 h-20 rounded-full bg-red-100 dark:bg-red-900/30">
                        <AlertTriangle className="h-10 w-10 text-red-500" />
                    </div>

                    {/* Message */}
                    <h1 className="text-2xl lg:text-3xl font-bold text-gray-900 dark:text-white mb-4">
                        কিছু একটা সমস্যা হয়েছে!
                    </h1>
                    <p className="text-gray-500 mb-8">
                        চিন্তা করো না, এটা আমাদের পক্ষ থেকে একটা সমস্যা।
                        আমরা এটা ঠিক করার চেষ্টা করছি।
                    </p>

                    {/* Error details (only in development) */}
                    {process.env.NODE_ENV === 'development' && (
                        <div className="mb-6 p-4 bg-red-50 dark:bg-red-900/20 rounded-lg text-left">
                            <p className="text-xs font-mono text-red-600 dark:text-red-400 break-all">
                                {error.message}
                            </p>
                        </div>
                    )}

                    {/* Actions */}
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                        <Button
                            onClick={reset}
                            leftIcon={<RefreshCw className="h-4 w-4" />}
                        >
                            Try Again
                        </Button>
                        <Button
                            variant="outline"
                            onClick={() => (window.location.href = '/')}
                            leftIcon={<Home className="h-4 w-4" />}
                        >
                            Go to Homepage
                        </Button>
                    </div>
                </div>
            </main>
        </div>
    );
}
