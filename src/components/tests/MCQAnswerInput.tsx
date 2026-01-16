'use client';

import React from 'react';
import { Check, Circle } from 'lucide-react';
import { McqOption } from '@/types';
import { cn } from '@/lib/utils';

interface MCQAnswerInputProps {
    options: McqOption[];
    selectedOption: number | null;
    onSelect: (optionIndex: number) => void;
    disabled?: boolean;
    showCorrectAnswer?: boolean;
    className?: string;
}

function MCQAnswerInput({
    options,
    selectedOption,
    onSelect,
    disabled = false,
    showCorrectAnswer = false,
    className,
}: MCQAnswerInputProps) {
    const optionLabels = ['A', 'B', 'C', 'D', 'E', 'F'];

    return (
        <div className={cn('space-y-3', className)}>
            {options.map((option, index) => {
                const isSelected = selectedOption === index;
                const isCorrect = showCorrectAnswer && option.isCorrect;
                const isWrong = showCorrectAnswer && isSelected && !option.isCorrect;

                return (
                    <button
                        key={index}
                        onClick={() => !disabled && onSelect(index)}
                        disabled={disabled}
                        className={cn(
                            'w-full flex items-center gap-4 p-4 rounded-xl border-2 text-left transition-all',
                            'focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2',
                            disabled && 'cursor-not-allowed opacity-70',
                            // Selected state
                            isSelected && !showCorrectAnswer && 'border-blue-500 bg-blue-50 dark:bg-blue-900/20',
                            // Correct answer state
                            isCorrect && 'border-green-500 bg-green-50 dark:bg-green-900/20',
                            // Wrong answer state  
                            isWrong && 'border-red-500 bg-red-50 dark:bg-red-900/20',
                            // Default state
                            !isSelected && !isCorrect && !isWrong && 'border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-800'
                        )}
                    >
                        {/* Option Label */}
                        <div
                            className={cn(
                                'w-10 h-10 rounded-lg flex items-center justify-center font-bold text-lg flex-shrink-0 transition-colors',
                                isSelected && !showCorrectAnswer && 'bg-blue-500 text-white',
                                isCorrect && 'bg-green-500 text-white',
                                isWrong && 'bg-red-500 text-white',
                                !isSelected && !isCorrect && !isWrong && 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400'
                            )}
                        >
                            {optionLabels[index]}
                        </div>

                        {/* Option Text */}
                        <div className="flex-1">
                            <span className={cn(
                                'font-medium font-bengali',
                                isSelected ? 'text-gray-900 dark:text-white' : 'text-gray-700 dark:text-gray-300'
                            )}>
                                {option.textBn || option.text}
                            </span>
                        </div>

                        {/* Status Icon */}
                        <div className="flex-shrink-0">
                            {isSelected && !showCorrectAnswer && (
                                <div className="w-6 h-6 rounded-full bg-blue-500 flex items-center justify-center">
                                    <Check className="h-4 w-4 text-white" />
                                </div>
                            )}
                            {isCorrect && (
                                <div className="w-6 h-6 rounded-full bg-green-500 flex items-center justify-center">
                                    <Check className="h-4 w-4 text-white" />
                                </div>
                            )}
                            {isWrong && (
                                <div className="w-6 h-6 rounded-full bg-red-500 flex items-center justify-center">
                                    <span className="text-white text-sm font-bold">✕</span>
                                </div>
                            )}
                            {!isSelected && !isCorrect && !isWrong && (
                                <Circle className="h-6 w-6 text-gray-300 dark:text-gray-600" />
                            )}
                        </div>
                    </button>
                );
            })}
        </div>
    );
}

export default MCQAnswerInput;
