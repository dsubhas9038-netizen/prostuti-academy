'use client';

import React, { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import {
    ArrowLeft,
    RotateCcw,
    BookOpen,
    Home,
    Share2,
    Download
} from 'lucide-react';
import { MainLayout } from '@/components/layout';
import { ScoreAnalysis } from '@/components/tests';
import { Button, Card, CardBody, CardHeader, Breadcrumb } from '@/components/ui';
import { PageLoading, EmptyState } from '@/components/shared';
import { TestAttempt } from '@/types';
import { getTestById, getQuestionById } from '@/data';
import { cn } from '@/lib/utils';

export default function TestResultsPage() {
    const params = useParams();
    const router = useRouter();
    const testId = params.testId as string;

    const [loading, setLoading] = useState(true);
    const [test, setTest] = useState<any>(null);
    const [attempt, setAttempt] = useState<TestAttempt | null>(null);

    // Load test and attempt data
    useEffect(() => {
        setLoading(true);

        // Get test
        const testData = getTestById(testId);
        if (!testData) {
            setLoading(false);
            return;
        }
        setTest(testData);

        // Create mock attempt (in real app, this would come from localStorage or API)
        const savedAttempt = localStorage.getItem(`test_${testId}_result`);
        if (savedAttempt) {
            setAttempt(JSON.parse(savedAttempt));
        } else {
            // Create demo result
            const correctCount = Math.floor(Math.random() * testData.totalQuestions * 0.8);
            const wrongCount = Math.floor((testData.totalQuestions - correctCount) * 0.6);
            const skippedCount = testData.totalQuestions - correctCount - wrongCount;
            const maxScore = testData.totalMarks;
            const totalScore = Math.floor((correctCount / testData.totalQuestions) * maxScore);

            const demoAttempt: TestAttempt = {
                id: `attempt_${Date.now()}`,
                userId: 'demo',
                testId,
                startedAt: new Date(),
                completedAt: new Date(),
                status: 'completed',
                answers: [],
                totalScore,
                maxScore,
                percentage: (totalScore / maxScore) * 100,
                correctCount,
                wrongCount,
                skippedCount,
                timeTaken: Math.floor(testData.duration * 60 * 0.8),
            };
            setAttempt(demoAttempt);
        }

        setLoading(false);
    }, [testId]);

    // Handle share
    const handleShare = async () => {
        if (navigator.share && attempt) {
            try {
                await navigator.share({
                    title: `${test?.titleBn} - Result`,
                    text: `আমি ${attempt.percentage.toFixed(0)}% পেয়েছি!`,
                    url: window.location.href,
                });
            } catch (err) {
                console.error('Share failed:', err);
            }
        }
    };

    // Loading
    if (loading) {
        return (
            <MainLayout>
                <PageLoading message="Loading results..." />
            </MainLayout>
        );
    }

    // Not found
    if (!test || !attempt) {
        return (
            <MainLayout>
                <div className="container mx-auto px-4 py-12">
                    <EmptyState
                        type="error"
                        title="Results not found"
                        description="টেস্ট রেজাল্ট পাওয়া যায়নি।"
                        actionLabel="Back to Tests"
                        onAction={() => router.push('/tests')}
                    />
                </div>
            </MainLayout>
        );
    }

    // Breadcrumb
    const breadcrumbItems = [
        { label: 'Tests', labelBn: 'টেস্ট', href: '/tests' },
        { label: test.title, labelBn: test.titleBn, href: `/tests` },
        { label: 'Results', labelBn: 'ফলাফল' },
    ];

    return (
        <MainLayout>
            <div className="container mx-auto px-4 py-6">
                {/* Breadcrumb */}
                <Breadcrumb items={breadcrumbItems} className="mb-6" />

                {/* Header */}
                <div className="flex items-center justify-between mb-6">
                    <div>
                        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                            Test Results
                        </h1>
                        <p className="text-gray-500">
                            {test.titleBn}
                        </p>
                    </div>
                    <div className="flex items-center gap-2">
                        <Button
                            variant="outline"
                            size="sm"
                            onClick={handleShare}
                            leftIcon={<Share2 className="h-4 w-4" />}
                        >
                            Share
                        </Button>
                    </div>
                </div>

                {/* Main Content */}
                <div className="grid lg:grid-cols-3 gap-6">
                    {/* Left: Score Analysis */}
                    <div className="lg:col-span-2">
                        <ScoreAnalysis
                            attempt={attempt}
                            testTitle={test.title}
                            testTitleBn={test.titleBn}
                            variant="detailed"
                        />
                    </div>

                    {/* Right: Actions */}
                    <div className="lg:col-span-1 space-y-4">
                        {/* Quick Actions */}
                        <Card>
                            <CardBody className="space-y-3">
                                <h3 className="font-semibold text-gray-900 dark:text-white mb-4">
                                    What's Next?
                                </h3>

                                <Button
                                    variant="outline"
                                    className="w-full justify-start"
                                    leftIcon={<BookOpen className="h-4 w-4" />}
                                    onClick={() => router.push(`/tests/${testId}/review`)}
                                >
                                    Review Answers
                                </Button>

                                <Button
                                    variant="outline"
                                    className="w-full justify-start"
                                    leftIcon={<RotateCcw className="h-4 w-4" />}
                                    onClick={() => router.push(`/tests/${testId}/take`)}
                                >
                                    Try Again
                                </Button>

                                <Button
                                    variant="outline"
                                    className="w-full justify-start"
                                    leftIcon={<Home className="h-4 w-4" />}
                                    onClick={() => router.push('/tests')}
                                >
                                    Back to Tests
                                </Button>
                            </CardBody>
                        </Card>

                        {/* Test Info */}
                        <Card>
                            <CardBody>
                                <h3 className="font-semibold text-gray-900 dark:text-white mb-3">
                                    Test Details
                                </h3>
                                <div className="space-y-2 text-sm">
                                    <div className="flex justify-between">
                                        <span className="text-gray-500">Duration</span>
                                        <span className="text-gray-900 dark:text-white">{test.duration} min</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-gray-500">Questions</span>
                                        <span className="text-gray-900 dark:text-white">{test.totalQuestions}</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-gray-500">Total Marks</span>
                                        <span className="text-gray-900 dark:text-white">{test.totalMarks}</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-gray-500">Passing</span>
                                        <span className="text-gray-900 dark:text-white">{test.passingPercentage}%</span>
                                    </div>
                                </div>
                            </CardBody>
                        </Card>

                        {/* Motivational Message */}
                        <Card className={cn(
                            attempt.percentage >= 40
                                ? 'bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800'
                                : 'bg-yellow-50 dark:bg-yellow-900/20 border-yellow-200 dark:border-yellow-800'
                        )}>
                            <CardBody>
                                <p className="text-sm font-bengali">
                                    {attempt.percentage >= 80
                                        ? '🌟 অসাধারণ! তুমি চমৎকার করেছ!'
                                        : attempt.percentage >= 60
                                            ? '👍 ভালো! আরও একটু চেষ্টা করলে আরও ভালো হবে।'
                                            : attempt.percentage >= 40
                                                ? '✅ পাস করেছ! আরও অনুশীলন করো।'
                                                : '💪 হাল ছেড়ো না! আরও অনুশীলন করে আবার চেষ্টা করো।'}
                                </p>
                            </CardBody>
                        </Card>
                    </div>
                </div>
            </div>
        </MainLayout>
    );
}
