'use client';

import React, { useState, useMemo } from 'react';
import { useParams, useRouter } from 'next/navigation';
import {
    ArrowLeft,
    TrendingUp,
    BookOpen,
    Filter
} from 'lucide-react';
import { MainLayout } from '@/components/layout';
import {
    PYQStatsOverview,
    YearDistributionChart,
    ChapterWiseAnalysis,
    ImportantTopicsCard,
    TrendPrediction,
    PYQQuestionCard,
    PYQYearFilter
} from '@/components/pyq';
import { Button, Card, CardBody, Breadcrumb } from '@/components/ui';
import { PageLoading, EmptyState } from '@/components/shared';
import { useSubjectPYQ } from '@/hooks';
import { getPYQQuestionsBySubject } from '@/data';
import { cn } from '@/lib/utils';

export default function PYQSubjectPage() {
    const params = useParams();
    const router = useRouter();
    const subjectId = params.subjectId as string;

    // State
    const [selectedYears, setSelectedYears] = useState<number[]>([]);
    const [activeTab, setActiveTab] = useState<'overview' | 'questions'>('overview');

    // Get PYQ data
    const {
        subjectAnalysis,
        summary,
        topTopics,
        chapterStats,
        yearData,
        trendPredictions,
        loading,
        error,
    } = useSubjectPYQ(subjectId);

    // Get PYQ questions
    const pyqQuestions = useMemo(() => {
        return getPYQQuestionsBySubject(subjectId);
    }, [subjectId]);

    // Filter questions by year
    const filteredQuestions = useMemo(() => {
        if (selectedYears.length === 0) return pyqQuestions;
        return pyqQuestions.filter(q =>
            q.yearsAsked.some(year => selectedYears.includes(year))
        );
    }, [pyqQuestions, selectedYears]);

    // Year filter handlers
    const handleYearToggle = (year: number) => {
        setSelectedYears(prev =>
            prev.includes(year)
                ? prev.filter(y => y !== year)
                : [...prev, year]
        );
    };

    const handleSelectAllYears = () => {
        setSelectedYears(subjectAnalysis?.yearsAnalyzed || []);
    };

    const handleClearYears = () => {
        setSelectedYears([]);
    };

    // Loading
    if (loading) {
        return (
            <MainLayout>
                <PageLoading message="Loading PYQ analysis..." />
            </MainLayout>
        );
    }

    // Not found
    if (!subjectAnalysis) {
        return (
            <MainLayout>
                <div className="container mx-auto px-4 py-12">
                    <EmptyState
                        type="error"
                        title="Subject not found"
                        description="এই বিষয়ের PYQ analysis পাওয়া যায়নি।"
                        actionLabel="Back to PYQ"
                        onAction={() => router.push('/pyq')}
                    />
                </div>
            </MainLayout>
        );
    }

    // Breadcrumb
    const breadcrumbItems = [
        { label: 'PYQ Analysis', labelBn: 'PYQ বিশ্লেষণ', href: '/pyq' },
        { label: subjectAnalysis.subjectName, labelBn: subjectAnalysis.subjectNameBn },
    ];

    return (
        <MainLayout>
            <div className="container mx-auto px-4 py-6">
                {/* Breadcrumb */}
                <Breadcrumb items={breadcrumbItems} className="mb-6" />

                {/* Header */}
                <div className="flex items-start justify-between mb-6">
                    <div>
                        <h1 className="text-2xl font-bold text-gray-900 dark:text-white flex items-center gap-3">
                            <div
                                className="w-10 h-10 rounded-lg flex items-center justify-center"
                                style={{ backgroundColor: `${subjectAnalysis.color}20` }}
                            >
                                <BookOpen className="h-5 w-5" style={{ color: subjectAnalysis.color }} />
                            </div>
                            {subjectAnalysis.subjectNameBn} PYQ
                        </h1>
                        <p className="text-gray-500 mt-1">
                            বিগত {subjectAnalysis.yearsAnalyzed.length} বছরের প্রশ্ন বিশ্লেষণ
                        </p>
                    </div>
                    <Button
                        variant="outline"
                        onClick={() => router.push('/pyq')}
                        leftIcon={<ArrowLeft className="h-4 w-4" />}
                    >
                        Back
                    </Button>
                </div>

                {/* Tabs */}
                <div className="flex items-center gap-2 mb-6">
                    <button
                        onClick={() => setActiveTab('overview')}
                        className={cn(
                            'px-4 py-2 rounded-lg font-medium transition-all',
                            activeTab === 'overview'
                                ? 'bg-blue-500 text-white'
                                : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400'
                        )}
                    >
                        Overview
                    </button>
                    <button
                        onClick={() => setActiveTab('questions')}
                        className={cn(
                            'px-4 py-2 rounded-lg font-medium transition-all',
                            activeTab === 'questions'
                                ? 'bg-blue-500 text-white'
                                : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400'
                        )}
                    >
                        Questions ({pyqQuestions.length})
                    </button>
                </div>

                {/* Overview Tab */}
                {activeTab === 'overview' && (
                    <div className="space-y-6">
                        {/* Stats */}
                        <PYQStatsOverview
                            summary={{
                                ...summary,
                                totalQuestions: subjectAnalysis.totalQuestions,
                                repeatPercentage: subjectAnalysis.repeatPercentage,
                                importantTopicsCount: topTopics.length,
                            }}
                        />

                        {/* Main Grid */}
                        <div className="grid lg:grid-cols-2 gap-6">
                            {/* Year Distribution */}
                            <YearDistributionChart
                                yearData={yearData}
                                showSubjectBreakdown={false}
                            />

                            {/* Important Topics */}
                            <ImportantTopicsCard
                                topics={topTopics}
                                maxTopics={6}
                            />
                        </div>

                        {/* Chapter Analysis */}
                        <ChapterWiseAnalysis
                            chapters={chapterStats}
                            subjectColor={subjectAnalysis.color}
                        />

                        {/* Trend Prediction */}
                        <TrendPrediction
                            predictions={trendPredictions}
                            maxPredictions={4}
                        />
                    </div>
                )}

                {/* Questions Tab */}
                {activeTab === 'questions' && (
                    <div className="space-y-4">
                        {/* Year Filter */}
                        <Card>
                            <CardBody className="py-3">
                                <PYQYearFilter
                                    years={subjectAnalysis.yearsAnalyzed}
                                    selectedYears={selectedYears}
                                    onYearToggle={handleYearToggle}
                                    onSelectAll={handleSelectAllYears}
                                    onClearAll={handleClearYears}
                                />
                            </CardBody>
                        </Card>

                        {/* Results Count */}
                        <div className="text-sm text-gray-500">
                            Showing {filteredQuestions.length} questions
                        </div>

                        {/* Questions List */}
                        <div className="space-y-4">
                            {filteredQuestions.map((question, index) => (
                                <PYQQuestionCard
                                    key={question.id}
                                    question={question}
                                    index={index}
                                />
                            ))}
                        </div>

                        {filteredQuestions.length === 0 && (
                            <EmptyState
                                type="no-data"
                                title="No questions found"
                                description="এই filter এ কোনো প্রশ্ন পাওয়া যায়নি।"
                            />
                        )}
                    </div>
                )}
            </div>
        </MainLayout>
    );
}
