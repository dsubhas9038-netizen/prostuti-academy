'use client';

import React, { forwardRef, TextareaHTMLAttributes, useState } from 'react';
import { cn } from '@/lib/utils';

export interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
    label?: string;
    error?: string;
    helperText?: string;
    showCharCount?: boolean;
    maxLength?: number;
    fullWidth?: boolean;
}

const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
    (
        {
            className,
            label,
            error,
            helperText,
            showCharCount = false,
            maxLength,
            fullWidth = true,
            disabled,
            id,
            value,
            onChange,
            ...props
        },
        ref
    ) => {
        const [charCount, setCharCount] = useState(
            typeof value === 'string' ? value.length : 0
        );
        const [isFocused, setIsFocused] = useState(false);

        const inputId = id || `textarea-${Math.random().toString(36).substr(2, 9)}`;

        const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
            setCharCount(e.target.value.length);
            onChange?.(e);
        };

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

                {/* Textarea */}
                <textarea
                    ref={ref}
                    id={inputId}
                    disabled={disabled}
                    maxLength={maxLength}
                    value={value}
                    onChange={handleChange}
                    onFocus={() => setIsFocused(true)}
                    onBlur={() => setIsFocused(false)}
                    className={cn(
                        'w-full min-h-[100px] px-4 py-3 rounded-lg',
                        'bg-white dark:bg-gray-900 border transition-all duration-200',
                        'placeholder:text-gray-400 dark:placeholder:text-gray-500',
                        'resize-y',
                        isFocused && !error && 'ring-2 ring-blue-500 border-blue-500',
                        error ? 'border-red-500 ring-1 ring-red-500' : 'border-gray-300 dark:border-gray-700',
                        disabled && 'opacity-50 cursor-not-allowed bg-gray-100 dark:bg-gray-800',
                        className
                    )}
                    {...props}
                />

                {/* Footer with char count and helper/error text */}
                <div className="flex items-center justify-between">
                    <div>
                        {error && (
                            <p className="text-sm text-red-500 animate-slide-down">{error}</p>
                        )}
                        {helperText && !error && (
                            <p className="text-sm text-gray-500 dark:text-gray-400">{helperText}</p>
                        )}
                    </div>

                    {showCharCount && (
                        <p className={cn(
                            'text-xs',
                            maxLength && charCount >= maxLength ? 'text-red-500' : 'text-gray-500 dark:text-gray-400'
                        )}>
                            {charCount}{maxLength ? `/${maxLength}` : ''}
                        </p>
                    )}
                </div>
            </div>
        );
    }
);

Textarea.displayName = 'Textarea';

export { Textarea };
