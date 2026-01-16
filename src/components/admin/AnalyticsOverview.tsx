'use client';

import React from 'react';
import Link from 'next/link';
import { TrendingUp, TrendingDown, ChevronRight, Users, FileText, TestTube, FileDown } from 'lucide-react';
import { Card, CardBody, CardHeader, Badge } from '@/components/ui';
import { OverviewMetrics, formatNumber } from '@/types/analytics';
import { cn } from '@/lib/utils';

interface AnalyticsOverviewProps {
    metrics: OverviewMetrics;
    className?: string;
}

const metricConfig = [
    { key: 'users', label: 'Total Users', icon: Users, color: '#3B82F6', href: '/admin/users' },
    { key: 'questions', label: 'Questions', icon: FileText, color: '#22C55E', href: '/admin/questions' },
    { key: 'tests', label: 'Tests', icon: TestTube, color: '#8B5CF6', href: '/admin/tests' },
    { key: 'resources', label: 'Resources', icon: FileDown, color: '#F59E0B', href: '/admin/resources' },
];

function AnalyticsOverview({ metrics, className }: AnalyticsOverviewProps) {
    return (
        <div className={cn('grid sm:grid-cols-2 lg:grid-cols-4 gap-6', className)}>
            {metricConfig.map((config) => {
                const metric = metrics[config.key as keyof OverviewMetrics];
                if (!metric) return null;

                const Icon = config.icon;
                const isPositive = metric.trend >= 0;

                return (
                    <Link key={config.key} href={config.href}>
                        <Card className="hover:shadow-lg transition-all group cursor-pointer hover:-translate-y-1 overflow-hidden relative">
                            <CardBody className="p-6">
                                <div className="flex items-start justify-between">
                                    {/* Icon */}
                                    <div
                                        className="w-12 h-12 rounded-xl flex items-center justify-center transition-transform group-hover:scale-110"
                                        style={{ backgroundColor: `${config.color}20` }}
                                    >
                                        <Icon className="h-6 w-6" style={{ color: config.color }} />
                                    </div>

                                    {/* Trend */}
                                    <div className={cn(
                                        'flex items-center gap-1 text-sm font-medium',
                                        isPositive ? 'text-green-600' : 'text-red-600'
                                    )}>
                                        {isPositive ? (
                                            <TrendingUp className="h-4 w-4" />
                                        ) : (
                                            <TrendingDown className="h-4 w-4" />
                                        )}
                                        <span>{isPositive ? '+' : ''}{metric.trend}%</span>
                                    </div>
                                </div>

                                <div className="mt-4">
                                    <p className="text-3xl font-bold text-gray-900 dark:text-white">
                                        {formatNumber(metric.current)}
                                    </p>
                                    <div className="flex items-center justify-between mt-1">
                                        <p className="text-sm text-gray-500">{config.label}</p>
                                        <ChevronRight className="h-4 w-4 text-gray-400 group-hover:text-blue-500 group-hover:translate-x-1 transition-all" />
                                    </div>
                                </div>

                                {/* Previous comparison */}
                                <p className="text-xs text-gray-400 mt-2">
                                    vs {formatNumber(metric.previous)} last period
                                </p>
                            </CardBody>

                            {/* Bottom color bar */}
                            <div
                                className="absolute bottom-0 left-0 right-0 h-1 opacity-0 group-hover:opacity-100 transition-opacity"
                                style={{ backgroundColor: config.color }}
                            />
                        </Card>
                    </Link>
                );
            })}
        </div>
    );
}

export default AnalyticsOverview;

// Mini Stats Card for inline display
interface MiniStatProps {
    label: string;
    value: number | string;
    trend?: number;
    color?: string;
}

export function MiniStat({ label, value, trend, color = '#3B82F6' }: MiniStatProps) {
    const isPositive = trend && trend >= 0;

    return (
        <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
            <div>
                <p className="text-xs text-gray-500">{label}</p>
                <p className="text-lg font-semibold text-gray-900 dark:text-white">
                    {typeof value === 'number' ? formatNumber(value) : value}
                </p>
            </div>
            {trend !== undefined && (
                <Badge
                    size="sm"
                    className={cn(
                        isPositive ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                    )}
                >
                    {isPositive ? '+' : ''}{trend}%
                </Badge>
            )}
        </div>
    );
}
