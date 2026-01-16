'use client';

import React from 'react';
import { Languages } from 'lucide-react';
import { cn } from '@/lib/utils';

interface LanguageToggleProps {
    currentLanguage: 'bn' | 'en';
    onToggle: (lang: 'bn' | 'en') => void;
    variant?: 'icon' | 'text' | 'full';
    className?: string;
}

function LanguageToggle({
    currentLanguage,
    onToggle,
    variant = 'full',
    className,
}: LanguageToggleProps) {
    const toggleLanguage = () => {
        onToggle(currentLanguage === 'bn' ? 'en' : 'bn');
    };

    if (variant === 'icon') {
        return (
            <button
                onClick={toggleLanguage}
                className={cn(
                    'p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors',
                    'text-gray-500 hover:text-gray-900 dark:hover:text-white',
                    className
                )}
                title={currentLanguage === 'bn' ? 'Switch to English' : 'বাংলায় পড়ুন'}
            >
                <Languages className="h-5 w-5" />
            </button>
        );
    }

    if (variant === 'text') {
        return (
            <button
                onClick={toggleLanguage}
                className={cn(
                    'px-3 py-1.5 rounded-lg text-sm font-medium',
                    'hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors',
                    'text-gray-500 hover:text-gray-900 dark:hover:text-white',
                    className
                )}
            >
                {currentLanguage === 'bn' ? 'EN' : 'বাং'}
            </button>
        );
    }

    return (
        <div className={cn('flex items-center gap-1 p-1 bg-gray-100 dark:bg-gray-800 rounded-lg', className)}>
            <button
                onClick={() => onToggle('bn')}
                className={cn(
                    'px-3 py-1.5 rounded-md text-sm font-medium transition-all',
                    currentLanguage === 'bn'
                        ? 'bg-white dark:bg-gray-900 text-gray-900 dark:text-white shadow-sm'
                        : 'text-gray-500 hover:text-gray-900 dark:hover:text-white'
                )}
            >
                বাংলা
            </button>
            <button
                onClick={() => onToggle('en')}
                className={cn(
                    'px-3 py-1.5 rounded-md text-sm font-medium transition-all',
                    currentLanguage === 'en'
                        ? 'bg-white dark:bg-gray-900 text-gray-900 dark:text-white shadow-sm'
                        : 'text-gray-500 hover:text-gray-900 dark:hover:text-white'
                )}
            >
                English
            </button>
        </div>
    );
}

export default LanguageToggle;
