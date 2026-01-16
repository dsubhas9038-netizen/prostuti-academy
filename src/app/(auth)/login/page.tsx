'use client';

import { Suspense } from 'react';
import { AuthLayout } from '@/components/layout';
import { LoginForm, GuestRoute } from '@/components/auth';
import { PageLoading } from '@/components/shared';

export default function LoginPage() {
    return (
        <GuestRoute>
            <AuthLayout
                title="স্বাগতম! 👋"
                subtitle="তোমার একাউন্টে লগইন করো"
            >
                <Suspense fallback={<PageLoading />}>
                    <LoginForm />
                </Suspense>
            </AuthLayout>
        </GuestRoute>
    );
}
