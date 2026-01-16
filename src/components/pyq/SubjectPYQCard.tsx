'use client';

import React from 'react';
import Link from 'next/link';
import {
    FileQuestion,
    TrendingUp,
    Star,
    ChevronRight,
    Flame,
    BookOpen
} from 'lucide-react';
import { SubjectPYQAnalysis } from '@/types/pyq';
import { Card, CardBody, Badge, ProgressBar } from '@/components/ui';
import { cn } from '@/lib/utils';

interface SubjectPYQCardProps {
    subject: SubjectPYQAnalysis;
    variant?: 'default' | 'compact';
    className?: string;
}

function SubjectPYQCard({
    subject,
    variant = 'default',
    className,
}: SubjectPYQCardProps) {
    const topTopic = subject.topTopics[0];
    const hotChaptersCount = subject.hotChapters.length;

    // Compact variant
    if (variant === 'compact') {
        return (
            <Link href={`/pyq/${subject.subjectId}`}>
                <Card className={cn('hover:shadow-md transition-all cursor-pointer', className)}>
                    <CardBody className="p-4">
                        <div className="flex items-center gap-3">
                            <div
                                className="w-10 h-10 rounded-lg flex items-center justify-center"
                                style={{ backgroundColor: `${subject.color}20` }}
                            >
                                <BookOpen className="h-5 w-5" style={{ color: subject.color }} />
                            </div>
                            <div className="flex-1 min-w-0">
                                <h3 className="font-medium text-gray-900 dark:text-white truncate">
                                    {subject.subjectNameBn}
                                </h3>
                                <p className="text-sm text-gray-500">
                                    {subject.totalQuestions} questions
                                </p>
                            </div>
                            <ChevronRight className="h-5 w-5 text-gray-400" />
                        </div>
                    </CardBody>
                </Card>
            </Link>
        );
    }

    // Default variant
    return (
        <Card className={cn('overflow-hidden hover:shadow-lg transition-all', className)}>
            {/* Header */}
            <div
                className="p-4"
                style={{ backgroundColor: `${subject.color}10` }}
            >
                <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center gap-3">
                        <div
                            className="w-12 h-12 rounded-xl flex items-center justify-center"
                            style={{ backgroundColor: `${subject.color}20` }}
                        >
                            <BookOpen className="h-6 w-6" style={{ color: subject.color }} />
                        </div>
                        <div>
                            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                                {subject.subjectNameBn}
                            </h3>
                            <p className="text-sm text-gray-500">
                                {subject.subjectName}
                            </p>
                        </div>
                    </div>
                    {hotChaptersCount > 0 && (
                        <Badge variant="warning" className="flex items-center gap-1">
                            <Flame className="h-3 w-3" />
                            {hotChaptersCount} Hot
                        </Badge>
                    )}
                </div>
            </div>

            <CardBody>
                {/* Stats Grid */}
                <div className="grid grid-cols-3 gap-3 mb-4">
                    <div className="text-center p-2 bg-gray-50 dark:bg-gray-800 rounded-lg">
                        <div className="flex items-center justify-center gap-1 mb-1">
                            <FileQuestion className="h-4 w-4 text-gray-400" />
                            <span className="font-bold text-gray-900 dark:text-white">{subject.totalQuestions}</span>
                        </div>
                        <span className="text-xs text-gray-500">Questions</span>
                    </div>
                    <div className="text-center p-2 bg-gray-50 dark:bg-gray-800 rounded-lg">
                        <div className="flex items-center justify-center gap-1 mb-1">
                            <TrendingUp className="h-4 w-4 text-gray-400" />
                            <span className="font-bold text-gray-900 dark:text-white">{subject.repeatPercentage}%</span>
                        </div>
                        <span className="text-xs text-gray-500">Repeat</span>
                    </div>
                    <div className="text-center p-2 bg-gray-50 dark:bg-gray-800 rounded-lg">
                        <div className="flex items-center justify-center gap-1 mb-1">
                            <Star className="h-4 w-4 text-yellow-500 fill-yellow-500" />
                            <span className="font-bold text-gray-900 dark:text-white">{subject.topTopics.length}</span>
                        </div>
                        <span className="text-xs text-gray-500">Topics</span>
                    </div>
                </div>

                {/* Top Topic Preview */}
                {topTopic && (
                    <div className="p-3 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg mb-4">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-xs text-yellow-600 mb-1">Most Asked Topic</p>
                                <p className="text-sm font-medium text-gray-900 dark:text-white font-bengali">
                                    {topTopic.topicBn}
                                </p>
                            </div>
                            <Badge variant="warning" size="sm">
                                {topTopic.frequency}x
                            </Badge>
                        </div>
                    </div>
                )}

                {/* Years Analyzed */}
                <div className="flex items-center gap-1 mb-4">
                    <span className="text-xs text-gray-500 mr-2">Years:</span>
                    {subject.yearsAnalyzed.slice(-4).map(year => (
                        <span
                            key={year}
                            className="text-xs px-1.5 py-0.5 bg-gray-100 dark:bg-gray-800 rounded text-gray-600 dark:text-gray-400"
                        >
                            {year}
                        </span>
                    ))}
                </div>

                {/* CTA */}
                <Link href={`/pyq/${subject.subjectId}`}>
                    <button
                        className="w-full py-2.5 rounded-lg font-medium text-white transition-colors flex items-center justify-center gap-2"
                        style={{ backgroundColor: subject.color }}
                    >
                        View Analysis
                        <ChevronRight className="h-4 w-4" />
                    </button>
                </Link>
            </CardBody>
        </Card>
    );
}

export default SubjectPYQCard;
