'use client';

import React from 'react';
import { RefreshCw, Trophy, Users, TrendingUp } from 'lucide-react';
import { Card, CardBody, CardHeader, Button, Badge } from '@/components/ui';
import LeaderboardTable from './LeaderboardTable';
import UserRankCard from './UserRankCard';
import { CompactTimeFilter } from './LeaderboardFilters';
import { useLeaderboard } from '@/hooks/useLeaderboard';
import { TimeFilter, formatScore } from '@/types/leaderboard';
import { cn } from '@/lib/utils';

interface GlobalLeaderboardProps {
    className?: string;
}

function GlobalLeaderboard({ className }: GlobalLeaderboardProps) {
    const {
        entries,
        topThree,
        currentUserRank,
        loading,
        timeFilter,
        setTimeFilter,
        refresh,
        totalUsers,
        userPercentile,
    } = useLeaderboard({ type: 'global', limit: 20 });

    return (
        <div className={cn('space-y-6', className)}>
            {/* Header */}
            <div className="flex flex-wrap items-center justify-between gap-4">
                <div>
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
                        <Trophy className="h-7 w-7 text-amber-500" />
                        Global Leaderboard
                    </h2>
                    <p className="text-gray-500 mt-1 font-bengali">গ্লোবাল লিডারবোর্ড</p>
                </div>
                <div className="flex items-center gap-3">
                    <CompactTimeFilter activeTime={timeFilter} onTimeChange={setTimeFilter} />
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={refresh}
                        leftIcon={<RefreshCw className="h-4 w-4" />}
                    >
                        Refresh
                    </Button>
                </div>
            </div>

            {/* Stats */}
            <div className="grid sm:grid-cols-3 gap-4">
                <div className="p-4 bg-gradient-to-br from-amber-50 to-yellow-50 dark:from-amber-900/20 dark:to-yellow-900/20 rounded-xl">
                    <div className="flex items-center gap-3">
                        <div className="w-12 h-12 bg-amber-500 rounded-xl flex items-center justify-center text-2xl">
                            🏆
                        </div>
                        <div>
                            <p className="text-2xl font-bold text-amber-700 dark:text-amber-400">
                                {topThree[0]?.displayName || '-'}
                            </p>
                            <p className="text-xs text-amber-600">Current Leader</p>
                        </div>
                    </div>
                </div>

                <div className="p-4 bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-xl">
                    <div className="flex items-center gap-3">
                        <div className="w-12 h-12 bg-blue-500 rounded-xl flex items-center justify-center">
                            <Users className="h-6 w-6 text-white" />
                        </div>
                        <div>
                            <p className="text-2xl font-bold text-blue-700 dark:text-blue-400">
                                {totalUsers.toLocaleString()}
                            </p>
                            <p className="text-xs text-blue-600">Total Students</p>
                        </div>
                    </div>
                </div>

                <div className="p-4 bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 rounded-xl">
                    <div className="flex items-center gap-3">
                        <div className="w-12 h-12 bg-green-500 rounded-xl flex items-center justify-center">
                            <TrendingUp className="h-6 w-6 text-white" />
                        </div>
                        <div>
                            <p className="text-2xl font-bold text-green-700 dark:text-green-400">
                                {formatScore(topThree[0]?.score || 0)}
                            </p>
                            <p className="text-xs text-green-600">Top Score</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Current User Rank */}
            {currentUserRank && (
                <UserRankCard entry={currentUserRank} totalUsers={totalUsers} variant="default" />
            )}

            {/* Leaderboard Table */}
            <LeaderboardTable entries={entries} highlightUser={true} />

            {/* Load More */}
            {entries.length >= 20 && (
                <div className="text-center">
                    <Button variant="outline">
                        Load More Rankings
                    </Button>
                </div>
            )}
        </div>
    );
}

export default GlobalLeaderboard;
