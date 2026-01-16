'use client';

import React from 'react';
import { Question, TestAnswer } from '@/types';
import MCQAnswerInput from './MCQAnswerInput';
import TextAnswerInput from './TextAnswerInput';
import { cn } from '@/lib/utils';

interface AnswerInputProps {
    question: Question;
    answer: TestAnswer | null;
    onAnswerChange: (answer: Partial<TestAnswer>) => void;
    disabled?: boolean;
    showCorrectAnswer?: boolean;
    className?: string;
}

function AnswerInput({
    question,
    answer,
    onAnswerChange,
    disabled = false,
    showCorrectAnswer = false,
    className,
}: AnswerInputProps) {
    // Handle MCQ selection
    const handleMCQSelect = (optionIndex: number) => {
        onAnswerChange({
            questionId: question.id,
            selectedOption: optionIndex,
            textAnswer: null,
            answeredAt: new Date(),
        });
    };

    // Handle text answer change
    const handleTextChange = (text: string) => {
        const wordCount = text.trim().split(/\s+/).filter(Boolean).length;
        onAnswerChange({
            questionId: question.id,
            selectedOption: null,
            textAnswer: text,
            wordCount,
            answeredAt: new Date(),
        });
    };

    return (
        <div className={cn('mt-4', className)}>
            {/* MCQ Answer */}
            {question.type === 'mcq' && question.options && (
                <MCQAnswerInput
                    options={question.options}
                    selectedOption={answer?.selectedOption ?? null}
                    onSelect={handleMCQSelect}
                    disabled={disabled}
                    showCorrectAnswer={showCorrectAnswer}
                />
            )}

            {/* Text Answer (SAQ/LAQ/VSAQ) */}
            {question.type !== 'mcq' && (
                <TextAnswerInput
                    value={answer?.textAnswer ?? ''}
                    onChange={handleTextChange}
                    questionType={question.type}
                    wordCountTarget={question.wordCount}
                    placeholder={
                        question.type === 'vsaq'
                            ? 'Write a brief answer...'
                            : question.type === 'saq'
                                ? 'Write your short answer here...'
                                : 'Write your detailed answer here...'
                    }
                    disabled={disabled}
                    autoSave={true}
                />
            )}
        </div>
    );
}

export default AnswerInput;
