'use client';

import React from 'react';
import { Award, Lock, Check, ChevronRight } from 'lucide-react';
import { Card, CardBody, CardHeader, Badge, Button } from '@/components/ui';
import { Achievement, Badge as BadgeType, achievementConfig, rarityConfig } from '@/types/leaderboard';
import { useAchievements } from '@/hooks/useLeaderboard';
import { cn } from '@/lib/utils';

interface AchievementBadgesProps {
    variant?: 'full' | 'compact' | 'grid';
    className?: string;
}

function AchievementBadges({ variant = 'full', className }: AchievementBadgesProps) {
    const { achievements, badges, earnedAchievements, inProgressAchievements, loading } = useAchievements();

    if (loading) {
        return (
            <div className={cn('animate-pulse', className)}>
                <div className="h-48 bg-gray-200 dark:bg-gray-700 rounded-xl" />
            </div>
        );
    }

    if (variant === 'compact') {
        return (
            <Card className={className}>
                <CardHeader
                    title="Achievements"
                    subtitle="অর্জনসমূহ"
                    icon={<Award className="h-5 w-5 text-amber-500" />}
                    action={
                        <Badge size="sm" className="bg-amber-100 text-amber-700">
                            {earnedAchievements.length}/{achievements.length}
                        </Badge>
                    }
                />
                <CardBody>
                    <div className="flex flex-wrap gap-2">
                        {achievements.slice(0, 5).map((ach) => (
                            <div
                                key={ach.id}
                                className={cn(
                                    'w-12 h-12 rounded-xl flex items-center justify-center text-xl relative',
                                    ach.earnedAt
                                        ? 'bg-gradient-to-br from-amber-100 to-yellow-100 dark:from-amber-900/30 dark:to-yellow-900/30'
                                        : 'bg-gray-100 dark:bg-gray-800 grayscale opacity-50'
                                )}
                                title={ach.title}
                            >
                                {ach.icon}
                                {ach.earnedAt && (
                                    <div className="absolute -top-1 -right-1 w-4 h-4 bg-green-500 rounded-full flex items-center justify-center">
                                        <Check className="h-3 w-3 text-white" />
                                    </div>
                                )}
                            </div>
                        ))}
                        <button className="w-12 h-12 rounded-xl bg-gray-100 dark:bg-gray-800 flex items-center justify-center text-gray-400 hover:text-gray-600">
                            <ChevronRight className="h-5 w-5" />
                        </button>
                    </div>
                </CardBody>
            </Card>
        );
    }

    return (
        <div className={cn('space-y-6', className)}>
            {/* Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
                        <Award className="h-7 w-7 text-amber-500" />
                        Achievements & Badges
                    </h2>
                    <p className="text-gray-500 mt-1 font-bengali">অর্জন ও ব্যাজ</p>
                </div>
                <Badge size="lg" className="bg-amber-100 text-amber-700">
                    {earnedAchievements.length}/{achievements.length} Earned
                </Badge>
            </div>

            {/* Earned Achievements */}
            {earnedAchievements.length > 0 && (
                <Card>
                    <CardHeader
                        title="Earned Achievements"
                        subtitle="অর্জিত"
                        icon={<span className="text-xl">🏆</span>}
                    />
                    <CardBody>
                        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                            {earnedAchievements.map((ach) => (
                                <div
                                    key={ach.id}
                                    className="flex items-center gap-3 p-4 bg-gradient-to-br from-amber-50 to-yellow-50 dark:from-amber-900/20 dark:to-yellow-900/20 rounded-xl"
                                >
                                    <div
                                        className="w-14 h-14 rounded-xl flex items-center justify-center text-2xl"
                                        style={{ backgroundColor: `${ach.color}20` }}
                                    >
                                        {ach.icon}
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <p className="font-semibold text-gray-900 dark:text-white">{ach.title}</p>
                                        <p className="text-xs text-gray-500 font-bengali">{ach.titleBn}</p>
                                        {ach.earnedAt && (
                                            <p className="text-xs text-gray-400 mt-1">
                                                Earned {new Date(ach.earnedAt).toLocaleDateString()}
                                            </p>
                                        )}
                                    </div>
                                    <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                                        <Check className="h-5 w-5 text-white" />
                                    </div>
                                </div>
                            ))}
                        </div>
                    </CardBody>
                </Card>
            )}

            {/* In Progress */}
            {inProgressAchievements.length > 0 && (
                <Card>
                    <CardHeader
                        title="In Progress"
                        subtitle="চলমান"
                        icon={<span className="text-xl">🎯</span>}
                    />
                    <CardBody>
                        <div className="grid sm:grid-cols-2 gap-4">
                            {inProgressAchievements.map((ach) => (
                                <div
                                    key={ach.id}
                                    className="p-4 border border-gray-200 dark:border-gray-700 rounded-xl"
                                >
                                    <div className="flex items-start gap-3">
                                        <div
                                            className="w-12 h-12 rounded-xl flex items-center justify-center text-xl"
                                            style={{ backgroundColor: `${ach.color}20` }}
                                        >
                                            {ach.icon}
                                        </div>
                                        <div className="flex-1">
                                            <p className="font-semibold text-gray-900 dark:text-white">{ach.title}</p>
                                            <p className="text-xs text-gray-500">{ach.description}</p>
                                        </div>
                                    </div>
                                    {/* Progress bar */}
                                    <div className="mt-3">
                                        <div className="flex items-center justify-between text-xs mb-1">
                                            <span className="text-gray-500">Progress</span>
                                            <span className="font-medium" style={{ color: ach.color }}>
                                                {ach.progress}/{ach.target}
                                            </span>
                                        </div>
                                        <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                                            <div
                                                className="h-full rounded-full transition-all"
                                                style={{
                                                    width: `${Math.min((ach.progress! / ach.target!) * 100, 100)}%`,
                                                    backgroundColor: ach.color
                                                }}
                                            />
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </CardBody>
                </Card>
            )}

            {/* Badges */}
            <Card>
                <CardHeader
                    title="Badges"
                    subtitle="ব্যাজসমূহ"
                    icon={<span className="text-xl">🎖️</span>}
                />
                <CardBody>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                        {badges.map((badge) => {
                            const rarity = rarityConfig[badge.rarity];

                            return (
                                <div
                                    key={badge.id}
                                    className="text-center p-4 rounded-xl border-2 transition-transform hover:scale-105"
                                    style={{ borderColor: badge.color }}
                                >
                                    <div
                                        className="w-16 h-16 mx-auto rounded-full flex items-center justify-center text-3xl mb-2"
                                        style={{ backgroundColor: `${badge.color}20` }}
                                    >
                                        {badge.icon}
                                    </div>
                                    <p className="font-semibold text-gray-900 dark:text-white">{badge.name}</p>
                                    <p className="text-xs text-gray-500 font-bengali">{badge.nameBn}</p>
                                    <Badge
                                        size="sm"
                                        className="mt-2"
                                        style={{ backgroundColor: `${rarity.color}20`, color: rarity.color }}
                                    >
                                        {rarity.label}
                                    </Badge>
                                </div>
                            );
                        })}
                    </div>
                </CardBody>
            </Card>

            {/* Locked Achievements */}
            <Card>
                <CardHeader
                    title="Locked"
                    subtitle="আনলক করুন"
                    icon={<Lock className="h-5 w-5 text-gray-400" />}
                />
                <CardBody>
                    <div className="grid grid-cols-3 sm:grid-cols-6 gap-3">
                        {achievements.filter(a => !a.earnedAt && !a.progress).map((ach) => (
                            <div
                                key={ach.id}
                                className="flex flex-col items-center p-3 bg-gray-100 dark:bg-gray-800 rounded-xl opacity-50"
                            >
                                <div className="w-12 h-12 rounded-xl flex items-center justify-center text-xl grayscale relative">
                                    {ach.icon}
                                    <Lock className="absolute -bottom-1 -right-1 h-4 w-4 text-gray-500" />
                                </div>
                                <p className="text-xs text-gray-500 mt-2 text-center">{ach.title}</p>
                            </div>
                        ))}
                    </div>
                </CardBody>
            </Card>
        </div>
    );
}

export default AchievementBadges;
