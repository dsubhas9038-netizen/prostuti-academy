'use client';

import React, { useState } from 'react';
import { RefreshCw, Download, Calendar } from 'lucide-react';
import { AdminLayout, AnalyticsOverview, AnalyticsChart, ContentAnalytics, UserAnalytics } from '@/components/admin';
import { Button, Badge } from '@/components/ui';
import { TimeRange, timeRangeConfig } from '@/types/analytics';
import {
    getOverviewMetrics,
    getUserGrowthData,
    getUserActivityData,
    getContentMetrics,
    userGrowthChartData
} from '@/data/sampleAnalyticsData';

export default function AnalyticsPage() {
    const [timeRange, setTimeRange] = useState<TimeRange>('30days');

    // Get data
    const overviewMetrics = getOverviewMetrics();
    const userGrowthData = getUserGrowthData();
    const userActivityData = getUserActivityData();
    const contentMetrics = getContentMetrics();

    return (
        <AdminLayout title="Analytics" titleBn="বিশ্লেষণ">
            {/* Header */}
            <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
                <div>
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                        Analytics Dashboard 📈
                    </h2>
                    <p className="text-gray-500 mt-1">
                        Platform performance and insights
                    </p>
                </div>

                <div className="flex items-center gap-3">
                    {/* Time Range */}
                    <div className="flex items-center gap-1 p-1 bg-gray-100 dark:bg-gray-800 rounded-lg">
                        {(['7days', '30days', '90days', '1year'] as TimeRange[]).map((range) => (
                            <button
                                key={range}
                                onClick={() => setTimeRange(range)}
                                className={`px-3 py-1.5 text-sm font-medium rounded-md transition-colors ${timeRange === range
                                        ? 'bg-white dark:bg-gray-700 text-gray-900 dark:text-white shadow-sm'
                                        : 'text-gray-600 dark:text-gray-400 hover:text-gray-900'
                                    }`}
                            >
                                {timeRangeConfig[range].label}
                            </button>
                        ))}
                    </div>

                    <Button variant="outline" size="sm" leftIcon={<Download className="h-4 w-4" />}>
                        Export
                    </Button>
                    <Button variant="outline" size="sm" leftIcon={<RefreshCw className="h-4 w-4" />}>
                        Refresh
                    </Button>
                </div>
            </div>

            {/* Overview */}
            <AnalyticsOverview metrics={overviewMetrics} className="mb-8" />

            {/* Main Charts */}
            <div className="grid lg:grid-cols-2 gap-6 mb-8">
                <AnalyticsChart
                    title="User Growth"
                    subtitle="Monthly growth trend"
                    data={userGrowthChartData}
                    type="area"
                    height={300}
                />
                <AnalyticsChart
                    title="Daily Active Users"
                    subtitle="Last 7 days"
                    data={{
                        labels: userActivityData.map(d => d.period),
                        datasets: [{
                            label: 'Active Users',
                            data: userActivityData.map(d => d.dailyActiveUsers),
                            color: '#8B5CF6',
                        }],
                    }}
                    type="bar"
                    height={300}
                />
            </div>

            {/* Content Analytics */}
            <div className="mb-8">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                    Content Performance
                </h3>
                <ContentAnalytics metrics={contentMetrics} />
            </div>

            {/* User Analytics */}
            <UserAnalytics
                growthData={userGrowthData}
                activityData={userActivityData}
            />

            {/* Last Updated */}
            <div className="mt-8 pt-6 border-t border-gray-200 dark:border-gray-700">
                <div className="flex items-center justify-between text-sm text-gray-500">
                    <div className="flex items-center gap-2">
                        <Calendar className="h-4 w-4" />
                        <span>Last updated: {new Date().toLocaleString()}</span>
                    </div>
                    <span>Data range: {timeRangeConfig[timeRange].label}</span>
                </div>
            </div>
        </AdminLayout>
    );
}
