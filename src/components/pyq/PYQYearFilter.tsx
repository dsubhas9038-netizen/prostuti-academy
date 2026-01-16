'use client';

import React from 'react';
import { Calendar, Check } from 'lucide-react';
import { yearColors } from '@/types/pyq';
import { cn } from '@/lib/utils';

interface PYQYearFilterProps {
    years: number[];
    selectedYears: number[];
    onYearToggle: (year: number) => void;
    onSelectAll?: () => void;
    onClearAll?: () => void;
    variant?: 'pills' | 'buttons' | 'dropdown';
    className?: string;
}

function PYQYearFilter({
    years,
    selectedYears,
    onYearToggle,
    onSelectAll,
    onClearAll,
    variant = 'pills',
    className,
}: PYQYearFilterProps) {
    const sortedYears = [...years].sort((a, b) => b - a);
    const allSelected = selectedYears.length === years.length;

    return (
        <div className={cn('flex items-center gap-2 flex-wrap', className)}>
            {/* Label */}
            <div className="flex items-center gap-2 text-sm text-gray-500 mr-2">
                <Calendar className="h-4 w-4" />
                <span>Year:</span>
            </div>

            {/* All Button */}
            <button
                onClick={() => allSelected ? onClearAll?.() : onSelectAll?.()}
                className={cn(
                    'px-3 py-1.5 rounded-lg text-sm font-medium transition-all',
                    allSelected
                        ? 'bg-blue-500 text-white'
                        : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700'
                )}
            >
                All
            </button>

            {/* Year Pills */}
            {sortedYears.map((year) => {
                const isSelected = selectedYears.includes(year);
                const yearConfig = yearColors[year] || yearColors[2019];

                return (
                    <button
                        key={year}
                        onClick={() => onYearToggle(year)}
                        className={cn(
                            'px-3 py-1.5 rounded-lg text-sm font-medium transition-all flex items-center gap-1.5',
                            isSelected
                                ? `${yearConfig.bg} ${yearConfig.text} ring-2 ring-offset-1`
                                : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700'
                        )}
                        style={isSelected ? { '--tw-ring-color': yearConfig.text.replace('text-', '') } as React.CSSProperties : {}}
                    >
                        {isSelected && <Check className="h-3 w-3" />}
                        {year}
                        {yearConfig.label && (
                            <span className="text-xs opacity-75">({yearConfig.label})</span>
                        )}
                    </button>
                );
            })}

            {/* Clear Button */}
            {selectedYears.length > 0 && selectedYears.length < years.length && (
                <button
                    onClick={onClearAll}
                    className="px-2 py-1 text-xs text-gray-400 hover:text-gray-600"
                >
                    Clear
                </button>
            )}
        </div>
    );
}

export default PYQYearFilter;
