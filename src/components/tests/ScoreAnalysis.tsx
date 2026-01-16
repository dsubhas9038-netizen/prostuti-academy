'use client';

import React from 'react';
import {
    Trophy,
    CheckCircle,
    XCircle,
    SkipForward,
    Clock,
    TrendingUp,
    Award,
    Target
} from 'lucide-react';
import { TestAttempt, calculateGrade } from '@/types';
import { Card, CardBody, ProgressBar, Badge } from '@/components/ui';
import { cn } from '@/lib/utils';

interface ScoreAnalysisProps {
    attempt: TestAttempt;
    testTitle: string;
    testTitleBn: string;
    variant?: 'compact' | 'detailed';
    className?: string;
}

function ScoreAnalysis({
    attempt,
    testTitle,
    testTitleBn,
    variant = 'detailed',
    className,
}: ScoreAnalysisProps) {
    const grade = calculateGrade(attempt.percentage);
    const passed = attempt.percentage >= 40;
    const totalQuestions = attempt.correctCount + attempt.wrongCount + attempt.skippedCount;

    // Grade colors
    const gradeColors = {
        'A+': { bg: 'bg-green-500', text: 'text-green-600' },
        'A': { bg: 'bg-green-400', text: 'text-green-500' },
        'B+': { bg: 'bg-blue-500', text: 'text-blue-600' },
        'B': { bg: 'bg-blue-400', text: 'text-blue-500' },
        'C': { bg: 'bg-yellow-500', text: 'text-yellow-600' },
        'D': { bg: 'bg-orange-500', text: 'text-orange-600' },
        'F': { bg: 'bg-red-500', text: 'text-red-600' },
    };

    // Format time
    const formatTime = (seconds: number) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins}m ${secs}s`;
    };

    // Compact variant
    if (variant === 'compact') {
        return (
            <Card className={className}>
                <CardBody>
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm text-gray-500">Score</p>
                            <p className="text-2xl font-bold text-gray-900 dark:text-white">
                                {attempt.totalScore}/{attempt.maxScore}
                            </p>
                        </div>
                        <div className={cn(
                            'w-16 h-16 rounded-full flex items-center justify-center text-2xl font-bold text-white',
                            gradeColors[grade].bg
                        )}>
                            {grade}
                        </div>
                    </div>
                </CardBody>
            </Card>
        );
    }

    // Detailed variant
    return (
        <div className={cn('space-y-6', className)}>
            {/* Score Card */}
            <Card className="overflow-hidden">
                <div className={cn(
                    'p-8 text-center text-white',
                    passed ? 'bg-gradient-to-br from-green-500 to-emerald-600' : 'bg-gradient-to-br from-red-500 to-rose-600'
                )}>
                    {/* Trophy Icon */}
                    <div className="w-20 h-20 rounded-full bg-white/20 mx-auto mb-4 flex items-center justify-center">
                        <Trophy className="h-10 w-10" />
                    </div>

                    {/* Result Text */}
                    <h2 className="text-2xl font-bold mb-2">
                        {passed ? '🎉 Congratulations!' : '😔 Better Luck Next Time!'}
                    </h2>
                    <p className="text-white/80 mb-4">
                        {passed
                            ? 'তুমি পাস করেছ! অভিনন্দন!'
                            : 'চেষ্টা চালিয়ে যাও, তুমি পারবে!'}
                    </p>

                    {/* Score */}
                    <div className="text-5xl font-bold mb-2">
                        {attempt.totalScore}/{attempt.maxScore}
                    </div>
                    <div className="text-xl text-white/90">
                        {attempt.percentage.toFixed(1)}%
                    </div>
                </div>

                {/* Grade Badge */}
                <div className="relative">
                    <div className={cn(
                        'absolute -top-6 left-1/2 -translate-x-1/2 w-12 h-12 rounded-full flex items-center justify-center text-xl font-bold text-white shadow-lg',
                        gradeColors[grade].bg
                    )}>
                        {grade}
                    </div>
                </div>

                {/* Stats */}
                <CardBody className="pt-8">
                    <div className="grid grid-cols-4 gap-4 text-center">
                        <div>
                            <div className="flex items-center justify-center gap-1 mb-1">
                                <CheckCircle className="h-5 w-5 text-green-500" />
                                <span className="text-2xl font-bold text-gray-900 dark:text-white">
                                    {attempt.correctCount}
                                </span>
                            </div>
                            <span className="text-xs text-gray-500">Correct</span>
                        </div>
                        <div>
                            <div className="flex items-center justify-center gap-1 mb-1">
                                <XCircle className="h-5 w-5 text-red-500" />
                                <span className="text-2xl font-bold text-gray-900 dark:text-white">
                                    {attempt.wrongCount}
                                </span>
                            </div>
                            <span className="text-xs text-gray-500">Wrong</span>
                        </div>
                        <div>
                            <div className="flex items-center justify-center gap-1 mb-1">
                                <SkipForward className="h-5 w-5 text-gray-400" />
                                <span className="text-2xl font-bold text-gray-900 dark:text-white">
                                    {attempt.skippedCount}
                                </span>
                            </div>
                            <span className="text-xs text-gray-500">Skipped</span>
                        </div>
                        <div>
                            <div className="flex items-center justify-center gap-1 mb-1">
                                <Clock className="h-5 w-5 text-blue-500" />
                                <span className="text-2xl font-bold text-gray-900 dark:text-white">
                                    {Math.floor(attempt.timeTaken / 60)}m
                                </span>
                            </div>
                            <span className="text-xs text-gray-500">Time</span>
                        </div>
                    </div>

                    {/* Progress Bar */}
                    <div className="mt-6">
                        <div className="flex justify-between text-sm mb-2">
                            <span className="text-gray-500">Accuracy</span>
                            <span className="font-medium text-gray-900 dark:text-white">
                                {totalQuestions > 0
                                    ? Math.round((attempt.correctCount / totalQuestions) * 100)
                                    : 0}%
                            </span>
                        </div>
                        <ProgressBar
                            value={totalQuestions > 0 ? (attempt.correctCount / totalQuestions) * 100 : 0}
                            size="lg"
                            variant={passed ? 'success' : 'error'}
                        />
                    </div>
                </CardBody>
            </Card>

            {/* Performance Insights */}
            <Card>
                <CardBody>
                    <h3 className="font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                        <TrendingUp className="h-5 w-5 text-blue-500" />
                        Performance Insights
                    </h3>

                    <div className="space-y-3">
                        {/* Accuracy insight */}
                        <div className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                            <Target className="h-5 w-5 text-purple-500" />
                            <div>
                                <p className="text-sm font-medium text-gray-900 dark:text-white">
                                    Accuracy Rate
                                </p>
                                <p className="text-xs text-gray-500">
                                    {attempt.correctCount} out of {totalQuestions} questions answered correctly
                                </p>
                            </div>
                        </div>

                        {/* Time insight */}
                        <div className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                            <Clock className="h-5 w-5 text-blue-500" />
                            <div>
                                <p className="text-sm font-medium text-gray-900 dark:text-white">
                                    Time Management
                                </p>
                                <p className="text-xs text-gray-500">
                                    Average {Math.round(attempt.timeTaken / totalQuestions)} seconds per question
                                </p>
                            </div>
                        </div>

                        {/* Grade insight */}
                        <div className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                            <Award className="h-5 w-5 text-yellow-500" />
                            <div>
                                <p className="text-sm font-medium text-gray-900 dark:text-white">
                                    Grade: {grade}
                                </p>
                                <p className="text-xs text-gray-500">
                                    {passed ? 'You have passed this test!' : 'Keep practicing to improve!'}
                                </p>
                            </div>
                        </div>
                    </div>
                </CardBody>
            </Card>
        </div>
    );
}

export default ScoreAnalysis;
