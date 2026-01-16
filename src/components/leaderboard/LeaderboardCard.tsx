'use client';

import React from 'react';
import Link from 'next/link';
import { ChevronRight, TrendingUp, TrendingDown, Minus } from 'lucide-react';
import { Card, CardBody, CardHeader, Badge, Avatar } from '@/components/ui';
import { LeaderboardEntry, medalConfig, getRankChange, formatScore } from '@/types/leaderboard';
import { cn } from '@/lib/utils';

interface LeaderboardCardProps {
    title?: string;
    entries: LeaderboardEntry[];
    showAll?: boolean;
    className?: string;
}

function LeaderboardCard({
    title = 'Leaderboard',
    entries,
    showAll = true,
    className
}: LeaderboardCardProps) {
    // Get top 3
    const top3 = entries.slice(0, 3);

    return (
        <Card className={cn('overflow-hidden', className)}>
            <CardHeader
                title={title}
                subtitle="লিডারবোর্ড"
                icon={<span className="text-xl">🏆</span>}
                action={showAll && (
                    <Link href="/leaderboard" className="text-sm text-blue-600 hover:underline flex items-center gap-1">
                        View All <ChevronRight className="h-4 w-4" />
                    </Link>
                )}
            />
            <CardBody className="p-0">
                {/* Top 3 Podium Style */}
                <div className="grid grid-cols-3 gap-2 p-4 bg-gradient-to-br from-amber-50 to-yellow-50 dark:from-amber-900/20 dark:to-yellow-900/20">
                    {/* Second Place */}
                    {top3[1] && (
                        <div className="flex flex-col items-center order-1">
                            <div className="relative mb-2">
                                <Avatar
                                    src={top3[1].photoURL}
                                    fallback={top3[1].displayName[0]}
                                    size="lg"
                                    className="ring-2 ring-gray-300"
                                />
                                <span className="absolute -bottom-1 -right-1 text-xl">{medalConfig[2].icon}</span>
                            </div>
                            <p className="text-xs font-medium text-gray-900 dark:text-white text-center truncate max-w-full font-bengali">
                                {top3[1].displayName}
                            </p>
                            <p className="text-xs text-gray-500">{formatScore(top3[1].score)} pts</p>
                        </div>
                    )}

                    {/* First Place */}
                    {top3[0] && (
                        <div className="flex flex-col items-center order-2 -mt-4">
                            <div className="relative mb-2">
                                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-yellow-400 to-amber-500 p-1">
                                    <Avatar
                                        src={top3[0].photoURL}
                                        fallback={top3[0].displayName[0]}
                                        className="w-full h-full ring-2 ring-white"
                                    />
                                </div>
                                <span className="absolute -bottom-1 -right-1 text-2xl">{medalConfig[1].icon}</span>
                            </div>
                            <p className="text-sm font-bold text-gray-900 dark:text-white text-center truncate max-w-full font-bengali">
                                {top3[0].displayName}
                            </p>
                            <p className="text-xs text-amber-600 font-medium">{formatScore(top3[0].score)} pts</p>
                            {top3[0].streak > 0 && (
                                <Badge size="sm" className="bg-orange-100 text-orange-700 mt-1">
                                    🔥 {top3[0].streak}
                                </Badge>
                            )}
                        </div>
                    )}

                    {/* Third Place */}
                    {top3[2] && (
                        <div className="flex flex-col items-center order-3">
                            <div className="relative mb-2">
                                <Avatar
                                    src={top3[2].photoURL}
                                    fallback={top3[2].displayName[0]}
                                    size="lg"
                                    className="ring-2 ring-amber-600"
                                />
                                <span className="absolute -bottom-1 -right-1 text-xl">{medalConfig[3].icon}</span>
                            </div>
                            <p className="text-xs font-medium text-gray-900 dark:text-white text-center truncate max-w-full font-bengali">
                                {top3[2].displayName}
                            </p>
                            <p className="text-xs text-gray-500">{formatScore(top3[2].score)} pts</p>
                        </div>
                    )}
                </div>

                {/* Rest of top 10 */}
                <div className="divide-y divide-gray-100 dark:divide-gray-800">
                    {entries.slice(3, 7).map((entry) => {
                        const rankChange = getRankChange(entry.rank, entry.previousRank);

                        return (
                            <div
                                key={entry.id}
                                className={cn(
                                    'flex items-center gap-3 px-4 py-3 hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors',
                                    entry.isCurrentUser && 'bg-blue-50 dark:bg-blue-900/20'
                                )}
                            >
                                {/* Rank */}
                                <span className="w-6 text-center font-bold text-gray-900 dark:text-white">
                                    {entry.rank}
                                </span>

                                {/* Rank Change */}
                                <div className="w-5">
                                    {rankChange.direction === 'up' && (
                                        <TrendingUp className="h-4 w-4 text-green-500" />
                                    )}
                                    {rankChange.direction === 'down' && (
                                        <TrendingDown className="h-4 w-4 text-red-500" />
                                    )}
                                    {rankChange.direction === 'same' && (
                                        <Minus className="h-4 w-4 text-gray-400" />
                                    )}
                                </div>

                                {/* Avatar */}
                                <Avatar
                                    src={entry.photoURL}
                                    fallback={entry.displayName[0]}
                                    size="sm"
                                />

                                {/* Name */}
                                <span className="flex-1 font-medium text-sm text-gray-900 dark:text-white font-bengali truncate">
                                    {entry.displayName}
                                </span>

                                {/* Score */}
                                <span className="text-sm font-semibold text-gray-600 dark:text-gray-400">
                                    {formatScore(entry.score)}
                                </span>
                            </div>
                        );
                    })}
                </div>
            </CardBody>
        </Card>
    );
}

export default LeaderboardCard;
