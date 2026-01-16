'use client';

import React from 'react';
import { CheckCircle, Circle, BookOpen, TrendingUp } from 'lucide-react';
import { ProgressBar, Card, CardBody } from '@/components/ui';
import { cn } from '@/lib/utils';

interface QuestionProgressIndicatorProps {
    total: number;
    completed: number;
    read?: number;
    bookmarked?: number;
    variant?: 'compact' | 'detailed';
    className?: string;
}

function QuestionProgressIndicator({
    total,
    completed,
    read = 0,
    bookmarked = 0,
    variant = 'compact',
    className,
}: QuestionProgressIndicatorProps) {
    const percentage = total > 0 ? Math.round((completed / total) * 100) : 0;
    const readPercentage = total > 0 ? Math.round((read / total) * 100) : 0;

    // Compact variant
    if (variant === 'compact') {
        return (
            <div className={cn('flex items-center gap-4', className)}>
                {/* Progress */}
                <div className="flex items-center gap-2">
                    <CheckCircle className={cn(
                        'h-4 w-4',
                        percentage === 100 ? 'text-green-500' : 'text-gray-400'
                    )} />
                    <span className="text-sm text-gray-600 dark:text-gray-400">
                        <span className="font-medium text-gray-900 dark:text-white">{completed}</span>
                        /{total} completed
                    </span>
                </div>

                {/* Progress Bar */}
                <div className="flex-1 max-w-[200px]">
                    <ProgressBar
                        value={percentage}
                        size="sm"
                        variant={percentage === 100 ? 'success' : 'default'}
                        showLabel={false}
                    />
                </div>

                {/* Percentage */}
                <span className={cn(
                    'text-sm font-bold',
                    percentage === 100 ? 'text-green-600' : 'text-gray-900 dark:text-white'
                )}>
                    {percentage}%
                </span>
            </div>
        );
    }

    // Detailed variant
    return (
        <Card className={className}>
            <CardBody className="py-4">
                <div className="flex items-center justify-between mb-3">
                    <h4 className="font-medium text-gray-900 dark:text-white flex items-center gap-2">
                        <TrendingUp className="h-4 w-4 text-blue-500" />
                        Progress
                    </h4>
                    <span className={cn(
                        'text-lg font-bold',
                        percentage === 100 ? 'text-green-600' : 'text-blue-600'
                    )}>
                        {percentage}%
                    </span>
                </div>

                {/* Main Progress Bar */}
                <ProgressBar
                    value={percentage}
                    size="md"
                    variant={percentage === 100 ? 'success' : 'default'}
                    showLabel={false}
                    className="mb-4"
                />

                {/* Stats Grid */}
                <div className="grid grid-cols-3 gap-4">
                    {/* Completed */}
                    <div className="text-center">
                        <div className="flex items-center justify-center gap-1 mb-1">
                            <CheckCircle className="h-4 w-4 text-green-500" />
                            <span className="text-lg font-bold text-gray-900 dark:text-white">
                                {completed}
                            </span>
                        </div>
                        <p className="text-xs text-gray-500">Completed</p>
                    </div>

                    {/* Read */}
                    <div className="text-center">
                        <div className="flex items-center justify-center gap-1 mb-1">
                            <BookOpen className="h-4 w-4 text-blue-500" />
                            <span className="text-lg font-bold text-gray-900 dark:text-white">
                                {read}
                            </span>
                        </div>
                        <p className="text-xs text-gray-500">Read</p>
                    </div>

                    {/* Remaining */}
                    <div className="text-center">
                        <div className="flex items-center justify-center gap-1 mb-1">
                            <Circle className="h-4 w-4 text-gray-400" />
                            <span className="text-lg font-bold text-gray-900 dark:text-white">
                                {total - completed}
                            </span>
                        </div>
                        <p className="text-xs text-gray-500">Remaining</p>
                    </div>
                </div>

                {/* Motivational Message */}
                {percentage < 100 && percentage > 0 && (
                    <p className="text-xs text-center text-gray-500 mt-3">
                        {percentage >= 75
                            ? '🎉 প্রায় শেষ! চালিয়ে যাও!'
                            : percentage >= 50
                                ? '💪 অর্ধেক হয়ে গেছে! দারুণ!'
                                : percentage >= 25
                                    ? '📚 ভালো শুরু! চালিয়ে যাও!'
                                    : '🚀 শুরু করো! তুমি পারবে!'}
                    </p>
                )}

                {percentage === 100 && (
                    <p className="text-xs text-center text-green-600 mt-3 font-medium">
                        🏆 অভিনন্দন! সব questions শেষ করেছ!
                    </p>
                )}
            </CardBody>
        </Card>
    );
}

export default QuestionProgressIndicator;
