'use client';

import React from 'react';
import Link from 'next/link';
import {
    BookOpen,
    TrendingUp,
    Star,
    ChevronRight,
    Flame
} from 'lucide-react';
import { ChapterPYQStats } from '@/types/pyq';
import { Card, CardBody, CardHeader, Badge, ProgressBar } from '@/components/ui';
import { cn } from '@/lib/utils';

interface ChapterWiseAnalysisProps {
    chapters: ChapterPYQStats[];
    subjectColor?: string;
    maxChapters?: number;
    showViewAll?: boolean;
    onViewAll?: () => void;
    className?: string;
}

function ChapterWiseAnalysis({
    chapters,
    subjectColor = '#3B82F6',
    maxChapters = 6,
    showViewAll = true,
    onViewAll,
    className,
}: ChapterWiseAnalysisProps) {
    const displayedChapters = chapters.slice(0, maxChapters);
    const maxQuestions = Math.max(...chapters.map(c => c.totalQuestions), 1);

    return (
        <Card className={className}>
            <CardHeader
                title="Chapter-wise Analysis"
                subtitle="অধ্যায় ভিত্তিক বিশ্লেষণ"
                icon={<BookOpen className="h-5 w-5 text-purple-500" />}
                action={
                    showViewAll && chapters.length > maxChapters && (
                        <button
                            onClick={onViewAll}
                            className="text-sm text-blue-600 hover:text-blue-700 flex items-center gap-1"
                        >
                            View All <ChevronRight className="h-4 w-4" />
                        </button>
                    )
                }
            />
            <CardBody>
                <div className="grid md:grid-cols-2 gap-4">
                    {displayedChapters.map((chapter, index) => {
                        const questionPercentage = (chapter.totalQuestions / maxQuestions) * 100;

                        return (
                            <div
                                key={chapter.chapterId}
                                className={cn(
                                    'p-4 rounded-xl border-2 transition-all',
                                    chapter.isPredictedHot
                                        ? 'border-orange-300 bg-orange-50 dark:bg-orange-900/10 dark:border-orange-800'
                                        : 'border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600'
                                )}
                            >
                                {/* Header */}
                                <div className="flex items-start justify-between mb-3">
                                    <div className="flex items-center gap-2">
                                        <span
                                            className="w-8 h-8 rounded-lg flex items-center justify-center text-white font-bold text-sm"
                                            style={{ backgroundColor: subjectColor }}
                                        >
                                            {index + 1}
                                        </span>
                                        <div>
                                            <h4 className="font-medium text-gray-900 dark:text-white">
                                                {chapter.chapterTitleBn}
                                            </h4>
                                            <p className="text-xs text-gray-500">
                                                {chapter.chapterTitle}
                                            </p>
                                        </div>
                                    </div>
                                    {chapter.isPredictedHot && (
                                        <Badge variant="warning" size="sm" className="flex items-center gap-1">
                                            <Flame className="h-3 w-3" />
                                            Hot
                                        </Badge>
                                    )}
                                </div>

                                {/* Stats */}
                                <div className="grid grid-cols-2 gap-3 mb-3">
                                    <div className="text-center p-2 bg-white dark:bg-gray-900 rounded-lg">
                                        <p className="text-lg font-bold text-gray-900 dark:text-white">
                                            {chapter.totalQuestions}
                                        </p>
                                        <p className="text-xs text-gray-500">Questions</p>
                                    </div>
                                    <div className="text-center p-2 bg-white dark:bg-gray-900 rounded-lg">
                                        <p className="text-lg font-bold text-gray-900 dark:text-white">
                                            {chapter.avgMarksPerYear}
                                        </p>
                                        <p className="text-xs text-gray-500">Avg Marks/Year</p>
                                    </div>
                                </div>

                                {/* Progress Bar */}
                                <div className="mb-2">
                                    <div className="flex justify-between text-xs mb-1">
                                        <span className="text-gray-500">Question Distribution</span>
                                        <span className="font-medium" style={{ color: subjectColor }}>
                                            {Math.round(questionPercentage)}%
                                        </span>
                                    </div>
                                    <div className="h-2 bg-gray-100 dark:bg-gray-800 rounded-full overflow-hidden">
                                        <div
                                            className="h-full rounded-full transition-all duration-500"
                                            style={{
                                                width: `${questionPercentage}%`,
                                                backgroundColor: subjectColor
                                            }}
                                        />
                                    </div>
                                </div>

                                {/* Years Asked */}
                                <div className="flex items-center gap-1 flex-wrap">
                                    {chapter.yearsAsked.slice(-4).map(year => (
                                        <span
                                            key={year}
                                            className="text-xs px-1.5 py-0.5 bg-gray-100 dark:bg-gray-800 rounded text-gray-600 dark:text-gray-400"
                                        >
                                            {year}
                                        </span>
                                    ))}
                                    {chapter.yearsAsked.length > 4 && (
                                        <span className="text-xs text-gray-400">
                                            +{chapter.yearsAsked.length - 4}
                                        </span>
                                    )}
                                </div>

                                {/* Predicted Marks */}
                                {chapter.isPredictedHot && (
                                    <div className="mt-3 pt-3 border-t border-orange-200 dark:border-orange-800">
                                        <div className="flex items-center justify-between text-sm">
                                            <span className="text-gray-500">Predicted 2024</span>
                                            <span className="font-bold text-orange-600">
                                                ~{chapter.predictedMarks} marks
                                            </span>
                                        </div>
                                    </div>
                                )}
                            </div>
                        );
                    })}
                </div>
            </CardBody>
        </Card>
    );
}

export default ChapterWiseAnalysis;
