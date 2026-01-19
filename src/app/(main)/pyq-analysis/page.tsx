'use client';

import React, { useState } from 'react';
import {
    BarChart2,
    TrendingUp,
    BookOpen,
    Info
} from 'lucide-react';
import { MainLayout } from '@/components/layout';
import {
    PYQStatsOverview,
    SubjectPYQCard,
    TrendPrediction
} from '@/components/pyq';
import { Breadcrumb, Button, Card, CardBody } from '@/components/ui';
import { usePYQ } from '@/hooks';
import { PageLoading } from '@/components/shared';

export default function PYQAnalysisPage() {
    const [activeTab, setActiveTab] = useState<'overview' | 'trends'>('overview');

    // Data Hook
    const {
        allSubjectsAnalysis,
        summary,
        trendPredictions,
        loading
    } = usePYQ();

    // Breadcrumb
    const breadcrumbItems = [
        { label: 'Home', labelBn: 'হোম', href: '/' },
        { label: 'PYQ Analysis', labelBn: 'PYQ বিশ্লেষণ' },
    ];

    if (loading) {
        return (
            <MainLayout>
                <PageLoading message="Analyzing question patterns..." />
            </MainLayout>
        );
    }

    return (
        <MainLayout>
            <div className="container mx-auto px-4 py-8">
                {/* Breadcrumb */}
                <Breadcrumb items={breadcrumbItems} className="mb-6" />

                {/* Page Header */}
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
                    <div>
                        <h1 className="text-2xl lg:text-3xl font-bold text-gray-900 dark:text-white flex items-center gap-3">
                            <BarChart2 className="h-8 w-8 text-blue-600" />
                            PYQ Analysis
                        </h1>
                        <p className="text-gray-500 mt-1 text-lg">
                            গত ৫ বছরের প্রশ্ন pattern বিশ্লেষণ ও সাজেশন
                        </p>
                    </div>

                    {/* Tabs */}
                    <div className="flex p-1 bg-gray-100 dark:bg-gray-800 rounded-lg self-start">
                        <Button
                            variant={activeTab === 'overview' ? 'primary' : 'ghost'}
                            size="sm"
                            onClick={() => setActiveTab('overview')}
                            leftIcon={<BookOpen className="h-4 w-4" />}
                        >
                            Overview
                        </Button>
                        <Button
                            variant={activeTab === 'trends' ? 'primary' : 'ghost'}
                            size="sm"
                            onClick={() => setActiveTab('trends')}
                            leftIcon={<TrendingUp className="h-4 w-4" />}
                        >
                            Trends & Hot Topics
                        </Button>
                    </div>
                </div>

                {/* Stats Overview */}
                <div className="mb-8">
                    <PYQStatsOverview summary={summary} />
                </div>

                {/* Tab Content */}
                {activeTab === 'overview' ? (
                    <div className="space-y-6">
                        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                            {allSubjectsAnalysis.map((subject) => (
                                <SubjectPYQCard
                                    key={subject.subjectId}
                                    subject={subject}
                                />
                            ))}
                        </div>
                    </div>
                ) : (
                    <div className="space-y-6">
                        <Card className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 border-blue-200 dark:border-blue-800">
                            <CardBody className="flex items-start gap-4">
                                <Info className="h-6 w-6 text-blue-600 shrink-0 mt-0.5" />
                                <div>
                                    <h3 className="font-semibold text-blue-900 dark:text-blue-100 mb-1">
                                        Understanding Trends
                                    </h3>
                                    <p className="text-sm text-blue-700 dark:text-blue-300">
                                        Based on frequency analysis of last 5 years (2019-2023).
                                        Topics marked 'Very High' have &gt;80% probability of appearing this year.
                                    </p>
                                </div>
                            </CardBody>
                        </Card>

                        <div className="grid gap-6 lg:grid-cols-2">
                            <TrendPrediction predictions={trendPredictions} />
                        </div>
                    </div>
                )}
            </div>
        </MainLayout>
    );
}
