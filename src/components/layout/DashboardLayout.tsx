'use client';

import React from 'react';
import { cn } from '@/lib/utils';
import Header from './Header';
import Sidebar from './Sidebar';
import MobileNav from './MobileNav';

interface DashboardLayoutProps {
    children: React.ReactNode;
    title?: string;
    description?: string;
    className?: string;
}

function DashboardLayout({
    children,
    title,
    description,
    className,
}: DashboardLayoutProps) {
    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
            {/* Header */}
            <Header />

            {/* Sidebar - Desktop only */}
            <Sidebar />

            {/* Main Content */}
            <main
                className={cn(
                    'min-h-[calc(100vh-4rem)]', // Subtract header height
                    'lg:pl-64', // Add left padding for sidebar on desktop
                    'transition-all duration-300',
                    className
                )}
            >
                <div className="container mx-auto px-4 py-6 lg:py-8">
                    {/* Page Header */}
                    {(title || description) && (
                        <div className="mb-6 lg:mb-8">
                            {title && (
                                <h1 className="text-2xl lg:text-3xl font-bold text-gray-900 dark:text-white">
                                    {title}
                                </h1>
                            )}
                            {description && (
                                <p className="text-gray-500 mt-1">
                                    {description}
                                </p>
                            )}
                        </div>
                    )}

                    {/* Page Content */}
                    {children}
                </div>
            </main>

            {/* Mobile Bottom Navigation */}
            <MobileNav />
        </div>
    );
}

export default DashboardLayout;
