'use client';

import React from 'react';
import Link from 'next/link';
import { BookOpen, FileQuestion, ChevronRight, TrendingUp } from 'lucide-react';
import { Subject } from '@/types';
import { Card, CardBody, ProgressBar, Badge } from '@/components/ui';
import { cn } from '@/lib/utils';

interface SubjectCardProps {
    subject: Subject;
    progress?: number;
    variant?: 'default' | 'compact' | 'detailed';
    showProgress?: boolean;
    className?: string;
}

function SubjectCard({
    subject,
    progress = 0,
    variant = 'default',
    showProgress = true,
    className,
}: SubjectCardProps) {
    // Compact variant (for grids with many items)
    if (variant === 'compact') {
        return (
            <Link href={`/subjects/${subject.id}`}>
                <Card hoverable clickable className={cn('text-center', className)}>
                    <CardBody className="py-6">
                        <span className="text-4xl mb-3 block">{subject.icon}</span>
                        <h3 className="font-semibold text-gray-900 dark:text-white mb-1">{subject.name}</h3>
                        <p className="text-sm text-gray-500 font-bengali">
                            {subject.nameBn}
                        </p>
                    </CardBody>
                </Card>
            </Link>
        );
    }

    // Detailed variant (for featured sections)
    if (variant === 'detailed') {
        return (
            <Link href={`/subjects/${subject.id}`}>
                <Card hoverable clickable className={cn('h-full', className)}>
                    <CardBody>
                        {/* Header */}
                        <div className="flex items-start gap-4 mb-4">
                            <div
                                className="w-14 h-14 rounded-xl flex items-center justify-center text-3xl"
                                style={{ backgroundColor: `${subject.color}15` }}
                            >
                                {subject.icon}
                            </div>
                            <div className="flex-1">
                                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                                    {subject.name}
                                </h3>
                                <p className="text-sm text-gray-500 font-bengali">
                                    {subject.nameBn}
                                </p>
                            </div>
                            <ChevronRight className="h-5 w-5 text-gray-400" />
                        </div>

                        {/* Stats */}
                        <div className="flex items-center gap-4 mb-4 text-sm">
                            <div className="flex items-center gap-1.5 text-gray-500">
                                <BookOpen className="h-4 w-4" />
                                <span>{subject.totalChapters} Chapters</span>
                            </div>
                            <div className="flex items-center gap-1.5 text-gray-500">
                                <FileQuestion className="h-4 w-4" />
                                <span>{subject.totalQuestions} Questions</span>
                            </div>
                        </div>

                        {/* Progress */}
                        {showProgress && (
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
                        )}

                        {/* Importance Badge */}
                        {progress === 0 && (
                            <Badge variant="info" size="sm" className="mt-3">
                                <TrendingUp className="h-3 w-3 mr-1" />
                                Start Learning
                            </Badge>
                        )}
                    </CardBody>
                </Card>
            </Link>
        );
    }

    // Default variant
    return (
        <Link href={`/subjects/${subject.id}`}>
            <Card
                hoverable
                clickable
                className={cn('group h-full', className)}
            >
                <CardBody>
                    {/* Icon and Title */}
                    <div className="flex items-center gap-3 mb-3">
                        <div
                            className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl transition-transform group-hover:scale-110"
                            style={{ backgroundColor: `${subject.color}15` }}
                        >
                            {subject.icon}
                        </div>
                        <div className="flex-1 min-w-0">
                            <h3 className="font-semibold text-gray-900 dark:text-white truncate">
                                {subject.name}
                            </h3>
                            <p className="text-sm text-gray-500 font-bengali truncate">
                                {subject.nameBn}
                            </p>
                        </div>
                    </div>

                    {/* Stats Row */}
                    <div className="flex items-center justify-between text-xs text-gray-500 mb-3">
                        <span>{subject.totalChapters} Chapters</span>
                        <span>{subject.totalQuestions} Questions</span>
                    </div>

                    {/* Progress */}
                    {showProgress && (
                        <div>
                            <ProgressBar value={progress} size="sm" />
                            <div className="flex items-center justify-between mt-1.5">
                                <span className="text-xs text-gray-500">Progress</span>
                                <span className="text-xs font-medium text-gray-900 dark:text-white">
                                    {progress}%
                                </span>
                            </div>
                        </div>
                    )}
                </CardBody>
            </Card>
        </Link>
    );
}

export default SubjectCard;
