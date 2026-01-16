import {
    LeaderboardEntry,
    Achievement,
    Badge,
    LeaderboardType,
    TimeFilter
} from '@/types/leaderboard';

// Sample Leaderboard Entries
export const sampleLeaderboardData: LeaderboardEntry[] = [
    {
        id: 'l1', rank: 1, previousRank: 2, userId: 'u1',
        displayName: 'রাহুল দাস', score: 2450,
        questionsAnswered: 185, testsCompleted: 12, streak: 15,
        achievements: [
            { id: 'a1', type: 'top_rank', title: 'Top 3', titleBn: 'শীর্ষ ৩', description: 'Reached top 3', icon: '🏆', color: '#FFD700' },
            { id: 'a2', type: 'streak', title: '15-Day Streak', titleBn: '১৫ দিনের স্ট্রিক', description: '15 days consecutive', icon: '🔥', color: '#F59E0B' },
        ],
    },
    {
        id: 'l2', rank: 2, previousRank: 1, userId: 'u2',
        displayName: 'প্রিয়া রায়', score: 2380,
        questionsAnswered: 172, testsCompleted: 11, streak: 12,
        achievements: [
            { id: 'a3', type: 'streak', title: '12-Day Streak', titleBn: '১২ দিনের স্ট্রিক', description: '', icon: '🔥', color: '#F59E0B' },
        ],
    },
    {
        id: 'l3', rank: 3, previousRank: 3, userId: 'u3',
        displayName: 'অমিত কুমার', score: 2210,
        questionsAnswered: 165, testsCompleted: 10, streak: 8,
        achievements: [
            { id: 'a4', type: 'tests', title: '10 Tests', titleBn: '১০ টেস্ট', description: '', icon: '🧪', color: '#22C55E' },
        ],
    },
    {
        id: 'l4', rank: 4, previousRank: 6, userId: 'u4',
        displayName: 'স্নেহা ঘোষ', score: 2150,
        questionsAnswered: 158, testsCompleted: 9, streak: 5,
        achievements: [],
    },
    {
        id: 'l5', rank: 5, previousRank: 4, userId: 'u5',
        displayName: 'অর্জুন সিং', score: 2080,
        questionsAnswered: 150, testsCompleted: 8, streak: 7,
        achievements: [],
    },
    {
        id: 'l6', rank: 6, previousRank: 5, userId: 'u6',
        displayName: 'মিতা সরকার', score: 1980,
        questionsAnswered: 142, testsCompleted: 8, streak: 3,
        achievements: [],
    },
    {
        id: 'l7', rank: 7, previousRank: 8, userId: 'u7',
        displayName: 'সুমন পাল', score: 1920,
        questionsAnswered: 138, testsCompleted: 7, streak: 6,
        achievements: [],
    },
    {
        id: 'l8', rank: 8, previousRank: 7, userId: 'u8',
        displayName: 'রিতা দে', score: 1880,
        questionsAnswered: 132, testsCompleted: 7, streak: 4,
        achievements: [],
    },
    {
        id: 'l9', rank: 9, previousRank: 10, userId: 'u9',
        displayName: 'বিকাশ রায়', score: 1820,
        questionsAnswered: 128, testsCompleted: 6, streak: 2,
        achievements: [],
    },
    {
        id: 'l10', rank: 10, previousRank: 9, userId: 'u10',
        displayName: 'অনিতা মুখার্জী', score: 1780,
        questionsAnswered: 125, testsCompleted: 6, streak: 5,
        achievements: [],
    },
];

// Current user rank
export const currentUserRank: LeaderboardEntry = {
    id: 'l12', rank: 12, previousRank: 17, userId: 'current',
    displayName: 'You', score: 1650,
    questionsAnswered: 95, testsCompleted: 5, streak: 3,
    achievements: [
        { id: 'a5', type: 'streak', title: '3-Day Streak', titleBn: '৩ দিনের স্ট্রিক', description: '', icon: '🔥', color: '#F59E0B' },
    ],
    isCurrentUser: true,
};

// Sample achievements
export const sampleAchievements: Achievement[] = [
    { id: 'ach1', type: 'streak', title: '7-Day Streak', titleBn: '৭ দিনের স্ট্রিক', description: 'Study 7 days in a row', icon: '🔥', color: '#F59E0B', earnedAt: new Date() },
    { id: 'ach2', type: 'questions', title: '100 Questions', titleBn: '১০০ প্রশ্ন', description: 'Answer 100 questions', icon: '📝', color: '#3B82F6', progress: 95, target: 100 },
    { id: 'ach3', type: 'tests', title: '10 Tests', titleBn: '১০ টেস্ট', description: 'Complete 10 tests', icon: '🧪', color: '#22C55E', progress: 5, target: 10 },
    { id: 'ach4', type: 'perfect_score', title: 'Perfect Score', titleBn: 'নিখুঁত স্কোর', description: 'Get 100% in a test', icon: '💯', color: '#EF4444' },
    { id: 'ach5', type: 'top_rank', title: 'Top 10', titleBn: 'শীর্ষ ১০', description: 'Reach top 10 globally', icon: '🏆', color: '#FFD700', progress: 12, target: 10 },
    { id: 'ach6', type: 'subject_master', title: 'Bengali Master', titleBn: 'বাংলা মাস্টার', description: 'Complete all Bengali content', icon: '📚', color: '#EC4899', progress: 75, target: 100 },
];

// Sample badges
export const sampleBadges: Badge[] = [
    { id: 'b1', name: 'Early Bird', nameBn: 'তাড়াতাড়ি উঠা', icon: '🌅', color: '#F59E0B', rarity: 'common', earnedAt: new Date() },
    { id: 'b2', name: 'Streak Master', nameBn: 'স্ট্রিক মাস্টার', icon: '🔥', color: '#EF4444', rarity: 'rare', earnedAt: new Date() },
    { id: 'b3', name: 'Quiz Champion', nameBn: 'কুইজ চ্যাম্পিয়ন', icon: '🎯', color: '#8B5CF6', rarity: 'epic', earnedAt: new Date() },
    { id: 'b4', name: 'Legend', nameBn: 'কিংবদন্তি', icon: '👑', color: '#FFD700', rarity: 'legendary', earnedAt: new Date() },
];

// Subject-wise leaderboard
export const subjectLeaderboards: Record<string, LeaderboardEntry[]> = {
    bengali: sampleLeaderboardData.slice(0, 5).map((e, i) => ({ ...e, rank: i + 1 })),
    english: sampleLeaderboardData.slice(2, 7).map((e, i) => ({ ...e, rank: i + 1 })),
    history: sampleLeaderboardData.slice(1, 6).map((e, i) => ({ ...e, rank: i + 1 })),
};

// Get leaderboard
export function getLeaderboard(type: LeaderboardType = 'global', limit: number = 10): LeaderboardEntry[] {
    return sampleLeaderboardData.slice(0, limit);
}

// Get subject leaderboard
export function getSubjectLeaderboard(subjectId: string, limit: number = 10): LeaderboardEntry[] {
    return (subjectLeaderboards[subjectId] || sampleLeaderboardData).slice(0, limit);
}

// Get current user rank
export function getCurrentUserRank(): LeaderboardEntry {
    return currentUserRank;
}

// Get achievements
export function getAchievements(): Achievement[] {
    return sampleAchievements;
}

// Get badges
export function getBadges(): Badge[] {
    return sampleBadges;
}

// Get top 3
export function getTopThree(): LeaderboardEntry[] {
    return sampleLeaderboardData.slice(0, 3);
}
