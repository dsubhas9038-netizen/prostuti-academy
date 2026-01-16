'use client';

import React from 'react';
import { Calendar, TrendingUp } from 'lucide-react';
import { YearData, SubjectPYQAnalysis, yearColors } from '@/types/pyq';
import { Card, CardBody, CardHeader, Badge } from '@/components/ui';
import { cn } from '@/lib/utils';

interface YearDistributionChartProps {
    yearData: YearData[];
    subjectData?: SubjectPYQAnalysis[];
    showSubjectBreakdown?: boolean;
    className?: string;
}

function YearDistributionChart({
    yearData,
    subjectData = [],
    showSubjectBreakdown = true,
    className,
}: YearDistributionChartProps) {
    // Find max for scaling
    const maxQuestions = Math.max(...yearData.map(y => y.totalQuestions), 1);
    const maxMarks = Math.max(...yearData.map(y => y.totalMarks), 1);

    // Get bar height percentage
    const getBarHeight = (value: number, max: number) => {
        return Math.max((value / max) * 100, 5);
    };

    return (
        <Card className={className}>
            <CardHeader
                title="Year-wise Distribution"
                subtitle="বছর ভিত্তিক প্রশ্ন বিতরণ"
                icon={<Calendar className="h-5 w-5 text-blue-500" />}
            />
            <CardBody>
                {/* Main Chart */}
                <div className="flex items-end justify-between gap-2 h-48 mb-6">
                    {yearData.map((yd) => {
                        const yearConfig = yearColors[yd.year] || yearColors[2019];
                        const barHeight = getBarHeight(yd.totalQuestions, maxQuestions);

                        return (
                            <div
                                key={yd.year}
                                className="flex-1 flex flex-col items-center"
                            >
                                {/* Questions Count */}
                                <span className="text-sm font-bold text-gray-900 dark:text-white mb-2">
                                    {yd.totalQuestions}
                                </span>

                                {/* Bar */}
                                <div
                                    className={cn(
                                        'w-full rounded-t-lg transition-all duration-500',
                                        yearConfig.bg
                                    )}
                                    style={{ height: `${barHeight}%` }}
                                />

                                {/* Year Label */}
                                <div className="mt-2 text-center">
                                    <span className={cn('text-sm font-medium', yearConfig.text)}>
                                        {yd.year}
                                    </span>
                                    {yearConfig.label && (
                                        <Badge size="sm" className="ml-1 text-xs">
                                            {yearConfig.label}
                                        </Badge>
                                    )}
                                </div>
                            </div>
                        );
                    })}
                </div>

                {/* Legend */}
                <div className="flex items-center justify-center gap-4 text-sm text-gray-500">
                    <div className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded bg-blue-500" />
                        <span>Questions</span>
                    </div>
                </div>

                {/* Subject Breakdown */}
                {showSubjectBreakdown && subjectData.length > 0 && (
                    <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
                        <h4 className="text-sm font-medium text-gray-900 dark:text-white mb-4">
                            Subject Breakdown
                        </h4>
                        <div className="space-y-3">
                            {subjectData.map((subject) => {
                                const totalAcrossYears = subject.yearWiseData.reduce((sum, y) => sum + y.totalQuestions, 0);
                                const barWidth = (totalAcrossYears / (maxQuestions * yearData.length)) * 100;

                                return (
                                    <div key={subject.subjectId} className="space-y-1">
                                        <div className="flex items-center justify-between text-sm">
                                            <span className="font-medium" style={{ color: subject.color }}>
                                                {subject.subjectNameBn}
                                            </span>
                                            <span className="text-gray-500">
                                                {subject.totalQuestions} questions
                                            </span>
                                        </div>
                                        <div className="h-2 bg-gray-100 dark:bg-gray-800 rounded-full overflow-hidden">
                                            <div
                                                className="h-full rounded-full transition-all duration-500"
                                                style={{
                                                    width: `${Math.min(barWidth * 3, 100)}%`,
                                                    backgroundColor: subject.color
                                                }}
                                            />
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                )}

                {/* Year-over-Year Trend */}
                <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                            <TrendingUp className="h-4 w-4 text-green-500" />
                            <span className="text-sm text-gray-500">5-Year Trend</span>
                        </div>
                        <span className="text-sm font-medium text-green-600">
                            Consistent Pattern ✓
                        </span>
                    </div>
                </div>
            </CardBody>
        </Card>
    );
}

export default YearDistributionChart;
