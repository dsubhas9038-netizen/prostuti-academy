'use client';

import React from 'react';
import { Question } from '@/types';
import QuestionCard from './QuestionCard';
import { QuestionCardSkeleton } from '@/components/ui';
import { EmptyState } from '@/components/shared';
import { cn } from '@/lib/utils';

interface QuestionListProps {
    questions: Question[];
    loading?: boolean;
    variant?: 'default' | 'compact';
    bookmarkedQuestions?: string[];
    onBookmarkToggle?: (questionId: string) => void;
    emptyMessage?: string;
    className?: string;
}

function QuestionList({
    questions,
    loading = false,
    variant = 'default',
    bookmarkedQuestions = [],
    onBookmarkToggle,
    emptyMessage = 'কোনো question পাওয়া যায়নি',
    className,
}: QuestionListProps) {
    // Loading state
    if (loading) {
        return (
            <div className={cn('space-y-4', className)}>
                {Array.from({ length: 5 }).map((_, index) => (
                    <QuestionCardSkeleton key={index} />
                ))}
            </div>
        );
    }

    // Empty state
    if (questions.length === 0) {
        return (
            <EmptyState
                type="no-data"
                title="কোনো Question নেই"
                description={emptyMessage}
            />
        );
    }

    // Question list
    return (
        <div className={cn('space-y-4', className)}>
            {questions.map((question, index) => (
                <QuestionCard
                    key={question.id}
                    question={question}
                    index={index + 1}
                    variant={variant}
                    isBookmarked={bookmarkedQuestions.includes(question.id)}
                    onBookmarkToggle={() => onBookmarkToggle?.(question.id)}
                />
            ))}
        </div>
    );
}

export default QuestionList;
