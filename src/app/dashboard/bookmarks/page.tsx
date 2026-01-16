'use client';

import { DashboardLayout } from '@/components/layout';
import { ProtectedRoute } from '@/components/auth';
import { Card, CardBody } from '@/components/ui';
import { Bookmark } from 'lucide-react';

export default function BookmarksPage() {
    return (
        <ProtectedRoute>
            <DashboardLayout
                title="My Bookmarks 🔖"
                description="তোমার save করা questions"
            >
                <Card>
                    <CardBody className="text-center py-12">
                        <Bookmark className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                        <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                            Bookmarked Questions
                        </h2>
                        <p className="text-gray-500">
                            তোমার bookmarked questions এখানে দেখাবে।
                            <br />
                            Coming soon!
                        </p>
                    </CardBody>
                </Card>
            </DashboardLayout>
        </ProtectedRoute>
    );
}
