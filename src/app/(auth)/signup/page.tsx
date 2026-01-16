'use client';

import { Suspense } from 'react';
import { AuthLayout } from '@/components/layout';
import { SignupForm, GuestRoute } from '@/components/auth';
import { PageLoading } from '@/components/shared';

export default function SignupPage() {
    return (
        <GuestRoute>
            <AuthLayout
                title="একাউন্ট তৈরি করো 🎓"
                subtitle="সম্পূর্ণ ফ্রি - কোনো হিডেন চার্জ নেই"
            >
                <Suspense fallback={<PageLoading />}>
                    <SignupForm />
                </Suspense>
            </AuthLayout>
        </GuestRoute>
    );
}
