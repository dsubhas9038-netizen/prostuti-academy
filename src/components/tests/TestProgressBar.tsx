'use client';

import React from 'react';
import { CheckCircle, Circle, AlertCircle, Clock } from 'lucide-react';
import { ProgressBar } from '@/components/ui';
import { cn } from '@/lib/utils';

interface TestProgressBarProps {
    totalQuestions: number;
    answeredCount: number;
    skippedCount?: number;
    currentIndex: number;
    timeRemaining?: number; // in seconds
    totalTime?: number;
    variant?: 'compact' | 'detailed';
    className?: string;
}

function TestProgressBar({
    totalQuestions,
    answeredCount,
    skippedCount = 0,
    currentIndex,
    timeRemaining,
    totalTime,
    variant = 'compact',
    className,
}: TestProgressBarProps) {
    const percentage = totalQuestions > 0
        ? Math.round((answeredCount / totalQuestions) * 100)
        : 0;
    const unanswered = totalQuestions - answeredCount - skippedCount;

    // Compact variant
    if (variant === 'compact') {
        return (
            <div className={cn('flex items-center gap-4', className)}>
                {/* Progress Stats */}
                <div className="flex items-center gap-3 text-sm">
                    <span className="text-gray-500">
                        Progress:
                    </span>
                    <span className="font-medium text-gray-900 dark:text-white">
                        {answeredCount}/{totalQuestions}
                    </span>
                </div>

                {/* Progress Bar */}
                <div className="flex-1 max-w-xs">
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
        <div className={cn('p-4 bg-gray-50 dark:bg-gray-800 rounded-xl', className)}>
            {/* Top Row */}
            <div className="flex items-center justify-between mb-3">
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                    Question {currentIndex + 1} of {totalQuestions}
                </span>
                <span className={cn(
                    'text-lg font-bold',
                    percentage === 100 ? 'text-green-600' : 'text-blue-600'
                )}>
                    {percentage}% Complete
                </span>
            </div>

            {/* Progress Bar */}
            <ProgressBar
                value={percentage}
                size="md"
                variant={percentage === 100 ? 'success' : 'default'}
                showLabel={false}
                className="mb-4"
            />

            {/* Stats Row */}
            <div className="grid grid-cols-3 gap-4 text-center">
                {/* Answered */}
                <div className="flex flex-col items-center">
                    <div className="flex items-center gap-1 mb-1">
                        <CheckCircle className="h-4 w-4 text-green-500" />
                        <span className="text-lg font-bold text-gray-900 dark:text-white">
                            {answeredCount}
                        </span>
                    </div>
                    <span className="text-xs text-gray-500">Answered</span>
                </div>

                {/* Skipped */}
                <div className="flex flex-col items-center">
                    <div className="flex items-center gap-1 mb-1">
                        <AlertCircle className="h-4 w-4 text-yellow-500" />
                        <span className="text-lg font-bold text-gray-900 dark:text-white">
                            {skippedCount}
                        </span>
                    </div>
                    <span className="text-xs text-gray-500">Skipped</span>
                </div>

                {/* Remaining */}
                <div className="flex flex-col items-center">
                    <div className="flex items-center gap-1 mb-1">
                        <Circle className="h-4 w-4 text-gray-400" />
                        <span className="text-lg font-bold text-gray-900 dark:text-white">
                            {unanswered}
                        </span>
                    </div>
                    <span className="text-xs text-gray-500">Remaining</span>
                </div>
            </div>
        </div>
    );
}

export default TestProgressBar;
