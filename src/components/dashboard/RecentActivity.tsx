'use client';

import React from 'react';
import Link from 'next/link';
import { ChevronRight, History } from 'lucide-react';
import { ActivityItem, activityTypeConfig, formatRelativeTime } from '@/types/dashboard';
import { Card, CardBody, CardHeader } from '@/components/ui';
import { cn } from '@/lib/utils';

interface RecentActivityProps {
    activities: ActivityItem[];
    showViewAll?: boolean;
    maxItems?: number;
    className?: string;
}

function RecentActivity({
    activities,
    showViewAll = true,
    maxItems = 5,
    className
}: RecentActivityProps) {
    const displayedActivities = activities.slice(0, maxItems);

    return (
        <Card className={className}>
            <CardHeader
                title="Recent Activity"
                subtitle="সাম্প্রতিক কার্যক্রম"
                icon={<History className="h-5 w-5 text-blue-500" />}
                action={
                    showViewAll && (
                        <Link href="/activity" className="text-sm text-blue-600 hover:underline flex items-center gap-1">
                            View All <ChevronRight className="h-4 w-4" />
                        </Link>
                    )
                }
            />
            <CardBody>
                {displayedActivities.length === 0 ? (
                    <div className="text-center py-8">
                        <History className="h-12 w-12 text-gray-300 mx-auto mb-3" />
                        <p className="text-gray-500 font-bengali">কোনো কার্যক্রম নেই</p>
                    </div>
                ) : (
                    <div className="relative">
                        {/* Timeline Line */}
                        <div className="absolute left-5 top-0 bottom-0 w-0.5 bg-gray-200 dark:bg-gray-700" />

                        {/* Activity Items */}
                        <div className="space-y-4">
                            {displayedActivities.map((activity, index) => {
                                const config = activityTypeConfig[activity.type];

                                return (
                                    <div
                                        key={activity.id}
                                        className={cn(
                                            'relative pl-12 group',
                                            index === 0 && 'pt-0'
                                        )}
                                    >
                                        {/* Timeline Dot */}
                                        <div
                                            className={cn(
                                                'absolute left-3 w-5 h-5 rounded-full flex items-center justify-center text-xs border-2 border-white dark:border-gray-900',
                                                'transition-transform group-hover:scale-110'
                                            )}
                                            style={{ backgroundColor: config.color }}
                                        >
                                            <span className="text-white text-[10px]">{config.icon}</span>
                                        </div>

                                        {/* Content */}
                                        <div className="p-3 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
                                            <div className="flex items-start justify-between gap-3">
                                                <div className="flex-1 min-w-0">
                                                    <h4 className="font-medium text-gray-900 dark:text-white text-sm">
                                                        {activity.titleBn}
                                                    </h4>
                                                    {activity.descriptionBn && (
                                                        <p className="text-xs text-gray-500 mt-0.5">
                                                            {activity.descriptionBn}
                                                        </p>
                                                    )}
                                                </div>
                                                <span className="text-xs text-gray-400 whitespace-nowrap">
                                                    {formatRelativeTime(activity.timestamp)}
                                                </span>
                                            </div>

                                            {/* Metadata */}
                                            {activity.metadata?.score && (
                                                <div className="mt-2">
                                                    <span
                                                        className="text-xs px-2 py-0.5 rounded-full font-medium"
                                                        style={{
                                                            backgroundColor: `${config.color}20`,
                                                            color: config.color
                                                        }}
                                                    >
                                                        Score: {activity.metadata.score}%
                                                    </span>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                )}

                {/* Today's Summary */}
                <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
                    <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-500 font-bengali">আজকের কার্যক্রম</span>
                        <span className="font-medium text-gray-900 dark:text-white">
                            {activities.filter(a => {
                                const today = new Date();
                                return a.timestamp.toDateString() === today.toDateString();
                            }).length} activities
                        </span>
                    </div>
                </div>
            </CardBody>
        </Card>
    );
}

export default RecentActivity;
