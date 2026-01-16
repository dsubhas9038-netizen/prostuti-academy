'use client';

import React from 'react';
import { ChevronLeft, ChevronRight, ChevronsUpDown } from 'lucide-react';
import { Question } from '@/types';
import { Button } from '@/components/ui';
import { cn } from '@/lib/utils';

interface QuestionNavigationProps {
    questions: Question[];
    currentIndex: number;
    onNavigate: (index: number) => void;
    className?: string;
}

function QuestionNavigation({
    questions,
    currentIndex,
    onNavigate,
    className,
}: QuestionNavigationProps) {
    const totalQuestions = questions.length;
    const hasPrev = currentIndex > 0;
    const hasNext = currentIndex < totalQuestions - 1;

    // Navigate to previous
    const handlePrev = () => {
        if (hasPrev) onNavigate(currentIndex - 1);
    };

    // Navigate to next
    const handleNext = () => {
        if (hasNext) onNavigate(currentIndex + 1);
    };

    // Jump to specific question
    const handleJump = (index: number) => {
        if (index >= 0 && index < totalQuestions) {
            onNavigate(index);
        }
    };

    if (totalQuestions === 0) return null;

    return (
        <div className={cn('flex items-center justify-between', className)}>
            {/* Previous Button */}
            <Button
                variant="outline"
                size="sm"
                onClick={handlePrev}
                disabled={!hasPrev}
                leftIcon={<ChevronLeft className="h-4 w-4" />}
            >
                Previous
            </Button>

            {/* Question Selector */}
            <div className="flex items-center gap-2">
                <span className="text-sm text-gray-500">Question</span>
                <select
                    value={currentIndex}
                    onChange={(e) => handleJump(Number(e.target.value))}
                    className={cn(
                        'px-3 py-1.5 rounded-lg',
                        'bg-gray-100 dark:bg-gray-800',
                        'border border-gray-200 dark:border-gray-700',
                        'text-gray-900 dark:text-white text-sm font-medium',
                        'focus:outline-none focus:ring-2 focus:ring-blue-500',
                        'cursor-pointer'
                    )}
                >
                    {questions.map((q, idx) => (
                        <option key={q.id} value={idx}>
                            Q{idx + 1}
                        </option>
                    ))}
                </select>
                <span className="text-sm text-gray-500">
                    of {totalQuestions}
                </span>
            </div>

            {/* Next Button */}
            <Button
                variant="outline"
                size="sm"
                onClick={handleNext}
                disabled={!hasNext}
                rightIcon={<ChevronRight className="h-4 w-4" />}
            >
                Next
            </Button>
        </div>
    );
}

export default QuestionNavigation;
