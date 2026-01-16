'use client';

import React, { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useAuth } from '@/hooks/useAuth';
import { PageLoading } from '@/components/shared';

interface GuestRouteProps {
    children: React.ReactNode;
    redirectTo?: string;
    fallback?: React.ReactNode;
}

function GuestRoute({
    children,
    redirectTo = '/dashboard',
    fallback,
}: GuestRouteProps) {
    const router = useRouter();
    const searchParams = useSearchParams();
    const { isAuthenticated, loading } = useAuth();
    const [isChecking, setIsChecking] = useState(true);

    useEffect(() => {
        if (loading) return;

        // If user is authenticated, redirect them
        if (isAuthenticated) {
            // Check for return URL
            const returnUrl = searchParams.get('returnUrl');
            router.push(returnUrl ? decodeURIComponent(returnUrl) : redirectTo);
            return;
        }

        setIsChecking(false);
    }, [loading, isAuthenticated, redirectTo, router, searchParams]);

    // Show loading while checking auth
    if (loading || isChecking) {
        return fallback || <PageLoading message="লোড হচ্ছে..." />;
    }

    // User is not authenticated, show the page
    return <>{children}</>;
}

export default GuestRoute;
