// DashboardStats Component
// Real-time stats display with Firestore data

'use client';

import React from 'react';
import { BookOpen, FileText, Trophy, Flame, Target, TrendingUp } from 'lucide-react';
import { Card, CardBody } from '@/components/ui';
import { useUserProgress, useProgressStats } from '@/hooks/useUserProgress';
import { useTestStats } from '@/hooks/useTestAttempts';
import { cn } from '@/lib/utils';

interface DashboardStatsProps {
    className?: string;
    variant?: 'full' | 'compact';
}

function DashboardStats({ className, variant = 'full' }: DashboardStatsProps) {
    const {
        totalQuestionsRead,
        streak,
        longestStreak,
        isLoading: progressLoading
    } = useProgressStats();

    const {
        totalAttempts,
        completedTests,
        passedTests,
        averageScore,
        isLoading: testLoading
    } = useTestStats();

    const isLoading = progressLoading || testLoading;

    const stats = [
        {
            id: 'questions',
            label: 'Questions Read',
            labelBn: 'প্রশ্ন পড়েছো',
            value: totalQuestionsRead,
            icon: BookOpen,
            color: 'text-blue-500',
            bgColor: 'bg-blue-100 dark:bg-blue-900/30',
        },
        {
            id: 'tests',
            label: 'Tests Taken',
            labelBn: 'টেস্ট দিয়েছো',
            value: completedTests,
            icon: FileText,
            color: 'text-purple-500',
            bgColor: 'bg-purple-100 dark:bg-purple-900/30',
        },
        {
            id: 'passed',
            label: 'Tests Passed',
            labelBn: 'পাশ করেছো',
            value: passedTests,
            icon: Trophy,
            color: 'text-amber-500',
            bgColor: 'bg-amber-100 dark:bg-amber-900/30',
        },
        {
            id: 'streak',
            label: 'Day Streak',
            labelBn: 'দিনের Streak',
            value: streak,
            icon: Flame,
            color: 'text-orange-500',
            bgColor: 'bg-orange-100 dark:bg-orange-900/30',
            suffix: '🔥',
        },
        {
            id: 'score',
            label: 'Avg Score',
            labelBn: 'গড় স্কোর',
            value: `${averageScore}%`,
            icon: Target,
            color: 'text-green-500',
            bgColor: 'bg-green-100 dark:bg-green-900/30',
        },
        {
            id: 'longest',
            label: 'Best Streak',
            labelBn: 'সেরা Streak',
            value: longestStreak,
            icon: TrendingUp,
            color: 'text-red-500',
            bgColor: 'bg-red-100 dark:bg-red-900/30',
        },
    ];

    // Compact variant shows only 4 stats
    const displayStats = variant === 'compact' ? stats.slice(0, 4) : stats;

    if (isLoading) {
        return (
            <div className={cn('grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4', className)}>
                {[...Array(variant === 'compact' ? 4 : 6)].map((_, i) => (
                    <div
                        key={i}
                        className="h-24 bg-gray-100 dark:bg-gray-800 rounded-xl animate-pulse"
                    />
                ))}
            </div>
        );
    }

    return (
        <div className={cn(
            'grid gap-4',
            variant === 'compact'
                ? 'grid-cols-2 md:grid-cols-4'
                : 'grid-cols-2 md:grid-cols-3 lg:grid-cols-6',
            className
        )}>
            {displayStats.map((stat) => (
                <Card key={stat.id} className="overflow-hidden">
                    <CardBody className="p-4">
                        <div className="flex items-center gap-3">
                            <div className={cn('p-2 rounded-lg', stat.bgColor)}>
                                <stat.icon className={cn('h-5 w-5', stat.color)} />
                            </div>
                            <div className="flex-1 min-w-0">
                                <p className="text-2xl font-bold text-gray-900 dark:text-white">
                                    {stat.value}
                                    {stat.suffix && <span className="ml-1">{stat.suffix}</span>}
                                </p>
                                <p className="text-xs text-gray-500 truncate font-bengali">
                                    {stat.labelBn}
                                </p>
                            </div>
                        </div>
                    </CardBody>
                </Card>
            ))}
        </div>
    );
}

// Streak display component
export function StreakDisplay({ className }: { className?: string }) {
    const { streak, longestStreak } = useProgressStats();

    return (
        <div className={cn(
            'flex items-center gap-3 p-4 bg-gradient-to-r from-orange-500 to-red-500 rounded-xl text-white',
            className
        )}>
            <div className="p-2 bg-white/20 rounded-lg">
                <Flame className="h-6 w-6" />
            </div>
            <div>
                <p className="text-2xl font-bold">{streak} দিন 🔥</p>
                <p className="text-sm text-orange-100">
                    সেরা: {longestStreak} দিন
                </p>
            </div>
        </div>
    );
}

// Quick stats for sidebar
export function QuickStats({ className }: { className?: string }) {
    const { totalQuestionsRead, streak } = useProgressStats();
    const { completedTests, averageScore } = useTestStats();

    return (
        <div className={cn('space-y-3', className)}>
            <div className="flex items-center justify-between text-sm">
                <span className="text-gray-500">প্রশ্ন পড়েছো</span>
                <span className="font-bold text-gray-900 dark:text-white">{totalQuestionsRead}</span>
            </div>
            <div className="flex items-center justify-between text-sm">
                <span className="text-gray-500">টেস্ট দিয়েছো</span>
                <span className="font-bold text-gray-900 dark:text-white">{completedTests}</span>
            </div>
            <div className="flex items-center justify-between text-sm">
                <span className="text-gray-500">গড় স্কোর</span>
                <span className="font-bold text-green-600">{averageScore}%</span>
            </div>
            <div className="flex items-center justify-between text-sm">
                <span className="text-gray-500">Streak</span>
                <span className="font-bold text-orange-500">{streak} 🔥</span>
            </div>
        </div>
    );
}

export default DashboardStats;
