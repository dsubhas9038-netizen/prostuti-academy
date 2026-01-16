'use client';

import React from 'react';
import Link from 'next/link';
import {
    ArrowLeft,
    FileQuestion,
    User,
    Calendar,
    TrendingUp,
    Bookmark,
    Share2,
    BarChart3,
    Clock
} from 'lucide-react';
import { Chapter, Subject } from '@/types';
import { Button, Badge, ProgressBar, Card, CardBody } from '@/components/ui';
import { cn } from '@/lib/utils';

interface ChapterHeaderProps {
    chapter: Chapter;
    subject: Subject;
    progress?: number;
    isBookmarked?: boolean;
    onBookmarkToggle?: () => void;
    className?: string;
}

function ChapterHeader({
    chapter,
    subject,
    progress = 0,
    isBookmarked = false,
    onBookmarkToggle,
    className,
}: ChapterHeaderProps) {
    // Get importance level
    const getImportanceLevel = () => {
        const avgMarks = chapter.pyqStats.avgMarksPerYear;
        if (avgMarks >= 10) return { label: 'Very Important', labelBn: 'অতি গুরুত্বপূর্ণ', variant: 'error' as const };
        if (avgMarks >= 7) return { label: 'Important', labelBn: 'গুরুত্বপূর্ণ', variant: 'warning' as const };
        return { label: 'Moderate', labelBn: 'মাঝারি', variant: 'info' as const };
    };

    const importance = getImportanceLevel();

    // Estimated reading time (2 min per question average)
    const estimatedTime = Math.round(chapter.totalQuestions * 2);
    const timeLabel = estimatedTime >= 60
        ? `${Math.round(estimatedTime / 60)} hr ${estimatedTime % 60} min`
        : `${estimatedTime} min`;

    return (
        <div className={cn('relative', className)}>
            {/* Back Navigation */}
            <Link
                href={`/subjects/${subject.id}`}
                className="inline-flex items-center gap-2 text-gray-500 hover:text-gray-900 dark:hover:text-white transition-colors mb-4"
            >
                <ArrowLeft className="h-4 w-4" />
                <span className="text-sm">Back to {subject.name}</span>
            </Link>

            {/* Main Header Card */}
            <Card className="overflow-hidden">
                {/* Color bar */}
                <div
                    className="h-2"
                    style={{ backgroundColor: subject.color }}
                />

                <CardBody className="p-6">
                    {/* Top Row: Chapter number + Actions */}
                    <div className="flex items-start justify-between gap-4 mb-4">
                        <div className="flex items-center gap-4">
                            {/* Chapter Number Badge */}
                            <div
                                className="w-14 h-14 rounded-xl flex items-center justify-center text-xl font-bold text-white flex-shrink-0"
                                style={{ backgroundColor: subject.color }}
                            >
                                {chapter.chapterNumber}
                            </div>

                            {/* Subject Tag */}
                            <div>
                                <div className="flex items-center gap-2 mb-1">
                                    <span className="text-lg">{subject.icon}</span>
                                    <span className="text-sm text-gray-500">
                                        {subject.nameBn} • Semester {chapter.semester}
                                    </span>
                                </div>
                                <Badge variant={importance.variant} size="sm">
                                    <TrendingUp className="h-3 w-3 mr-1" />
                                    {importance.labelBn}
                                </Badge>
                            </div>
                        </div>

                        {/* Action Buttons */}
                        <div className="flex items-center gap-2">
                            <Button
                                variant={isBookmarked ? 'primary' : 'outline'}
                                size="sm"
                                onClick={onBookmarkToggle}
                                leftIcon={<Bookmark className={cn('h-4 w-4', isBookmarked && 'fill-current')} />}
                            >
                                {isBookmarked ? 'Saved' : 'Save'}
                            </Button>
                            <Button
                                variant="ghost"
                                size="sm"
                                leftIcon={<Share2 className="h-4 w-4" />}
                            >
                                Share
                            </Button>
                        </div>
                    </div>

                    {/* Title */}
                    <h1 className="text-2xl lg:text-3xl font-bold text-gray-900 dark:text-white mb-2">
                        {chapter.titleBn}
                    </h1>
                    <p className="text-lg text-gray-500 mb-4">
                        {chapter.title}
                    </p>

                    {/* Author (if exists) */}
                    {chapter.authorBn && (
                        <div className="flex items-center gap-2 text-gray-500 mb-4">
                            <User className="h-4 w-4" />
                            <span>{chapter.authorBn}</span>
                            <span className="text-sm">({chapter.author})</span>
                        </div>
                    )}

                    {/* Description */}
                    {chapter.descriptionBn && (
                        <p className="text-gray-500 mb-6 font-bengali">
                            {chapter.descriptionBn}
                        </p>
                    )}

                    {/* Stats Row */}
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
                        <div className="flex items-center gap-3 p-3 bg-gray-100 dark:bg-gray-800 rounded-xl">
                            <FileQuestion className="h-5 w-5 text-blue-600" />
                            <div>
                                <p className="text-lg font-bold text-gray-900 dark:text-white">{chapter.totalQuestions}</p>
                                <p className="text-xs text-gray-500">Questions</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-3 p-3 bg-gray-100 dark:bg-gray-800 rounded-xl">
                            <Clock className="h-5 w-5 text-orange-500" />
                            <div>
                                <p className="text-lg font-bold text-gray-900 dark:text-white">{timeLabel}</p>
                                <p className="text-xs text-gray-500">Est. Time</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-3 p-3 bg-gray-100 dark:bg-gray-800 rounded-xl">
                            <BarChart3 className="h-5 w-5 text-purple-500" />
                            <div>
                                <p className="text-lg font-bold text-gray-900 dark:text-white">{chapter.pyqStats.avgMarksPerYear}</p>
                                <p className="text-xs text-gray-500">Avg Marks/Yr</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-3 p-3 bg-gray-100 dark:bg-gray-800 rounded-xl">
                            <Calendar className="h-5 w-5 text-green-500" />
                            <div>
                                <p className="text-lg font-bold text-gray-900 dark:text-white">{chapter.pyqStats.yearsAsked[0]}</p>
                                <p className="text-xs text-gray-500">Last Asked</p>
                            </div>
                        </div>
                    </div>

                    {/* Progress */}
                    <div>
                        <div className="flex items-center justify-between text-sm mb-2">
                            <span className="text-gray-500">Your Progress</span>
                            <span className="font-medium text-gray-900 dark:text-white">{progress}%</span>
                        </div>
                        <ProgressBar
                            value={progress}
                            size="md"
                            variant={progress === 100 ? 'success' : 'default'}
                        />
                    </div>
                </CardBody>
            </Card>
        </div>
    );
}

export default ChapterHeader;
