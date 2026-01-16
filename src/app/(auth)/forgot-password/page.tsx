'use client';

import { Suspense } from 'react';
import { AuthLayout } from '@/components/layout';
import { ForgotPasswordForm, GuestRoute } from '@/components/auth';
import { PageLoading } from '@/components/shared';

export default function ForgotPasswordPage() {
    return (
        <GuestRoute>
            <AuthLayout
                title="পাসওয়ার্ড ভুলে গেছো? 🔑"
                subtitle="চিন্তা নেই, আমরা সাহায্য করবো"
            >
                <Suspense fallback={<PageLoading />}>
                    <ForgotPasswordForm />
                </Suspense>
            </AuthLayout>
        </GuestRoute>
    );
}
