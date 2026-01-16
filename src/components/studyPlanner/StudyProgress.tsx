'use client';

import React, { useMemo } from 'react';
import { TrendingUp, Calendar, Target, Award, ChevronRight } from 'lucide-react';
import { Card, CardBody, CardHeader, Badge, Button } from '@/components/ui';
import { StudyTask, calculateProgress, formatMinutes } from '@/types/studyPlanner';
import { cn } from '@/lib/utils';
import Link from 'next/link';

interface StudyProgressProps {
    tasks?: StudyTask[];
    targetMinutesDaily?: number;
    targetMinutesWeekly?: number;
    streak?: number;
    className?: string;
}

function StudyProgress({
    tasks = [],
    targetMinutesDaily = 180,
    targetMinutesWeekly = 840,
    streak = 7,
    className
}: StudyProgressProps) {
    // Calculate progress
    const dailyProgress = useMemo(() => {
        const today = new Date();
        const todayTasks = tasks.filter(t =>
            t.scheduledDate.toDateString() === today.toDateString()
        );
        const completedMinutes = todayTasks
            .filter(t => t.status === 'completed')
            .reduce((sum, t) => sum + (t.actualMinutes || t.estimatedMinutes), 0);

        return {
            completed: completedMinutes,
            target: targetMinutesDaily,
            percentage: calculateProgress(completedMinutes, targetMinutesDaily),
            tasksCompleted: todayTasks.filter(t => t.status === 'completed').length,
            totalTasks: todayTasks.length,
        };
    }, [tasks, targetMinutesDaily]);

    const weeklyProgress = useMemo(() => {
        const now = new Date();
        const weekStart = new Date(now);
        weekStart.setDate(now.getDate() - now.getDay());

        const weekTasks = tasks.filter(t => t.scheduledDate >= weekStart);
        const completedMinutes = weekTasks
            .filter(t => t.status === 'completed')
            .reduce((sum, t) => sum + (t.actualMinutes || t.estimatedMinutes), 0);

        return {
            completed: completedMinutes,
            target: targetMinutesWeekly,
            percentage: calculateProgress(completedMinutes, targetMinutesWeekly),
        };
    }, [tasks, targetMinutesWeekly]);

    // Subject breakdown
    const subjectBreakdown = useMemo(() => {
        const subjects: Record<string, { name: string; minutes: number; color: string }> = {};

        tasks.forEach(task => {
            if (task.status === 'completed') {
                if (!subjects[task.subjectId]) {
                    subjects[task.subjectId] = {
                        name: task.subjectName,
                        minutes: 0,
                        color: ['#3B82F6', '#22C55E', '#8B5CF6', '#F59E0B'][Object.keys(subjects).length % 4],
                    };
                }
                subjects[task.subjectId].minutes += task.actualMinutes || task.estimatedMinutes;
            }
        });

        return Object.values(subjects).sort((a, b) => b.minutes - a.minutes);
    }, [tasks]);

    return (
        <Card className={className}>
            <CardHeader
                title="Study Progress"
                subtitle="à¦ªà¦¡à¦¼à¦¾à¦¶à§‹à¦¨à¦¾à¦° à¦…à¦—à§à¦°à¦—à¦¤à¦¿"
                icon={<TrendingUp className="h-5 w-5 text-green-500" />}
                action={
                    <Link href="/study-planner">
                        <Button variant="outline" size="sm">
                            View Details <ChevronRight className="h-4 w-4 ml-1" />
                        </Button>
                    </Link>
                }
            />
            <CardBody className="space-y-6">
                {/* Daily & Weekly Progress */}
                <div className="grid sm:grid-cols-2 gap-4">
                    {/* Daily */}
                    <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-xl">
                        <div className="flex items-center justify-between mb-3">
                            <div className="flex items-center gap-2">
                                <Calendar className="h-5 w-5 text-blue-500" />
                                <span className="font-medium text-gray-900 dark:text-white">Today</span>
                            </div>
                            <Badge size="sm" className="bg-blue-100 text-blue-700">
                                {dailyProgress.tasksCompleted}/{dailyProgress.totalTasks} tasks
                            </Badge>
                        </div>

                        <div className="mb-2">
                            <div className="flex items-end justify-between mb-1">
                                <span className="text-2xl font-bold text-blue-600">
                                    {formatMinutes(dailyProgress.completed)}
                                </span>
                                <span className="text-sm text-gray-500">
                                    / {formatMinutes(dailyProgress.target)}
                                </span>
                            </div>
                            <div className="h-3 bg-blue-200 dark:bg-blue-900/40 rounded-full overflow-hidden">
                                <div
                                    className="h-full bg-gradient-to-r from-blue-500 to-blue-400 rounded-full transition-all duration-500"
                                    style={{ width: `${Math.min(dailyProgress.percentage, 100)}%` }}
                                />
                            </div>
                        </div>

                        <p className="text-xs text-blue-600">
                            {dailyProgress.percentage >= 100
                                ? 'ðŸŽ‰ Daily goal achieved!'
                                : `${formatMinutes(dailyProgress.target - dailyProgress.completed)} remaining`
                            }
                        </p>
                    </div>

                    {/* Weekly */}
                    <div className="p-4 bg-purple-50 dark:bg-purple-900/20 rounded-xl">
                        <div className="flex items-center justify-between mb-3">
                            <div className="flex items-center gap-2">
                                <Target className="h-5 w-5 text-purple-500" />
                                <span className="font-medium text-gray-900 dark:text-white">This Week</span>
                            </div>
                            <Badge size="sm" className="bg-purple-100 text-purple-700">
                                {weeklyProgress.percentage}%
                            </Badge>
                        </div>

                        <div className="mb-2">
                            <div className="flex items-end justify-between mb-1">
                                <span className="text-2xl font-bold text-purple-600">
                                    {formatMinutes(weeklyProgress.completed)}
                                </span>
                                <span className="text-sm text-gray-500">
                                    / {formatMinutes(weeklyProgress.target)}
                                </span>
                            </div>
                            <div className="h-3 bg-purple-200 dark:bg-purple-900/40 rounded-full overflow-hidden">
                                <div
                                    className="h-full bg-gradient-to-r from-purple-500 to-purple-400 rounded-full transition-all duration-500"
                                    style={{ width: `${Math.min(weeklyProgress.percentage, 100)}%` }}
                                />
                            </div>
                        </div>

                        <p className="text-xs text-purple-600">
                            {weeklyProgress.percentage >= 100
                                ? 'ðŸ† Weekly goal achieved!'
                                : `${formatMinutes(weeklyProgress.target - weeklyProgress.completed)} to go`
                            }
                        </p>
                    </div>
                </div>

                {/* Streak */}
                <div className="flex items-center justify-between p-4 bg-gradient-to-r from-orange-50 to-amber-50 dark:from-orange-900/20 dark:to-amber-900/20 rounded-xl">
                    <div className="flex items-center gap-3">
                        <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-amber-500 rounded-xl flex items-center justify-center text-2xl">
                            ðŸ”¥
                        </div>
                        <div>
                            <p className="font-bold text-xl text-amber-700 dark:text-amber-400">
                                {streak} Day Streak!
                            </p>
                            <p className="text-sm text-amber-600 font-bengali">
                                à¦§à¦¾à¦°à¦¾à¦¬à¦¾à¦¹à¦¿à¦•à¦¤à¦¾ à¦¬à¦œà¦¾à¦¯à¦¼ à¦°à¦¾à¦–à§‹!
                            </p>
                        </div>
                    </div>
                    <Award className="h-8 w-8 text-amber-500" />
                </div>

                {/* Subject Breakdown */}
                {subjectBreakdown.length > 0 && (
                    <div>
                        <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                            Study by Subject
                        </h4>
                        <div className="space-y-2">
                            {subjectBreakdown.slice(0, 4).map((subject) => (
                                <div key={subject.name} className="flex items-center gap-3">
                                    <div
                                        className="w-3 h-3 rounded-full shrink-0"
                                        style={{ backgroundColor: subject.color }}
                                    />
                                    <span className="flex-1 text-sm text-gray-600 dark:text-gray-400">
                                        {subject.name}
                                    </span>
                                    <span className="text-sm font-medium text-gray-900 dark:text-white">
                                        {formatMinutes(subject.minutes)}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </CardBody>
        </Card>
    );
}

export default StudyProgress;

