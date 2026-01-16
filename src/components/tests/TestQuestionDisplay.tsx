'use client';

import React from 'react';
import { FileQuestion, Star, Calendar, HelpCircle } from 'lucide-react';
import { Question, questionTypeLabels } from '@/types';
import { Badge, Card, CardBody } from '@/components/ui';
import { cn } from '@/lib/utils';

interface TestQuestionDisplayProps {
    question: Question;
    questionNumber: number;
    totalQuestions: number;
    showHints?: boolean;
    className?: string;
}

function TestQuestionDisplay({
    question,
    questionNumber,
    totalQuestions,
    showHints = false,
    className,
}: TestQuestionDisplayProps) {
    const typeInfo = questionTypeLabels[question.type];

    return (
        <Card className={cn('overflow-hidden', className)}>
            <CardBody>
                {/* Question Header */}
                <div className="flex items-start justify-between gap-4 mb-4">
                    {/* Left: Question Number & Type */}
                    <div className="flex items-start gap-3">
                        <div
                            className="w-12 h-12 rounded-xl flex items-center justify-center text-lg font-bold text-white flex-shrink-0"
                            style={{ backgroundColor: typeInfo.color }}
                        >
                            {questionNumber}
                        </div>

                        <div className="pt-1">
                            <div className="flex items-center gap-2 flex-wrap mb-1">
                                <Badge
                                    size="sm"
                                    style={{ backgroundColor: `${typeInfo.color}20`, color: typeInfo.color }}
                                >
                                    {typeInfo.bn}
                                </Badge>
                                <span className="text-sm font-medium text-gray-500">
                                    {question.marks} marks
                                </span>
                                {question.isImportant && (
                                    <Badge variant="warning" size="sm">
                                        <Star className="h-3 w-3 mr-1 fill-current" />
                                        Important
                                    </Badge>
                                )}
                            </div>

                            {/* PYQ Years */}
                            {question.isPYQ && question.yearsAsked.length > 0 && (
                                <div className="flex items-center gap-1 mt-1">
                                    <Calendar className="h-3.5 w-3.5 text-gray-400" />
                                    <div className="flex items-center gap-1 flex-wrap">
                                        {question.yearsAsked.slice(0, 3).map((year) => (
                                            <span
                                                key={year}
                                                className="text-xs px-1.5 py-0.5 bg-blue-100 dark:bg-blue-900/30 text-blue-600 rounded"
                                            >
                                                {year}
                                            </span>
                                        ))}
                                        {question.yearsAsked.length > 3 && (
                                            <span className="text-xs text-gray-500">
                                                +{question.yearsAsked.length - 3}
                                            </span>
                                        )}
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Right: Question Count */}
                    <div className="text-right">
                        <span className="text-sm text-gray-500">
                            Question <span className="font-bold text-gray-900 dark:text-white">{questionNumber}</span>
                            <span className="mx-1">/</span>
                            {totalQuestions}
                        </span>
                    </div>
                </div>

                {/* Question Text */}
                <div className="mb-4">
                    <h2 className="text-lg font-medium text-gray-900 dark:text-white font-bengali leading-relaxed">
                        {question.questionBn || question.question}
                    </h2>
                    {question.questionBn && question.question && (
                        <p className="text-sm text-gray-500 mt-2">
                            {question.question}
                        </p>
                    )}
                </div>

                {/* Word Count Target (for SAQ/LAQ) */}
                {question.type !== 'mcq' && question.wordCount && (
                    <div className="p-3 bg-gray-50 dark:bg-gray-800 rounded-lg mb-4">
                        <div className="flex items-center gap-2 text-sm">
                            <FileQuestion className="h-4 w-4 text-gray-400" />
                            <span className="text-gray-600 dark:text-gray-400">
                                Suggested word count:
                                <span className="font-medium text-gray-900 dark:text-white ml-1">
                                    {question.wordCount.min}-{question.wordCount.max} words
                                </span>
                            </span>
                        </div>
                    </div>
                )}

                {/* Hints (optional) */}
                {showHints && question.hints && question.hints.length > 0 && (
                    <div className="p-3 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg border border-yellow-200 dark:border-yellow-800">
                        <div className="flex items-start gap-2">
                            <HelpCircle className="h-4 w-4 text-yellow-600 flex-shrink-0 mt-0.5" />
                            <div>
                                <span className="text-sm font-medium text-yellow-800 dark:text-yellow-400">
                                    Hint:
                                </span>
                                <span className="text-sm text-yellow-700 dark:text-yellow-300 ml-1 font-bengali">
                                    {question.hints[0].hintBn || question.hints[0].hint}
                                </span>
                            </div>
                        </div>
                    </div>
                )}
            </CardBody>
        </Card>
    );
}

export default TestQuestionDisplay;
