'use client';

import React, { useState, useRef, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Search, X, Clock, TrendingUp, ArrowRight } from 'lucide-react';
import { cn } from '@/lib/utils';

interface SearchBarProps {
    placeholder?: string;
    className?: string;
    variant?: 'default' | 'header' | 'page';
    onSearch?: (query: string) => void;
    autoFocus?: boolean;
}

// Sample recent searches (will be replaced with localStorage data)
const recentSearches = [
    'পথের দাবী',
    'স্বাধীনতা আন্দোলন',
    'English Grammar',
];

// Sample trending searches
const trendingSearches = [
    'Bengali Chapter 1',
    'History Important Questions',
    'Geography Map',
];

function SearchBar({
    placeholder = 'Search questions, chapters, subjects...',
    className,
    variant = 'default',
    onSearch,
    autoFocus = false,
}: SearchBarProps) {
    const router = useRouter();
    const [query, setQuery] = useState('');
    const [isFocused, setIsFocused] = useState(false);
    const [isOpen, setIsOpen] = useState(false);
    const inputRef = useRef<HTMLInputElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);

    // Handle click outside to close dropdown
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    // Handle search submission
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (query.trim()) {
            onSearch?.(query);
            router.push(`/search?q=${encodeURIComponent(query)}`);
            setIsOpen(false);
        }
    };

    // Handle search item click
    const handleSearchItemClick = (searchTerm: string) => {
        setQuery(searchTerm);
        router.push(`/search?q=${encodeURIComponent(searchTerm)}`);
        setIsOpen(false);
    };

    // Clear search
    const handleClear = () => {
        setQuery('');
        inputRef.current?.focus();
    };

    const variantStyles = {
        default: 'w-full max-w-xl',
        header: 'w-full md:w-80 lg:w-96',
        page: 'w-full max-w-2xl',
    };

    return (
        <div ref={containerRef} className={cn('relative', variantStyles[variant], className)}>
            <form onSubmit={handleSubmit}>
                <div
                    className={cn(
                        'relative flex items-center',
                        'bg-gray-100 dark:bg-gray-800 rounded-xl',
                        'border-2 transition-all duration-200',
                        isFocused ? 'border-blue-600 shadow-lg shadow-blue-500/10' : 'border-transparent',
                        variant === 'page' && 'bg-white dark:bg-gray-900'
                    )}
                >
                    {/* Search Icon */}
                    <div className="absolute left-3 flex items-center pointer-events-none">
                        <Search className={cn(
                            'h-5 w-5 transition-colors',
                            isFocused ? 'text-blue-600' : 'text-gray-400'
                        )} />
                    </div>

                    {/* Input */}
                    <input
                        ref={inputRef}
                        type="text"
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        onFocus={() => {
                            setIsFocused(true);
                            setIsOpen(true);
                        }}
                        onBlur={() => setIsFocused(false)}
                        placeholder={placeholder}
                        autoFocus={autoFocus}
                        className={cn(
                            'w-full bg-transparent py-3 pl-11 pr-10',
                            'text-gray-900 dark:text-white placeholder:text-gray-400',
                            'focus:outline-none',
                            variant === 'page' && 'py-4 text-lg'
                        )}
                    />

                    {/* Clear Button */}
                    {query && (
                        <button
                            type="button"
                            onClick={handleClear}
                            className="absolute right-3 p-1 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
                        >
                            <X className="h-4 w-4 text-gray-400" />
                        </button>
                    )}
                </div>
            </form>

            {/* Search Dropdown */}
            {isOpen && !query && (
                <div className={cn(
                    'absolute top-full left-0 right-0 mt-2 z-50',
                    'bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl shadow-xl',
                    'py-3 animate-slide-down'
                )}>
                    {/* Recent Searches */}
                    {recentSearches.length > 0 && (
                        <div className="mb-4">
                            <div className="flex items-center gap-2 px-4 mb-2">
                                <Clock className="h-4 w-4 text-gray-400" />
                                <span className="text-xs font-medium text-gray-400 uppercase tracking-wide">
                                    Recent Searches
                                </span>
                            </div>
                            <div className="space-y-1">
                                {recentSearches.map((search, index) => (
                                    <button
                                        key={index}
                                        onClick={() => handleSearchItemClick(search)}
                                        className="w-full flex items-center justify-between px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors text-left"
                                    >
                                        <span className="text-sm text-gray-900 dark:text-white">{search}</span>
                                        <ArrowRight className="h-4 w-4 text-gray-400" />
                                    </button>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Trending Searches */}
                    <div>
                        <div className="flex items-center gap-2 px-4 mb-2">
                            <TrendingUp className="h-4 w-4 text-gray-400" />
                            <span className="text-xs font-medium text-gray-400 uppercase tracking-wide">
                                Trending
                            </span>
                        </div>
                        <div className="space-y-1">
                            {trendingSearches.map((search, index) => (
                                <button
                                    key={index}
                                    onClick={() => handleSearchItemClick(search)}
                                    className="w-full flex items-center justify-between px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors text-left"
                                >
                                    <span className="text-sm text-gray-900 dark:text-white">{search}</span>
                                    <ArrowRight className="h-4 w-4 text-gray-400" />
                                </button>
                            ))}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default SearchBar;
