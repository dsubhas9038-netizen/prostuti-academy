'use client';

import React from 'react';
import { CheckCircle, Circle, Flag, Eye } from 'lucide-react';
import { QuestionStatus } from '@/types';
import { cn } from '@/lib/utils';

interface TestQuestionNavigatorProps {
    totalQuestions: number;
    currentIndex: number;
    questionStatuses: Record<number, QuestionStatus>;
    onNavigate: (index: number) => void;
    className?: string;
}

function TestQuestionNavigator({
    totalQuestions,
    currentIndex,
    questionStatuses,
    onNavigate,
    className,
}: TestQuestionNavigatorProps) {
    // Get status for a question
    const getStatus = (index: number): QuestionStatus => {
        if (index === currentIndex) return 'current';
        return questionStatuses[index] || 'not-visited';
    };

    // Get button style based on status
    const getButtonStyle = (status: QuestionStatus) => {
        switch (status) {
            case 'current':
                return {
                    bg: 'bg-blue-500 hover:bg-blue-600',
                    text: 'text-white',
                    border: 'border-2 border-blue-600',
                    ring: 'ring-2 ring-blue-300',
                };
            case 'answered':
                return {
                    bg: 'bg-green-500 hover:bg-green-600',
                    text: 'text-white',
                    border: 'border-green-500',
                    ring: '',
                };
            case 'skipped':
                return {
                    bg: 'bg-gray-400 hover:bg-gray-500',
                    text: 'text-white',
                    border: 'border-gray-400',
                    ring: '',
                };
            case 'marked':
                return {
                    bg: 'bg-yellow-400 hover:bg-yellow-500',
                    text: 'text-gray-900',
                    border: 'border-2 border-yellow-500',
                    ring: '',
                };
            default: // not-visited
                return {
                    bg: 'bg-white dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700',
                    text: 'text-gray-600 dark:text-gray-400',
                    border: 'border border-gray-300 dark:border-gray-600',
                    ring: '',
                };
        }
    };

    // Get icon for status
    const getStatusIcon = (status: QuestionStatus, index: number) => {
        switch (status) {
            case 'answered':
                return <CheckCircle className="h-3 w-3 absolute -top-1 -right-1 text-white bg-green-500 rounded-full" />;
            case 'marked':
                return <Flag className="h-3 w-3 absolute -top-1 -right-1 text-yellow-500" />;
            default:
                return null;
        }
    };

    return (
        <div className={cn('p-4 bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-700', className)}>
            {/* Header */}
            <div className="flex items-center justify-between mb-4">
                <h3 className="font-medium text-gray-900 dark:text-white">
                    Question Navigator
                </h3>
                <span className="text-sm text-gray-500">
                    {currentIndex + 1}/{totalQuestions}
                </span>
            </div>

            {/* Grid of Question Numbers */}
            <div className="grid grid-cols-5 sm:grid-cols-10 gap-2 mb-4">
                {Array.from({ length: totalQuestions }).map((_, index) => {
                    const status = getStatus(index);
                    const styles = getButtonStyle(status);

                    return (
                        <button
                            key={index}
                            onClick={() => onNavigate(index)}
                            className={cn(
                                'relative w-9 h-9 rounded-lg font-medium text-sm',
                                'transition-all duration-200',
                                'focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2',
                                styles.bg,
                                styles.text,
                                styles.border,
                                styles.ring
                            )}
                        >
                            {index + 1}
                            {getStatusIcon(status, index)}
                        </button>
                    );
                })}
            </div>

            {/* Legend */}
            <div className="flex flex-wrap gap-4 pt-3 border-t border-gray-200 dark:border-gray-700">
                <div className="flex items-center gap-2 text-xs">
                    <div className="w-4 h-4 rounded bg-blue-500"></div>
                    <span className="text-gray-500">Current</span>
                </div>
                <div className="flex items-center gap-2 text-xs">
                    <div className="w-4 h-4 rounded bg-green-500"></div>
                    <span className="text-gray-500">Answered</span>
                </div>
                <div className="flex items-center gap-2 text-xs">
                    <div className="w-4 h-4 rounded bg-gray-400"></div>
                    <span className="text-gray-500">Skipped</span>
                </div>
                <div className="flex items-center gap-2 text-xs">
                    <div className="w-4 h-4 rounded border-2 border-yellow-500 bg-yellow-100"></div>
                    <span className="text-gray-500">Marked</span>
                </div>
                <div className="flex items-center gap-2 text-xs">
                    <div className="w-4 h-4 rounded border border-gray-300 bg-white dark:bg-gray-800"></div>
                    <span className="text-gray-500">Not visited</span>
                </div>
            </div>
        </div>
    );
}

export default TestQuestionNavigator;
