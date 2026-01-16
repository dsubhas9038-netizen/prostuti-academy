'use client';

import React from 'react';
import { Loader2 } from 'lucide-react';
import { cn } from '@/lib/utils';

interface LoadingSpinnerProps {
    size?: 'sm' | 'md' | 'lg' | 'xl';
    text?: string;
    fullScreen?: boolean;
    className?: string;
}

const sizeClasses = {
    sm: 'h-4 w-4',
    md: 'h-6 w-6',
    lg: 'h-8 w-8',
    xl: 'h-12 w-12',
};

function LoadingSpinner({
    size = 'md',
    text,
    fullScreen = false,
    className,
}: LoadingSpinnerProps) {
    const spinner = (
        <div className={cn('flex flex-col items-center justify-center gap-3', className)}>
            <Loader2 className={cn('animate-spin text-blue-600', sizeClasses[size])} />
            {text && <p className="text-sm text-gray-500 dark:text-gray-400">{text}</p>}
        </div>
    );

    if (fullScreen) {
        return (
            <div className="fixed inset-0 flex items-center justify-center bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm z-50">
                {spinner}
            </div>
        );
    }

    return spinner;
}

// Page Loading Component
function PageLoading({ message = 'Loading...' }: { message?: string }) {
    return (
        <div className="min-h-[50vh] flex items-center justify-center">
            <LoadingSpinner size="lg" text={message} />
        </div>
    );
}

// Inline Loading Component
function InlineLoading({ text = 'Loading...' }: { text?: string }) {
    return (
        <div className="flex items-center gap-2 text-gray-500 dark:text-gray-400">
            <Loader2 className="h-4 w-4 animate-spin" />
            <span className="text-sm">{text}</span>
        </div>
    );
}

export { LoadingSpinner, PageLoading, InlineLoading };
