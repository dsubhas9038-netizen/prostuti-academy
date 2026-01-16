'use client';

import { DashboardLayout } from '@/components/layout';
import { ProtectedRoute } from '@/components/auth';
import { Card, CardBody } from '@/components/ui';
import { ClipboardList } from 'lucide-react';

export default function TestHistoryPage() {
    return (
        <ProtectedRoute>
            <DashboardLayout
                title="Test History 📝"
                description="তোমার দেওয়া সব tests এর history"
            >
                <Card>
                    <CardBody className="text-center py-12">
                        <ClipboardList className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                        <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                            Test History
                        </h2>
                        <p className="text-gray-500">
                            তোমার test history এখানে দেখাবে।
                            <br />
                            Coming soon!
                        </p>
                    </CardBody>
                </Card>
            </DashboardLayout>
        </ProtectedRoute>
    );
}
