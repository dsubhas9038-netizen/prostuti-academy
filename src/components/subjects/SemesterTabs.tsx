'use client';

import React from 'react';
import { Calendar } from 'lucide-react';
import { cn } from '@/lib/utils';

interface SemesterTabsProps {
    activeSemester: number | 'all';
    onSemesterChange: (semester: number | 'all') => void;
    showAllOption?: boolean;
    variant?: 'pills' | 'underline' | 'boxed';
    className?: string;
}

const semesters = [
    { id: 1, label: 'Sem 1', labelBn: 'সেম ১', fullLabel: 'Semester 1' },
    { id: 2, label: 'Sem 2', labelBn: 'সেম ২', fullLabel: 'Semester 2' },
    { id: 3, label: 'Sem 3', labelBn: 'সেম ৩', fullLabel: 'Semester 3' },
    { id: 4, label: 'Sem 4', labelBn: 'সেম ৪', fullLabel: 'Semester 4' },
];

function SemesterTabs({
    activeSemester,
    onSemesterChange,
    showAllOption = true,
    variant = 'pills',
    className,
}: SemesterTabsProps) {
    const baseButtonClass = 'flex items-center gap-1.5 font-medium transition-all duration-200';

    // Pills variant
    if (variant === 'pills') {
        return (
            <div className={cn('flex flex-wrap items-center gap-2', className)}>
                {showAllOption && (
                    <button
                        onClick={() => onSemesterChange('all')}
                        className={cn(
                            baseButtonClass,
                            'px-4 py-2 rounded-full text-sm',
                            activeSemester === 'all'
                                ? 'bg-blue-600 text-white'
                                : 'bg-gray-100 dark:bg-gray-800 text-gray-500 hover:text-gray-900 dark:hover:text-white hover:bg-gray-200 dark:hover:bg-gray-700'
                        )}
                    >
                        All
                    </button>
                )}
                {semesters.map((sem) => (
                    <button
                        key={sem.id}
                        onClick={() => onSemesterChange(sem.id)}
                        className={cn(
                            baseButtonClass,
                            'px-4 py-2 rounded-full text-sm',
                            activeSemester === sem.id
                                ? 'bg-blue-600 text-white'
                                : 'bg-gray-100 dark:bg-gray-800 text-gray-500 hover:text-gray-900 dark:hover:text-white hover:bg-gray-200 dark:hover:bg-gray-700'
                        )}
                    >
                        {sem.label}
                    </button>
                ))}
            </div>
        );
    }

    // Underline variant
    if (variant === 'underline') {
        return (
            <div className={cn('flex items-center border-b border-gray-200 dark:border-gray-700', className)}>
                {showAllOption && (
                    <button
                        onClick={() => onSemesterChange('all')}
                        className={cn(
                            baseButtonClass,
                            'px-4 py-3 text-sm border-b-2 -mb-px',
                            activeSemester === 'all'
                                ? 'border-blue-600 text-blue-600'
                                : 'border-transparent text-gray-500 hover:text-gray-900 dark:hover:text-white'
                        )}
                    >
                        All Semesters
                    </button>
                )}
                {semesters.map((sem) => (
                    <button
                        key={sem.id}
                        onClick={() => onSemesterChange(sem.id)}
                        className={cn(
                            baseButtonClass,
                            'px-4 py-3 text-sm border-b-2 -mb-px',
                            activeSemester === sem.id
                                ? 'border-blue-600 text-blue-600'
                                : 'border-transparent text-gray-500 hover:text-gray-900 dark:hover:text-white'
                        )}
                    >
                        {sem.fullLabel}
                    </button>
                ))}
            </div>
        );
    }

    // Boxed variant
    return (
        <div className={cn('inline-flex p-1 bg-gray-100 dark:bg-gray-800 rounded-xl', className)}>
            {showAllOption && (
                <button
                    onClick={() => onSemesterChange('all')}
                    className={cn(
                        baseButtonClass,
                        'px-4 py-2 rounded-lg text-sm',
                        activeSemester === 'all'
                            ? 'bg-white dark:bg-gray-900 text-gray-900 dark:text-white shadow-sm'
                            : 'text-gray-500 hover:text-gray-900 dark:hover:text-white'
                    )}
                >
                    All
                </button>
            )}
            {semesters.map((sem) => (
                <button
                    key={sem.id}
                    onClick={() => onSemesterChange(sem.id)}
                    className={cn(
                        baseButtonClass,
                        'px-4 py-2 rounded-lg text-sm',
                        activeSemester === sem.id
                            ? 'bg-white dark:bg-gray-900 text-gray-900 dark:text-white shadow-sm'
                            : 'text-gray-500 hover:text-gray-900 dark:hover:text-white'
                    )}
                >
                    <Calendar className="h-4 w-4 hidden sm:block" />
                    {sem.label}
                </button>
            ))}
        </div>
    );
}

export default SemesterTabs;
