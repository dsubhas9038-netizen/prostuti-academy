'use client';

import React from 'react';
import { Flame, Trophy, Star, Zap } from 'lucide-react';
import { StreakData, DayActivity } from '@/types/dashboard';
import { Card, CardBody, CardHeader, Badge } from '@/components/ui';
import { cn } from '@/lib/utils';

interface StudyStreakProps {
    streakData: StreakData;
    showMilestones?: boolean;
    className?: string;
}

const dayNames = ['রবি', 'সোম', 'মঙ্গল', 'বুধ', 'বৃহ', 'শুক্র', 'শনি'];
const dayNamesShort = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];

function StudyStreak({ streakData, showMilestones = true, className }: StudyStreakProps) {
    const { currentStreak, longestStreak, weeklyActivity, milestones } = streakData;

    // Get streak status
    const getStreakStatus = () => {
        if (currentStreak >= 30) return { color: '#EF4444', label: '🔥 On Fire!', labelBn: '🔥 দুর্দান্ত!' };
        if (currentStreak >= 14) return { color: '#F59E0B', label: '⚡ Great!', labelBn: '⚡ চমৎকার!' };
        if (currentStreak >= 7) return { color: '#22C55E', label: '✨ Good!', labelBn: '✨ ভালো!' };
        return { color: '#3B82F6', label: '💪 Keep Going!', labelBn: '💪 চালিয়ে যাও!' };
    };

    const status = getStreakStatus();

    return (
        <Card className={className}>
            <CardHeader
                title="Study Streak"
                subtitle="ধারাবাহিক পড়াশোনা"
                icon={<Flame className="h-5 w-5 text-orange-500" />}
            />
            <CardBody>
                {/* Current Streak Display */}
                <div className="text-center mb-6">
                    <div className="relative inline-flex items-center justify-center">
                        {/* Flame Background */}
                        <div className="absolute inset-0 animate-pulse">
                            <Flame
                                className="h-24 w-24 opacity-20"
                                style={{ color: status.color }}
                            />
                        </div>

                        {/* Streak Number */}
                        <div className="relative z-10">
                            <div
                                className="text-5xl font-bold"
                                style={{ color: status.color }}
                            >
                                {currentStreak}
                            </div>
                            <div className="text-sm text-gray-500 font-bengali">দিনের স্ট্রিক</div>
                        </div>
                    </div>

                    {/* Status Badge */}
                    <Badge
                        className="mt-3"
                        style={{ backgroundColor: `${status.color}20`, color: status.color }}
                    >
                        {status.labelBn}
                    </Badge>

                    {/* Longest Streak */}
                    <div className="mt-2 text-xs text-gray-500 flex items-center justify-center gap-1">
                        <Trophy className="h-3 w-3 text-yellow-500" />
                        Best: {longestStreak} days
                    </div>
                </div>

                {/* Weekly Activity Calendar */}
                <div className="mb-6">
                    <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                        This Week
                    </h4>
                    <div className="flex items-center justify-between gap-2">
                        {weeklyActivity.map((day, index) => {
                            const dayOfWeek = day.date.getDay();
                            const isToday = new Date().toDateString() === day.date.toDateString();

                            return (
                                <div key={index} className="flex flex-col items-center gap-1">
                                    <span className="text-xs text-gray-500">{dayNamesShort[dayOfWeek]}</span>
                                    <div
                                        className={cn(
                                            'w-10 h-10 rounded-lg flex items-center justify-center transition-all',
                                            day.isActive
                                                ? 'bg-gradient-to-br from-orange-400 to-red-500 text-white shadow-md'
                                                : 'bg-gray-100 dark:bg-gray-800 text-gray-400',
                                            isToday && 'ring-2 ring-offset-2 ring-orange-400'
                                        )}
                                    >
                                        {day.isActive ? (
                                            <Flame className="h-5 w-5" />
                                        ) : (
                                            <span className="text-xs">{day.date.getDate()}</span>
                                        )}
                                    </div>
                                    {day.minutesStudied > 0 && (
                                        <span className="text-xs text-gray-500">{day.minutesStudied}m</span>
                                    )}
                                </div>
                            );
                        })}
                    </div>
                </div>

                {/* Milestones */}
                {showMilestones && (
                    <div>
                        <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3 flex items-center gap-2">
                            <Star className="h-4 w-4 text-yellow-500" />
                            Milestones
                        </h4>
                        <div className="flex items-center gap-3 overflow-x-auto pb-2">
                            {milestones.map((milestone, index) => (
                                <div
                                    key={index}
                                    className={cn(
                                        'flex-shrink-0 p-3 rounded-xl border-2 text-center min-w-[80px]',
                                        milestone.achieved
                                            ? 'border-yellow-400 bg-yellow-50 dark:bg-yellow-900/20'
                                            : currentStreak >= milestone.days * 0.7
                                                ? 'border-orange-300 bg-orange-50 dark:bg-orange-900/20'
                                                : 'border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800'
                                    )}
                                >
                                    <div className={cn(
                                        'text-lg font-bold',
                                        milestone.achieved ? 'text-yellow-600' : 'text-gray-400'
                                    )}>
                                        {milestone.days}
                                    </div>
                                    <div className="text-xs text-gray-500">days</div>
                                    {milestone.achieved && (
                                        <Trophy className="h-4 w-4 text-yellow-500 mx-auto mt-1" />
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* Motivation Text */}
                <div className="mt-4 p-3 bg-gradient-to-r from-orange-50 to-red-50 dark:from-orange-900/20 dark:to-red-900/20 rounded-lg text-center">
                    <p className="text-sm text-orange-700 dark:text-orange-400 font-bengali">
                        {currentStreak > 7
                            ? '🎉 দুর্দান্ত! তুমি চালিয়ে যাচ্ছ!'
                            : '💪 প্রতিদিন পড়ো, স্ট্রিক বাড়াও!'}
                    </p>
                </div>
            </CardBody>
        </Card>
    );
}

export default StudyStreak;
