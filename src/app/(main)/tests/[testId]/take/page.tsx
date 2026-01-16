'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { useParams, useRouter } from 'next/navigation';
import {
    ChevronLeft,
    ChevronRight,
    Flag,
    Send,
    AlertCircle
} from 'lucide-react';
import { MainLayout } from '@/components/layout';
import {
    TestTimer,
    TestQuestionDisplay,
    AnswerInput,
    TestProgressBar,
    TestQuestionNavigator,
    TestInstructionsModal,
    TestSubmissionModal
} from '@/components/tests';
import { Button, Card, CardBody } from '@/components/ui';
import { PageLoading, EmptyState } from '@/components/shared';
import { useTest } from '@/hooks';
import { cn } from '@/lib/utils';

export default function TestTakingPage() {
    const params = useParams();
    const router = useRouter();
    const testId = params.testId as string;

    // State
    const [showInstructions, setShowInstructions] = useState(true);
    const [showSubmitModal, setShowSubmitModal] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);

    // Use test hook
    const {
        test,
        questions,
        loading,
        error,
        currentQuestionIndex,
        currentQuestion,
        answers,
        questionStatuses,
        timeRemaining,
        timerStatus,
        answeredCount,
        skippedCount,
        startTest,
        setAnswer,
        navigateToQuestion,
        nextQuestion,
        prevQuestion,
        markQuestion,
        skipQuestion,
        submitTest,
        isStarted,
        isSubmitted,
    } = useTest({ testId });

    // Handle test start
    const handleStart = useCallback(() => {
        setShowInstructions(false);
        startTest();
    }, [startTest]);

    // Handle submit
    const handleSubmit = useCallback(async () => {
        setIsSubmitting(true);
        try {
            await submitTest();
            // Navigate to results page
            router.push(`/tests/${testId}/results`);
        } catch (err) {
            console.error('Submit failed:', err);
        } finally {
            setIsSubmitting(false);
        }
    }, [submitTest, testId, router]);

    // Handle time expired
    useEffect(() => {
        if (timerStatus === 'expired' && isStarted && !isSubmitted) {
            handleSubmit();
        }
    }, [timerStatus, isStarted, isSubmitted, handleSubmit]);

    // Loading state
    if (loading) {
        return (
            <MainLayout>
                <PageLoading message="Loading test..." />
            </MainLayout>
        );
    }

    // Error state
    if (error || !test) {
        return (
            <MainLayout>
                <div className="container mx-auto px-4 py-12">
                    <EmptyState
                        type="error"
                        title="Test not found"
                        description="এই টেস্ট পাওয়া যায়নি।"
                        actionLabel="Back to Tests"
                        onAction={() => router.push('/tests')}
                    />
                </div>
            </MainLayout>
        );
    }

    // Show instructions modal
    if (showInstructions && !isStarted) {
        return (
            <MainLayout>
                <div className="container mx-auto px-4 py-12">
                    <TestInstructionsModal
                        test={test}
                        isOpen={showInstructions}
                        onClose={() => router.push('/tests')}
                        onStart={handleStart}
                    />
                </div>
            </MainLayout>
        );
    }

    return (
        <MainLayout>
            <div className="min-h-screen bg-gray-50 dark:bg-gray-950">
                {/* Fixed Header Bar */}
                <div className="sticky top-0 z-40 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 shadow-sm">
                    <div className="container mx-auto px-4">
                        <div className="flex items-center justify-between h-16">
                            {/* Left: Test Title */}
                            <div className="flex items-center gap-4">
                                <h1 className="text-lg font-bold text-gray-900 dark:text-white truncate max-w-[200px]">
                                    {test.titleBn}
                                </h1>
                            </div>

                            {/* Center: Timer */}
                            <TestTimer
                                initialSeconds={timeRemaining}
                                onTimeExpired={handleSubmit}
                                size="md"
                            />

                            {/* Right: Submit Button */}
                            <Button
                                onClick={() => setShowSubmitModal(true)}
                                leftIcon={<Send className="h-4 w-4" />}
                            >
                                Submit
                            </Button>
                        </div>
                    </div>
                </div>

                {/* Main Content */}
                <div className="container mx-auto px-4 py-6">
                    <div className="grid lg:grid-cols-4 gap-6">
                        {/* Left: Question & Answer */}
                        <div className="lg:col-span-3 space-y-4">
                            {/* Progress Bar */}
                            <TestProgressBar
                                totalQuestions={questions.length}
                                answeredCount={answeredCount}
                                skippedCount={skippedCount}
                                currentIndex={currentQuestionIndex}
                                variant="compact"
                            />

                            {/* Question Display */}
                            {currentQuestion && (
                                <TestQuestionDisplay
                                    question={currentQuestion}
                                    questionNumber={currentQuestionIndex + 1}
                                    totalQuestions={questions.length}
                                    showHints={false}
                                />
                            )}

                            {/* Answer Input */}
                            {currentQuestion && (
                                <Card>
                                    <CardBody>
                                        <h3 className="font-medium text-gray-900 dark:text-white mb-4">
                                            Your Answer
                                        </h3>
                                        <AnswerInput
                                            question={currentQuestion}
                                            answer={answers[currentQuestion.id] || null}
                                            onAnswerChange={(answer) => setAnswer(currentQuestion.id, answer)}
                                        />
                                    </CardBody>
                                </Card>
                            )}

                            {/* Navigation Buttons */}
                            <div className="flex items-center justify-between">
                                <Button
                                    variant="outline"
                                    onClick={prevQuestion}
                                    disabled={currentQuestionIndex === 0}
                                    leftIcon={<ChevronLeft className="h-4 w-4" />}
                                >
                                    Previous
                                </Button>

                                <div className="flex items-center gap-2">
                                    <Button
                                        variant="ghost"
                                        onClick={() => markQuestion(currentQuestionIndex)}
                                        leftIcon={<Flag className={cn(
                                            'h-4 w-4',
                                            questionStatuses[currentQuestionIndex] === 'marked' && 'fill-yellow-500 text-yellow-500'
                                        )} />}
                                    >
                                        {questionStatuses[currentQuestionIndex] === 'marked' ? 'Marked' : 'Mark'}
                                    </Button>
                                    <Button
                                        variant="ghost"
                                        onClick={skipQuestion}
                                    >
                                        Skip
                                    </Button>
                                </div>

                                <Button
                                    onClick={nextQuestion}
                                    disabled={currentQuestionIndex === questions.length - 1}
                                    rightIcon={<ChevronRight className="h-4 w-4" />}
                                >
                                    Next
                                </Button>
                            </div>
                        </div>

                        {/* Right: Navigator */}
                        <div className="lg:col-span-1">
                            <div className="sticky top-24">
                                <TestQuestionNavigator
                                    totalQuestions={questions.length}
                                    currentIndex={currentQuestionIndex}
                                    questionStatuses={questionStatuses}
                                    onNavigate={navigateToQuestion}
                                />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Submit Modal */}
                <TestSubmissionModal
                    isOpen={showSubmitModal}
                    onClose={() => setShowSubmitModal(false)}
                    onConfirm={handleSubmit}
                    totalQuestions={questions.length}
                    answeredCount={answeredCount}
                    skippedCount={skippedCount}
                    timeRemaining={timeRemaining}
                    isSubmitting={isSubmitting}
                />
            </div>
        </MainLayout>
    );
}
