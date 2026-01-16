'use client';

import React from 'react';
import { PDFCategory, pdfCategoryConfig } from '@/types';
import { cn } from '@/lib/utils';

interface PDFCategoryFilterProps {
    categories: PDFCategory[];
    selectedCategory: PDFCategory | 'all';
    onCategoryChange: (category: PDFCategory | 'all') => void;
    counts?: Record<PDFCategory, number>;
    showCounts?: boolean;
    variant?: 'pills' | 'tabs';
    className?: string;
}

function PDFCategoryFilter({
    categories,
    selectedCategory,
    onCategoryChange,
    counts,
    showCounts = true,
    variant = 'pills',
    className,
}: PDFCategoryFilterProps) {

    // Pills variant
    if (variant === 'pills') {
        return (
            <div className={cn('flex items-center gap-2 flex-wrap', className)}>
                {/* All Button */}
                <button
                    onClick={() => onCategoryChange('all')}
                    className={cn(
                        'px-4 py-2 rounded-xl text-sm font-medium transition-all flex items-center gap-2',
                        selectedCategory === 'all'
                            ? 'bg-blue-500 text-white shadow-md'
                            : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700'
                    )}
                >
                    📁 All
                    {showCounts && counts && (
                        <span className={cn(
                            'text-xs px-1.5 py-0.5 rounded-full',
                            selectedCategory === 'all'
                                ? 'bg-white/20'
                                : 'bg-gray-200 dark:bg-gray-700'
                        )}>
                            {Object.values(counts).reduce((a, b) => a + b, 0)}
                        </span>
                    )}
                </button>

                {/* Category Buttons */}
                {categories.map((category) => {
                    const config = pdfCategoryConfig[category];
                    const isSelected = selectedCategory === category;

                    return (
                        <button
                            key={category}
                            onClick={() => onCategoryChange(category)}
                            className={cn(
                                'px-4 py-2 rounded-xl text-sm font-medium transition-all flex items-center gap-2',
                                isSelected
                                    ? 'text-white shadow-md'
                                    : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700'
                            )}
                            style={isSelected ? { backgroundColor: config.color } : {}}
                        >
                            {config.icon} {config.labelBn}
                            {showCounts && counts?.[category] !== undefined && (
                                <span className={cn(
                                    'text-xs px-1.5 py-0.5 rounded-full',
                                    isSelected
                                        ? 'bg-white/20'
                                        : 'bg-gray-200 dark:bg-gray-700'
                                )}>
                                    {counts[category]}
                                </span>
                            )}
                        </button>
                    );
                })}
            </div>
        );
    }

    // Tabs variant
    return (
        <div className={cn('border-b border-gray-200 dark:border-gray-700', className)}>
            <div className="flex items-center gap-1 overflow-x-auto pb-px">
                {/* All Tab */}
                <button
                    onClick={() => onCategoryChange('all')}
                    className={cn(
                        'px-4 py-3 text-sm font-medium border-b-2 transition-all whitespace-nowrap',
                        selectedCategory === 'all'
                            ? 'border-blue-500 text-blue-600'
                            : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                    )}
                >
                    All Resources
                    {showCounts && counts && (
                        <span className="ml-2 text-xs bg-gray-100 dark:bg-gray-800 px-1.5 py-0.5 rounded">
                            {Object.values(counts).reduce((a, b) => a + b, 0)}
                        </span>
                    )}
                </button>

                {/* Category Tabs */}
                {categories.map((category) => {
                    const config = pdfCategoryConfig[category];
                    const isSelected = selectedCategory === category;

                    return (
                        <button
                            key={category}
                            onClick={() => onCategoryChange(category)}
                            className={cn(
                                'px-4 py-3 text-sm font-medium border-b-2 transition-all whitespace-nowrap flex items-center gap-2',
                                isSelected
                                    ? 'text-gray-900 dark:text-white'
                                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                            )}
                            style={isSelected ? { borderColor: config.color, color: config.color } : {}}
                        >
                            {config.icon} {config.labelBn}
                            {showCounts && counts?.[category] !== undefined && (
                                <span className={cn(
                                    'text-xs px-1.5 py-0.5 rounded',
                                    isSelected
                                        ? config.bg
                                        : 'bg-gray-100 dark:bg-gray-800'
                                )}>
                                    {counts[category]}
                                </span>
                            )}
                        </button>
                    );
                })}
            </div>
        </div>
    );
}

export default PDFCategoryFilter;
