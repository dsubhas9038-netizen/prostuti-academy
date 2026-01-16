'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { cn } from '@/lib/utils';
import Logo from '@/components/shared/Logo';
import ThemeToggle from '@/components/shared/ThemeToggle';

interface AuthLayoutProps {
    children: React.ReactNode;
    title: string;
    subtitle?: string;
    showBackLink?: boolean;
    className?: string;
}

function AuthLayout({
    children,
    title,
    subtitle,
    showBackLink = true,
    className,
}: AuthLayoutProps) {
    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex flex-col">
            {/* Header */}
            <header className="w-full p-4">
                <div className="container mx-auto flex items-center justify-between">
                    {/* Back Link */}
                    {showBackLink ? (
                        <Link
                            href="/"
                            className="flex items-center gap-2 text-gray-500 hover:text-gray-900 dark:hover:text-white transition-colors"
                        >
                            <ArrowLeft className="h-5 w-5" />
                            <span className="hidden sm:inline">Back to Home</span>
                        </Link>
                    ) : (
                        <div />
                    )}

                    {/* Theme Toggle */}
                    <ThemeToggle variant="icon" />
                </div>
            </header>

            {/* Main Content */}
            <main className={cn(
                'flex-1 flex items-center justify-center p-4',
                className
            )}>
                <div className="w-full max-w-md">
                    {/* Logo */}
                    <div className="flex justify-center mb-8">
                        <Logo size="lg" />
                    </div>

                    {/* Card */}
                    <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl p-6 sm:p-8 shadow-lg">
                        {/* Title */}
                        <div className="text-center mb-6">
                            <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                                {title}
                            </h1>
                            {subtitle && (
                                <p className="text-sm text-gray-500">
                                    {subtitle}
                                </p>
                            )}
                        </div>

                        {/* Form Content */}
                        {children}
                    </div>

                    {/* Footer Text */}
                    <p className="text-center text-xs text-gray-500 mt-6">
                        By continuing, you agree to our{' '}
                        <Link href="/terms" className="text-blue-600 hover:underline">
                            Terms of Service
                        </Link>{' '}
                        and{' '}
                        <Link href="/privacy" className="text-blue-600 hover:underline">
                            Privacy Policy
                        </Link>
                    </p>
                </div>
            </main>

            {/* Decorative Background */}
            <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
                <div className="absolute -top-1/2 -right-1/2 w-full h-full bg-gradient-to-br from-blue-500/5 via-transparent to-transparent rounded-full" />
                <div className="absolute -bottom-1/2 -left-1/2 w-full h-full bg-gradient-to-tr from-blue-500/5 via-transparent to-transparent rounded-full" />
            </div>
        </div>
    );
}

export default AuthLayout;
