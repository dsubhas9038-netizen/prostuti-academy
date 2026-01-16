'use client';

import React from 'react';
import {
    FileQuestion,
    FileText,
    ListChecks,
    History
} from 'lucide-react';
import { cn } from '@/lib/utils';

export type QuestionType = 'all' | 'saq' | 'laq' | 'mcq' | 'pyq';

interface QuestionTypeTabsProps {
    activeType: QuestionType;
    onTypeChange: (type: QuestionType) => void;
    counts?: {
        all?: number;
        saq?: number;
        laq?: number;
        mcq?: number;
        pyq?: number;
    };
    className?: string;
}

const questionTypes = [
    {
        id: 'all' as const,
        label: 'All',
        labelBn: 'সব',
        icon: FileQuestion,
        description: 'All questions'
    },
    {
        id: 'saq' as const,
        label: 'Short',
        labelBn: 'সংক্ষিপ্ত',
        icon: FileText,
        description: '2-3 marks questions'
    },
    {
        id: 'laq' as const,
        label: 'Long',
        labelBn: 'রচনাধর্মী',
        icon: FileText,
        description: '5-10 marks questions'
    },
    {
        id: 'mcq' as const,
        label: 'MCQ',
        labelBn: 'MCQ',
        icon: ListChecks,
        description: 'Multiple choice'
    },
    {
        id: 'pyq' as const,
        label: 'PYQ',
        labelBn: 'বিগত বছর',
        icon: History,
        description: 'Previous year questions'
    },
];

function QuestionTypeTabs({
    activeType,
    onTypeChange,
    counts = {},
    className,
}: QuestionTypeTabsProps) {
    return (
        <div className={cn('overflow-x-auto', className)}>
            <div className="flex items-center gap-2 min-w-max p-1 bg-gray-100 dark:bg-gray-800 rounded-xl">
                {questionTypes.map((type) => {
                    const isActive = activeType === type.id;
                    const count = counts[type.id];

                    return (
                        <button
                            key={type.id}
                            onClick={() => onTypeChange(type.id)}
                            className={cn(
                                'flex items-center gap-2 px-4 py-2.5 rounded-lg font-medium transition-all',
                                'focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2',
                                isActive
                                    ? 'bg-white dark:bg-gray-900 text-gray-900 dark:text-white shadow-sm'
                                    : 'text-gray-500 hover:text-gray-900 dark:hover:text-white hover:bg-white/50 dark:hover:bg-gray-900/50'
                            )}
                        >
                            <type.icon className="h-4 w-4" />
                            <span className="text-sm">{type.labelBn}</span>
                            {count !== undefined && count > 0 && (
                                <span
                                    className={cn(
                                        'text-xs px-1.5 py-0.5 rounded-full',
                                        isActive
                                            ? 'bg-blue-100 dark:bg-blue-900/30 text-blue-600'
                                            : 'bg-gray-200 dark:bg-gray-700 text-gray-500'
                                    )}
                                >
                                    {count}
                                </span>
                            )}
                        </button>
                    );
                })}
            </div>
        </div>
    );
}

export default QuestionTypeTabs;
