'use client';

import React from 'react';
import { Globe, BookOpen, Users, ChevronDown } from 'lucide-react';
import { Button, Badge } from '@/components/ui';
import { LeaderboardType, TimeFilter, timeFilterConfig } from '@/types/leaderboard';
import { cn } from '@/lib/utils';

interface LeaderboardFiltersProps {
    activeType: LeaderboardType;
    activeTime: TimeFilter;
    activeSubject?: string;
    onTypeChange: (type: LeaderboardType) => void;
    onTimeChange: (time: TimeFilter) => void;
    onSubjectChange?: (subjectId: string) => void;
    subjects?: { id: string; name: string; nameBn: string }[];
    className?: string;
}

// Type tabs config
const typeTabs = [
    { id: 'global' as LeaderboardType, label: 'Global', labelBn: 'গ্লোবাল', icon: Globe },
    { id: 'subject' as LeaderboardType, label: 'Subject', labelBn: 'বিষয়', icon: BookOpen },
    { id: 'friends' as LeaderboardType, label: 'Friends', labelBn: 'বন্ধু', icon: Users },
];

// Sample subjects
const defaultSubjects = [
    { id: 'bengali', name: 'Bengali', nameBn: 'বাংলা' },
    { id: 'english', name: 'English', nameBn: 'ইংরেজি' },
    { id: 'history', name: 'History', nameBn: 'ইতিহাস' },
    { id: 'philosophy', name: 'Philosophy', nameBn: 'দর্শন' },
];

function LeaderboardFilters({
    activeType,
    activeTime,
    activeSubject,
    onTypeChange,
    onTimeChange,
    onSubjectChange,
    subjects = defaultSubjects,
    className,
}: LeaderboardFiltersProps) {
    return (
        <div className={cn('space-y-4', className)}>
            {/* Type Tabs */}
            <div className="flex flex-wrap items-center gap-2">
                {typeTabs.map((tab) => {
                    const Icon = tab.icon;
                    const isActive = activeType === tab.id;

                    return (
                        <button
                            key={tab.id}
                            onClick={() => onTypeChange(tab.id)}
                            className={cn(
                                'flex items-center gap-2 px-4 py-2 rounded-xl font-medium transition-all',
                                isActive
                                    ? 'bg-gradient-to-r from-amber-500 to-orange-500 text-white shadow-lg shadow-amber-500/25'
                                    : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700'
                            )}
                        >
                            <Icon className="h-4 w-4" />
                            <span>{tab.label}</span>
                        </button>
                    );
                })}

                {/* Time Filter */}
                <div className="ml-auto flex items-center gap-2">
                    <select
                        value={activeTime}
                        onChange={(e) => onTimeChange(e.target.value as TimeFilter)}
                        className="px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-sm"
                    >
                        {(Object.keys(timeFilterConfig) as TimeFilter[]).map((time) => (
                            <option key={time} value={time}>
                                {timeFilterConfig[time].label}
                            </option>
                        ))}
                    </select>
                </div>
            </div>

            {/* Subject Pills (when subject type is active) */}
            {activeType === 'subject' && (
                <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-gray-200 dark:border-gray-700">
                    <span className="text-sm text-gray-500 mr-2">Select Subject:</span>
                    {subjects.map((subject) => {
                        const isActive = activeSubject === subject.id;

                        return (
                            <button
                                key={subject.id}
                                onClick={() => onSubjectChange?.(subject.id)}
                                className={cn(
                                    'px-3 py-1.5 rounded-full text-sm font-medium transition-all',
                                    isActive
                                        ? 'bg-blue-600 text-white'
                                        : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700'
                                )}
                            >
                                {subject.nameBn}
                            </button>
                        );
                    })}
                </div>
            )}
        </div>
    );
}

export default LeaderboardFilters;

// Compact filter for inline use
interface CompactFilterProps {
    activeTime: TimeFilter;
    onTimeChange: (time: TimeFilter) => void;
}

export function CompactTimeFilter({ activeTime, onTimeChange }: CompactFilterProps) {
    return (
        <div className="inline-flex items-center gap-1 p-1 bg-gray-100 dark:bg-gray-800 rounded-lg">
            {(['week', 'month', 'all'] as TimeFilter[]).map((time) => (
                <button
                    key={time}
                    onClick={() => onTimeChange(time)}
                    className={cn(
                        'px-3 py-1 text-xs font-medium rounded-md transition-colors',
                        activeTime === time
                            ? 'bg-white dark:bg-gray-700 text-gray-900 dark:text-white shadow-sm'
                            : 'text-gray-500 hover:text-gray-700'
                    )}
                >
                    {timeFilterConfig[time].label}
                </button>
            ))}
        </div>
    );
}
