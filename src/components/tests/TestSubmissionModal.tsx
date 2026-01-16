'use client';

import React from 'react';
import {
    AlertTriangle,
    CheckCircle,
    Circle,
    Send,
    X,
    Clock
} from 'lucide-react';
import { Button, ProgressBar } from '@/components/ui';
import { cn } from '@/lib/utils';

interface TestSubmissionModalProps {
    isOpen: boolean;
    onClose: () => void;
    onConfirm: () => void;
    totalQuestions: number;
    answeredCount: number;
    skippedCount: number;
    timeRemaining: number;
    isSubmitting?: boolean;
    className?: string;
}

function TestSubmissionModal({
    isOpen,
    onClose,
    onConfirm,
    totalQuestions,
    answeredCount,
    skippedCount,
    timeRemaining,
    isSubmitting = false,
    className,
}: TestSubmissionModalProps) {
    if (!isOpen) return null;

    const unanswered = totalQuestions - answeredCount - skippedCount;
    const percentage = Math.round((answeredCount / totalQuestions) * 100);
    const hasUnanswered = unanswered > 0;

    // Format time
    const formatTime = (seconds: number) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins}:${secs.toString().padStart(2, '0')}`;
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Backdrop */}
            <div
                className="absolute inset-0 bg-black/50 backdrop-blur-sm"
                onClick={!isSubmitting ? onClose : undefined}
            />

            {/* Modal */}
            <div className={cn(
                'relative w-full max-w-md bg-white dark:bg-gray-900 rounded-2xl shadow-2xl',
                className
            )}>
                {/* Close Button */}
                {!isSubmitting && (
                    <button
                        onClick={onClose}
                        className="absolute top-4 right-4 p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                    >
                        <X className="h-5 w-5 text-gray-400" />
                    </button>
                )}

                {/* Header */}
                <div className="p-6 text-center">
                    <div className={cn(
                        'w-16 h-16 rounded-full mx-auto mb-4 flex items-center justify-center',
                        hasUnanswered
                            ? 'bg-yellow-100 dark:bg-yellow-900/30'
                            : 'bg-green-100 dark:bg-green-900/30'
                    )}>
                        {hasUnanswered ? (
                            <AlertTriangle className="h-8 w-8 text-yellow-600" />
                        ) : (
                            <CheckCircle className="h-8 w-8 text-green-600" />
                        )}
                    </div>
                    <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                        Submit Test?
                    </h2>
                    <p className="text-gray-500">
                        {hasUnanswered
                            ? 'তোমার কিছু প্রশ্নের উত্তর দেওয়া হয়নি।'
                            : 'সব প্রশ্নের উত্তর দেওয়া হয়েছে!'}
                    </p>
                </div>

                {/* Stats */}
                <div className="px-6 pb-4">
                    <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-xl space-y-4">
                        {/* Progress */}
                        <div>
                            <div className="flex justify-between text-sm mb-2">
                                <span className="text-gray-500">Progress</span>
                                <span className="font-bold text-gray-900 dark:text-white">{percentage}%</span>
                            </div>
                            <ProgressBar
                                value={percentage}
                                size="md"
                                variant={percentage === 100 ? 'success' : 'default'}
                            />
                        </div>

                        {/* Question Stats */}
                        <div className="grid grid-cols-3 gap-3 text-center">
                            <div className="p-2 bg-white dark:bg-gray-900 rounded-lg">
                                <div className="flex items-center justify-center gap-1 mb-1">
                                    <CheckCircle className="h-4 w-4 text-green-500" />
                                    <span className="font-bold text-gray-900 dark:text-white">{answeredCount}</span>
                                </div>
                                <span className="text-xs text-gray-500">Answered</span>
                            </div>
                            <div className="p-2 bg-white dark:bg-gray-900 rounded-lg">
                                <div className="flex items-center justify-center gap-1 mb-1">
                                    <Circle className="h-4 w-4 text-gray-400" />
                                    <span className="font-bold text-gray-900 dark:text-white">{unanswered}</span>
                                </div>
                                <span className="text-xs text-gray-500">Unanswered</span>
                            </div>
                            <div className="p-2 bg-white dark:bg-gray-900 rounded-lg">
                                <div className="flex items-center justify-center gap-1 mb-1">
                                    <Clock className="h-4 w-4 text-blue-500" />
                                    <span className="font-bold text-gray-900 dark:text-white">{formatTime(timeRemaining)}</span>
                                </div>
                                <span className="text-xs text-gray-500">Time Left</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Warning for unanswered */}
                {hasUnanswered && (
                    <div className="px-6 pb-4">
                        <div className="p-3 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg text-sm text-yellow-700 dark:text-yellow-400">
                            ⚠️ {unanswered}টি প্রশ্নের উত্তর দেওয়া হয়নি। সাবমিট করলে এগুলো ভুল হিসেবে গণনা হবে।
                        </div>
                    </div>
                )}

                {/* Footer */}
                <div className="p-6 border-t border-gray-200 dark:border-gray-700 flex gap-3">
                    <Button
                        variant="outline"
                        className="flex-1"
                        onClick={onClose}
                        disabled={isSubmitting}
                    >
                        Continue Test
                    </Button>
                    <Button
                        className="flex-1"
                        onClick={onConfirm}
                        isLoading={isSubmitting}
                        leftIcon={<Send className="h-4 w-4" />}
                    >
                        Submit Now
                    </Button>
                </div>
            </div>
        </div>
    );
}

export default TestSubmissionModal;
