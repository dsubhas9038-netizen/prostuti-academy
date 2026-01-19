'use client';

import React, { forwardRef, InputHTMLAttributes } from 'react';
import { Check } from 'lucide-react';

export interface CheckboxProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type' | 'size'> {
    label?: string;
    error?: string;
    size?: 'sm' | 'md' | 'lg';
}

export const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(
    (
        {
            label,
            error,
            size = 'md',
            className = '',
            disabled,
            checked,
            ...props
        },
        ref
    ) => {
        const sizeClasses = {
            sm: 'h-4 w-4',
            md: 'h-5 w-5',
            lg: 'h-6 w-6',
        };

        const labelSizeClasses = {
            sm: 'text-sm',
            md: 'text-base',
            lg: 'text-lg',
        };

        return (
            <div className={className}>
                <label className={`inline-flex items-center gap-2 cursor-pointer ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`}>
                    <div className="relative">
                        <input
                            ref={ref}
                            type="checkbox"
                            disabled={disabled}
                            checked={checked}
                            className={`
                                ${sizeClasses[size]}
                                appearance-none rounded border-2 transition-colors duration-200
                                border-gray-300 dark:border-gray-600
                                bg-white dark:bg-gray-800
                                checked:bg-blue-500 checked:border-blue-500
                                focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:ring-offset-0
                                disabled:cursor-not-allowed
                                cursor-pointer
                            `}
                            {...props}
                        />
                        {checked && (
                            <Check
                                className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-white pointer-events-none ${size === 'sm' ? 'h-3 w-3' : size === 'lg' ? 'h-4 w-4' : 'h-3.5 w-3.5'
                                    }`}
                            />
                        )}
                    </div>
                    {label && (
                        <span className={`${labelSizeClasses[size]} text-gray-700 dark:text-gray-300`}>
                            {label}
                        </span>
                    )}
                </label>
                {error && (
                    <p className="mt-1 text-sm text-red-500">{error}</p>
                )}
            </div>
        );
    }
);

Checkbox.displayName = 'Checkbox';
