'use client';

import React from 'react';
import Link from 'next/link';
import {
    FileQuestion,
    ChevronRight,
    TrendingUp,
    User,
    BarChart3,
    CheckCircle
} from 'lucide-react';
import { Chapter } from '@/types';
import { Card, CardBody, Badge, ProgressBar } from '@/components/ui';
import { cn } from '@/lib/utils';

interface ChapterCardProps {
    chapter: Chapter;
    subjectId: string;
    subjectColor?: string;
    progress?: number;
    isCompleted?: boolean;
    variant?: 'default' | 'compact' | 'detailed';
    className?: string;
}

function ChapterCard({
    chapter,
    subjectId,
    subjectColor = '#2563EB',
    progress = 0,
    isCompleted = false,
    variant = 'default',
    className,
}: ChapterCardProps) {
    const href = `/subjects/${subjectId}/${chapter.id}`;

    // Determine importance level based on PYQ stats
    const getImportanceLevel = () => {
        const avgMarks = chapter.pyqStats.avgMarksPerYear;
        if (avgMarks >= 10) return { label: 'Very Important', labelBn: 'অতি গুরুত্বপূর্ণ', color: 'error' };
        if (avgMarks >= 7) return { label: 'Important', labelBn: 'গুরুত্বপূর্ণ', color: 'warning' };
        return { label: 'Moderate', labelBn: 'মাঝারি', color: 'info' };
    };

    const importance = getImportanceLevel();

    // Compact variant
    if (variant === 'compact') {
        return (
            <Link href={href}>
                <Card
                    hoverable
                    clickable
                    className={cn(
                        'relative',
                        isCompleted && 'border-green-500/30 bg-green-50/50 dark:bg-green-900/10',
                        className
                    )}
                >
                    <CardBody className="flex items-center gap-3 py-3">
                        {/* Chapter Number */}
                        <div
                            className="w-10 h-10 rounded-lg flex items-center justify-center text-sm font-bold text-white flex-shrink-0"
                            style={{ backgroundColor: subjectColor }}
                        >
                            {chapter.chapterNumber}
                        </div>

                        {/* Title */}
                        <div className="flex-1 min-w-0">
                            <h3 className="font-medium text-gray-900 dark:text-white truncate">
                                {chapter.titleBn}
                            </h3>
                            <p className="text-xs text-gray-500 truncate">
                                {chapter.totalQuestions} questions
                            </p>
                        </div>

                        {/* Status */}
                        {isCompleted ? (
                            <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0" />
                        ) : (
                            <ChevronRight className="h-5 w-5 text-gray-400 flex-shrink-0" />
                        )}
                    </CardBody>
                </Card>
            </Link>
        );
    }

    // Detailed variant
    if (variant === 'detailed') {
        return (
            <Link href={href}>
                <Card
                    hoverable
                    clickable
                    className={cn('h-full', className)}
                >
                    <CardBody>
                        {/* Header */}
                        <div className="flex items-start gap-4 mb-4">
                            <div
                                className="w-12 h-12 rounded-xl flex items-center justify-center text-lg font-bold text-white flex-shrink-0"
                                style={{ backgroundColor: subjectColor }}
                            >
                                {chapter.chapterNumber}
                            </div>
                            <div className="flex-1 min-w-0">
                                <h3 className="font-semibold text-gray-900 dark:text-white mb-1">
                                    {chapter.titleBn}
                                </h3>
                                <p className="text-sm text-gray-500">
                                    {chapter.title}
                                </p>
                                {chapter.authorBn && (
                                    <div className="flex items-center gap-1 mt-1 text-xs text-gray-500">
                                        <User className="h-3 w-3" />
                                        <span>{chapter.authorBn}</span>
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Stats */}
                        <div className="grid grid-cols-2 gap-3 mb-4">
                            <div className="flex items-center gap-2 text-sm text-gray-500">
                                <FileQuestion className="h-4 w-4" />
                                <span>{chapter.totalQuestions} Questions</span>
                            </div>
                            <div className="flex items-center gap-2 text-sm text-gray-500">
                                <BarChart3 className="h-4 w-4" />
                                <span>Avg. {chapter.pyqStats.avgMarksPerYear} marks/yr</span>
                            </div>
                        </div>

                        {/* PYQ Info */}
                        <div className="flex items-center justify-between mb-4">
                            <Badge variant={importance.color as any} size="sm">
                                <TrendingUp className="h-3 w-3 mr-1" />
                                {importance.labelBn}
                            </Badge>
                            <span className="text-xs text-gray-500">
                                Last asked: {chapter.pyqStats.yearsAsked[0]}
                            </span>
                        </div>

                        {/* Progress */}
                        <div>
                            <div className="flex items-center justify-between text-sm mb-2">
                                <span className="text-gray-500">Progress</span>
                                <span className="font-medium text-gray-900 dark:text-white">{progress}%</span>
                            </div>
                            <ProgressBar
                                value={progress}
                                size="sm"
                                variant={progress === 100 ? 'success' : 'default'}
                            />
                        </div>
                    </CardBody>
                </Card>
            </Link>
        );
    }

    // Default variant
    return (
        <Link href={href}>
            <Card
                hoverable
                clickable
                className={cn(
                    'group relative overflow-hidden',
                    isCompleted && 'border-green-500/30',
                    className
                )}
            >
                {/* Left color bar */}
                <div
                    className="absolute left-0 top-0 bottom-0 w-1"
                    style={{ backgroundColor: subjectColor }}
                />

                <CardBody className="pl-5">
                    {/* Header Row */}
                    <div className="flex items-start gap-3 mb-3">
                        <div
                            className="w-10 h-10 rounded-lg flex items-center justify-center text-sm font-bold text-white flex-shrink-0 group-hover:scale-110 transition-transform"
                            style={{ backgroundColor: subjectColor }}
                        >
                            {chapter.chapterNumber}
                        </div>
                        <div className="flex-1 min-w-0">
                            <h3 className="font-semibold text-gray-900 dark:text-white mb-0.5">
                                {chapter.titleBn}
                            </h3>
                            <p className="text-sm text-gray-500 truncate">
                                {chapter.title}
                            </p>
                        </div>
                        {isCompleted ? (
                            <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0" />
                        ) : (
                            <ChevronRight className="h-5 w-5 text-gray-400 flex-shrink-0 group-hover:translate-x-1 transition-transform" />
                        )}
                    </div>

                    {/* Author (if exists) */}
                    {chapter.authorBn && (
                        <div className="flex items-center gap-1.5 text-xs text-gray-500 mb-3">
                            <User className="h-3.5 w-3.5" />
                            <span>{chapter.authorBn}</span>
                        </div>
                    )}

                    {/* Stats Row */}
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <span className="text-xs text-gray-500">
                                {chapter.totalQuestions} questions
                            </span>
                            <Badge variant={importance.color as any} size="sm">
                                {importance.labelBn}
                            </Badge>
                        </div>
                        <span className="text-xs font-medium" style={{ color: subjectColor }}>
                            {progress}% done
                        </span>
                    </div>
                </CardBody>
            </Card>
        </Link>
    );
}

export default ChapterCard;
