'use client';

import React from 'react';
import { BarChart3, Clock, CheckCircle, Flame, BookOpen, TrendingUp } from 'lucide-react';
import { Card, CardBody, CardHeader, Badge } from '@/components/ui';
import { StudyStats as StatsType, formatMinutes } from '@/types/studyPlanner';
import { cn } from '@/lib/utils';

interface StudyStatsProps {
    stats?: StatsType;
    variant?: 'full' | 'compact';
    className?: string;
}

const defaultStats: StatsType = {
    totalMinutesToday: 50,
    totalMinutesWeek: 420,
    tasksCompletedToday: 1,
    tasksCompletedWeek: 12,
    currentStreak: 7,
    longestStreak: 15,
    averageMinutesPerDay: 60,
    favoriteSubject: 'Bengali',
};

function StudyStats({
    stats = defaultStats,
    variant = 'full',
    className
}: StudyStatsProps) {
    const statCards = [
        {
            id: 'today',
            label: "Today's Study",
            labelBn: 'à¦†à¦œà¦•à§‡à¦° à¦ªà¦¡à¦¼à¦¾à¦¶à§‹à¦¨à¦¾',
            value: formatMinutes(stats.totalMinutesToday),
            icon: Clock,
            color: '#3B82F6',
            bgColor: 'bg-blue-50 dark:bg-blue-900/20',
        },
        {
            id: 'week',
            label: 'This Week',
            labelBn: 'à¦à¦‡ à¦¸à¦ªà§à¦¤à¦¾à¦¹',
            value: formatMinutes(stats.totalMinutesWeek),
            icon: BarChart3,
            color: '#8B5CF6',
            bgColor: 'bg-purple-50 dark:bg-purple-900/20',
        },
        {
            id: 'tasks',
            label: 'Tasks Completed',
            labelBn: 'à¦¸à¦®à§à¦ªà¦¨à§à¦¨ à¦Ÿà¦¾à¦¸à§à¦•',
            value: `${stats.tasksCompletedToday}/${stats.tasksCompletedWeek}`,
            subValue: 'Today/Week',
            icon: CheckCircle,
            color: '#22C55E',
            bgColor: 'bg-green-50 dark:bg-green-900/20',
        },
        {
            id: 'streak',
            label: 'Current Streak',
            labelBn: 'à¦¬à¦°à§à¦¤à¦®à¦¾à¦¨ à¦¸à§à¦Ÿà§à¦°à¦¿à¦•',
            value: `${stats.currentStreak} days`,
            subValue: `Best: ${stats.longestStreak}`,
            icon: Flame,
            color: '#F59E0B',
            bgColor: 'bg-amber-50 dark:bg-amber-900/20',
        },
    ];

    if (variant === 'compact') {
        return (
            <div className={cn('grid grid-cols-2 sm:grid-cols-4 gap-3', className)}>
                {statCards.map((stat) => {
                    const Icon = stat.icon;
                    return (
                        <div
                            key={stat.id}
                            className={cn('p-3 rounded-xl', stat.bgColor)}
                        >
                            <div className="flex items-center gap-2 mb-1">
                                <Icon className="h-4 w-4" style={{ color: stat.color }} />
                                <span className="text-xs text-gray-500">{stat.label}</span>
                            </div>
                            <p className="text-lg font-bold" style={{ color: stat.color }}>
                                {stat.value}
                            </p>
                        </div>
                    );
                })}
            </div>
        );
    }

    return (
        <Card className={className}>
            <CardHeader
                title="Study Statistics"
                subtitle="à¦ªà¦¡à¦¼à¦¾à¦¶à§‹à¦¨à¦¾à¦° à¦ªà¦°à¦¿à¦¸à¦‚à¦–à§à¦¯à¦¾à¦¨"
                icon={<BarChart3 className="h-5 w-5 text-purple-500" />}
            />
            <CardBody>
                <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    {statCards.map((stat) => {
                        const Icon = stat.icon;
                        return (
                            <div
                                key={stat.id}
                                className={cn('p-4 rounded-xl', stat.bgColor)}
                            >
                                <div className="flex items-center gap-2 mb-2">
                                    <div
                                        className="w-10 h-10 rounded-lg flex items-center justify-center"
                                        style={{ backgroundColor: stat.color + '20' }}
                                    >
                                        <Icon className="h-5 w-5" style={{ color: stat.color }} />
                                    </div>
                                </div>
                                <p className="text-2xl font-bold text-gray-900 dark:text-white">
                                    {stat.value}
                                </p>
                                <p className="text-sm text-gray-500 font-bengali">{stat.labelBn}</p>
                                {stat.subValue && (
                                    <p className="text-xs text-gray-400 mt-1">{stat.subValue}</p>
                                )}
                            </div>
                        );
                    })}
                </div>

                {/* Weekly Chart */}
                <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
                    <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-4">
                        Weekly Study Time
                    </h4>
                    <div className="flex items-end gap-2 h-32">
                        {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((day, i) => {
                            const height = [60, 75, 45, 90, 80, 30, 40][i];
                            const isToday = i === new Date().getDay() - 1;

                            return (
                                <div key={day} className="flex-1 flex flex-col items-center">
                                    <div
                                        className={cn(
                                            'w-full rounded-t-lg transition-all',
                                            isToday ? 'bg-blue-500' : 'bg-blue-200 dark:bg-blue-900/40'
                                        )}
                                        style={{ height: `${height}%` }}
                                    />
                                    <span className={cn(
                                        'text-xs mt-2',
                                        isToday ? 'font-bold text-blue-600' : 'text-gray-500'
                                    )}>
                                        {day}
                                    </span>
                                </div>
                            );
                        })}
                    </div>
                </div>

                {/* Summary */}
                <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700 grid grid-cols-2 gap-4">
                    <div className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                        <TrendingUp className="h-5 w-5 text-green-500" />
                        <div>
                            <p className="font-semibold text-gray-900 dark:text-white">
                                {formatMinutes(stats.averageMinutesPerDay)}
                            </p>
                            <p className="text-xs text-gray-500">Avg per day</p>
                        </div>
                    </div>
                    <div className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                        <BookOpen className="h-5 w-5 text-blue-500" />
                        <div>
                            <p className="font-semibold text-gray-900 dark:text-white">
                                {stats.favoriteSubject}
                            </p>
                            <p className="text-xs text-gray-500">Most studied</p>
                        </div>
                    </div>
                </div>
            </CardBody>
        </Card>
    );
}

export default StudyStats;

