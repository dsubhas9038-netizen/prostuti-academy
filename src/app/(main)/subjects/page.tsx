'use client';

import React, { useState } from 'react';
import { BookOpen, Filter, Grid3X3, List } from 'lucide-react';
import { MainLayout } from '@/components/layout';
import {
    SubjectList,
    SemesterTabs
} from '@/components/subjects';
import { Breadcrumb, Button, Card, CardBody } from '@/components/ui';
import { useSubjects } from '@/hooks';
import { cn } from '@/lib/utils';

export default function SubjectsPage() {
    const [activeSemester, setActiveSemester] = useState<number | 'all'>('all');
    const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

    const { subjects, loading } = useSubjects({
        semester: activeSemester,
        stream: 'arts'
    });

    // Mock progress data (will be replaced with real data)
    const progressMap: Record<string, number> = {
        'bengali': 45,
        'english': 30,
        'history': 20,
        'geography': 15,
        'philosophy': 0,
        'political-science': 10,
        'education': 5,
        'sanskrit': 0,
    };

    // Breadcrumb items
    const breadcrumbItems = [
        { label: 'Subjects', labelBn: 'বিষয়সমূহ' },
    ];

    return (
        <MainLayout>
            <div className="container mx-auto px-4 py-6">
                {/* Breadcrumb */}
                <Breadcrumb items={breadcrumbItems} className="mb-6" />

                {/* Page Header */}
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
                    <div>
                        <h1 className="text-2xl lg:text-3xl font-bold text-gray-900 dark:text-white flex items-center gap-3">
                            <BookOpen className="h-8 w-8 text-blue-600" />
                            বিষয়সমূহ
                        </h1>
                        <p className="text-gray-500 mt-1">
                            HS Arts এর সব subjects একসাথে
                        </p>
                    </div>

                    {/* View Toggle */}
                    <div className="flex items-center gap-2">
                        <Button
                            variant={viewMode === 'grid' ? 'primary' : 'outline'}
                            size="sm"
                            onClick={() => setViewMode('grid')}
                            leftIcon={<Grid3X3 className="h-4 w-4" />}
                        >
                            Grid
                        </Button>
                        <Button
                            variant={viewMode === 'list' ? 'primary' : 'outline'}
                            size="sm"
                            onClick={() => setViewMode('list')}
                            leftIcon={<List className="h-4 w-4" />}
                        >
                            List
                        </Button>
                    </div>
                </div>

                {/* Semester Filter */}
                <Card className="mb-6">
                    <CardBody className="py-3">
                        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                            <div className="flex items-center gap-2">
                                <Filter className="h-5 w-5 text-gray-400" />
                                <span className="text-sm font-medium text-gray-900 dark:text-white">
                                    Filter by Semester:
                                </span>
                            </div>
                            <SemesterTabs
                                activeSemester={activeSemester}
                                onSemesterChange={setActiveSemester}
                                variant="pills"
                            />
                        </div>
                    </CardBody>
                </Card>

                {/* Stats Bar */}
                <div className="flex items-center justify-between mb-6">
                    <p className="text-sm text-gray-500">
                        {loading ? (
                            'Loading...'
                        ) : (
                            <>
                                Showing <span className="font-medium text-gray-900 dark:text-white">{subjects.length}</span> subjects
                                {activeSemester !== 'all' && (
                                    <span> for Semester {activeSemester}</span>
                                )}
                            </>
                        )}
                    </p>
                </div>

                {/* Subject List */}
                <SubjectList
                    subjects={subjects}
                    loading={loading}
                    variant={viewMode}
                    cardVariant={viewMode === 'list' ? 'detailed' : 'default'}
                    showProgress={true}
                    progressMap={progressMap}
                />
            </div>
        </MainLayout>
    );
}
