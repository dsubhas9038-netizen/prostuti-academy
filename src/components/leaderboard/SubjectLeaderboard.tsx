'use client';

import React, { useState } from 'react';
import { BookOpen, RefreshCw, Trophy, ChevronRight } from 'lucide-react';
import { Card, CardBody, CardHeader, Button, Badge, Avatar } from '@/components/ui';
import LeaderboardTable from './LeaderboardTable';
import { CompactTimeFilter } from './LeaderboardFilters';
import { useLeaderboard } from '@/hooks/useLeaderboard';
import { TimeFilter, formatScore, medalConfig } from '@/types/leaderboard';
import { cn } from '@/lib/utils';

interface SubjectLeaderboardProps {
    className?: string;
}

// Subject config
const subjects = [
    { id: 'bengali', name: 'Bengali', nameBn: 'বাংলা', icon: '📚', color: '#3B82F6' },
    { id: 'english', name: 'English', nameBn: 'ইংরেজি', icon: '📖', color: '#22C55E' },
    { id: 'history', name: 'History', nameBn: 'ইতিহাস', icon: '🏛️', color: '#8B5CF6' },
    { id: 'philosophy', name: 'Philosophy', nameBn: 'দর্শন', icon: '💭', color: '#F59E0B' },
];

function SubjectLeaderboard({ className }: SubjectLeaderboardProps) {
    const [selectedSubject, setSelectedSubject] = useState(subjects[0]);

    const {
        entries,
        topThree,
        loading,
        timeFilter,
        setTimeFilter,
        setSubjectId,
        refresh,
    } = useLeaderboard({ type: 'subject', subjectId: selectedSubject.id, limit: 10 });

    const handleSubjectChange = (subject: typeof subjects[0]) => {
        setSelectedSubject(subject);
        setSubjectId(subject.id);
    };

    return (
        <div className={cn('space-y-6', className)}>
            {/* Header */}
            <div className="flex flex-wrap items-center justify-between gap-4">
                <div>
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
                        <BookOpen className="h-7 w-7 text-blue-500" />
                        Subject Leaderboard
                    </h2>
                    <p className="text-gray-500 mt-1 font-bengali">বিষয় ভিত্তিক লিডারবোর্ড</p>
                </div>
                <CompactTimeFilter activeTime={timeFilter} onTimeChange={setTimeFilter} />
            </div>

            {/* Subject Tabs */}
            <div className="flex flex-wrap gap-3">
                {subjects.map((subject) => {
                    const isActive = selectedSubject.id === subject.id;

                    return (
                        <button
                            key={subject.id}
                            onClick={() => handleSubjectChange(subject)}
                            className={cn(
                                'flex items-center gap-2 px-4 py-3 rounded-xl font-medium transition-all',
                                isActive
                                    ? 'bg-white dark:bg-gray-800 shadow-lg ring-2'
                                    : 'bg-gray-100 dark:bg-gray-800/50 hover:bg-white dark:hover:bg-gray-800'
                            )}
                            style={{
                                borderColor: isActive ? subject.color : 'transparent',
                                outlineColor: isActive ? subject.color : 'transparent',
                            }}
                        >
                            <span className="text-xl">{subject.icon}</span>
                            <div className="text-left">
                                <p className={cn(
                                    'font-medium',
                                    isActive ? 'text-gray-900 dark:text-white' : 'text-gray-600 dark:text-gray-400'
                                )}>
                                    {subject.name}
                                </p>
                                <p className="text-xs text-gray-500 font-bengali">{subject.nameBn}</p>
                            </div>
                        </button>
                    );
                })}
            </div>

            {/* Top 3 Cards */}
            <div className="grid sm:grid-cols-3 gap-4">
                {topThree.map((entry, index) => {
                    const medal = medalConfig[(index + 1) as 1 | 2 | 3];

                    return (
                        <Card
                            key={entry.id}
                            className={cn(
                                'relative overflow-hidden',
                                index === 0 && 'ring-2 ring-yellow-400 shadow-yellow-100 dark:shadow-yellow-900/20'
                            )}
                        >
                            <CardBody className="p-4">
                                <div className="flex items-center gap-3">
                                    <div className="relative">
                                        <Avatar
                                            src={entry.photoURL}
                                            fallback={entry.displayName[0]}
                                            size="lg"
                                            className={cn(
                                                'ring-2',
                                                index === 0 && 'ring-yellow-400',
                                                index === 1 && 'ring-gray-300',
                                                index === 2 && 'ring-amber-600'
                                            )}
                                        />
                                        <span className="absolute -bottom-1 -right-1 text-xl">{medal.icon}</span>
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <p className="font-semibold text-gray-900 dark:text-white font-bengali truncate">
                                            {entry.displayName}
                                        </p>
                                        <p className="text-sm text-gray-500">
                                            {formatScore(entry.score)} pts
                                        </p>
                                        {entry.streak > 0 && (
                                            <Badge size="sm" className="bg-orange-100 text-orange-700 mt-1">
                                                🔥 {entry.streak}
                                            </Badge>
                                        )}
                                    </div>
                                </div>

                                {/* Subject stats */}
                                <div className="mt-3 pt-3 border-t border-gray-100 dark:border-gray-700 grid grid-cols-2 gap-2 text-center">
                                    <div>
                                        <p className="font-semibold text-gray-900 dark:text-white">{entry.questionsAnswered}</p>
                                        <p className="text-xs text-gray-500">Questions</p>
                                    </div>
                                    <div>
                                        <p className="font-semibold text-gray-900 dark:text-white">{entry.testsCompleted}</p>
                                        <p className="text-xs text-gray-500">Tests</p>
                                    </div>
                                </div>
                            </CardBody>
                        </Card>
                    );
                })}
            </div>

            {/* Full Table */}
            <LeaderboardTable entries={entries} highlightUser={true} />
        </div>
    );
}

export default SubjectLeaderboard;
