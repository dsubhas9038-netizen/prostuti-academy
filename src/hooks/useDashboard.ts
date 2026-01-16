'use client';

import { useState, useEffect, useMemo } from 'react';
import {
    UserStats,
    SubjectProgress,
    StreakData,
    ActivityItem,
    QuickLink,
    RecommendedItem
} from '@/types/dashboard';
import {
    getUserStats,
    getSubjectProgress,
    getStreakData,
    getRecentActivity,
    getQuickLinks,
    getRecommendedItems
} from '@/data/sampleDashboardData';

interface UseDashboardReturn {
    // Data
    userStats: UserStats | null;
    subjectProgress: SubjectProgress[];
    streakData: StreakData | null;
    recentActivity: ActivityItem[];
    quickLinks: QuickLink[];
    recommendedItems: RecommendedItem[];

    // State
    loading: boolean;
    error: string | null;

    // Computed
    overallProgress: number;
    todayActivityCount: number;

    // Actions
    refreshData: () => void;
}

export default function useDashboard(): UseDashboardReturn {
    // State
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [userStats, setUserStats] = useState<UserStats | null>(null);
    const [subjectProgress, setSubjectProgress] = useState<SubjectProgress[]>([]);
    const [streakData, setStreakData] = useState<StreakData | null>(null);
    const [recentActivity, setRecentActivity] = useState<ActivityItem[]>([]);
    const [quickLinks, setQuickLinks] = useState<QuickLink[]>([]);
    const [recommendedItems, setRecommendedItems] = useState<RecommendedItem[]>([]);

    // Load data
    const loadData = () => {
        setLoading(true);
        setError(null);

        try {
            // Simulate async fetch
            setTimeout(() => {
                setUserStats(getUserStats());
                setSubjectProgress(getSubjectProgress());
                setStreakData(getStreakData());
                setRecentActivity(getRecentActivity(10));
                setQuickLinks(getQuickLinks());
                setRecommendedItems(getRecommendedItems(5));
                setLoading(false);
            }, 300);
        } catch (err) {
            setError('Failed to load dashboard data');
            setLoading(false);
        }
    };

    // Initial load
    useEffect(() => {
        loadData();
    }, []);

    // Computed: Overall progress
    const overallProgress = useMemo(() => {
        if (subjectProgress.length === 0) return 0;
        return Math.round(
            subjectProgress.reduce((acc, s) => acc + s.progress, 0) / subjectProgress.length
        );
    }, [subjectProgress]);

    // Computed: Today's activity count
    const todayActivityCount = useMemo(() => {
        const today = new Date().toDateString();
        return recentActivity.filter(a => a.timestamp.toDateString() === today).length;
    }, [recentActivity]);

    // Refresh data
    const refreshData = () => {
        loadData();
    };

    return {
        userStats,
        subjectProgress,
        streakData,
        recentActivity,
        quickLinks,
        recommendedItems,
        loading,
        error,
        overallProgress,
        todayActivityCount,
        refreshData,
    };
}

// Hook for user stats only
export function useUserStats() {
    const [stats, setStats] = useState<UserStats | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setLoading(true);
        setTimeout(() => {
            setStats(getUserStats());
            setLoading(false);
        }, 200);
    }, []);

    return { stats, loading };
}

// Hook for streak data only
export function useStreak() {
    const [streakData, setStreakData] = useState<StreakData | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setLoading(true);
        setTimeout(() => {
            setStreakData(getStreakData());
            setLoading(false);
        }, 200);
    }, []);

    return { streakData, loading };
}
