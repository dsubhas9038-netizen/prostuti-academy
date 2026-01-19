'use client';

import React, { forwardRef, SelectHTMLAttributes } from 'react';
import { ChevronDown } from 'lucide-react';

export interface SelectOption {
    value: string;
    label: string;
}

export interface SelectProps extends Omit<SelectHTMLAttributes<HTMLSelectElement>, 'size'> {
    label?: string;
    error?: string;
    helperText?: string;
    options: SelectOption[];
    size?: 'sm' | 'md' | 'lg';
}

export const Select = forwardRef<HTMLSelectElement, SelectProps>(
    (
        {
            label,
            error,
            helperText,
            options,
            size = 'md',
            className = '',
            disabled,
            ...props
        },
        ref
    ) => {
        const sizeClasses = {
            sm: 'h-8 text-sm px-3',
            md: 'h-10 text-base px-4',
            lg: 'h-12 text-lg px-5',
        };

        const baseClasses = `
            w-full appearance-none rounded-lg border transition-colors duration-200
            bg-white dark:bg-gray-800
            text-gray-900 dark:text-white
            focus:outline-none focus:ring-2 focus:ring-offset-0
            disabled:cursor-not-allowed disabled:opacity-50
            ${sizeClasses[size]}
            ${error
                ? 'border-red-500 focus:border-red-500 focus:ring-red-500/20'
                : 'border-gray-200 dark:border-gray-700 focus:border-blue-500 focus:ring-blue-500/20'
            }
        `;

        return (
            <div className={className}>
                {label && (
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
                        {label}
                    </label>
                )}
                <div className="relative">
                    <select
                        ref={ref}
                        disabled={disabled}
                        className={baseClasses}
                        {...props}
                    >
                        {options.map((option) => (
                            <option key={option.value} value={option.value}>
                                {option.label}
                            </option>
                        ))}
                    </select>
                    <ChevronDown
                        className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400 pointer-events-none"
                    />
                </div>
                {error && (
                    <p className="mt-1.5 text-sm text-red-500">{error}</p>
                )}
                {helperText && !error && (
                    <p className="mt-1.5 text-sm text-gray-500">{helperText}</p>
                )}
            </div>
        );
    }
);

Select.displayName = 'Select';
