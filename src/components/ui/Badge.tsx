'use client';

import React, { HTMLAttributes } from 'react';
import { cn } from '@/lib/utils';

const badgeVariants = {
    variant: {
        default: 'bg-blue-100 text-blue-700 border-blue-200 dark:bg-blue-900/30 dark:text-blue-400 dark:border-blue-800',
        primary: 'bg-blue-600 text-white border-blue-700 dark:bg-blue-700 dark:text-white dark:border-blue-600',
        secondary: 'bg-gray-100 text-gray-700 border-gray-200 dark:bg-gray-800 dark:text-gray-300 dark:border-gray-700',
        success: 'bg-green-100 text-green-700 border-green-200 dark:bg-green-900/30 dark:text-green-400 dark:border-green-800',
        warning: 'bg-yellow-100 text-yellow-700 border-yellow-200 dark:bg-yellow-900/30 dark:text-yellow-400 dark:border-yellow-800',
        error: 'bg-red-100 text-red-700 border-red-200 dark:bg-red-900/30 dark:text-red-400 dark:border-red-800',
        danger: 'bg-red-100 text-red-700 border-red-200 dark:bg-red-900/30 dark:text-red-400 dark:border-red-800',
        info: 'bg-sky-100 text-sky-700 border-sky-200 dark:bg-sky-900/30 dark:text-sky-400 dark:border-sky-800',
        purple: 'bg-purple-100 text-purple-700 border-purple-200 dark:bg-purple-900/30 dark:text-purple-400 dark:border-purple-800',
        outline: 'bg-transparent border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300',
    },
    size: {
        sm: 'text-xs px-2 py-0.5',
        md: 'text-xs px-2.5 py-1',
        lg: 'text-sm px-3 py-1',
    },
};

export interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
    variant?: keyof typeof badgeVariants.variant;
    size?: keyof typeof badgeVariants.size;
    dot?: boolean;
    dotColor?: string;
    removable?: boolean;
    onRemove?: () => void;
}

function Badge({
    className,
    variant = 'default',
    size = 'md',
    dot = false,
    dotColor,
    removable = false,
    onRemove,
    children,
    ...props
}: BadgeProps) {
    return (
        <span
            className={cn(
                'inline-flex items-center gap-1.5 font-medium border rounded-full',
                'transition-colors duration-200',
                badgeVariants.variant[variant],
                badgeVariants.size[size],
                className
            )}
            {...props}
        >
            {/* Dot indicator */}
            {dot && (
                <span
                    className={cn(
                        'w-1.5 h-1.5 rounded-full',
                        dotColor || 'bg-current'
                    )}
                />
            )}

            {children}

            {/* Remove button */}
            {removable && (
                <button
                    type="button"
                    onClick={(e) => {
                        e.stopPropagation();
                        onRemove?.();
                    }}
                    className="ml-0.5 hover:bg-black/10 dark:hover:bg-white/10 rounded-full p-0.5 transition-colors"
                >
                    <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </button>
            )}
        </span>
    );
}

export { Badge, badgeVariants };
