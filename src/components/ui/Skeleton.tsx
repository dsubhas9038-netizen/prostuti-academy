'use client';

import React from 'react';
import { cn } from '@/lib/utils';

// Basic Skeleton Component
interface SkeletonProps extends React.HTMLAttributes<HTMLDivElement> {
    variant?: 'rectangular' | 'circular' | 'text';
    width?: string | number;
    height?: string | number;
    animation?: 'pulse' | 'none';
}

function Skeleton({
    className,
    variant = 'rectangular',
    width,
    height,
    animation = 'pulse',
    style,
    ...props
}: SkeletonProps) {
    const animationClasses = {
        pulse: 'animate-pulse',
        none: '',
    };

    const variantClasses = {
        rectangular: 'rounded-lg',
        circular: 'rounded-full',
        text: 'rounded h-4',
    };

    return (
        <div
            className={cn(
                'bg-gray-200 dark:bg-gray-700',
                animationClasses[animation],
                variantClasses[variant],
                className
            )}
            style={{
                width: typeof width === 'number' ? `${width}px` : width,
                height: typeof height === 'number' ? `${height}px` : height,
                ...style,
            }}
            {...props}
        />
    );
}

// Card Skeleton
function CardSkeleton({ className }: { className?: string }) {
    return (
        <div className={cn('bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl p-4', className)}>
            <div className="flex items-start gap-4">
                <Skeleton variant="circular" width={48} height={48} />
                <div className="flex-1 space-y-2">
                    <Skeleton height={20} width="60%" />
                    <Skeleton height={16} width="40%" />
                </div>
            </div>
            <div className="mt-4 space-y-2">
                <Skeleton height={16} />
                <Skeleton height={16} width="80%" />
            </div>
        </div>
    );
}

// List Skeleton
function ListSkeleton({
    count = 5,
    className
}: {
    count?: number;
    className?: string;
}) {
    return (
        <div className={cn('space-y-3', className)}>
            {Array.from({ length: count }).map((_, i) => (
                <div key={i} className="flex items-center gap-3">
                    <Skeleton variant="circular" width={40} height={40} />
                    <div className="flex-1 space-y-2">
                        <Skeleton height={16} width={`${60 + Math.random() * 30}%`} />
                        <Skeleton height={12} width={`${40 + Math.random() * 20}%`} />
                    </div>
                </div>
            ))}
        </div>
    );
}

// Question Card Skeleton (specific to our app)
function QuestionCardSkeleton({ className }: { className?: string }) {
    return (
        <div className={cn('bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl p-4', className)}>
            <div className="flex items-center justify-between mb-3">
                <Skeleton height={24} width={80} className="rounded-full" />
                <Skeleton height={20} width={60} />
            </div>
            <div className="space-y-2 mb-4">
                <Skeleton height={18} />
                <Skeleton height={18} width="90%" />
            </div>
            <div className="flex items-center gap-2">
                <Skeleton height={28} width={100} className="rounded-full" />
                <Skeleton height={28} width={80} className="rounded-full" />
            </div>
        </div>
    );
}

// Subject Card Skeleton
function SubjectCardSkeleton({ className }: { className?: string }) {
    return (
        <div className={cn('bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl p-4', className)}>
            <div className="flex items-center gap-3 mb-4">
                <Skeleton width={48} height={48} className="rounded-xl" />
                <div className="flex-1">
                    <Skeleton height={20} width="70%" />
                    <Skeleton height={14} width="50%" className="mt-2" />
                </div>
            </div>
            <Skeleton height={8} className="rounded-full" />
            <div className="flex justify-between mt-2">
                <Skeleton height={12} width={60} />
                <Skeleton height={12} width={40} />
            </div>
        </div>
    );
}

export {
    Skeleton,
    CardSkeleton,
    ListSkeleton,
    QuestionCardSkeleton,
    SubjectCardSkeleton
};
