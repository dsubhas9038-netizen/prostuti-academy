'use client';

import React from 'react';
import Link from 'next/link';
import { CheckCircle, ChevronRight } from 'lucide-react';
import { Chapter } from '@/types';
import { Card, CardHeader, CardBody, Badge } from '@/components/ui';
import { cn } from '@/lib/utils';

interface RelatedChaptersSidebarProps {
    chapters: Chapter[];
    currentChapterId: string;
    subjectId: string;
    subjectColor?: string;
    completedChapters?: string[];
    className?: string;
}

function RelatedChaptersSidebar({
    chapters,
    currentChapterId,
    subjectId,
    subjectColor = '#2563EB',
    completedChapters = [],
    className,
}: RelatedChaptersSidebarProps) {
    // Group chapters by semester
    const chaptersBySemester = chapters.reduce((acc, chapter) => {
        const sem = chapter.semester;
        if (!acc[sem]) acc[sem] = [];
        acc[sem].push(chapter);
        return acc;
    }, {} as Record<number, Chapter[]>);

    // Get current chapter's semester
    const currentChapter = chapters.find(ch => ch.id === currentChapterId);
    const currentSemester = currentChapter?.semester || 1;

    return (
        <Card className={cn('sticky top-20', className)}>
            <CardHeader
                title="Chapters"
                subtitle={`Semester ${currentSemester}`}
                action={
                    <Badge variant="secondary" size="sm">
                        {chaptersBySemester[currentSemester]?.length || 0}
                    </Badge>
                }
            />
            <CardBody className="p-0">
                <div className="max-h-[400px] overflow-y-auto">
                    {chaptersBySemester[currentSemester]?.map((chapter) => {
                        const isCurrent = chapter.id === currentChapterId;
                        const isCompleted = completedChapters.includes(chapter.id);

                        return (
                            <Link
                                key={chapter.id}
                                href={`/subjects/${subjectId}/${chapter.id}`}
                                className={cn(
                                    'flex items-center gap-3 px-4 py-3 border-b border-gray-200 dark:border-gray-700 last:border-0',
                                    'transition-colors',
                                    isCurrent
                                        ? 'bg-blue-50 dark:bg-blue-900/20'
                                        : 'hover:bg-gray-50 dark:hover:bg-gray-800'
                                )}
                            >
                                {/* Chapter Number */}
                                <div
                                    className={cn(
                                        'w-8 h-8 rounded-lg flex items-center justify-center text-sm font-bold flex-shrink-0',
                                        isCurrent ? 'text-white' : 'text-white/90'
                                    )}
                                    style={{
                                        backgroundColor: isCurrent ? subjectColor : `${subjectColor}80`
                                    }}
                                >
                                    {chapter.chapterNumber}
                                </div>

                                {/* Title */}
                                <div className="flex-1 min-w-0">
                                    <p className={cn(
                                        'text-sm font-medium truncate',
                                        isCurrent ? 'text-blue-600 dark:text-blue-400' : 'text-gray-900 dark:text-white'
                                    )}>
                                        {chapter.titleBn}
                                    </p>
                                    <p className="text-xs text-gray-500 truncate">
                                        {chapter.totalQuestions} questions
                                    </p>
                                </div>

                                {/* Status Icon */}
                                {isCompleted ? (
                                    <CheckCircle className="h-4 w-4 text-green-500 flex-shrink-0" />
                                ) : isCurrent ? (
                                    <div
                                        className="w-2 h-2 rounded-full animate-pulse"
                                        style={{ backgroundColor: subjectColor }}
                                    />
                                ) : (
                                    <ChevronRight className="h-4 w-4 text-gray-400 flex-shrink-0" />
                                )}
                            </Link>
                        );
                    })}
                </div>

                {/* Other Semesters */}
                {Object.keys(chaptersBySemester).length > 1 && (
                    <div className="p-4 border-t border-gray-200 dark:border-gray-700">
                        <p className="text-xs text-gray-500 mb-2">Other Semesters</p>
                        <div className="flex flex-wrap gap-2">
                            {Object.keys(chaptersBySemester)
                                .filter(sem => Number(sem) !== currentSemester)
                                .map(sem => (
                                    <Badge
                                        key={sem}
                                        variant="secondary"
                                        size="sm"
                                        className="cursor-pointer hover:bg-blue-50 dark:hover:bg-blue-900/20"
                                    >
                                        Sem {sem} ({chaptersBySemester[Number(sem)].length})
                                    </Badge>
                                ))
                            }
                        </div>
                    </div>
                )}
            </CardBody>
        </Card>
    );
}

export default RelatedChaptersSidebar;
