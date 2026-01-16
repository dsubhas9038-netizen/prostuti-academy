'use client';

import React from 'react';
import { FileText, Check, AlertTriangle, AlertCircle } from 'lucide-react';
import { WordCount, defaultWordCounts, QuestionType } from '@/types';
import { ProgressBar } from '@/components/ui';
import { cn } from '@/lib/utils';

interface WordCountIndicatorProps {
    wordCount: WordCount;
    questionType?: QuestionType;
    showLabel?: boolean;
    size?: 'sm' | 'md' | 'lg';
    className?: string;
}

function WordCountIndicator({
    wordCount,
    questionType = 'saq',
    showLabel = true,
    size = 'md',
    className,
}: WordCountIndicatorProps) {
    const { actual, min, max } = wordCount;

    // Skip for MCQ
    if (questionType === 'mcq' || (min === 0 && max === 0)) {
        return null;
    }

    // Calculate percentage and status
    const getStatus = () => {
        if (actual >= min && actual <= max) {
            return {
                status: 'optimal',
                color: 'text-green-600',
                bgColor: 'bg-green-100 dark:bg-green-900/30',
                icon: Check,
                label: 'Perfect Length!',
                labelBn: 'সঠিক দৈর্ঘ্য!',
                variant: 'success' as const,
            };
        }
        if (actual >= min * 0.8 && actual < min) {
            return {
                status: 'slightly-short',
                color: 'text-yellow-600',
                bgColor: 'bg-yellow-100 dark:bg-yellow-900/30',
                icon: AlertTriangle,
                label: 'Slightly Short',
                labelBn: 'একটু কম',
                variant: 'warning' as const,
            };
        }
        if (actual < min * 0.8) {
            return {
                status: 'too-short',
                color: 'text-red-600',
                bgColor: 'bg-red-100 dark:bg-red-900/30',
                icon: AlertCircle,
                label: 'Too Short',
                labelBn: 'অনেক কম',
                variant: 'error' as const,
            };
        }
        return {
            status: 'too-long',
            color: 'text-orange-600',
            bgColor: 'bg-orange-100 dark:bg-orange-900/30',
            icon: AlertTriangle,
            label: 'Too Long',
            labelBn: 'অনেক বেশি',
            variant: 'warning' as const,
        };
    };

    const statusInfo = getStatus();
    const percentage = Math.min((actual / max) * 100, 100);

    // Size classes
    const sizeClasses = {
        sm: 'text-xs p-2',
        md: 'text-sm p-3',
        lg: 'text-base p-4',
    };

    const iconSizes = {
        sm: 'h-3.5 w-3.5',
        md: 'h-4 w-4',
        lg: 'h-5 w-5',
    };

    return (
        <div className={cn('rounded-lg', statusInfo.bgColor, sizeClasses[size], className)}>
            {/* Header */}
            <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                    <FileText className={cn(iconSizes[size], statusInfo.color)} />
                    <span className="font-medium text-gray-900 dark:text-white">
                        Word Count
                    </span>
                </div>
                <div className={cn('flex items-center gap-1', statusInfo.color)}>
                    <statusInfo.icon className={iconSizes[size]} />
                    <span className="font-medium">{statusInfo.labelBn}</span>
                </div>
            </div>

            {/* Stats */}
            <div className="flex items-center justify-between mb-2">
                <span className="text-gray-600 dark:text-gray-400">
                    Actual: <span className="font-bold text-gray-900 dark:text-white">{actual}</span> words
                </span>
                <span className="text-gray-500">
                    Target: {min}-{max}
                </span>
            </div>

            {/* Progress Bar */}
            <ProgressBar
                value={percentage}
                size={size === 'lg' ? 'md' : 'sm'}
                variant={statusInfo.variant}
                showLabel={false}
            />

            {/* Tip */}
            {showLabel && statusInfo.status !== 'optimal' && (
                <p className={cn('mt-2 text-xs', statusInfo.color)}>
                    {statusInfo.status === 'too-short' && (
                        <>আরও {min - actual} words যোগ করো</>
                    )}
                    {statusInfo.status === 'slightly-short' && (
                        <>আরও {min - actual} words যোগ করলে ভালো হবে</>
                    )}
                    {statusInfo.status === 'too-long' && (
                        <>{actual - max} words কমাও</>
                    )}
                </p>
            )}
        </div>
    );
}

export default WordCountIndicator;
