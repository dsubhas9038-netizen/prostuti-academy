'use client';

import React from 'react';
import { Subject } from '@/types';
import SubjectCard from './SubjectCard';
import { SubjectCardSkeleton } from '@/components/ui';
import { EmptyState } from '@/components/shared';
import { cn } from '@/lib/utils';

interface SubjectListProps {
    subjects: Subject[];
    loading?: boolean;
    variant?: 'grid' | 'list';
    cardVariant?: 'default' | 'compact' | 'detailed';
    showProgress?: boolean;
    progressMap?: Record<string, number>;
    emptyMessage?: string;
    className?: string;
}

function SubjectList({
    subjects,
    loading = false,
    variant = 'grid',
    cardVariant = 'default',
    showProgress = true,
    progressMap = {},
    emptyMessage = 'কোনো subject পাওয়া যায়নি',
    className,
}: SubjectListProps) {
    // Loading state
    if (loading) {
        return (
            <div
                className={cn(
                    variant === 'grid'
                        ? 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4'
                        : 'space-y-4',
                    className
                )}
            >
                {Array.from({ length: 8 }).map((_, index) => (
                    <SubjectCardSkeleton key={index} />
                ))}
            </div>
        );
    }

    // Empty state
    if (subjects.length === 0) {
        return (
            <EmptyState
                type="no-data"
                title="কোনো Subject নেই"
                description={emptyMessage}
            />
        );
    }

    // Grid layout
    if (variant === 'grid') {
        const gridCols = cardVariant === 'compact'
            ? 'grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8'
            : cardVariant === 'detailed'
                ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3'
                : 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4';

        return (
            <div className={cn('grid gap-4', gridCols, className)}>
                {subjects.map((subject) => (
                    <SubjectCard
                        key={subject.id}
                        subject={subject}
                        variant={cardVariant}
                        showProgress={showProgress}
                        progress={progressMap[subject.id] || 0}
                    />
                ))}
            </div>
        );
    }

    // List layout
    return (
        <div className={cn('space-y-4', className)}>
            {subjects.map((subject) => (
                <SubjectCard
                    key={subject.id}
                    subject={subject}
                    variant="detailed"
                    showProgress={showProgress}
                    progress={progressMap[subject.id] || 0}
                />
            ))}
        </div>
    );
}

export default SubjectList;
