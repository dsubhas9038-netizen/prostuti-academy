'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/hooks';
import { PageLoading } from '@/components/shared';

interface AdminGuardProps {
    children: React.ReactNode;
}

export default function AdminGuard({ children }: AdminGuardProps) {
    const { firebaseUser, isAdmin, loading } = useAuth();
    const router = useRouter();

    useEffect(() => {
        if (!loading) {
            if (!firebaseUser) {
                router.push('/login?redirect=/admin');
            } else if (!isAdmin) {
                router.push('/');
            }
        }
    }, [firebaseUser, isAdmin, loading, router]);

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
                <PageLoading message="Verifying admin access..." />
            </div>
        );
    }

    if (!isAdmin) {
        return null; // Will redirect via useEffect
    }

    return <>{children}</>;
}
