'use client';

import React, { useEffect, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { useAuth } from '@/hooks/useAuth';
import { PageLoading } from '@/components/shared';

interface ProtectedRouteProps {
    children: React.ReactNode;
    requireAuth?: boolean;
    requireAdmin?: boolean;
    requireOnboarding?: boolean;
    redirectTo?: string;
    fallback?: React.ReactNode;
}

function ProtectedRoute({
    children,
    requireAuth = true,
    requireAdmin = false,
    requireOnboarding = true,
    redirectTo = '/login',
    fallback,
}: ProtectedRouteProps) {
    const router = useRouter();
    const pathname = usePathname();
    const { isAuthenticated, isAdmin, userData, loading } = useAuth();
    const [isChecking, setIsChecking] = useState(true);

    useEffect(() => {
        if (loading) return;

        // Check authentication
        if (requireAuth && !isAuthenticated) {
            // Save the current URL to redirect back after login
            const returnUrl = encodeURIComponent(pathname);
            router.push(`${redirectTo}?returnUrl=${returnUrl}`);
            return;
        }

        // Check admin access
        if (requireAdmin && !isAdmin) {
            router.push('/dashboard');
            return;
        }

        // Check onboarding completion
        if (requireOnboarding && isAuthenticated && userData) {
            const hasCompletedOnboarding = userData.stream && userData.currentSemester;
            if (!hasCompletedOnboarding) {
                // Will show onboarding modal instead of redirecting
                // This is handled in the DashboardLayout
            }
        }

        setIsChecking(false);
    }, [loading, isAuthenticated, isAdmin, userData, requireAuth, requireAdmin, requireOnboarding, pathname, redirectTo, router]);

    // Show loading while checking auth
    if (loading || isChecking) {
        return fallback || <PageLoading message="যাচাই করা হচ্ছে..." />;
    }

    // User is authenticated (and admin if required)
    return <>{children}</>;
}

export default ProtectedRoute;
