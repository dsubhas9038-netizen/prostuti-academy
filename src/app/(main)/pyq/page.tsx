'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import {
    TrendingUp,
    Sparkles,
    BookOpen
} from 'lucide-react';
import { MainLayout } from '@/components/layout';
import {
    PYQStatsOverview,
    YearDistributionChart,
    ImportantTopicsCard,
    TrendPrediction,
    SubjectPYQCard
} from '@/components/pyq';
import { Breadcrumb } from '@/components/ui';
import { PageLoading } from '@/components/shared';
import { usePYQ } from '@/hooks';
import { cn } from '@/lib/utils';

export default function PYQMainPage() {
    const router = useRouter();

    // Get all PYQ data
    const {
        allSubjectsAnalysis,
        summary,
        topTopics,
        yearData,
        trendPredictions,
        loading,
    } = usePYQ();

    // Loading
    if (loading) {
        return (
            <MainLayout>
                <PageLoading message="Loading PYQ analysis..." />
            </MainLayout>
        );
    }

    // Breadcrumb
    const breadcrumbItems = [
        { label: 'Home', labelBn: 'হোম', href: '/' },
        { label: 'PYQ Analysis', labelBn: 'PYQ বিশ্লেষণ' },
    ];

    return (
        <MainLayout>
            <div className="container mx-auto px-4 py-6">
                {/* Breadcrumb */}
                <Breadcrumb items={breadcrumbItems} className="mb-6" />

                {/* Header */}
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2 flex items-center gap-3">
                        <TrendingUp className="h-8 w-8 text-purple-500" />
                        PYQ Analysis
                    </h1>
                    <p className="text-gray-500 text-lg">
                        বিগত বছরের প্রশ্নপত্র বিশ্লেষণ ও prediction
                    </p>
                </div>

                {/* Stats Overview */}
                <PYQStatsOverview summary={summary} className="mb-8" />

                {/* Subjects Grid */}
                <div className="mb-8">
                    <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                        <BookOpen className="h-5 w-5 text-blue-500" />
                        Choose Subject
                    </h2>
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {allSubjectsAnalysis.map((subject) => (
                            <SubjectPYQCard key={subject.subjectId} subject={subject} />
                        ))}
                    </div>
                </div>

                {/* Main Analysis Grid */}
                <div className="grid lg:grid-cols-2 gap-6 mb-8">
                    {/* Year Distribution */}
                    <YearDistributionChart
                        yearData={yearData}
                        subjectData={allSubjectsAnalysis}
                        showSubjectBreakdown={true}
                    />

                    {/* Important Topics */}
                    <ImportantTopicsCard
                        topics={topTopics}
                        maxTopics={8}
                    />
                </div>

                {/* Trend Prediction */}
                <div className="mb-8">
                    <TrendPrediction
                        predictions={trendPredictions}
                        maxPredictions={6}
                    />
                </div>

                {/* Tips Section */}
                <div className="p-6 bg-gradient-to-br from-purple-50 to-blue-50 dark:from-purple-900/20 dark:to-blue-900/20 rounded-2xl">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                        <Sparkles className="h-5 w-5 text-purple-500" />
                        PYQ Study Tips
                    </h3>
                    <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
                        <li className="flex items-start gap-2">
                            <span className="text-green-500">✓</span>
                            <span className="font-bengali">প্রতিটি বিষয়ে সর্বোচ্চ বার জিজ্ঞাসিত প্রশ্নগুলো আগে পড়ো</span>
                        </li>
                        <li className="flex items-start gap-2">
                            <span className="text-green-500">✓</span>
                            <span className="font-bengali">🔥 Hot Chapters গুলোতে বিশেষ মনোযোগ দাও</span>
                        </li>
                        <li className="flex items-start gap-2">
                            <span className="text-green-500">✓</span>
                            <span className="font-bengali">বিগত ৫ বছরের pattern বুঝে পড়ো</span>
                        </li>
                        <li className="flex items-start gap-2">
                            <span className="text-green-500">✓</span>
                            <span className="font-bengali">Trend Prediction অনুসারে প্রস্তুতি নাও</span>
                        </li>
                        <li className="flex items-start gap-2">
                            <span className="text-green-500">✓</span>
                            <span className="font-bengali">প্রশ্নের उत্তর নিজে লিখে অনুশীলন করো</span>
                        </li>
                    </ul>
                </div>
            </div>
        </MainLayout>
    );
}
