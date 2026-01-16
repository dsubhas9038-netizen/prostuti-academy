'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { FileText, Save, Check, AlertCircle } from 'lucide-react';
import { QuestionType, WordCount } from '@/types';
import { cn } from '@/lib/utils';

interface TextAnswerInputProps {
    value: string;
    onChange: (value: string) => void;
    questionType: QuestionType;
    wordCountTarget?: WordCount;
    placeholder?: string;
    disabled?: boolean;
    autoSave?: boolean;
    onAutoSave?: (value: string) => void;
    className?: string;
}

function TextAnswerInput({
    value,
    onChange,
    questionType,
    wordCountTarget,
    placeholder = 'Write your answer here...',
    disabled = false,
    autoSave = true,
    onAutoSave,
    className,
}: TextAnswerInputProps) {
    const [localValue, setLocalValue] = useState(value);
    const [saveStatus, setSaveStatus] = useState<'idle' | 'saving' | 'saved'>('idle');
    const [wordCount, setWordCount] = useState(0);

    // Calculate word count
    useEffect(() => {
        const words = localValue.trim().split(/\s+/).filter(Boolean).length;
        setWordCount(words);
    }, [localValue]);

    // Debounced auto-save
    useEffect(() => {
        if (!autoSave || localValue === value) return;

        setSaveStatus('saving');
        const timer = setTimeout(() => {
            onChange(localValue);
            onAutoSave?.(localValue);
            setSaveStatus('saved');

            // Reset to idle after 2 seconds
            setTimeout(() => setSaveStatus('idle'), 2000);
        }, 1000);

        return () => clearTimeout(timer);
    }, [localValue, autoSave, onChange, onAutoSave, value]);

    // Sync with external value
    useEffect(() => {
        setLocalValue(value);
    }, [value]);

    // Get word count status
    const getWordCountStatus = () => {
        if (!wordCountTarget || wordCountTarget.min === 0) return null;

        const { min, max } = wordCountTarget;

        if (wordCount === 0) {
            return { status: 'empty', color: 'text-gray-400', message: 'Start writing...' };
        }
        if (wordCount >= min && wordCount <= max) {
            return { status: 'good', color: 'text-green-600', message: '✓ Good length!' };
        }
        if (wordCount < min * 0.8) {
            return { status: 'short', color: 'text-red-600', message: `Need ${min - wordCount} more words` };
        }
        if (wordCount < min) {
            return { status: 'almost', color: 'text-yellow-600', message: `${min - wordCount} more words suggested` };
        }
        if (wordCount > max) {
            return { status: 'long', color: 'text-orange-600', message: `${wordCount - max} words over limit` };
        }
        return null;
    };

    const wordCountStatus = getWordCountStatus();

    // Get row count based on question type
    const getRowCount = () => {
        switch (questionType) {
            case 'vsaq':
                return 3;
            case 'saq':
                return 6;
            case 'laq':
                return 12;
            default:
                return 6;
        }
    };

    return (
        <div className={cn('space-y-3', className)}>
            {/* Textarea */}
            <div className="relative">
                <textarea
                    value={localValue}
                    onChange={(e) => setLocalValue(e.target.value)}
                    placeholder={placeholder}
                    disabled={disabled}
                    rows={getRowCount()}
                    className={cn(
                        'w-full px-4 py-3 rounded-xl font-bengali',
                        'bg-white dark:bg-gray-900',
                        'border-2 border-gray-200 dark:border-gray-700',
                        'focus:border-blue-500 dark:focus:border-blue-400',
                        'focus:ring-2 focus:ring-blue-500/20',
                        'outline-none transition-all resize-none',
                        'text-gray-900 dark:text-white',
                        'placeholder:text-gray-400',
                        disabled && 'opacity-60 cursor-not-allowed bg-gray-50 dark:bg-gray-800'
                    )}
                />

                {/* Save Status Indicator */}
                {autoSave && (
                    <div className="absolute bottom-3 right-3">
                        {saveStatus === 'saving' && (
                            <div className="flex items-center gap-1 text-xs text-gray-400">
                                <Save className="h-3 w-3 animate-pulse" />
                                Saving...
                            </div>
                        )}
                        {saveStatus === 'saved' && (
                            <div className="flex items-center gap-1 text-xs text-green-500">
                                <Check className="h-3 w-3" />
                                Saved
                            </div>
                        )}
                    </div>
                )}
            </div>

            {/* Word Count Bar */}
            <div className="flex items-center justify-between">
                {/* Word Count */}
                <div className="flex items-center gap-2">
                    <FileText className="h-4 w-4 text-gray-400" />
                    <span className="text-sm text-gray-500">
                        Words: <span className="font-medium text-gray-900 dark:text-white">{wordCount}</span>
                        {wordCountTarget && wordCountTarget.min > 0 && (
                            <span className="text-gray-400">
                                {' / '}{wordCountTarget.min}-{wordCountTarget.max}
                            </span>
                        )}
                    </span>
                </div>

                {/* Status Message */}
                {wordCountStatus && (
                    <span className={cn('text-sm font-medium', wordCountStatus.color)}>
                        {wordCountStatus.message}
                    </span>
                )}
            </div>

            {/* Progress Bar */}
            {wordCountTarget && wordCountTarget.min > 0 && (
                <div className="h-1.5 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                    <div
                        className={cn(
                            'h-full transition-all duration-300',
                            wordCountStatus?.status === 'good' && 'bg-green-500',
                            wordCountStatus?.status === 'short' && 'bg-red-500',
                            wordCountStatus?.status === 'almost' && 'bg-yellow-500',
                            wordCountStatus?.status === 'long' && 'bg-orange-500',
                            wordCountStatus?.status === 'empty' && 'bg-gray-300'
                        )}
                        style={{
                            width: `${Math.min((wordCount / wordCountTarget.max) * 100, 100)}%`
                        }}
                    />
                </div>
            )}
        </div>
    );
}

export default TextAnswerInput;
