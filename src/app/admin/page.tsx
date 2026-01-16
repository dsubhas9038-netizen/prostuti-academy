'use client';

import React from 'react';
import Link from 'next/link';
import { RefreshCw, ChevronRight, TrendingUp } from 'lucide-react';
import { AdminLayout, AdminStatsCard, AdminStatsGrid } from '@/components/admin';
import { Card, CardBody, CardHeader, Button, Badge } from '@/components/ui';
import { useAdmin } from '@/hooks';
import { adminActivityTypeConfig, actionTypeConfig, formatAdminTime } from '@/types/admin';
import { PageLoading } from '@/components/shared';

export default function AdminDashboardPage() {
    const {
        stats,
        recentActivities,
        quickActions,
        loading,
        refreshData,
        adminUser
    } = useAdmin();

    if (loading || !stats) {
        return (
            <AdminLayout title="Dashboard" titleBn="ড্যাশবোর্ড">
                <PageLoading message="Loading admin dashboard..." />
            </AdminLayout>
        );
    }

    return (
        <AdminLayout title="Dashboard" titleBn="ড্যাশবোর্ড">
            {/* Welcome Message */}
            <div className="flex items-center justify-between mb-8">
                <div>
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                        Welcome back, {adminUser?.displayName || 'Admin'}! 👋
                    </h2>
                    <p className="text-gray-500 mt-1">
                        Here's what's happening with your platform today.
                    </p>
                </div>
                <Button
                    variant="outline"
                    onClick={refreshData}
                    leftIcon={<RefreshCw className="h-4 w-4" />}
                >
                    Refresh
                </Button>
            </div>

            {/* Stats Grid */}
            <AdminStatsGrid className="mb-8">
                <AdminStatsCard
                    icon="👥"
                    label="Total Users"
                    value={stats.totalUsers}
                    trend={stats.usersTrend}
                    trendLabel="vs last month"
                    href="/admin/users"
                    color="#3B82F6"
                />
                <AdminStatsCard
                    icon="📝"
                    label="Questions"
                    value={stats.totalQuestions}
                    trend={stats.questionsTrend}
                    trendLabel="vs last month"
                    href="/admin/questions"
                    color="#22C55E"
                />
                <AdminStatsCard
                    icon="🧪"
                    label="Tests"
                    value={stats.totalTests}
                    trend={stats.testsTrend}
                    trendLabel="vs last month"
                    href="/admin/tests"
                    color="#8B5CF6"
                />
                <AdminStatsCard
                    icon="📄"
                    label="Resources"
                    value={stats.totalResources}
                    trend={stats.resourcesTrend}
                    trendLabel="vs last month"
                    href="/admin/resources"
                    color="#F59E0B"
                />
            </AdminStatsGrid>

            {/* Main Grid */}
            <div className="grid lg:grid-cols-3 gap-6 mb-8">
                {/* Recent Activity */}
                <div className="lg:col-span-2">
                    <Card>
                        <CardHeader
                            title="Recent Activity"
                            subtitle="Latest actions on the platform"
                            icon={<span className="text-xl">📋</span>}
                            action={
                                <Link href="/admin/activity" className="text-sm text-blue-600 hover:underline flex items-center gap-1">
                                    View All <ChevronRight className="h-4 w-4" />
                                </Link>
                            }
                        />
                        <CardBody>
                            <div className="space-y-4">
                                {recentActivities.map((activity) => {
                                    const typeConfig = adminActivityTypeConfig[activity.type];
                                    const actionConfig = actionTypeConfig[activity.action];

                                    return (
                                        <div
                                            key={activity.id}
                                            className="flex items-start gap-4 p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                                        >
                                            {/* Icon */}
                                            <div
                                                className="w-10 h-10 rounded-full flex items-center justify-center text-lg flex-shrink-0"
                                                style={{ backgroundColor: `${typeConfig.color}20` }}
                                            >
                                                {typeConfig.icon}
                                            </div>

                                            {/* Content */}
                                            <div className="flex-1 min-w-0">
                                                <div className="flex items-center gap-2">
                                                    <p className="font-medium text-gray-900 dark:text-white">{activity.title}</p>
                                                    <Badge
                                                        size="sm"
                                                        style={{ backgroundColor: `${actionConfig.color}20`, color: actionConfig.color }}
                                                    >
                                                        {actionConfig.label}
                                                    </Badge>
                                                </div>
                                                <p className="text-sm text-gray-500 mt-0.5">
                                                    {activity.description}
                                                    {activity.userName && <span className="text-gray-400"> • by {activity.userName}</span>}
                                                </p>
                                            </div>

                                            {/* Time */}
                                            <span className="text-xs text-gray-400 whitespace-nowrap">
                                                {formatAdminTime(activity.timestamp)}
                                            </span>
                                        </div>
                                    );
                                })}
                            </div>
                        </CardBody>
                    </Card>
                </div>

                {/* Quick Actions */}
                <div>
                    <Card>
                        <CardHeader
                            title="Quick Actions"
                            subtitle="Shortcuts to common tasks"
                            icon={<span className="text-xl">⚡</span>}
                        />
                        <CardBody>
                            <div className="space-y-3">
                                {quickActions.map((action) => (
                                    <Link key={action.id} href={action.href}>
                                        <div className="flex items-center gap-3 p-3 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-800 transition-all group">
                                            <div
                                                className="w-10 h-10 rounded-lg flex items-center justify-center text-lg transition-transform group-hover:scale-110"
                                                style={{ backgroundColor: `${action.color}20` }}
                                            >
                                                {action.icon}
                                            </div>
                                            <div className="flex-1">
                                                <p className="font-medium text-gray-900 dark:text-white group-hover:text-indigo-600 transition-colors">
                                                    {action.label}
                                                </p>
                                                <p className="text-xs text-gray-500 font-bengali">{action.labelBn}</p>
                                            </div>
                                            <ChevronRight className="h-5 w-5 text-gray-400 group-hover:text-indigo-500 group-hover:translate-x-1 transition-all" />
                                        </div>
                                    </Link>
                                ))}
                            </div>
                        </CardBody>
                    </Card>

                    {/* Platform Stats */}
                    <Card className="mt-6">
                        <CardHeader
                            title="Platform Stats"
                            subtitle="Overall performance"
                            icon={<span className="text-xl">📊</span>}
                        />
                        <CardBody>
                            <div className="space-y-4">
                                <div className="flex items-center justify-between">
                                    <span className="text-sm text-gray-500">Active Users</span>
                                    <span className="font-semibold text-gray-900 dark:text-white">{stats.activeUsers.toLocaleString()}</span>
                                </div>
                                <div className="flex items-center justify-between">
                                    <span className="text-sm text-gray-500">Tests Completed</span>
                                    <span className="font-semibold text-gray-900 dark:text-white">{stats.testsCompleted.toLocaleString()}</span>
                                </div>
                                <div className="flex items-center justify-between">
                                    <span className="text-sm text-gray-500">Questions Answered</span>
                                    <span className="font-semibold text-gray-900 dark:text-white">{stats.questionsAnswered.toLocaleString()}</span>
                                </div>
                                <div className="flex items-center justify-between">
                                    <span className="text-sm text-gray-500">Subjects</span>
                                    <span className="font-semibold text-gray-900 dark:text-white">{stats.totalSubjects}</span>
                                </div>
                            </div>
                        </CardBody>
                    </Card>
                </div>
            </div>

            {/* Tips */}
            <div className="p-6 bg-gradient-to-br from-indigo-50 to-purple-50 dark:from-indigo-900/20 dark:to-purple-900/20 rounded-2xl">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                    💡 Admin Tips
                </h3>
                <ul className="grid md:grid-cols-2 gap-3 text-sm text-gray-600 dark:text-gray-400">
                    <li className="flex items-start gap-2">
                        <span className="text-green-500">✓</span>
                        <span>Add new questions regularly to keep content fresh</span>
                    </li>
                    <li className="flex items-start gap-2">
                        <span className="text-green-500">✓</span>
                        <span>Monitor test attempts and average scores</span>
                    </li>
                    <li className="flex items-start gap-2">
                        <span className="text-green-500">✓</span>
                        <span>Upload PDF resources before exam season</span>
                    </li>
                    <li className="flex items-start gap-2">
                        <span className="text-green-500">✓</span>
                        <span>Check user activity to identify top performers</span>
                    </li>
                </ul>
            </div>
        </AdminLayout>
    );
}
