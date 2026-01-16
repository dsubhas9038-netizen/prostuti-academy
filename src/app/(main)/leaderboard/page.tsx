'use client';

import React, { useState } from 'react';
import { Trophy, BookOpen, Users, Award } from 'lucide-react';
import { GlobalLeaderboard, SubjectLeaderboard, FriendsLeaderboard, AchievementBadges } from '@/components/leaderboard';
import { cn } from '@/lib/utils';

// Tab config
const tabs = [
    { id: 'global', label: 'Global', labelBn: 'গ্লোবাল', icon: Trophy, color: '#F59E0B' },
    { id: 'subject', label: 'Subject', labelBn: 'বিষয়', icon: BookOpen, color: '#3B82F6' },
    { id: 'friends', label: 'Friends', labelBn: 'বন্ধু', icon: Users, color: '#8B5CF6' },
    { id: 'achievements', label: 'Achievements', labelBn: 'অর্জন', icon: Award, color: '#22C55E' },
];

export default function LeaderboardPage() {
    const [activeTab, setActiveTab] = useState('global');

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
            {/* Hero */}
            <div className="bg-gradient-to-br from-amber-500 via-orange-500 to-red-500 text-white">
                <div className="max-w-7xl mx-auto px-4 py-12 sm:py-16">
                    <div className="text-center">
                        <h1 className="text-4xl sm:text-5xl font-bold mb-4 flex items-center justify-center gap-3">
                            <Trophy className="h-10 w-10 sm:h-12 sm:w-12" />
                            Leaderboard
                        </h1>
                        <p className="text-xl text-amber-100 font-bengali">
                            প্রতিযোগিতায় অংশ নাও, শীর্ষে উঠে এসো!
                        </p>
                        <p className="text-amber-200 mt-2">
                            Compete with students across Bengal
                        </p>
                    </div>
                </div>
            </div>

            {/* Tabs */}
            <div className="max-w-7xl mx-auto px-4 -mt-6">
                <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-2 flex flex-wrap gap-2">
                    {tabs.map((tab) => {
                        const Icon = tab.icon;
                        const isActive = activeTab === tab.id;

                        return (
                            <button
                                key={tab.id}
                                onClick={() => setActiveTab(tab.id)}
                                className={cn(
                                    'flex-1 min-w-[120px] flex items-center justify-center gap-2 py-3 px-4 rounded-xl font-medium transition-all',
                                    isActive
                                        ? 'text-white shadow-lg'
                                        : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700'
                                )}
                                style={{
                                    backgroundColor: isActive ? tab.color : undefined,
                                    boxShadow: isActive ? `0 4px 14px ${tab.color}40` : undefined,
                                }}
                            >
                                <Icon className="h-5 w-5" />
                                <span className="hidden sm:inline">{tab.label}</span>
                            </button>
                        );
                    })}
                </div>
            </div>

            {/* Content */}
            <div className="max-w-7xl mx-auto px-4 py-8">
                {activeTab === 'global' && <GlobalLeaderboard />}
                {activeTab === 'subject' && <SubjectLeaderboard />}
                {activeTab === 'friends' && <FriendsLeaderboard />}
                {activeTab === 'achievements' && <AchievementBadges />}
            </div>

            {/* Motivation Banner */}
            <div className="max-w-7xl mx-auto px-4 pb-12">
                <div className="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-2xl p-8 text-white text-center">
                    <h3 className="text-2xl font-bold mb-2">🚀 প্রতিদিন অভ্যাস করো!</h3>
                    <p className="text-indigo-200 max-w-2xl mx-auto">
                        প্রতিদিন প্রশ্ন সমাধান করলে তুমি দ্রুত উন্নতি করতে পারবে এবং লিডারবোর্ডে উঠে আসবে।
                        আজই শুরু করো!
                    </p>
                </div>
            </div>
        </div>
    );
}
