// Leaderboard Types

// Leaderboard type
export type LeaderboardType = 'global' | 'subject' | 'friends' | 'weekly' | 'monthly';

// Time filter
export type TimeFilter = 'today' | 'week' | 'month' | 'all';

export const timeFilterConfig: Record<TimeFilter, { label: string; labelBn: string }> = {
    today: { label: 'Today', labelBn: 'আজ' },
    week: { label: 'This Week', labelBn: 'এই সপ্তাহ' },
    month: { label: 'This Month', labelBn: 'এই মাস' },
    all: { label: 'All Time', labelBn: 'সব সময়' },
};

// Leaderboard entry
export interface LeaderboardEntry {
    id: string;
    rank: number;
    previousRank?: number;
    userId: string;
    displayName: string;
    photoURL?: string;
    score: number;
    questionsAnswered: number;
    testsCompleted: number;
    streak: number;
    achievements: Achievement[];
    isCurrentUser?: boolean;
    isFriend?: boolean;
}

// Achievement types
export type AchievementType =
    | 'streak'
    | 'score'
    | 'questions'
    | 'tests'
    | 'perfect_score'
    | 'top_rank'
    | 'subject_master';

// Achievement
export interface Achievement {
    id: string;
    type: AchievementType;
    title: string;
    titleBn: string;
    description: string;
    icon: string;
    color: string;
    earnedAt?: Date;
    progress?: number;
    target?: number;
}

// Achievement config
export const achievementConfig: Record<AchievementType, { icon: string; color: string }> = {
    streak: { icon: '🔥', color: '#F59E0B' },
    score: { icon: '⭐', color: '#8B5CF6' },
    questions: { icon: '📝', color: '#3B82F6' },
    tests: { icon: '🧪', color: '#22C55E' },
    perfect_score: { icon: '💯', color: '#EF4444' },
    top_rank: { icon: '🏆', color: '#FFD700' },
    subject_master: { icon: '📚', color: '#EC4899' },
};

// Badge
export interface Badge {
    id: string;
    name: string;
    nameBn: string;
    icon: string;
    color: string;
    rarity: 'common' | 'rare' | 'epic' | 'legendary';
    earnedAt: Date;
}

// Rarity config
export const rarityConfig = {
    common: { label: 'Common', color: '#6B7280' },
    rare: { label: 'Rare', color: '#3B82F6' },
    epic: { label: 'Epic', color: '#8B5CF6' },
    legendary: { label: 'Legendary', color: '#FFD700' },
};

// Medal config for top 3
export const medalConfig = {
    1: { icon: '🥇', color: '#FFD700', label: '1st Place', gradient: 'from-yellow-400 to-amber-500' },
    2: { icon: '🥈', color: '#C0C0C0', label: '2nd Place', gradient: 'from-gray-300 to-gray-400' },
    3: { icon: '🥉', color: '#CD7F32', label: '3rd Place', gradient: 'from-amber-600 to-orange-700' },
};

// Rank change
export function getRankChange(currentRank: number, previousRank?: number): { direction: 'up' | 'down' | 'same'; change: number } {
    if (!previousRank) return { direction: 'same', change: 0 };
    if (currentRank < previousRank) return { direction: 'up', change: previousRank - currentRank };
    if (currentRank > previousRank) return { direction: 'down', change: currentRank - previousRank };
    return { direction: 'same', change: 0 };
}

// Format score
export function formatScore(score: number): string {
    if (score >= 10000) return `${(score / 1000).toFixed(1)}K`;
    return score.toLocaleString();
}

// Get rank suffix
export function getRankSuffix(rank: number): string {
    if (rank % 100 >= 11 && rank % 100 <= 13) return 'th';
    switch (rank % 10) {
        case 1: return 'st';
        case 2: return 'nd';
        case 3: return 'rd';
        default: return 'th';
    }
}

// Format rank
export function formatRank(rank: number): string {
    return `${rank}${getRankSuffix(rank)}`;
}
