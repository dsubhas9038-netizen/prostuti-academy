'use client';

import React, { forwardRef, HTMLAttributes } from 'react';
import { cn } from '@/lib/utils';

// Card variants
const cardVariants = {
    variant: {
        default: 'bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800',
        elevated: 'bg-white dark:bg-gray-900 shadow-lg',
        outline: 'bg-transparent border-2 border-gray-200 dark:border-gray-800',
        filled: 'bg-gray-100 dark:bg-gray-800 border-0',
        ghost: 'bg-transparent border-0',
    },
    padding: {
        none: 'p-0',
        sm: 'p-3',
        md: 'p-4',
        lg: 'p-6',
        xl: 'p-8',
    },
};

// Main Card Component
export interface CardProps extends HTMLAttributes<HTMLDivElement> {
    variant?: keyof typeof cardVariants.variant;
    padding?: keyof typeof cardVariants.padding;
    hoverable?: boolean;
    clickable?: boolean;
}

const Card = forwardRef<HTMLDivElement, CardProps>(
    (
        {
            className,
            variant = 'default',
            padding = 'md',
            hoverable = false,
            clickable = false,
            children,
            ...props
        },
        ref
    ) => {
        return (
            <div
                ref={ref}
                className={cn(
                    'rounded-xl transition-all duration-200',
                    cardVariants.variant[variant],
                    cardVariants.padding[padding],
                    hoverable && 'hover:shadow-md hover:border-blue-300 dark:hover:border-blue-700',
                    clickable && 'cursor-pointer hover:scale-[1.02] active:scale-[0.98]',
                    className
                )}
                {...props}
            >
                {children}
            </div>
        );
    }
);

Card.displayName = 'Card';

// Card Header
interface CardHeaderProps extends HTMLAttributes<HTMLDivElement> {
    title?: string;
    subtitle?: string;
    action?: React.ReactNode;
    icon?: React.ReactNode;
}

const CardHeader = forwardRef<HTMLDivElement, CardHeaderProps>(
    ({ className, title, subtitle, action, icon, children, ...props }, ref) => {
        return (
            <div
                ref={ref}
                className={cn('flex items-start justify-between mb-4', className)}
                {...props}
            >
                <div className="flex items-start gap-3 flex-1">
                    {icon && <div className="flex-shrink-0">{icon}</div>}
                    {(title || subtitle) ? (
                        <div className="flex-1">
                            {title && (
                                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{title}</h3>
                            )}
                            {subtitle && (
                                <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">{subtitle}</p>
                            )}
                        </div>
                    ) : (
                        <div className="flex-1">{children}</div>
                    )}
                </div>
                {action && <div className="ml-4">{action}</div>}
            </div>
        );
    }
);

CardHeader.displayName = 'CardHeader';

// Card Body
const CardBody = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(
    ({ className, children, ...props }, ref) => {
        return (
            <div ref={ref} className={cn('', className)} {...props}>
                {children}
            </div>
        );
    }
);

CardBody.displayName = 'CardBody';

// Card Footer
interface CardFooterProps extends HTMLAttributes<HTMLDivElement> {
    withBorder?: boolean;
}

const CardFooter = forwardRef<HTMLDivElement, CardFooterProps>(
    ({ className, withBorder = false, children, ...props }, ref) => {
        return (
            <div
                ref={ref}
                className={cn(
                    'mt-4 flex items-center',
                    withBorder && 'pt-4 border-t border-gray-200 dark:border-gray-800',
                    className
                )}
                {...props}
            >
                {children}
            </div>
        );
    }
);

CardFooter.displayName = 'CardFooter';

export { Card, CardHeader, CardBody, CardFooter, cardVariants };
