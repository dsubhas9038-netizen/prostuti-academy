'use client';

import React from 'react';
import {
    FileQuestion,
    FileText,
    ListChecks,
    History,
    Filter,
    X,
    Star,
    Zap
} from 'lucide-react';
import { QuestionType } from '@/types';
import { Button, Badge } from '@/components/ui';
import { cn } from '@/lib/utils';

export type QuestionFilterType = QuestionType | 'all' | 'pyq';

interface QuestionFilterBarProps {
    activeType: QuestionFilterType;
    onTypeChange: (type: QuestionFilterType) => void;
    counts: {
        all: number;
        saq: number;
        laq: number;
        mcq: number;
        vsaq: number;
        pyq: number;
    };
    showImportantOnly?: boolean;
    onImportantToggle?: () => void;
    className?: string;
}

const filterTabs = [
    {
        id: 'all' as const,
        label: 'All',
        labelBn: 'সব',
        icon: FileQuestion,
        color: '#6366F1'
    },
    {
        id: 'saq' as const,
        label: 'Short',
        labelBn: 'সংক্ষিপ্ত',
        icon: FileText,
        color: '#3B82F6'
    },
    {
        id: 'laq' as const,
        label: 'Long',
        labelBn: 'রচনাধর্মী',
        icon: FileText,
        color: '#8B5CF6'
    },
    {
        id: 'mcq' as const,
        label: 'MCQ',
        labelBn: 'MCQ',
        icon: ListChecks,
        color: '#22C55E'
    },
    {
        id: 'pyq' as const,
        label: 'PYQ',
        labelBn: 'বিগত বছর',
        icon: History,
        color: '#F59E0B'
    },
];

function QuestionFilterBar({
    activeType,
    onTypeChange,
    counts,
    showImportantOnly = false,
    onImportantToggle,
    className,
}: QuestionFilterBarProps) {
    return (
        <div className={cn('space-y-3', className)}>
            {/* Main Filter Tabs */}
            <div className="overflow-x-auto pb-1">
                <div className="flex items-center gap-2 min-w-max">
                    {filterTabs.map((tab) => {
                        const isActive = activeType === tab.id;
                        const count = counts[tab.id] || 0;

                        return (
                            <button
                                key={tab.id}
                                onClick={() => onTypeChange(tab.id)}
                                className={cn(
                                    'flex items-center gap-2 px-4 py-2.5 rounded-xl font-medium transition-all',
                                    'border-2',
                                    isActive
                                        ? 'border-current shadow-md'
                                        : 'border-transparent bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700'
                                )}
                                style={isActive ? {
                                    backgroundColor: `${tab.color}15`,
                                    borderColor: tab.color,
                                    color: tab.color
                                } : undefined}
                            >
                                <tab.icon className="h-4 w-4" />
                                <span className="text-sm">{tab.labelBn}</span>
                                <span
                                    className={cn(
                                        'text-xs px-1.5 py-0.5 rounded-full font-bold',
                                        isActive
                                            ? 'bg-white/30'
                                            : 'bg-white dark:bg-gray-900'
                                    )}
                                >
                                    {count}
                                </span>
                            </button>
                        );
                    })}
                </div>
            </div>

            {/* Secondary Filters */}
            <div className="flex items-center gap-3 flex-wrap">
                {/* Important Only Toggle */}
                {onImportantToggle && (
                    <button
                        onClick={onImportantToggle}
                        className={cn(
                            'flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm transition-all',
                            showImportantOnly
                                ? 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-400 border border-yellow-300 dark:border-yellow-700'
                                : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700'
                        )}
                    >
                        <Star className={cn('h-4 w-4', showImportantOnly && 'fill-current')} />
                        <span>Important Only</span>
                    </button>
                )}

                {/* Active Filter Display */}
                {activeType !== 'all' && (
                    <Badge variant="secondary" className="gap-1">
                        <Filter className="h-3 w-3" />
                        Filtered: {filterTabs.find(t => t.id === activeType)?.labelBn}
                        <button
                            onClick={() => onTypeChange('all')}
                            className="ml-1 hover:bg-gray-300 dark:hover:bg-gray-600 rounded-full p-0.5"
                        >
                            <X className="h-3 w-3" />
                        </button>
                    </Badge>
                )}
            </div>
        </div>
    );
}

export default QuestionFilterBar;
