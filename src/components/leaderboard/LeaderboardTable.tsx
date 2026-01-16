'use client';

import React from 'react';
import { TrendingUp, TrendingDown, Minus, Flame } from 'lucide-react';
import { Card, CardBody, Badge, Avatar } from '@/components/ui';
import { LeaderboardEntry, medalConfig, getRankChange, formatScore, formatRank } from '@/types/leaderboard';
import { cn } from '@/lib/utils';

interface LeaderboardTableProps {
    entries: LeaderboardEntry[];
    showHeader?: boolean;
    highlightUser?: boolean;
    className?: string;
}

function LeaderboardTable({
    entries,
    showHeader = true,
    highlightUser = true,
    className
}: LeaderboardTableProps) {
    return (
        <Card className={className}>
            <CardBody className="p-0">
                <div className="overflow-x-auto">
                    <table className="w-full">
                        {showHeader && (
                            <thead>
                                <tr className="border-b border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800">
                                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-20">Rank</th>
                                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Student</th>
                                    <th className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Score</th>
                                    <th className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider hidden sm:table-cell">Questions</th>
                                    <th className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider hidden md:table-cell">Tests</th>
                                    <th className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Streak</th>
                                </tr>
                            </thead>
                        )}
                        <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
                            {entries.map((entry) => {
                                const rankChange = getRankChange(entry.rank, entry.previousRank);
                                const isTopThree = entry.rank <= 3;
                                const medal = isTopThree ? medalConfig[entry.rank as 1 | 2 | 3] : null;

                                return (
                                    <tr
                                        key={entry.id}
                                        className={cn(
                                            'transition-colors hover:bg-gray-50 dark:hover:bg-gray-800/50',
                                            highlightUser && entry.isCurrentUser && 'bg-blue-50 dark:bg-blue-900/20 hover:bg-blue-100 dark:hover:bg-blue-900/30',
                                            isTopThree && `bg-gradient-to-r ${medal?.gradient}/10`
                                        )}
                                    >
                                        {/* Rank */}
                                        <td className="px-4 py-4">
                                            <div className="flex items-center gap-2">
                                                {isTopThree ? (
                                                    <span className="text-2xl">{medal?.icon}</span>
                                                ) : (
                                                    <span className="w-8 h-8 flex items-center justify-center font-bold text-gray-900 dark:text-white">
                                                        {entry.rank}
                                                    </span>
                                                )}

                                                {/* Rank Change Indicator */}
                                                <div className="flex flex-col items-center">
                                                    {rankChange.direction === 'up' && (
                                                        <div className="flex items-center text-green-500">
                                                            <TrendingUp className="h-3 w-3" />
                                                            <span className="text-xs">{rankChange.change}</span>
                                                        </div>
                                                    )}
                                                    {rankChange.direction === 'down' && (
                                                        <div className="flex items-center text-red-500">
                                                            <TrendingDown className="h-3 w-3" />
                                                            <span className="text-xs">{rankChange.change}</span>
                                                        </div>
                                                    )}
                                                    {rankChange.direction === 'same' && (
                                                        <Minus className="h-3 w-3 text-gray-400" />
                                                    )}
                                                </div>
                                            </div>
                                        </td>

                                        {/* Student */}
                                        <td className="px-4 py-4">
                                            <div className="flex items-center gap-3">
                                                <Avatar
                                                    src={entry.photoURL}
                                                    fallback={entry.displayName[0]}
                                                    size="sm"
                                                    className={cn(
                                                        isTopThree && 'ring-2',
                                                        entry.rank === 1 && 'ring-yellow-400',
                                                        entry.rank === 2 && 'ring-gray-300',
                                                        entry.rank === 3 && 'ring-amber-600'
                                                    )}
                                                />
                                                <div>
                                                    <p className={cn(
                                                        'font-medium font-bengali',
                                                        entry.isCurrentUser ? 'text-blue-600' : 'text-gray-900 dark:text-white'
                                                    )}>
                                                        {entry.displayName}
                                                        {entry.isCurrentUser && <span className="text-xs ml-1">(You)</span>}
                                                    </p>
                                                    {entry.achievements.length > 0 && (
                                                        <div className="flex items-center gap-1 mt-0.5">
                                                            {entry.achievements.slice(0, 2).map((ach) => (
                                                                <span key={ach.id} className="text-xs" title={ach.title}>
                                                                    {ach.icon}
                                                                </span>
                                                            ))}
                                                        </div>
                                                    )}
                                                </div>
                                            </div>
                                        </td>

                                        {/* Score */}
                                        <td className="px-4 py-4 text-center">
                                            <span className={cn(
                                                'font-bold',
                                                isTopThree ? 'text-lg text-amber-600' : 'text-gray-900 dark:text-white'
                                            )}>
                                                {formatScore(entry.score)}
                                            </span>
                                            <span className="text-xs text-gray-500 ml-1">pts</span>
                                        </td>

                                        {/* Questions */}
                                        <td className="px-4 py-4 text-center hidden sm:table-cell">
                                            <span className="text-sm text-gray-600 dark:text-gray-400">
                                                {entry.questionsAnswered}
                                            </span>
                                        </td>

                                        {/* Tests */}
                                        <td className="px-4 py-4 text-center hidden md:table-cell">
                                            <span className="text-sm text-gray-600 dark:text-gray-400">
                                                {entry.testsCompleted}
                                            </span>
                                        </td>

                                        {/* Streak */}
                                        <td className="px-4 py-4 text-center">
                                            {entry.streak > 0 ? (
                                                <Badge
                                                    size="sm"
                                                    className={cn(
                                                        'inline-flex items-center gap-1',
                                                        entry.streak >= 10 ? 'bg-orange-100 text-orange-700' : 'bg-gray-100 text-gray-700'
                                                    )}
                                                >
                                                    <Flame className={cn(
                                                        'h-3 w-3',
                                                        entry.streak >= 10 && 'text-orange-500'
                                                    )} />
                                                    {entry.streak}
                                                </Badge>
                                            ) : (
                                                <span className="text-gray-400">-</span>
                                            )}
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>
            </CardBody>
        </Card>
    );
}

export default LeaderboardTable;
