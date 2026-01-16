'use client';

import React from 'react';
import Link from 'next/link';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Chapter } from '@/types';
import { Card, CardBody } from '@/components/ui';
import { cn } from '@/lib/utils';

interface ChapterNavigationProps {
    currentChapter: Chapter;
    prevChapter?: Chapter | null;
    nextChapter?: Chapter | null;
    subjectId: string;
    subjectColor?: string;
    className?: string;
}

function ChapterNavigation({
    currentChapter,
    prevChapter,
    nextChapter,
    subjectId,
    subjectColor = '#2563EB',
    className,
}: ChapterNavigationProps) {
    return (
        <div className={cn('grid grid-cols-2 gap-4', className)}>
            {/* Previous Chapter */}
            {prevChapter ? (
                <Link href={`/subjects/${subjectId}/${prevChapter.id}`}>
                    <Card
                        hoverable
                        clickable
                        className="h-full"
                    >
                        <CardBody className="flex items-center gap-3">
                            <div
                                className="w-10 h-10 rounded-lg flex items-center justify-center"
                                style={{ backgroundColor: `${subjectColor}20` }}
                            >
                                <ChevronLeft className="h-5 w-5" style={{ color: subjectColor }} />
                            </div>
                            <div className="flex-1 min-w-0 text-left">
                                <p className="text-xs text-gray-500">Previous</p>
                                <p className="text-sm font-medium text-gray-900 dark:text-white truncate">
                                    {prevChapter.titleBn}
                                </p>
                            </div>
                        </CardBody>
                    </Card>
                </Link>
            ) : (
                <div className="h-full opacity-50 pointer-events-none">
                    <Card className="h-full">
                        <CardBody className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-lg flex items-center justify-center bg-gray-100 dark:bg-gray-800">
                                <ChevronLeft className="h-5 w-5 text-gray-400" />
                            </div>
                            <div className="flex-1 min-w-0 text-left">
                                <p className="text-xs text-gray-500">Previous</p>
                                <p className="text-sm text-gray-400">No previous chapter</p>
                            </div>
                        </CardBody>
                    </Card>
                </div>
            )}

            {/* Next Chapter */}
            {nextChapter ? (
                <Link href={`/subjects/${subjectId}/${nextChapter.id}`}>
                    <Card
                        hoverable
                        clickable
                        className="h-full"
                    >
                        <CardBody className="flex items-center gap-3">
                            <div className="flex-1 min-w-0 text-right">
                                <p className="text-xs text-gray-500">Next</p>
                                <p className="text-sm font-medium text-gray-900 dark:text-white truncate">
                                    {nextChapter.titleBn}
                                </p>
                            </div>
                            <div
                                className="w-10 h-10 rounded-lg flex items-center justify-center"
                                style={{ backgroundColor: `${subjectColor}20` }}
                            >
                                <ChevronRight className="h-5 w-5" style={{ color: subjectColor }} />
                            </div>
                        </CardBody>
                    </Card>
                </Link>
            ) : (
                <div className="h-full opacity-50 pointer-events-none">
                    <Card className="h-full">
                        <CardBody className="flex items-center gap-3">
                            <div className="flex-1 min-w-0 text-right">
                                <p className="text-xs text-gray-500">Next</p>
                                <p className="text-sm text-gray-400">No next chapter</p>
                            </div>
                            <div className="w-10 h-10 rounded-lg flex items-center justify-center bg-gray-100 dark:bg-gray-800">
                                <ChevronRight className="h-5 w-5 text-gray-400" />
                            </div>
                        </CardBody>
                    </Card>
                </div>
            )}
        </div>
    );
}

export default ChapterNavigation;
