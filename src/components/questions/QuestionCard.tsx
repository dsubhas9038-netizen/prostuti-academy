'use client';

import React, { useState } from 'react';
import {
    FileQuestion,
    Bookmark,
    Calendar,
    TrendingUp,
    Star,
    AlertCircle
} from 'lucide-react';
import { Question, questionTypeLabels } from '@/types';
import { Card, CardBody, Badge } from '@/components/ui';
import SmartAnswerCard from './SmartAnswerCard';
import { cn } from '@/lib/utils';

interface QuestionCardProps {
    question: Question;
    index?: number;
    showAnswer?: boolean;
    isBookmarked?: boolean;
    onBookmarkToggle?: () => void;
    variant?: 'default' | 'compact';
    className?: string;
}

function QuestionCard({
    question,
    index = 1,
    showAnswer = false,
    isBookmarked = false,
    onBookmarkToggle,
    variant = 'default',
    className,
}: QuestionCardProps) {
    const [answerExpanded, setAnswerExpanded] = useState(showAnswer);

    const typeInfo = questionTypeLabels[question.type];

    // Importance badge
    const getImportanceBadge = () => {
        if (question.importance >= 5) {
            return { label: 'Very Important', labelBn: 'অতি গুরুত্বপূর্ণ', variant: 'error' as const };
        }
        if (question.importance >= 4) {
            return { label: 'Important', labelBn: 'গুরুত্বপূর্ণ', variant: 'warning' as const };
        }
        return null;
    };

    const importance = getImportanceBadge();

    // Compact variant
    if (variant === 'compact') {
        return (
            <Card className={cn('hover:shadow-md transition-shadow', className)}>
                <CardBody className="py-3">
                    <div className="flex items-start gap-3">
                        {/* Question Number */}
                        <div
                            className="w-8 h-8 rounded-lg flex items-center justify-center text-sm font-bold text-white flex-shrink-0"
                            style={{ backgroundColor: typeInfo.color }}
                        >
                            {index}
                        </div>

                        {/* Content */}
                        <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium text-gray-900 dark:text-white font-bengali line-clamp-2">
                                {question.questionBn || question.question}
                            </p>
                            <div className="flex items-center gap-2 mt-1.5">
                                <Badge
                                    size="sm"
                                    style={{ backgroundColor: `${typeInfo.color}20`, color: typeInfo.color }}
                                >
                                    {typeInfo.bn}
                                </Badge>
                                <span className="text-xs text-gray-500">{question.marks} marks</span>
                                {question.isPYQ && (
                                    <Badge size="sm" variant="info">PYQ</Badge>
                                )}
                            </div>
                        </div>

                        {/* Bookmark */}
                        <button
                            onClick={onBookmarkToggle}
                            className="p-1 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
                        >
                            <Bookmark
                                className={cn(
                                    'h-5 w-5',
                                    isBookmarked ? 'fill-blue-500 text-blue-500' : 'text-gray-400'
                                )}
                            />
                        </button>
                    </div>
                </CardBody>
            </Card>
        );
    }

    // Default variant
    return (
        <Card className={cn('overflow-hidden', className)}>
            <CardBody>
                {/* Header Row */}
                <div className="flex items-start justify-between gap-4 mb-4">
                    <div className="flex items-start gap-3">
                        {/* Question Number */}
                        <div
                            className="w-10 h-10 rounded-xl flex items-center justify-center text-lg font-bold text-white flex-shrink-0"
                            style={{ backgroundColor: typeInfo.color }}
                        >
                            {index}
                        </div>

                        {/* Type and Marks */}
                        <div>
                            <div className="flex items-center gap-2 flex-wrap">
                                <Badge
                                    size="sm"
                                    style={{ backgroundColor: `${typeInfo.color}20`, color: typeInfo.color }}
                                >
                                    {typeInfo.bn}
                                </Badge>
                                <span className="text-sm font-medium text-gray-500">
                                    {question.marks} marks
                                </span>
                                {importance && (
                                    <Badge variant={importance.variant} size="sm">
                                        <Star className="h-3 w-3 mr-1" />
                                        {importance.labelBn}
                                    </Badge>
                                )}
                            </div>

                            {/* PYQ Years */}
                            {question.isPYQ && question.yearsAsked.length > 0 && (
                                <div className="flex items-center gap-1 mt-1.5">
                                    <Calendar className="h-3.5 w-3.5 text-gray-400" />
                                    <div className="flex items-center gap-1 flex-wrap">
                                        {question.yearsAsked.slice(0, 4).map((year) => (
                                            <span
                                                key={year}
                                                className="text-xs px-1.5 py-0.5 bg-blue-100 dark:bg-blue-900/30 text-blue-600 rounded"
                                            >
                                                {year}
                                            </span>
                                        ))}
                                        {question.yearsAsked.length > 4 && (
                                            <span className="text-xs text-gray-500">
                                                +{question.yearsAsked.length - 4} more
                                            </span>
                                        )}
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Bookmark Button */}
                    <button
                        onClick={onBookmarkToggle}
                        className={cn(
                            'p-2 rounded-lg transition-all',
                            isBookmarked
                                ? 'bg-blue-100 dark:bg-blue-900/30'
                                : 'hover:bg-gray-100 dark:hover:bg-gray-800'
                        )}
                    >
                        <Bookmark
                            className={cn(
                                'h-5 w-5',
                                isBookmarked ? 'fill-blue-500 text-blue-500' : 'text-gray-400'
                            )}
                        />
                    </button>
                </div>

                {/* Question Text */}
                <div className="mb-4">
                    <h3 className="text-lg font-medium text-gray-900 dark:text-white font-bengali leading-relaxed">
                        {question.questionBn || question.question}
                    </h3>
                    {question.questionBn && question.question && (
                        <p className="text-sm text-gray-500 mt-1">
                            {question.question}
                        </p>
                    )}
                </div>

                {/* MCQ Options */}
                {question.type === 'mcq' && question.options && (
                    <div className="space-y-2 mb-4">
                        {question.options.map((option, idx) => (
                            <div
                                key={idx}
                                className={cn(
                                    'p-3 rounded-lg border transition-colors',
                                    option.isCorrect && answerExpanded
                                        ? 'border-green-500 bg-green-50 dark:bg-green-900/20'
                                        : 'border-gray-200 dark:border-gray-700'
                                )}
                            >
                                <span className="font-medium mr-2">
                                    {String.fromCharCode(65 + idx)}.
                                </span>
                                <span className="font-bengali">{option.textBn || option.text}</span>
                                {option.isCorrect && answerExpanded && (
                                    <span className="ml-2 text-green-600">✓</span>
                                )}
                            </div>
                        ))}
                    </div>
                )}

                {/* Hints */}
                {question.hints && question.hints.length > 0 && !answerExpanded && (
                    <div className="mb-4 p-3 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg">
                        <div className="flex items-start gap-2">
                            <AlertCircle className="h-4 w-4 text-yellow-600 flex-shrink-0 mt-0.5" />
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

                {/* Smart Answer Card */}
                <SmartAnswerCard
                    question={question}
                    isExpanded={answerExpanded}
                    onExpandToggle={() => setAnswerExpanded(!answerExpanded)}
                    isBookmarked={isBookmarked}
                    onBookmarkToggle={onBookmarkToggle}
                    showActions={false}
                />
            </CardBody>
        </Card>
    );
}

export default QuestionCard;
