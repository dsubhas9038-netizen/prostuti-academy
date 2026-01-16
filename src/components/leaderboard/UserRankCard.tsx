'use client';

import React from 'react';
import { TrendingUp, TrendingDown, Target, Flame, Award } from 'lucide-react';
import { Card, CardBody, Badge, Avatar } from '@/components/ui';
import { LeaderboardEntry, getRankChange, formatScore, formatRank, achievementConfig } from '@/types/leaderboard';
import { cn } from '@/lib/utils';

interface UserRankCardProps {
    entry: LeaderboardEntry;
    totalUsers?: number;
    variant?: 'default' | 'compact' | 'detailed';
    className?: string;
}

function UserRankCard({
    entry,
    totalUsers = 2800,
    variant = 'default',
    className
}: UserRankCardProps) {
    const rankChange = getRankChange(entry.rank, entry.previousRank);
    const percentile = Math.round((1 - entry.rank / totalUsers) * 100);

    if (variant === 'compact') {
        return (
            <div className={cn(
                'flex items-center gap-3 p-3 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-xl',
                className
            )}>
                <div className="text-center">
                    <p className="text-2xl font-bold text-blue-600">#{entry.rank}</p>
                    <div className="flex items-center justify-center gap-1 text-xs">
                        {rankChange.direction === 'up' && (
                            <>
                                <TrendingUp className="h-3 w-3 text-green-500" />
                                <span className="text-green-600">+{rankChange.change}</span>
                            </>
                        )}
                        {rankChange.direction === 'down' && (
                            <>
                                <TrendingDown className="h-3 w-3 text-red-500" />
                                <span className="text-red-600">-{rankChange.change}</span>
                            </>
                        )}
                    </div>
                </div>
                <div className="flex-1">
                    <p className="text-sm text-gray-500">Your Rank</p>
                    <p className="font-semibold text-gray-900 dark:text-white">{formatScore(entry.score)} pts</p>
                </div>
                {entry.streak > 0 && (
                    <Badge className="bg-orange-100 text-orange-700">
                        🔥 {entry.streak}
                    </Badge>
                )}
            </div>
        );
    }

    return (
        <Card className={cn('overflow-hidden', className)}>
            <CardBody className="p-0">
                {/* Header with gradient */}
                <div className="bg-gradient-to-r from-blue-600 to-indigo-600 px-6 py-4 text-white">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-blue-200 text-sm">Your Rank</p>
                            <p className="text-3xl font-bold">{formatRank(entry.rank)}</p>
                        </div>
                        <div className="text-right">
                            <div className="flex items-center justify-end gap-2">
                                {rankChange.direction === 'up' && (
                                    <div className="flex items-center gap-1 px-2 py-1 bg-green-500/20 rounded-full">
                                        <TrendingUp className="h-4 w-4 text-green-300" />
                                        <span className="text-sm text-green-300">+{rankChange.change}</span>
                                    </div>
                                )}
                                {rankChange.direction === 'down' && (
                                    <div className="flex items-center gap-1 px-2 py-1 bg-red-500/20 rounded-full">
                                        <TrendingDown className="h-4 w-4 text-red-300" />
                                        <span className="text-sm text-red-300">-{rankChange.change}</span>
                                    </div>
                                )}
                            </div>
                            <p className="text-sm text-blue-200 mt-1">vs last week</p>
                        </div>
                    </div>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-3 divide-x divide-gray-200 dark:divide-gray-700">
                    <div className="p-4 text-center">
                        <p className="text-2xl font-bold text-gray-900 dark:text-white">{formatScore(entry.score)}</p>
                        <p className="text-xs text-gray-500">Points</p>
                    </div>
                    <div className="p-4 text-center">
                        <p className="text-2xl font-bold text-gray-900 dark:text-white">{percentile}%</p>
                        <p className="text-xs text-gray-500">Top Percentile</p>
                    </div>
                    <div className="p-4 text-center">
                        <div className="flex items-center justify-center gap-1">
                            <Flame className={cn(
                                'h-5 w-5',
                                entry.streak >= 7 ? 'text-orange-500' : 'text-gray-400'
                            )} />
                            <span className="text-2xl font-bold text-gray-900 dark:text-white">{entry.streak}</span>
                        </div>
                        <p className="text-xs text-gray-500">Day Streak</p>
                    </div>
                </div>

                {/* Progress to next rank */}
                <div className="px-6 pb-4">
                    <div className="flex items-center justify-between text-sm mb-2">
                        <span className="text-gray-500">Progress to #{entry.rank - 1}</span>
                        <span className="font-medium text-gray-900 dark:text-white">85%</span>
                    </div>
                    <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                        <div
                            className="h-full bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full"
                            style={{ width: '85%' }}
                        />
                    </div>
                    <p className="text-xs text-gray-500 mt-1">50 more points needed</p>
                </div>

                {/* Achievements */}
                {entry.achievements.length > 0 && (
                    <div className="px-6 pb-4 border-t border-gray-200 dark:border-gray-700 pt-4">
                        <p className="text-sm font-medium text-gray-900 dark:text-white mb-2 flex items-center gap-2">
                            <Award className="h-4 w-4 text-amber-500" />
                            Recent Achievements
                        </p>
                        <div className="flex flex-wrap gap-2">
                            {entry.achievements.map((ach) => (
                                <Badge
                                    key={ach.id}
                                    size="sm"
                                    style={{ backgroundColor: `${ach.color}20`, color: ach.color }}
                                >
                                    {ach.icon} {ach.titleBn}
                                </Badge>
                            ))}
                        </div>
                    </div>
                )}

                {/* Detailed stats */}
                {variant === 'detailed' && (
                    <div className="px-6 pb-4 grid grid-cols-2 gap-4 border-t border-gray-200 dark:border-gray-700 pt-4">
                        <div className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                            <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900/30 rounded-lg flex items-center justify-center">
                                📝
                            </div>
                            <div>
                                <p className="font-semibold text-gray-900 dark:text-white">{entry.questionsAnswered}</p>
                                <p className="text-xs text-gray-500">Questions</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                            <div className="w-10 h-10 bg-purple-100 dark:bg-purple-900/30 rounded-lg flex items-center justify-center">
                                🧪
                            </div>
                            <div>
                                <p className="font-semibold text-gray-900 dark:text-white">{entry.testsCompleted}</p>
                                <p className="text-xs text-gray-500">Tests</p>
                            </div>
                        </div>
                    </div>
                )}
            </CardBody>
        </Card>
    );
}

export default UserRankCard;
