'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { Search, X, Loader2 } from 'lucide-react';
import { Input } from '@/components/ui';
import { cn } from '@/lib/utils';

interface QuestionSearchProps {
    value: string;
    onChange: (value: string) => void;
    resultCount?: number;
    placeholder?: string;
    debounceMs?: number;
    className?: string;
}

function QuestionSearch({
    value,
    onChange,
    resultCount,
    placeholder = 'Search questions...',
    debounceMs = 300,
    className,
}: QuestionSearchProps) {
    const [localValue, setLocalValue] = useState(value);
    const [isSearching, setIsSearching] = useState(false);

    // Debounced search
    useEffect(() => {
        setIsSearching(true);
        const timer = setTimeout(() => {
            onChange(localValue);
            setIsSearching(false);
        }, debounceMs);

        return () => clearTimeout(timer);
    }, [localValue, debounceMs, onChange]);

    // Sync with external value
    useEffect(() => {
        setLocalValue(value);
    }, [value]);

    // Clear search
    const handleClear = useCallback(() => {
        setLocalValue('');
        onChange('');
    }, [onChange]);

    return (
        <div className={cn('relative', className)}>
            {/* Search Icon */}
            <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                {isSearching ? (
                    <Loader2 className="h-5 w-5 animate-spin" />
                ) : (
                    <Search className="h-5 w-5" />
                )}
            </div>

            {/* Input */}
            <input
                type="text"
                value={localValue}
                onChange={(e) => setLocalValue(e.target.value)}
                placeholder={placeholder}
                className={cn(
                    'w-full pl-10 pr-10 py-3 rounded-xl',
                    'bg-gray-100 dark:bg-gray-800',
                    'border-2 border-transparent',
                    'focus:border-blue-500 focus:bg-white dark:focus:bg-gray-900',
                    'outline-none transition-all',
                    'text-gray-900 dark:text-white',
                    'placeholder:text-gray-400'
                )}
            />

            {/* Clear Button / Result Count */}
            <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-2">
                {resultCount !== undefined && localValue && (
                    <span className="text-xs text-gray-500 px-2 py-0.5 bg-gray-200 dark:bg-gray-700 rounded-full">
                        {resultCount} found
                    </span>
                )}
                {localValue && (
                    <button
                        onClick={handleClear}
                        className="p-1 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-full transition-colors"
                    >
                        <X className="h-4 w-4 text-gray-400" />
                    </button>
                )}
            </div>
        </div>
    );
}

export default QuestionSearch;
