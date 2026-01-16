'use client';

import { DashboardLayout } from '@/components/layout';
import { ProtectedRoute } from '@/components/auth';
import { Card, CardBody } from '@/components/ui';
import { TrendingUp } from 'lucide-react';

export default function ProgressPage() {
    return (
        <ProtectedRoute>
            <DashboardLayout
                title="My Progress 📈"
                description="তোমার সম্পূর্ণ learning progress দেখো"
            >
                <Card>
                    <CardBody className="text-center py-12">
                        <TrendingUp className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                        <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                            Progress Tracking
                        </h2>
                        <p className="text-gray-500">
                            এই page এ তোমার detailed progress দেখাবে।
                            <br />
                            Coming soon!
                        </p>
                    </CardBody>
                </Card>
            </DashboardLayout>
        </ProtectedRoute>
    );
}
