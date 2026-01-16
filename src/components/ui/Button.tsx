'use client';

import React, { forwardRef, ButtonHTMLAttributes } from 'react';
import { Loader2 } from 'lucide-react';
import { cn } from '@/lib/utils';

// Button variants using CVA-like approach
const buttonVariants = {
    variant: {
        primary: 'bg-blue-600 text-white hover:bg-blue-700 shadow-sm',
        secondary: 'bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-gray-100 hover:bg-gray-200 dark:hover:bg-gray-700',
        outline: 'border-2 border-blue-600 text-blue-600 bg-transparent hover:bg-blue-600 hover:text-white',
        ghost: 'text-gray-900 dark:text-gray-100 hover:bg-gray-100 dark:hover:bg-gray-800',
        danger: 'bg-red-500 text-white hover:bg-red-600',
        success: 'bg-green-500 text-white hover:bg-green-600',
        link: 'text-blue-600 underline-offset-4 hover:underline bg-transparent',
    },
    size: {
        xs: 'h-7 px-2 text-xs rounded',
        sm: 'h-8 px-3 text-sm rounded-md',
        md: 'h-10 px-4 text-sm rounded-lg',
        lg: 'h-11 px-6 text-base rounded-lg',
        xl: 'h-12 px-8 text-lg rounded-xl',
        icon: 'h-10 w-10 rounded-lg',
    },
};

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: keyof typeof buttonVariants.variant;
    size?: keyof typeof buttonVariants.size;
    isLoading?: boolean;
    loadingText?: string;
    leftIcon?: React.ReactNode;
    rightIcon?: React.ReactNode;
    fullWidth?: boolean;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
    (
        {
            className,
            variant = 'primary',
            size = 'md',
            isLoading = false,
            loadingText,
            leftIcon,
            rightIcon,
            fullWidth = false,
            disabled,
            children,
            ...props
        },
        ref
    ) => {
        const isDisabled = disabled || isLoading;

        return (
            <button
                ref={ref}
                disabled={isDisabled}
                className={cn(
                    // Base styles
                    'inline-flex items-center justify-center font-medium transition-all duration-200',
                    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2',
                    'disabled:opacity-50 disabled:cursor-not-allowed disabled:pointer-events-none',
                    'active:scale-[0.98]',
                    // Variant styles
                    buttonVariants.variant[variant],
                    // Size styles
                    buttonVariants.size[size],
                    // Full width
                    fullWidth && 'w-full',
                    // Custom className
                    className
                )}
                {...props}
            >
                {/* Loading spinner */}
                {isLoading && (
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                )}

                {/* Left icon */}
                {!isLoading && leftIcon && (
                    <span className="mr-2 inline-flex">{leftIcon}</span>
                )}

                {/* Button text */}
                {isLoading && loadingText ? loadingText : children}

                {/* Right icon */}
                {!isLoading && rightIcon && (
                    <span className="ml-2 inline-flex">{rightIcon}</span>
                )}
            </button>
        );
    }
);

Button.displayName = 'Button';

export { Button, buttonVariants };
