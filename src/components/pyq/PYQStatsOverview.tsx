'use client';

import React from 'react';
import {
    FileQuestion,
    Calendar,
    TrendingUp,
    Star,
    RefreshCw
} from 'lucide-react';
import { PYQSummary } from '@/types/pyq';
import { Card, CardBody } from '@/components/ui';
import { cn } from '@/lib/utils';

interface PYQStatsOverviewProps {
    summary: PYQSummary;
    className?: string;
}

function PYQStatsOverview({
    summary,
    className,
}: PYQStatsOverviewProps) {
    const stats = [
        {
            icon: FileQuestion,
            value: summary.totalQuestions,
            label: 'Total Questions',
            labelBn: 'মোট প্রশ্ন',
            color: '#3B82F6',
        },
        {
            icon: Calendar,
            value: `${summary.yearsAnalyzed} Years`,
            label: 'Years Analyzed',
            labelBn: 'বছর বিশ্লেষিত',
            color: '#8B5CF6',
        },
        {
            icon: RefreshCw,
            value: `${summary.repeatPercentage}%`,
            label: 'Repeat Rate',
            labelBn: 'পুনরাবৃত্তি হার',
            color: '#22C55E',
        },
        {
            icon: Star,
            value: summary.importantTopicsCount,
            label: 'Important Topics',
            labelBn: 'গুরুত্বপূর্ণ টপিক',
            color: '#F59E0B',
        },
    ];

    return (
        <div className={cn('grid grid-cols-2 md:grid-cols-4 gap-4', className)}>
            {stats.map((stat, index) => (
                <Card key={index} className="overflow-hidden">
                    <CardBody className="p-4">
                        <div className="flex items-start justify-between">
                            <div>
                                <p className="text-sm text-gray-500 mb-1">{stat.labelBn}</p>
                                <p className="text-2xl font-bold text-gray-900 dark:text-white">
                                    {stat.value}
                                </p>
                            </div>
                            <div
                                className="p-2 rounded-lg"
                                style={{ backgroundColor: `${stat.color}20` }}
                            >
                                <stat.icon
                                    className="h-5 w-5"
                                    style={{ color: stat.color }}
                                />
                            </div>
                        </div>
                    </CardBody>
                </Card>
            ))}
        </div>
    );
}

export default PYQStatsOverview;
