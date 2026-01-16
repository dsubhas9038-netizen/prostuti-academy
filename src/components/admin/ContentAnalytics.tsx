'use client';

import React from 'react';
import Link from 'next/link';
import { TrendingUp, Eye, ChevronRight, FileText, TestTube, FileDown } from 'lucide-react';
import { Card, CardBody, CardHeader, Badge } from '@/components/ui';
import { ContentMetrics, TopContentItem, chartColorsPalette } from '@/types/analytics';
import { PieChart } from './AnalyticsChart';
import { cn } from '@/lib/utils';

interface ContentAnalyticsProps {
    metrics: ContentMetrics;
    className?: string;
}

// Type icons
const typeIcons = {
    question: FileText,
    test: TestTube,
    resource: FileDown,
};

const typeColors = {
    question: '#3B82F6',
    test: '#8B5CF6',
    resource: '#F59E0B',
};

function ContentAnalytics({ metrics, className }: ContentAnalyticsProps) {
    // Prepare distribution data
    const contentDistribution = [
        { label: 'Questions', value: metrics.totalQuestions, color: '#3B82F6' },
        { label: 'Tests', value: metrics.totalTests, color: '#8B5CF6' },
        { label: 'Resources', value: metrics.totalResources, color: '#F59E0B' },
    ];

    return (
        <div className={cn('grid lg:grid-cols-2 gap-6', className)}>
            {/* Content Distribution */}
            <Card>
                <CardHeader
                    title="Content Distribution"
                    subtitle="কন্টেন্ট বিতরণ"
                    icon={<span className="text-xl">📊</span>}
                />
                <CardBody>
                    <PieChart data={contentDistribution} size={180} />

                    {/* Stats Grid */}
                    <div className="grid grid-cols-3 gap-4 mt-6">
                        <div className="text-center p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                            <p className="text-2xl font-bold text-blue-600">{metrics.totalQuestions}</p>
                            <p className="text-xs text-gray-500">Questions</p>
                        </div>
                        <div className="text-center p-3 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
                            <p className="text-2xl font-bold text-purple-600">{metrics.totalTests}</p>
                            <p className="text-xs text-gray-500">Tests</p>
                        </div>
                        <div className="text-center p-3 bg-amber-50 dark:bg-amber-900/20 rounded-lg">
                            <p className="text-2xl font-bold text-amber-600">{metrics.totalResources}</p>
                            <p className="text-xs text-gray-500">Resources</p>
                        </div>
                    </div>
                </CardBody>
            </Card>

            {/* Top Content */}
            <Card>
                <CardHeader
                    title="Top Performing Content"
                    subtitle="সেরা কন্টেন্ট"
                    icon={<span className="text-xl">🏆</span>}
                    action={
                        <Link href="/admin/analytics/content" className="text-sm text-blue-600 hover:underline flex items-center gap-1">
                            View All <ChevronRight className="h-4 w-4" />
                        </Link>
                    }
                />
                <CardBody>
                    <div className="space-y-4">
                        {metrics.topContent.map((item, index) => {
                            const Icon = typeIcons[item.type];
                            const color = typeColors[item.type];

                            return (
                                <div
                                    key={item.id}
                                    className="flex items-center gap-4 p-3 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors group"
                                >
                                    {/* Rank */}
                                    <div className={cn(
                                        'w-8 h-8 rounded-lg flex items-center justify-center font-bold text-sm',
                                        index === 0 && 'bg-yellow-100 text-yellow-700',
                                        index === 1 && 'bg-gray-200 text-gray-700',
                                        index === 2 && 'bg-amber-100 text-amber-700',
                                    )}>
                                        {index + 1}
                                    </div>

                                    {/* Icon */}
                                    <div
                                        className="w-10 h-10 rounded-lg flex items-center justify-center"
                                        style={{ backgroundColor: `${color}20` }}
                                    >
                                        <Icon className="h-5 w-5" style={{ color }} />
                                    </div>

                                    {/* Content */}
                                    <div className="flex-1 min-w-0">
                                        <p className="font-medium text-gray-900 dark:text-white truncate">
                                            {item.titleBn}
                                        </p>
                                        <div className="flex items-center gap-3 text-xs text-gray-500 mt-0.5">
                                            <span className="flex items-center gap-1">
                                                <Eye className="h-3 w-3" />
                                                {item.views.toLocaleString()} views
                                            </span>
                                            <span>{item.engagement}% engagement</span>
                                        </div>
                                    </div>

                                    {/* Trend */}
                                    <Badge
                                        size="sm"
                                        className="bg-green-100 text-green-700 flex items-center gap-1"
                                    >
                                        <TrendingUp className="h-3 w-3" />
                                        +{item.trend}%
                                    </Badge>
                                </div>
                            );
                        })}
                    </div>
                </CardBody>
            </Card>

            {/* Questions by Subject */}
            <Card>
                <CardHeader
                    title="Questions by Subject"
                    subtitle="বিষয় অনুযায়ী প্রশ্ন"
                    icon={<span className="text-xl">📚</span>}
                />
                <CardBody>
                    <div className="space-y-3">
                        {metrics.questionsBySubject.map((item, i) => {
                            const percentage = Math.round((item.count / metrics.totalQuestions) * 100);
                            const color = chartColorsPalette[i % chartColorsPalette.length];

                            return (
                                <div key={item.subject}>
                                    <div className="flex items-center justify-between text-sm mb-1">
                                        <span className="text-gray-700 dark:text-gray-300">{item.subject}</span>
                                        <span className="text-gray-500">{item.count} ({percentage}%)</span>
                                    </div>
                                    <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                                        <div
                                            className="h-full rounded-full transition-all"
                                            style={{ width: `${percentage}%`, backgroundColor: color }}
                                        />
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </CardBody>
            </Card>

            {/* Resources by Category */}
            <Card>
                <CardHeader
                    title="Resources by Category"
                    subtitle="ক্যাটাগরি অনুযায়ী রিসোর্স"
                    icon={<span className="text-xl">📂</span>}
                />
                <CardBody>
                    <div className="grid grid-cols-2 gap-4">
                        {metrics.resourcesByCategory.map((item, i) => {
                            const color = chartColorsPalette[i % chartColorsPalette.length];

                            return (
                                <div
                                    key={item.category}
                                    className="p-4 rounded-xl border border-gray-200 dark:border-gray-700"
                                >
                                    <div
                                        className="w-10 h-10 rounded-lg flex items-center justify-center text-lg mb-2"
                                        style={{ backgroundColor: `${color}20` }}
                                    >
                                        📄
                                    </div>
                                    <p className="text-xl font-bold text-gray-900 dark:text-white">{item.count}</p>
                                    <p className="text-xs text-gray-500">{item.category}</p>
                                </div>
                            );
                        })}
                    </div>
                </CardBody>
            </Card>
        </div>
    );
}

export default ContentAnalytics;
