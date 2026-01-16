'use client';

import React from 'react';
import { cn } from '@/lib/utils';
import Header from './Header';
import Footer from './Footer';
import MobileNav from './MobileNav';

interface MainLayoutProps {
    children: React.ReactNode;
    showFooter?: boolean;
    showMobileNav?: boolean;
    className?: string;
}

function MainLayout({
    children,
    showFooter = true,
    showMobileNav = true,
    className,
}: MainLayoutProps) {
    return (
        <div className="min-h-screen flex flex-col bg-white dark:bg-gray-900">
            {/* Header */}
            <Header />

            {/* Main Content */}
            <main className={cn('flex-1', className)}>
                {children}
            </main>

            {/* Footer */}
            {showFooter && <Footer />}

            {/* Mobile Bottom Navigation */}
            {showMobileNav && <MobileNav />}
        </div>
    );
}

export default MainLayout;
