'use client';

import React from 'react';
import { Chapter } from '@/types';
import ChapterCard from './ChapterCard';
import { QuestionCardSkeleton } from '@/components/ui';
import { EmptyState } from '@/components/shared';
import { cn } from '@/lib/utils';

interface ChapterListProps {
    chapters: Chapter[];
    subjectId: string;
    subjectColor?: string;
    loading?: boolean;
    variant?: 'grid' | 'list';
    cardVariant?: 'default' | 'compact' | 'detailed';
    progressMap?: Record<string, number>;
    completedChapters?: string[];
    emptyMessage?: string;
    className?: string;
}

function ChapterList({
    chapters,
    subjectId,
    subjectColor = '#2563EB',
    loading = false,
    variant = 'list',
    cardVariant = 'default',
    progressMap = {},
    completedChapters = [],
    emptyMessage = 'এই semester-এ কোনো chapter নেই',
    className,
}: ChapterListProps) {
    // Loading state
    if (loading) {
        return (
            <div
                className={cn(
                    variant === 'grid'
                        ? 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4'
                        : 'space-y-3',
                    className
                )}
            >
                {Array.from({ length: 5 }).map((_, index) => (
                    <QuestionCardSkeleton key={index} />
                ))}
            </div>
        );
    }

    // Empty state
    if (chapters.length === 0) {
        return (
            <EmptyState
                type="no-data"
                title="কোনো Chapter নেই"
                description={emptyMessage}
            />
        );
    }

    // Grid layout
    if (variant === 'grid') {
        return (
            <div
                className={cn(
                    'grid gap-4',
                    cardVariant === 'detailed'
                        ? 'grid-cols-1 sm:grid-cols-2'
                        : 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3',
                    className
                )}
            >
                {chapters.map((chapter) => (
                    <ChapterCard
                        key={chapter.id}
                        chapter={chapter}
                        subjectId={subjectId}
                        subjectColor={subjectColor}
                        variant={cardVariant}
                        progress={progressMap[chapter.id] || 0}
                        isCompleted={completedChapters.includes(chapter.id)}
                    />
                ))}
            </div>
        );
    }

    // List layout
    return (
        <div className={cn('space-y-3', className)}>
            {chapters.map((chapter) => (
                <ChapterCard
                    key={chapter.id}
                    chapter={chapter}
                    subjectId={subjectId}
                    subjectColor={subjectColor}
                    variant={cardVariant}
                    progress={progressMap[chapter.id] || 0}
                    isCompleted={completedChapters.includes(chapter.id)}
                />
            ))}
        </div>
    );
}

export default ChapterList;
