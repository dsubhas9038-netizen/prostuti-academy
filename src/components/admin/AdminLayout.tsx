'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/hooks';
import AdminSidebar from './AdminSidebar';
import AdminHeader from './AdminHeader';
import { PageLoading } from '@/components/shared';
import { cn } from '@/lib/utils';

interface AdminLayoutProps {
    children: React.ReactNode;
    title?: string;
    titleBn?: string;
}

function AdminLayout({ children, title, titleBn }: AdminLayoutProps) {
    const router = useRouter();
    const { firebaseUser, isAuthenticated, isAdmin, loading } = useAuth();
    const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

    // Loading state
    if (loading) {
        return (
            <div className="min-h-screen bg-gray-900 flex items-center justify-center">
                <PageLoading message="Loading admin panel..." />
            </div>
        );
    }

    // Not authenticated or not admin
    if (!isAuthenticated || !firebaseUser || !isAdmin) {
        router.push('/login?redirect=/admin');
        return null;
    }

    return (
        <div className="min-h-screen bg-gray-100 dark:bg-gray-900">
            {/* Sidebar */}
            <AdminSidebar
                collapsed={sidebarCollapsed}
                onToggle={() => setSidebarCollapsed(!sidebarCollapsed)}
            />

            {/* Main Content */}
            <div className={cn(
                'transition-all duration-300',
                sidebarCollapsed ? 'ml-20' : 'ml-72'
            )}>
                {/* Header */}
                <AdminHeader
                    title={title}
                    titleBn={titleBn}
                    onSidebarToggle={() => setSidebarCollapsed(!sidebarCollapsed)}
                    sidebarCollapsed={sidebarCollapsed}
                />

                {/* Page Content */}
                <main className="p-6">
                    {children}
                </main>
            </div>
        </div>
    );
}

export default AdminLayout;
