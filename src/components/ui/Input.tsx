'use client';

import React, { forwardRef, InputHTMLAttributes, useState } from 'react';
import { Eye, EyeOff, Search, X } from 'lucide-react';
import { cn } from '@/lib/utils';

const inputSizes = {
    sm: 'h-8 text-sm px-3',
    md: 'h-10 text-sm px-4',
    lg: 'h-12 text-base px-4',
};

export interface InputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'size'> {
    label?: string;
    error?: string;
    helperText?: string;
    leftIcon?: React.ReactNode;
    rightIcon?: React.ReactNode;
    leftAddon?: React.ReactNode;
    rightAddon?: React.ReactNode;
    inputSize?: keyof typeof inputSizes;
    fullWidth?: boolean;
    showClearButton?: boolean;
    onClear?: () => void;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
    (
        {
            className,
            type = 'text',
            label,
            error,
            helperText,
            leftIcon,
            rightIcon,
            leftAddon,
            rightAddon,
            inputSize = 'md',
            fullWidth = true,
            showClearButton = false,
            onClear,
            disabled,
            id,
            ...props
        },
        ref
    ) => {
        const [showPassword, setShowPassword] = useState(false);
        const [isFocused, setIsFocused] = useState(false);

        const inputId = id || `input-${Math.random().toString(36).substr(2, 9)}`;
        const isPasswordType = type === 'password';
        const isSearchType = type === 'search';
        const actualType = isPasswordType && showPassword ? 'text' : type;

        const hasValue = props.value !== undefined && props.value !== '';

        return (
            <div className={cn('flex flex-col gap-1.5', fullWidth && 'w-full')}>
                {/* Label */}
                {label && (
                    <label
                        htmlFor={inputId}
                        className={cn(
                            'text-sm font-medium transition-colors',
                            error ? 'text-red-500' : 'text-gray-900 dark:text-white',
                            disabled && 'opacity-50'
                        )}
                    >
                        {label}
                    </label>
                )}

                {/* Input wrapper */}
                <div className="relative flex items-center">
                    {/* Left addon */}
                    {leftAddon && (
                        <div className="flex items-center justify-center px-3 h-full bg-gray-100 dark:bg-gray-800 border border-r-0 border-gray-300 dark:border-gray-700 rounded-l-lg text-gray-500">
                            {leftAddon}
                        </div>
                    )}

                    {/* Input container */}
                    <div
                        className={cn(
                            'relative flex items-center flex-1',
                            'border rounded-lg transition-all duration-200',
                            'bg-white dark:bg-gray-900',
                            isFocused && !error && 'ring-2 ring-blue-500 border-blue-500',
                            error ? 'border-red-500 ring-1 ring-red-500' : 'border-gray-300 dark:border-gray-700',
                            disabled && 'opacity-50 cursor-not-allowed bg-gray-100 dark:bg-gray-800',
                            leftAddon && 'rounded-l-none',
                            rightAddon && 'rounded-r-none'
                        )}
                    >
                        {/* Left icon */}
                        {leftIcon && (
                            <div className="absolute left-3 flex items-center pointer-events-none text-gray-400">
                                {leftIcon}
                            </div>
                        )}

                        {/* Search icon for search type */}
                        {isSearchType && !leftIcon && (
                            <div className="absolute left-3 flex items-center pointer-events-none text-gray-400">
                                <Search className="h-4 w-4" />
                            </div>
                        )}

                        {/* Actual input */}
                        <input
                            ref={ref}
                            id={inputId}
                            type={actualType}
                            disabled={disabled}
                            className={cn(
                                'w-full bg-transparent outline-none',
                                'placeholder:text-gray-400 dark:placeholder:text-gray-500',
                                inputSizes[inputSize],
                                (leftIcon || isSearchType) && 'pl-10',
                                (rightIcon || isPasswordType || showClearButton) && 'pr-10',
                                disabled && 'cursor-not-allowed'
                            )}
                            onFocus={(e) => {
                                setIsFocused(true);
                                props.onFocus?.(e);
                            }}
                            onBlur={(e) => {
                                setIsFocused(false);
                                props.onBlur?.(e);
                            }}
                            {...props}
                        />

                        {/* Clear button for search */}
                        {showClearButton && hasValue && !disabled && (
                            <button
                                type="button"
                                onClick={onClear}
                                className="absolute right-3 flex items-center text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
                            >
                                <X className="h-4 w-4" />
                            </button>
                        )}

                        {/* Password toggle */}
                        {isPasswordType && !disabled && (
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute right-3 flex items-center text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
                            >
                                {showPassword ? (
                                    <EyeOff className="h-4 w-4" />
                                ) : (
                                    <Eye className="h-4 w-4" />
                                )}
                            </button>
                        )}

                        {/* Right icon (if not password or clear) */}
                        {rightIcon && !isPasswordType && !showClearButton && (
                            <div className="absolute right-3 flex items-center pointer-events-none text-gray-400">
                                {rightIcon}
                            </div>
                        )}
                    </div>

                    {/* Right addon */}
                    {rightAddon && (
                        <div className="flex items-center justify-center px-3 h-full bg-gray-100 dark:bg-gray-800 border border-l-0 border-gray-300 dark:border-gray-700 rounded-r-lg text-gray-500">
                            {rightAddon}
                        </div>
                    )}
                </div>

                {/* Error message */}
                {error && (
                    <p className="text-sm text-red-500 animate-slide-down">{error}</p>
                )}

                {/* Helper text */}
                {helperText && !error && (
                    <p className="text-sm text-gray-500 dark:text-gray-400">{helperText}</p>
                )}
            </div>
        );
    }
);

Input.displayName = 'Input';

export { Input, inputSizes };
