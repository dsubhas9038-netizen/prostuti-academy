'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
    Calendar,
    Star,
    ChevronDown,
    ChevronUp,
    BookOpen,
    Eye,
    Bookmark
} from 'lucide-react';
import { Question, questionTypeLabels } from '@/types';
import { yearColors, importanceConfig, getImportanceLevel } from '@/types/pyq';
import { Card, CardBody, Badge, Button } from '@/components/ui';
import { cn } from '@/lib/utils';

interface PYQQuestionCardProps {
    question: Question;
    index?: number;
    showAnswer?: boolean;
    onToggleAnswer?: () => void;
    onBookmark?: (questionId: string) => void;
    isBookmarked?: boolean;
    className?: string;
}

function PYQQuestionCard({
    question,
    index,
    showAnswer = false,
    onToggleAnswer,
    onBookmark,
    isBookmarked = false,
    className,
}: PYQQuestionCardProps) {
    const [expanded, setExpanded] = useState(showAnswer);

    const typeInfo = questionTypeLabels[question.type];
    const importance = getImportanceLevel(question.yearsAsked.length);
    const importanceInfo = importanceConfig[importance];

    // Handle toggle
    const handleToggle = () => {
        setExpanded(!expanded);
        onToggleAnswer?.();
    };

    return (
        <Card className={cn(
            'overflow-hidden transition-all',
            importance === 'very-high' && 'border-l-4 border-l-red-500',
            importance === 'high' && 'border-l-4 border-l-yellow-500',
            className
        )}>
            <CardBody>
                {/* Header */}
                <div className="flex items-start justify-between gap-4 mb-3">
                    <div className="flex items-start gap-3">
                        {/* Question Number */}
                        {index !== undefined && (
                            <div
                                className="w-10 h-10 rounded-lg flex items-center justify-center text-white font-bold text-sm flex-shrink-0"
                                style={{ backgroundColor: typeInfo.color }}
                            >
                                {index + 1}
                            </div>
                        )}

                        <div>
                            {/* Badges */}
                            <div className="flex items-center gap-2 flex-wrap mb-2">
                                <Badge
                                    size="sm"
                                    style={{ backgroundColor: `${typeInfo.color}20`, color: typeInfo.color }}
                                >
                                    {typeInfo.bn}
                                </Badge>
                                <span className="text-sm font-medium text-gray-500">
                                    {question.marks} marks
                                </span>
                                <Badge
                                    size="sm"
                                    style={{ backgroundColor: importanceInfo.bg, color: importanceInfo.color }}
                                >
                                    {question.yearsAsked.length}x Asked
                                </Badge>
                            </div>
                        </div>
                    </div>

                    {/* Bookmark */}
                    <button
                        onClick={() => onBookmark?.(question.id)}
                        className={cn(
                            'p-2 rounded-lg transition-colors',
                            isBookmarked
                                ? 'text-yellow-500 bg-yellow-100 dark:bg-yellow-900/30'
                                : 'text-gray-400 hover:text-yellow-500 hover:bg-gray-100 dark:hover:bg-gray-800'
                        )}
                    >
                        <Bookmark className={cn('h-5 w-5', isBookmarked && 'fill-current')} />
                    </button>
                </div>

                {/* Question Text */}
                <div className="mb-4">
                    <p className="text-base font-medium text-gray-900 dark:text-white font-bengali leading-relaxed">
                        {question.questionBn || question.question}
                    </p>
                    {question.questionBn && question.question && (
                        <p className="text-sm text-gray-500 mt-1">
                            {question.question}
                        </p>
                    )}
                </div>

                {/* Years Asked */}
                <div className="flex items-center gap-2 mb-4">
                    <Calendar className="h-4 w-4 text-gray-400" />
                    <div className="flex items-center gap-1 flex-wrap">
                        {question.yearsAsked.map((year) => {
                            const yearConfig = yearColors[year] || yearColors[2019];
                            return (
                                <span
                                    key={year}
                                    className={cn(
                                        'text-xs px-2 py-0.5 rounded font-medium',
                                        yearConfig.bg,
                                        yearConfig.text
                                    )}
                                >
                                    {year}
                                </span>
                            );
                        })}
                    </div>
                </div>

                {/* Toggle Answer Button */}
                <Button
                    variant="outline"
                    size="sm"
                    onClick={handleToggle}
                    className="w-full"
                    rightIcon={expanded ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
                >
                    {expanded ? 'Hide Answer' : 'Show Answer'}
                </Button>

                {/* Answer Section */}
                {expanded && (
                    <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
                        <h4 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2 flex items-center gap-2">
                            <Eye className="h-4 w-4" />
                            Ideal Answer
                        </h4>
                        <div className="p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
                            <p className="text-sm text-gray-700 dark:text-gray-300 font-bengali leading-relaxed">
                                {question.answerBn || question.answer}
                            </p>
                        </div>

                        {/* Key Points */}
                        {question.keyPoints && question.keyPoints.length > 0 && (
                            <div className="mt-3">
                                <h5 className="text-xs font-semibold text-gray-500 mb-2">Key Points:</h5>
                                <ul className="space-y-1">
                                    {question.keyPoints.slice(0, 4).map((kp, i) => (
                                        <li key={i} className="text-xs text-gray-600 dark:text-gray-400 flex items-start gap-2">
                                            <span className="text-green-500">•</span>
                                            <span className="font-bengali">{kp.pointBn || kp.point}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        )}

                        {/* Examiner Tips */}
                        {question.examinerTipsBn && (
                            <div className="mt-3 p-2 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg">
                                <p className="text-xs text-yellow-700 dark:text-yellow-400 font-bengali">
                                    💡 Tip: {question.examinerTipsBn}
                                </p>
                            </div>
                        )}
                    </div>
                )}
            </CardBody>
        </Card>
    );
}

export default PYQQuestionCard;
