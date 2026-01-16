'use client';

import React from 'react';
import { cn } from '@/lib/utils';

interface ProgressBarProps {
    value: number;
    max?: number;
    size?: 'sm' | 'md' | 'lg';
    variant?: 'default' | 'success' | 'warning' | 'error' | 'gradient';
    showLabel?: boolean;
    labelPosition?: 'inside' | 'outside';
    animated?: boolean;
    className?: string;
}

const sizeClasses = {
    sm: 'h-1.5',
    md: 'h-2.5',
    lg: 'h-4',
};

const variantClasses = {
    default: 'bg-blue-600',
    success: 'bg-green-500',
    warning: 'bg-yellow-500',
    error: 'bg-red-500',
    gradient: 'bg-gradient-to-r from-blue-600 via-purple-500 to-pink-500',
};

function ProgressBar({
    value,
    max = 100,
    size = 'md',
    variant = 'default',
    showLabel = false,
    labelPosition = 'outside',
    animated = false,
    className,
}: ProgressBarProps) {
    const percentage = Math.min(Math.max((value / max) * 100, 0), 100);

    return (
        <div className={cn('w-full', className)}>
            {/* Outside label - top */}
            {showLabel && labelPosition === 'outside' && (
                <div className="flex justify-between items-center mb-1">
                    <span className="text-sm text-gray-500 dark:text-gray-400">Progress</span>
                    <span className="text-sm font-medium text-gray-900 dark:text-white">
                        {Math.round(percentage)}%
                    </span>
                </div>
            )}

            {/* Progress bar track */}
            <div
                className={cn(
                    'w-full bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden',
                    sizeClasses[size]
                )}
                role="progressbar"
                aria-valuenow={value}
                aria-valuemin={0}
                aria-valuemax={max}
            >
                {/* Progress bar fill */}
                <div
                    className={cn(
                        'h-full rounded-full transition-all duration-500 ease-out',
                        variantClasses[variant],
                        animated && 'animate-pulse'
                    )}
                    style={{ width: `${percentage}%` }}
                >
                    {/* Inside label */}
                    {showLabel && labelPosition === 'inside' && size === 'lg' && (
                        <span className="flex items-center justify-center h-full text-xs font-medium text-white">
                            {Math.round(percentage)}%
                        </span>
                    )}
                </div>
            </div>
        </div>
    );
}

// Circular Progress Component
interface CircularProgressProps {
    value: number;
    max?: number;
    size?: number;
    strokeWidth?: number;
    showLabel?: boolean;
    variant?: 'default' | 'success' | 'warning' | 'error';
    className?: string;
}

function CircularProgress({
    value,
    max = 100,
    size = 80,
    strokeWidth = 8,
    showLabel = true,
    variant = 'default',
    className,
}: CircularProgressProps) {
    const percentage = Math.min(Math.max((value / max) * 100, 0), 100);
    const radius = (size - strokeWidth) / 2;
    const circumference = radius * 2 * Math.PI;
    const offset = circumference - (percentage / 100) * circumference;

    const strokeColors = {
        default: 'stroke-blue-600',
        success: 'stroke-green-500',
        warning: 'stroke-yellow-500',
        error: 'stroke-red-500',
    };

    return (
        <div className={cn('relative inline-flex', className)}>
            <svg
                width={size}
                height={size}
                className="transform -rotate-90"
            >
                {/* Background circle */}
                <circle
                    cx={size / 2}
                    cy={size / 2}
                    r={radius}
                    fill="none"
                    strokeWidth={strokeWidth}
                    className="stroke-gray-200 dark:stroke-gray-700"
                />
                {/* Progress circle */}
                <circle
                    cx={size / 2}
                    cy={size / 2}
                    r={radius}
                    fill="none"
                    strokeWidth={strokeWidth}
                    strokeLinecap="round"
                    className={cn(
                        'transition-all duration-500 ease-out',
                        strokeColors[variant]
                    )}
                    style={{
                        strokeDasharray: circumference,
                        strokeDashoffset: offset,
                    }}
                />
            </svg>

            {showLabel && (
                <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-sm font-semibold text-gray-900 dark:text-white">
                        {Math.round(percentage)}%
                    </span>
                </div>
            )}
        </div>
    );
}

export { ProgressBar, CircularProgress };
