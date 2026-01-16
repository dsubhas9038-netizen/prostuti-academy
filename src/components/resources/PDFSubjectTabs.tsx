'use client';

import React from 'react';
import { BookOpen } from 'lucide-react';
import { cn } from '@/lib/utils';

interface SubjectTab {
    id: string;
    name: string;
    nameBn: string;
    color: string;
    count?: number;
}

interface PDFSubjectTabsProps {
    subjects: SubjectTab[];
    selectedSubject: string | 'all';
    onSubjectChange: (subjectId: string | 'all') => void;
    totalCount?: number;
    showCounts?: boolean;
    className?: string;
}

function PDFSubjectTabs({
    subjects,
    selectedSubject,
    onSubjectChange,
    totalCount,
    showCounts = true,
    className,
}: PDFSubjectTabsProps) {
    return (
        <div className={cn('flex items-center gap-2 overflow-x-auto pb-2', className)}>
            {/* All Tab */}
            <button
                onClick={() => onSubjectChange('all')}
                className={cn(
                    'px-4 py-2 rounded-xl text-sm font-medium transition-all whitespace-nowrap flex items-center gap-2',
                    selectedSubject === 'all'
                        ? 'bg-blue-500 text-white shadow-md'
                        : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700'
                )}
            >
                <BookOpen className="h-4 w-4" />
                All Subjects
                {showCounts && totalCount !== undefined && (
                    <span className={cn(
                        'text-xs px-1.5 py-0.5 rounded-full',
                        selectedSubject === 'all'
                            ? 'bg-white/20'
                            : 'bg-gray-200 dark:bg-gray-700'
                    )}>
                        {totalCount}
                    </span>
                )}
            </button>

            {/* Subject Tabs */}
            {subjects.map((subject) => {
                const isSelected = selectedSubject === subject.id;

                return (
                    <button
                        key={subject.id}
                        onClick={() => onSubjectChange(subject.id)}
                        className={cn(
                            'px-4 py-2 rounded-xl text-sm font-medium transition-all whitespace-nowrap flex items-center gap-2',
                            isSelected
                                ? 'text-white shadow-md'
                                : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700'
                        )}
                        style={isSelected ? { backgroundColor: subject.color } : {}}
                    >
                        {subject.nameBn}
                        {showCounts && subject.count !== undefined && (
                            <span className={cn(
                                'text-xs px-1.5 py-0.5 rounded-full',
                                isSelected
                                    ? 'bg-white/20'
                                    : 'bg-gray-200 dark:bg-gray-700'
                            )}>
                                {subject.count}
                            </span>
                        )}
                    </button>
                );
            })}
        </div>
    );
}

export default PDFSubjectTabs;
