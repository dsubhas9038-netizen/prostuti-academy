'use client';

import React, { useState } from 'react';
import { Users, UserPlus, Search, Trophy } from 'lucide-react';
import { Card, CardBody, CardHeader, Button, Badge, Avatar, Modal, Input } from '@/components/ui';
import LeaderboardTable from './LeaderboardTable';
import { CompactTimeFilter } from './LeaderboardFilters';
import { useLeaderboard } from '@/hooks/useLeaderboard';
import { TimeFilter, formatScore, getRankChange } from '@/types/leaderboard';
import { cn } from '@/lib/utils';

interface FriendsLeaderboardProps {
    className?: string;
}

function FriendsLeaderboard({ className }: FriendsLeaderboardProps) {
    const [showAddFriend, setShowAddFriend] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');

    const {
        entries,
        currentUserRank,
        loading,
        timeFilter,
        setTimeFilter,
        refresh,
    } = useLeaderboard({ type: 'friends', limit: 10 });

    // Your position among friends
    const userPositionAmongFriends = 3; // Would be calculated from actual data

    return (
        <div className={cn('space-y-6', className)}>
            {/* Header */}
            <div className="flex flex-wrap items-center justify-between gap-4">
                <div>
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
                        <Users className="h-7 w-7 text-purple-500" />
                        Friends Leaderboard
                    </h2>
                    <p className="text-gray-500 mt-1 font-bengali">বন্ধুদের লিডারবোর্ড</p>
                </div>
                <div className="flex items-center gap-3">
                    <CompactTimeFilter activeTime={timeFilter} onTimeChange={setTimeFilter} />
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setShowAddFriend(true)}
                        leftIcon={<UserPlus className="h-4 w-4" />}
                    >
                        Add Friend
                    </Button>
                </div>
            </div>

            {/* Stats */}
            <div className="grid sm:grid-cols-3 gap-4">
                <div className="p-4 bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 rounded-xl">
                    <div className="flex items-center gap-3">
                        <div className="w-12 h-12 bg-purple-500 rounded-xl flex items-center justify-center">
                            <Users className="h-6 w-6 text-white" />
                        </div>
                        <div>
                            <p className="text-2xl font-bold text-purple-700 dark:text-purple-400">
                                {entries.length}
                            </p>
                            <p className="text-xs text-purple-600">Friends</p>
                        </div>
                    </div>
                </div>

                <div className="p-4 bg-gradient-to-br from-amber-50 to-yellow-50 dark:from-amber-900/20 dark:to-yellow-900/20 rounded-xl">
                    <div className="flex items-center gap-3">
                        <div className="w-12 h-12 bg-amber-500 rounded-xl flex items-center justify-center">
                            <Trophy className="h-6 w-6 text-white" />
                        </div>
                        <div>
                            <p className="text-2xl font-bold text-amber-700 dark:text-amber-400">
                                #{userPositionAmongFriends}
                            </p>
                            <p className="text-xs text-amber-600">Your Rank</p>
                        </div>
                    </div>
                </div>

                <div className="p-4 bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 rounded-xl">
                    <div className="flex items-center gap-3">
                        <div className="w-12 h-12 bg-green-500 rounded-xl flex items-center justify-center text-xl">
                            🔥
                        </div>
                        <div>
                            <p className="text-2xl font-bold text-green-700 dark:text-green-400">
                                {currentUserRank?.streak || 0}
                            </p>
                            <p className="text-xs text-green-600">Your Streak</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Friends List */}
            {entries.length > 0 ? (
                <Card>
                    <CardBody className="p-0 divide-y divide-gray-100 dark:divide-gray-800">
                        {entries.map((friend, index) => {
                            const rankChange = getRankChange(friend.rank, friend.previousRank);

                            return (
                                <div
                                    key={friend.id}
                                    className="flex items-center gap-4 p-4 hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors"
                                >
                                    {/* Rank */}
                                    <div className="w-8 text-center">
                                        {index < 3 ? (
                                            <span className="text-xl">
                                                {index === 0 && '🥇'}
                                                {index === 1 && '🥈'}
                                                {index === 2 && '🥉'}
                                            </span>
                                        ) : (
                                            <span className="font-bold text-gray-900 dark:text-white">{index + 1}</span>
                                        )}
                                    </div>

                                    {/* Avatar */}
                                    <Avatar
                                        src={friend.photoURL}
                                        fallback={friend.displayName[0]}
                                        size="md"
                                        className={cn(
                                            'ring-2',
                                            index === 0 && 'ring-yellow-400',
                                            index === 1 && 'ring-gray-300',
                                            index === 2 && 'ring-amber-600',
                                            index > 2 && 'ring-gray-200 dark:ring-gray-700'
                                        )}
                                    />

                                    {/* Info */}
                                    <div className="flex-1 min-w-0">
                                        <p className="font-semibold text-gray-900 dark:text-white font-bengali truncate">
                                            {friend.displayName}
                                        </p>
                                        <div className="flex items-center gap-2 text-xs text-gray-500">
                                            <span>{friend.questionsAnswered} questions</span>
                                            <span>•</span>
                                            <span>{friend.testsCompleted} tests</span>
                                        </div>
                                    </div>

                                    {/* Streak */}
                                    {friend.streak > 0 && (
                                        <Badge size="sm" className="bg-orange-100 text-orange-700">
                                            🔥 {friend.streak}
                                        </Badge>
                                    )}

                                    {/* Score */}
                                    <div className="text-right">
                                        <p className="font-bold text-gray-900 dark:text-white">
                                            {formatScore(friend.score)}
                                        </p>
                                        <p className="text-xs text-gray-500">points</p>
                                    </div>
                                </div>
                            );
                        })}
                    </CardBody>
                </Card>
            ) : (
                <Card>
                    <CardBody className="text-center py-12">
                        <Users className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                            No Friends Yet
                        </h3>
                        <p className="text-gray-500 mb-4">
                            Add friends to compete and compare progress!
                        </p>
                        <Button onClick={() => setShowAddFriend(true)} leftIcon={<UserPlus className="h-4 w-4" />}>
                            Add Friend
                        </Button>
                    </CardBody>
                </Card>
            )}

            {/* Add Friend Modal */}
            <Modal
                isOpen={showAddFriend}
                onClose={() => setShowAddFriend(false)}
                title="Add Friend"
                size="md"
            >
                <div className="space-y-4">
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                        <input
                            type="text"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            placeholder="Search by name or email..."
                            className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800"
                        />
                    </div>

                    {/* Search Results */}
                    <div className="space-y-2 max-h-64 overflow-y-auto">
                        {['অর্জুন সিং', 'রিতা দে', 'বিকাশ রায়'].map((name, i) => (
                            <div key={i} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                                <div className="flex items-center gap-3">
                                    <Avatar fallback={name[0]} size="sm" />
                                    <span className="font-medium text-gray-900 dark:text-white font-bengali">{name}</span>
                                </div>
                                <Button size="sm" variant="outline">Add</Button>
                            </div>
                        ))}
                    </div>

                    <div className="flex justify-end gap-3 pt-4 border-t border-gray-200 dark:border-gray-700">
                        <Button variant="outline" onClick={() => setShowAddFriend(false)}>
                            Cancel
                        </Button>
                    </div>
                </div>
            </Modal>
        </div>
    );
}

export default FriendsLeaderboard;
