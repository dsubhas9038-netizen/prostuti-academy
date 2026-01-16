'use client';

import React from 'react';
import Link from 'next/link';
import { TrendingUp, TrendingDown, ArrowRight } from 'lucide-react';
import { Card, CardBody } from '@/components/ui';
import { cn } from '@/lib/utils';

interface AdminStatsCardProps {
    icon: string;
    label: string;
    labelBn?: string;
    value: number | string;
    trend?: number;
    trendLabel?: string;
    href?: string;
    color?: string;
    className?: string;
}

function AdminStatsCard({
    icon,
    label,
    labelBn,
    value,
    trend,
    trendLabel,
    href,
    color = '#6366F1',
    className,
}: AdminStatsCardProps) {
    const isPositiveTrend = trend && trend >= 0;

    const content = (
        <Card className={cn(
            'hover:shadow-lg transition-all group overflow-hidden',
            href && 'cursor-pointer hover:-translate-y-1',
            className
        )}>
            <CardBody className="p-6">
                <div className="flex items-start justify-between">
                    {/* Left: Icon & Data */}
                    <div className="flex items-start gap-4">
                        {/* Icon */}
                        <div
                            className="w-14 h-14 rounded-xl flex items-center justify-center text-2xl transition-transform group-hover:scale-110"
                            style={{ backgroundColor: `${color}20` }}
                        >
                            {icon}
                        </div>

                        {/* Content */}
                        <div>
                            <p className="text-sm text-gray-500 dark:text-gray-400">
                                {label}
                            </p>
                            <p className="text-3xl font-bold text-gray-900 dark:text-white mt-1">
                                {typeof value === 'number' ? value.toLocaleString() : value}
                            </p>

                            {/* Trend */}
                            {trend !== undefined && (
                                <div className={cn(
                                    'flex items-center gap-1 mt-2 text-sm font-medium',
                                    isPositiveTrend ? 'text-green-600' : 'text-red-600'
                                )}>
                                    {isPositiveTrend ? (
                                        <TrendingUp className="h-4 w-4" />
                                    ) : (
                                        <TrendingDown className="h-4 w-4" />
                                    )}
                                    <span>{isPositiveTrend ? '+' : ''}{trend}%</span>
                                    {trendLabel && (
                                        <span className="text-gray-400 font-normal">{trendLabel}</span>
                                    )}
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Right: Arrow (if link) */}
                    {href && (
                        <ArrowRight className="h-5 w-5 text-gray-400 group-hover:text-indigo-500 group-hover:translate-x-1 transition-all" />
                    )}
                </div>

                {/* Colored Bar */}
                <div
                    className="absolute bottom-0 left-0 right-0 h-1 opacity-0 group-hover:opacity-100 transition-opacity"
                    style={{ backgroundColor: color }}
                />
            </CardBody>
        </Card>
    );

    if (href) {
        return <Link href={href}>{content}</Link>;
    }

    return content;
}

export default AdminStatsCard;

// Stats Grid Component
interface AdminStatsGridProps {
    children: React.ReactNode;
    className?: string;
}

export function AdminStatsGrid({ children, className }: AdminStatsGridProps) {
    return (
        <div className={cn(
            'grid sm:grid-cols-2 lg:grid-cols-4 gap-6',
            className
        )}>
            {children}
        </div>
    );
}
