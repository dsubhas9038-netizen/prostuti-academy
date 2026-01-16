'use client';

import React from 'react';
import Link from 'next/link';
import { ChevronRight, BookOpen, CheckCircle } from 'lucide-react';
import { SubjectProgress } from '@/types/dashboard';
import { Card, CardBody, CardHeader, ProgressBar, Badge } from '@/components/ui';
import { cn } from '@/lib/utils';

interface ProgressOverviewProps {
    subjects: SubjectProgress[];
    showViewAll?: boolean;
    maxSubjects?: number;
    className?: string;
}

function ProgressOverview({
    subjects,
    showViewAll = true,
    maxSubjects = 4,
    className
}: ProgressOverviewProps) {
    const displayedSubjects = subjects.slice(0, maxSubjects);

    // Calculate overall progress
    const overallProgress = Math.round(
        subjects.reduce((acc, s) => acc + s.progress, 0) / subjects.length
    );

    return (
        <Card className={className}>
            <CardHeader
                title="Progress Overview"
                subtitle="বিষয়ভিত্তিক অগ্রগতি"
                icon={<BookOpen className="h-5 w-5 text-blue-500" />}
                action={
                    showViewAll && (
                        <Link href="/subjects" className="text-sm text-blue-600 hover:underline flex items-center gap-1">
                            View All <ChevronRight className="h-4 w-4" />
                        </Link>
                    )
                }
            />
            <CardBody>
                {/* Overall Progress */}
                <div className="mb-6 p-4 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-xl">
                    <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                            Overall Progress
                        </span>
                        <span className="text-lg font-bold text-blue-600">{overallProgress}%</span>
                    </div>
                    <div className="w-full h-3 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                        <div
                            className="h-full bg-gradient-to-r from-blue-500 to-purple-500 rounded-full transition-all duration-500"
                            style={{ width: `${overallProgress}%` }}
                        />
                    </div>
                </div>

                {/* Subject Progress List */}
                <div className="space-y-4">
                    {displayedSubjects.map((subject) => (
                        <Link
                            key={subject.subjectId}
                            href={`/subjects/${subject.subjectId}`}
                            className="block group"
                        >
                            <div className="flex items-center gap-4 p-3 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
                                {/* Subject Icon */}
                                <div
                                    className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0"
                                    style={{ backgroundColor: `${subject.color}20` }}
                                >
                                    <BookOpen className="h-5 w-5" style={{ color: subject.color }} />
                                </div>

                                {/* Content */}
                                <div className="flex-1 min-w-0">
                                    <div className="flex items-center justify-between mb-1">
                                        <h4 className="font-medium text-gray-900 dark:text-white group-hover:text-blue-600 transition-colors">
                                            {subject.subjectNameBn}
                                        </h4>
                                        <div className="flex items-center gap-2">
                                            <span className="text-sm font-semibold" style={{ color: subject.color }}>
                                                {subject.progress}%
                                            </span>
                                            {subject.progress >= 80 && (
                                                <CheckCircle className="h-4 w-4 text-green-500" />
                                            )}
                                        </div>
                                    </div>

                                    {/* Progress Bar */}
                                    <div className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                                        <div
                                            className="h-full rounded-full transition-all duration-500"
                                            style={{
                                                width: `${subject.progress}%`,
                                                backgroundColor: subject.color
                                            }}
                                        />
                                    </div>

                                    {/* Stats */}
                                    <div className="flex items-center gap-3 mt-1 text-xs text-gray-500">
                                        <span>{subject.chaptersCompleted}/{subject.totalChapters} chapters</span>
                                        <span>•</span>
                                        <span>{subject.questionsAttempted} questions</span>
                                    </div>
                                </div>

                                {/* Arrow */}
                                <ChevronRight className="h-5 w-5 text-gray-400 group-hover:text-blue-500 group-hover:translate-x-1 transition-all" />
                            </div>
                        </Link>
                    ))}
                </div>

                {/* View All */}
                {showViewAll && subjects.length > maxSubjects && (
                    <Link href="/subjects" className="block mt-4">
                        <button className="w-full py-2 text-sm text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-lg transition-colors">
                            View All {subjects.length} Subjects
                        </button>
                    </Link>
                )}
            </CardBody>
        </Card>
    );
}

export default ProgressOverview;
