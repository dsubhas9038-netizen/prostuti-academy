'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import {
    BookOpen,
    ClipboardList,
    Bookmark,
    TrendingUp,
    ChevronRight,
    Flame,
    Clock
} from 'lucide-react';
import { DashboardLayout } from '@/components/layout';
import { ProtectedRoute, OnboardingModal } from '@/components/auth';
import { Card, CardHeader, CardBody, Button, ProgressBar, Badge } from '@/components/ui';
import { useAuth } from '@/hooks/useAuth';
import { cn } from '@/lib/utils';

// Stats Card Component
interface StatCardProps {
    icon: React.ElementType;
    label: string;
    value: string | number;
    trend?: string;
    color: string;
}

function StatCard({ icon: Icon, label, value, trend, color }: StatCardProps) {
    return (
        <Card className="relative overflow-hidden">
            <CardBody className="flex items-center gap-4">
                <div className={cn('p-3 rounded-xl', color)}>
                    <Icon className="h-6 w-6 text-white" />
                </div>
                <div>
                    <p className="text-2xl font-bold text-gray-900 dark:text-white">{value}</p>
                    <p className="text-sm text-gray-500">{label}</p>
                </div>
                {trend && (
                    <Badge variant="success" size="sm" className="absolute top-3 right-3">
                        {trend}
                    </Badge>
                )}
            </CardBody>
        </Card>
    );
}

// Quick Action Card
interface QuickActionProps {
    icon: React.ElementType;
    title: string;
    description: string;
    href: string;
    color: string;
}

function QuickActionCard({ icon: Icon, title, description, href, color }: QuickActionProps) {
    return (
        <Link href={href}>
            <Card hoverable clickable className="h-full">
                <CardBody className="flex items-start gap-4">
                    <div className={cn('p-3 rounded-xl', color)}>
                        <Icon className="h-5 w-5 text-white" />
                    </div>
                    <div className="flex-1">
                        <h3 className="font-medium text-gray-900 dark:text-white mb-1">{title}</h3>
                        <p className="text-sm text-gray-500">{description}</p>
                    </div>
                    <ChevronRight className="h-5 w-5 text-gray-400" />
                </CardBody>
            </Card>
        </Link>
    );
}

function DashboardContent() {
    const { userData, userName } = useAuth();
    const [showOnboarding, setShowOnboarding] = useState(false);

    // Check if onboarding is needed
    useEffect(() => {
        if (userData) {
            const needsOnboarding = !userData.stream || !userData.currentSemester;
            setShowOnboarding(needsOnboarding);
        }
    }, [userData]);

    // Get greeting based on time
    const getGreeting = () => {
        const hour = new Date().getHours();
        if (hour < 12) return 'সুপ্রভাত';
        if (hour < 17) return 'শুভ অপরাহ্ন';
        if (hour < 20) return 'শুভ সন্ধ্যা';
        return 'শুভ রাত্রি';
    };

    // Mock data (will be replaced with real data later)
    const stats = {
        questionsRead: userData?.totalQuestionsRead || 0,
        testsTaken: userData?.totalTestsTaken || 0,
        streak: userData?.streak || 0,
        bookmarks: 12,
    };

    const quickActions = [
        {
            icon: BookOpen,
            title: 'Continue Learning',
            description: 'যেখানে ছিলে সেখান থেকে শুরু করো',
            href: '/subjects',
            color: 'bg-blue-500',
        },
        {
            icon: ClipboardList,
            title: 'Take a Test',
            description: 'Mock test দিয়ে practice করো',
            href: '/mock-tests',
            color: 'bg-purple-500',
        },
        {
            icon: Bookmark,
            title: 'Bookmarks',
            description: 'Save করা questions দেখো',
            href: '/dashboard/bookmarks',
            color: 'bg-orange-500',
        },
        {
            icon: TrendingUp,
            title: 'PYQ Analysis',
            description: 'Previous year pattern দেখো',
            href: '/pyq-analysis',
            color: 'bg-green-500',
        },
    ];

    return (
        <>
            {/* Onboarding Modal */}
            <OnboardingModal
                isOpen={showOnboarding}
                onComplete={() => setShowOnboarding(false)}
            />

            <DashboardLayout
                title={`${getGreeting()}, ${userName?.split(' ')[0]}! 👋`}
                description="তোমার learning journey এর overview"
            >
                {/* Stats Grid */}
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                    <StatCard
                        icon={BookOpen}
                        label="Questions Read"
                        value={stats.questionsRead}
                        color="bg-blue-500"
                    />
                    <StatCard
                        icon={ClipboardList}
                        label="Tests Taken"
                        value={stats.testsTaken}
                        color="bg-purple-500"
                    />
                    <StatCard
                        icon={Flame}
                        label="Day Streak"
                        value={stats.streak}
                        trend={stats.streak > 0 ? '🔥' : undefined}
                        color="bg-orange-500"
                    />
                    <StatCard
                        icon={Bookmark}
                        label="Bookmarks"
                        value={stats.bookmarks}
                        color="bg-green-500"
                    />
                </div>

                {/* Progress Section */}
                <Card className="mb-8">
                    <CardHeader
                        title="Overall Progress"
                        subtitle="তোমার সামগ্রিক অগ্রগতি"
                        action={
                            <Link href="/dashboard/progress">
                                <Button variant="ghost" size="sm" rightIcon={<ChevronRight className="h-4 w-4" />}>
                                    Details
                                </Button>
                            </Link>
                        }
                    />
                    <CardBody>
                        <div className="grid md:grid-cols-2 gap-6">
                            {/* Overall Progress */}
                            <div>
                                <div className="flex items-center justify-between mb-2">
                                    <span className="text-sm text-gray-500">সম্পূর্ণ অগ্রগতি</span>
                                    <span className="text-sm font-medium text-gray-900 dark:text-white">25%</span>
                                </div>
                                <ProgressBar value={25} size="lg" />
                            </div>

                            {/* Current Semester Progress */}
                            <div>
                                <div className="flex items-center justify-between mb-2">
                                    <span className="text-sm text-gray-500">
                                        Semester {userData?.currentSemester || 1} Progress
                                    </span>
                                    <span className="text-sm font-medium text-gray-900 dark:text-white">40%</span>
                                </div>
                                <ProgressBar value={40} variant="success" size="lg" />
                            </div>
                        </div>
                    </CardBody>
                </Card>

                {/* Quick Actions */}
                <div className="mb-8">
                    <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Quick Actions</h2>
                    <div className="grid sm:grid-cols-2 gap-4">
                        {quickActions.map((action, index) => (
                            <QuickActionCard key={index} {...action} />
                        ))}
                    </div>
                </div>

                {/* Recent Activity */}
                <Card>
                    <CardHeader
                        title="Recent Activity"
                        subtitle="তোমার সাম্প্রতিক কার্যকলাপ"
                    />
                    <CardBody>
                        {/* Placeholder for recent activity */}
                        <div className="text-center py-8">
                            <Clock className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                            <p className="text-gray-500">
                                তোমার recent activity এখানে দেখাবে।
                            </p>
                            <Link href="/subjects">
                                <Button variant="primary" className="mt-4">
                                    Start Learning
                                </Button>
                            </Link>
                        </div>
                    </CardBody>
                </Card>
            </DashboardLayout>
        </>
    );
}

export default function DashboardPage() {
    return (
        <ProtectedRoute>
            <DashboardContent />
        </ProtectedRoute>
    );
}
