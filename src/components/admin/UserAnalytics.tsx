'use client';

import React, { useState } from 'react';
import { Users, Activity, Clock, TrendingUp, ChevronDown } from 'lucide-react';
import { Card, CardBody, CardHeader, Badge, Button } from '@/components/ui';
import { UserActivityData, UserGrowthData, TimeRange, timeRangeConfig, chartColorsPalette } from '@/types/analytics';
import AnalyticsChart from './AnalyticsChart';
import { cn } from '@/lib/utils';

interface UserAnalyticsProps {
    growthData: UserGrowthData[];
    activityData: UserActivityData[];
    className?: string;
}

function UserAnalytics({ growthData, activityData, className }: UserAnalyticsProps) {
    const [timeRange, setTimeRange] = useState<TimeRange>('30days');

    // Prepare chart data
    const growthChartData = {
        labels: growthData.map(d => d.period),
        datasets: [
            {
                label: 'Total Users',
                data: growthData.map(d => d.totalUsers),
                color: '#3B82F6',
            },
            {
                label: 'Active Users',
                data: growthData.map(d => d.activeUsers),
                color: '#22C55E',
            },
        ],
    };

    const activityChartData = {
        labels: activityData.map(d => d.period),
        datasets: [
            {
                label: 'Daily Active',
                data: activityData.map(d => d.dailyActiveUsers),
                color: '#8B5CF6',
            },
        ],
    };

    // Calculate totals
    const latestGrowth = growthData[growthData.length - 1];
    const totalActivity = activityData.reduce((sum, d) => ({
        questions: sum.questions + d.questionsAnswered,
        tests: sum.tests + d.testsCompleted,
        downloads: sum.downloads + d.resourcesDownloaded,
    }), { questions: 0, tests: 0, downloads: 0 });

    const avgSessionTime = Math.round(
        activityData.reduce((sum, d) => sum + d.avgSessionDuration, 0) / activityData.length
    );

    return (
        <div className={cn('space-y-6', className)}>
            {/* Header with Time Range */}
            <div className="flex items-center justify-between">
                <div>
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                        User Analytics
                    </h3>
                    <p className="text-sm text-gray-500">ব্যবহারকারী বিশ্লেষণ</p>
                </div>

                <div className="flex items-center gap-2">
                    {(['7days', '30days', '90days'] as TimeRange[]).map((range) => (
                        <Button
                            key={range}
                            variant={timeRange === range ? 'primary' : 'outline'}
                            size="sm"
                            onClick={() => setTimeRange(range)}
                        >
                            {timeRangeConfig[range].label}
                        </Button>
                    ))}
                </div>
            </div>

            {/* Stats Grid */}
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="p-4 bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/30 dark:to-blue-800/30 rounded-xl">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-blue-500 rounded-lg flex items-center justify-center">
                            <Users className="h-5 w-5 text-white" />
                        </div>
                        <div>
                            <p className="text-2xl font-bold text-blue-700 dark:text-blue-400">
                                {latestGrowth?.totalUsers.toLocaleString()}
                            </p>
                            <p className="text-xs text-blue-600">Total Users</p>
                        </div>
                    </div>
                </div>

                <div className="p-4 bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900/30 dark:to-green-800/30 rounded-xl">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-green-500 rounded-lg flex items-center justify-center">
                            <Activity className="h-5 w-5 text-white" />
                        </div>
                        <div>
                            <p className="text-2xl font-bold text-green-700 dark:text-green-400">
                                {latestGrowth?.activeUsers.toLocaleString()}
                            </p>
                            <p className="text-xs text-green-600">Active Users</p>
                        </div>
                    </div>
                </div>

                <div className="p-4 bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-900/30 dark:to-purple-800/30 rounded-xl">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-purple-500 rounded-lg flex items-center justify-center">
                            <TrendingUp className="h-5 w-5 text-white" />
                        </div>
                        <div>
                            <p className="text-2xl font-bold text-purple-700 dark:text-purple-400">
                                {latestGrowth?.newUsers}
                            </p>
                            <p className="text-xs text-purple-600">New This Month</p>
                        </div>
                    </div>
                </div>

                <div className="p-4 bg-gradient-to-br from-amber-50 to-amber-100 dark:from-amber-900/30 dark:to-amber-800/30 rounded-xl">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-amber-500 rounded-lg flex items-center justify-center">
                            <Clock className="h-5 w-5 text-white" />
                        </div>
                        <div>
                            <p className="text-2xl font-bold text-amber-700 dark:text-amber-400">
                                {avgSessionTime}m
                            </p>
                            <p className="text-xs text-amber-600">Avg Session</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Charts */}
            <div className="grid lg:grid-cols-2 gap-6">
                <AnalyticsChart
                    title="User Growth"
                    subtitle="Monthly user growth trend"
                    data={growthChartData}
                    type="area"
                    height={280}
                />

                <AnalyticsChart
                    title="Daily Active Users"
                    subtitle="Weekly activity pattern"
                    data={activityChartData}
                    type="bar"
                    height={280}
                />
            </div>

            {/* Activity Summary */}
            <Card>
                <CardHeader
                    title="User Activity Summary"
                    subtitle="সপ্তাহের কার্যক্রম সারাংশ"
                    icon={<span className="text-xl">📋</span>}
                />
                <CardBody>
                    <div className="grid sm:grid-cols-3 gap-6">
                        <div className="text-center p-4 bg-gray-50 dark:bg-gray-800 rounded-xl">
                            <p className="text-3xl font-bold text-gray-900 dark:text-white">
                                {totalActivity.questions.toLocaleString()}
                            </p>
                            <p className="text-sm text-gray-500 mt-1">Questions Answered</p>
                            <Badge size="sm" className="bg-blue-100 text-blue-700 mt-2">
                                📝 This Week
                            </Badge>
                        </div>
                        <div className="text-center p-4 bg-gray-50 dark:bg-gray-800 rounded-xl">
                            <p className="text-3xl font-bold text-gray-900 dark:text-white">
                                {totalActivity.tests}
                            </p>
                            <p className="text-sm text-gray-500 mt-1">Tests Completed</p>
                            <Badge size="sm" className="bg-purple-100 text-purple-700 mt-2">
                                🧪 This Week
                            </Badge>
                        </div>
                        <div className="text-center p-4 bg-gray-50 dark:bg-gray-800 rounded-xl">
                            <p className="text-3xl font-bold text-gray-900 dark:text-white">
                                {totalActivity.downloads}
                            </p>
                            <p className="text-sm text-gray-500 mt-1">Resources Downloaded</p>
                            <Badge size="sm" className="bg-amber-100 text-amber-700 mt-2">
                                📥 This Week
                            </Badge>
                        </div>
                    </div>
                </CardBody>
            </Card>
        </div>
    );
}

export default UserAnalytics;
