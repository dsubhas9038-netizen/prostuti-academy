'use client';

import React, { useState, useMemo } from 'react';
import { useParams } from 'next/navigation';
import { MainLayout } from '@/components/layout';
import {
    SubjectHeader,
    ChapterList,
    SemesterTabs,
    PYQStatsCard
} from '@/components/subjects';
import { Breadcrumb, Card, CardBody } from '@/components/ui';
import { PageLoading, EmptyState } from '@/components/shared';
import { useSubject, useChapters } from '@/hooks';
import { cn } from '@/lib/utils';

export default function SubjectDetailPage() {
    const params = useParams();
    const subjectId = params.subjectId as string;

    const [activeSemester, setActiveSemester] = useState<number | 'all'>('all');

    // Fetch subject data
    const { subject, loading: subjectLoading, error: subjectError } = useSubject(subjectId);

    // Fetch chapters
    const { chapters, loading: chaptersLoading } = useChapters({
        subjectId,
        semester: activeSemester,
    });

    // Loading state
    if (subjectLoading) {
        return (
            <MainLayout>
                <PageLoading message="Subject loading..." />
            </MainLayout>
        );
    }

    // Error state
    if (subjectError || !subject) {
        return (
            <MainLayout>
                <div className="container mx-auto px-4 py-12">
                    <EmptyState
                        type="error"
                        title="Subject not found"
                        description="এই subject টি পাওয়া যায়নি।"
                        actionLabel="All Subjects"
                        onAction={() => window.location.href = '/subjects'}
                    />
                </div>
            </MainLayout>
        );
    }

    // Breadcrumb items
    const breadcrumbItems = [
        { label: 'Subjects', labelBn: 'বিষয়সমূহ', href: '/subjects' },
        { label: subject.name, labelBn: subject.nameBn },
    ];

    // Mock progress data
    const progressMap: Record<string, number> = {};
    chapters.forEach((ch, i) => {
        progressMap[ch.id] = Math.floor(Math.random() * 100);
    });
    const overallProgress = chapters.length > 0
        ? Math.round(Object.values(progressMap).reduce((a, b) => a + b, 0) / chapters.length)
        : 0;

    // Completed chapters (mock)
    const completedChapters = chapters
        .filter((_, i) => i < 2)
        .map(ch => ch.id);

    // Semester chapters count
    const semesterCounts = useMemo((): Record<number | 'all', number> => {
        const allChapters = chapters;
        return {
            all: allChapters.length,
            1: allChapters.filter(ch => ch.semester === 1).length,
            2: allChapters.filter(ch => ch.semester === 2).length,
            3: allChapters.filter(ch => ch.semester === 3).length,
            4: allChapters.filter(ch => ch.semester === 4).length,
        };
    }, [chapters]);

    return (
        <MainLayout>
            <div className="container mx-auto px-4 py-6">
                {/* Breadcrumb */}
                <Breadcrumb items={breadcrumbItems} className="mb-6" />

                {/* Subject Header */}
                <SubjectHeader
                    subject={subject}
                    progress={overallProgress}
                    totalChaptersInSemester={chapters.length}
                    completedChapters={completedChapters.length}
                    className="mb-8"
                />

                {/* Main Content */}
                <div className="grid lg:grid-cols-3 gap-8">
                    {/* Left: Chapter List */}
                    <div className="lg:col-span-2">
                        {/* Semester Filter */}
                        <Card className="mb-6">
                            <CardBody className="py-3">
                                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                                    <span className="text-sm font-medium text-gray-900 dark:text-white">
                                        Filter by Semester:
                                    </span>
                                    <SemesterTabs
                                        activeSemester={activeSemester}
                                        onSemesterChange={setActiveSemester}
                                        variant="boxed"
                                    />
                                </div>
                            </CardBody>
                        </Card>

                        {/* Chapter Stats */}
                        <div className="flex items-center justify-between mb-4">
                            <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                                Chapters
                                {activeSemester !== 'all' && (
                                    <span className="text-gray-500 font-normal ml-2">
                                        (Semester {activeSemester})
                                    </span>
                                )}
                            </h2>
                            <span className="text-sm text-gray-500">
                                {chaptersLoading ? 'Loading...' : `${chapters.length} chapters`}
                            </span>
                        </div>

                        {/* Chapter List */}
                        <ChapterList
                            chapters={chapters}
                            subjectId={subjectId}
                            subjectColor={subject.color}
                            loading={chaptersLoading}
                            variant="list"
                            cardVariant="default"
                            progressMap={progressMap}
                            completedChapters={completedChapters}
                            emptyMessage={
                                activeSemester !== 'all'
                                    ? `Semester ${activeSemester} এ এখনো কোনো chapter নেই`
                                    : 'এই subject এ এখনো কোনো chapter নেই'
                            }
                        />
                    </div>

                    {/* Right: Sidebar */}
                    <div className="lg:col-span-1">
                        {/* PYQ Stats Card */}
                        <PYQStatsCard
                            chapters={chapters}
                            subjectColor={subject.color}
                            className="mb-6"
                        />

                        {/* Quick Stats */}
                        <Card>
                            <CardBody>
                                <h3 className="font-semibold text-gray-900 dark:text-white mb-4">
                                    Semester-wise Chapters
                                </h3>
                                <div className="space-y-3">
                                    {[1, 2, 3, 4].map((sem) => (
                                        <button
                                            key={sem}
                                            onClick={() => setActiveSemester(sem)}
                                            className={cn(
                                                'w-full flex items-center justify-between p-3 rounded-lg transition-colors',
                                                activeSemester === sem
                                                    ? 'bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800'
                                                    : 'bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700'
                                            )}
                                        >
                                            <span className="text-sm font-medium text-gray-900 dark:text-white">
                                                Semester {sem}
                                            </span>
                                            <span
                                                className={cn(
                                                    'text-sm font-bold',
                                                    activeSemester === sem ? 'text-blue-600' : 'text-gray-500'
                                                )}
                                            >
                                                {semesterCounts[sem] || 0} ch
                                            </span>
                                        </button>
                                    ))}
                                </div>
                            </CardBody>
                        </Card>
                    </div>
                </div>
            </div>
        </MainLayout>
    );
}
