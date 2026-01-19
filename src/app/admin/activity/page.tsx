'use client';

import React, { useState, useEffect } from 'react';
import { AdminLayout } from '@/components/admin';
import { Card, CardBody, Badge, Button } from '@/components/ui';
import { PageLoading } from '@/components/shared';
import { getRealRecentActivities } from '@/lib/admin';
import { adminActivityTypeConfig, actionTypeConfig, formatAdminTime, AdminActivity } from '@/types/admin';
import { RefreshCw } from 'lucide-react';
import toast from 'react-hot-toast';

export default function AdminActivityPage() {
    const [activities, setActivities] = useState<AdminActivity[]>([]);
    const [loading, setLoading] = useState(true);
    const [refreshing, setRefreshing] = useState(false);

    const loadActivities = async () => {
        try {
            setRefreshing(true);
            // Fetch more activities for the dedicated page (e.g., 50)
            const data = await getRealRecentActivities(50);
            setActivities(data);
        } catch (error) {
            console.error(error);
            toast.error('Failed to load activities');
        } finally {
            setLoading(false);
            setRefreshing(false);
        }
    };

    useEffect(() => {
        loadActivities();
    }, []);

    if (loading) {
        return (
            <AdminLayout title="System Activity" titleBn="সিস্টেম অ্যাক্টিভিটি">
                <PageLoading message="Loading activity log..." />
            </AdminLayout>
        );
    }

    return (
        <AdminLayout title="System Activity" titleBn="সিস্টেম অ্যাক্টিভিটি">
            <div className="flex justify-between items-center mb-6">
                <div>
                    <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                        Activity Log
                    </h2>
                    <p className="text-sm text-gray-500">
                        Recent actions across the platform (Last 50 items)
                    </p>
                </div>
                <Button
                    variant="outline"
                    onClick={loadActivities}
                    isLoading={refreshing}
                    leftIcon={<RefreshCw className={`h-4 w-4 ${refreshing ? 'animate-spin' : ''}`} />}
                >
                    Refresh
                </Button>
            </div>

            <Card>
                <CardBody>
                    <div className="space-y-4">
                        {activities.length === 0 ? (
                            <div className="text-center py-8 text-gray-500">
                                No recent activity found.
                            </div>
                        ) : (
                            activities.map((activity) => {
                                const typeConfig = adminActivityTypeConfig[activity.type] || { icon: '❓', color: '#9CA3AF' };
                                const actionConfig = actionTypeConfig[activity.action] || { label: activity.action, color: '#9CA3AF' };

                                return (
                                    <div
                                        key={activity.id}
                                        className="flex items-start gap-4 p-4 rounded-lg bg-gray-50 dark:bg-gray-800/50 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors border border-gray-100 dark:border-gray-700/50"
                                    >
                                        {/* Icon */}
                                        <div
                                            className="w-10 h-10 rounded-full flex items-center justify-center text-lg flex-shrink-0"
                                            style={{ backgroundColor: `${typeConfig.color}20` }}
                                        >
                                            {typeConfig.icon}
                                        </div>

                                        {/* Content */}
                                        <div className="flex-1 min-w-0">
                                            <div className="flex flex-wrap items-center gap-2 mb-1">
                                                <span className="font-medium text-gray-900 dark:text-white">
                                                    {activity.title}
                                                </span>
                                                <Badge
                                                    size="sm"
                                                    style={{ backgroundColor: `${actionConfig.color}20`, color: actionConfig.color }}
                                                >
                                                    {actionConfig.label}
                                                </Badge>
                                                <span className="text-xs text-gray-400">
                                                    ID: {activity.id.substring(0, 8)}...
                                                </span>
                                            </div>

                                            <p className="text-sm text-gray-600 dark:text-gray-300">
                                                {activity.description}
                                            </p>

                                            <div className="mt-1 flex items-center gap-3 text-xs text-gray-500">
                                                <span className="font-bengali">{activity.titleBn}</span>
                                                <span>•</span>
                                                <span>{formatAdminTime(activity.timestamp)}</span>
                                                <span>•</span>
                                                <span>{activity.timestamp.toLocaleString()}</span>
                                            </div>
                                        </div>
                                    </div>
                                );
                            })
                        )}
                    </div>
                </CardBody>
            </Card>
        </AdminLayout>
    );
}
