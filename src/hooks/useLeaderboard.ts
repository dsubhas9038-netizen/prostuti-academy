import { useState, useEffect, useMemo, useCallback } from 'react';
import {
    LeaderboardEntry,
    LeaderboardType,
    TimeFilter,
    Achievement,
    Badge,
} from '@/types/leaderboard';
import {
    getLeaderboard,
    getSubjectLeaderboard,
    getCurrentUserRank,
    getAchievements,
    getBadges,
    getTopThree,
    sampleLeaderboardData,
} from '@/data/sampleLeaderboardData';

interface UseLeaderboardOptions {
    type?: LeaderboardType;
    timeFilter?: TimeFilter;
    subjectId?: string;
    limit?: number;
}

interface UseLeaderboardReturn {
    // Data
    entries: LeaderboardEntry[];
    topThree: LeaderboardEntry[];
    currentUserRank: LeaderboardEntry | null;
    achievements: Achievement[];
    badges: Badge[];

    // State
    loading: boolean;
    error: string | null;

    // Filters
    type: LeaderboardType;
    timeFilter: TimeFilter;
    subjectId: string;

    // Actions
    setType: (type: LeaderboardType) => void;
    setTimeFilter: (filter: TimeFilter) => void;
    setSubjectId: (id: string) => void;
    refresh: () => void;

    // Computed
    totalUsers: number;
    userPercentile: number;
}

export function useLeaderboard(options: UseLeaderboardOptions = {}): UseLeaderboardReturn {
    // State
    const [type, setType] = useState<LeaderboardType>(options.type || 'global');
    const [timeFilter, setTimeFilter] = useState<TimeFilter>(options.timeFilter || 'week');
    const [subjectId, setSubjectId] = useState<string>(options.subjectId || 'bengali');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [entries, setEntries] = useState<LeaderboardEntry[]>([]);

    // Fetch data
    const fetchData = useCallback(async () => {
        setLoading(true);
        setError(null);

        try {
            // Simulate API delay
            await new Promise(resolve => setTimeout(resolve, 300));

            let data: LeaderboardEntry[];

            switch (type) {
                case 'subject':
                    data = getSubjectLeaderboard(subjectId, options.limit || 20);
                    break;
                case 'friends':
                    // Filter to show only friends (simulated)
                    data = sampleLeaderboardData.filter((_, i) => i % 2 === 0).slice(0, options.limit || 10);
                    data = data.map((e, i) => ({ ...e, rank: i + 1, isFriend: true }));
                    break;
                default:
                    data = getLeaderboard(type, options.limit || 20);
            }

            setEntries(data);
        } catch (err) {
            setError('Failed to load leaderboard');
        } finally {
            setLoading(false);
        }
    }, [type, timeFilter, subjectId, options.limit]);

    // Initial fetch
    useEffect(() => {
        fetchData();
    }, [fetchData]);

    // Get current user rank
    const currentUserRank = useMemo(() => {
        return getCurrentUserRank();
    }, []);

    // Get top 3
    const topThree = useMemo(() => {
        return entries.slice(0, 3);
    }, [entries]);

    // Get achievements
    const achievements = useMemo(() => {
        return getAchievements();
    }, []);

    // Get badges
    const badges = useMemo(() => {
        return getBadges();
    }, []);

    // Computed values
    const totalUsers = 2800; // Would come from API
    const userPercentile = currentUserRank
        ? Math.round((1 - currentUserRank.rank / totalUsers) * 100)
        : 0;

    return {
        // Data
        entries,
        topThree,
        currentUserRank,
        achievements,
        badges,

        // State
        loading,
        error,

        // Filters
        type,
        timeFilter,
        subjectId,

        // Actions
        setType,
        setTimeFilter,
        setSubjectId,
        refresh: fetchData,

        // Computed
        totalUsers,
        userPercentile,
    };
}

export default useLeaderboard;

// Hook for just top users (compact version)
export function useTopLeaderboard(limit: number = 5) {
    const [loading, setLoading] = useState(true);
    const [entries, setEntries] = useState<LeaderboardEntry[]>([]);

    useEffect(() => {
        const fetch = async () => {
            setLoading(true);
            await new Promise(resolve => setTimeout(resolve, 200));
            setEntries(getLeaderboard('global', limit));
            setLoading(false);
        };
        fetch();
    }, [limit]);

    return { entries, loading };
}

// Hook for user achievements
export function useAchievements() {
    const [loading, setLoading] = useState(true);
    const [achievements, setAchievements] = useState<Achievement[]>([]);
    const [badges, setBadges] = useState<Badge[]>([]);

    useEffect(() => {
        const fetch = async () => {
            setLoading(true);
            await new Promise(resolve => setTimeout(resolve, 200));
            setAchievements(getAchievements());
            setBadges(getBadges());
            setLoading(false);
        };
        fetch();
    }, []);

    // Compute earned and in-progress
    const earnedAchievements = achievements.filter(a => a.earnedAt);
    const inProgressAchievements = achievements.filter(a => !a.earnedAt && a.progress);

    return {
        achievements,
        badges,
        loading,
        earnedAchievements,
        inProgressAchievements,
    };
}
