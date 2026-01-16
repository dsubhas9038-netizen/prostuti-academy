import {
    UserStats,
    SubjectProgress,
    StreakData,
    DayActivity,
    StreakMilestone,
    ActivityItem,
    QuickLink,
    RecommendedItem
} from '@/types/dashboard';

// Sample User Stats
export const sampleUserStats: UserStats = {
    userId: 'user-demo',
    totalProgress: 72,
    questionsSolved: 128,
    testsTaken: 15,
    testsCompleted: 12,
    avgTestScore: 78.5,
    totalStudyTimeMinutes: 2450,
    currentStreak: 12,
    longestStreak: 21,
    lastActiveDate: new Date(),
    rank: 45,
    totalPoints: 3250,
};

// Sample Subject Progress
export const sampleSubjectProgress: SubjectProgress[] = [
    {
        subjectId: 'bengali',
        subjectName: 'Bengali',
        subjectNameBn: 'বাংলা',
        color: '#3B82F6',
        progress: 80,
        chaptersCompleted: 8,
        totalChapters: 10,
        questionsAttempted: 45,
        totalQuestions: 60,
        lastStudiedDate: new Date(),
    },
    {
        subjectId: 'english',
        subjectName: 'English',
        subjectNameBn: 'ইংরেজি',
        color: '#22C55E',
        progress: 65,
        chaptersCompleted: 5,
        totalChapters: 8,
        questionsAttempted: 32,
        totalQuestions: 55,
        lastStudiedDate: new Date(Date.now() - 86400000),
    },
    {
        subjectId: 'history',
        subjectName: 'History',
        subjectNameBn: 'ইতিহাস',
        color: '#8B5CF6',
        progress: 90,
        chaptersCompleted: 9,
        totalChapters: 10,
        questionsAttempted: 52,
        totalQuestions: 58,
        lastStudiedDate: new Date(Date.now() - 172800000),
    },
    {
        subjectId: 'geography',
        subjectName: 'Geography',
        subjectNameBn: 'ভূগোল',
        color: '#F59E0B',
        progress: 55,
        chaptersCompleted: 4,
        totalChapters: 8,
        questionsAttempted: 25,
        totalQuestions: 50,
        lastStudiedDate: new Date(Date.now() - 259200000),
    },
];

// Sample Weekly Activity (last 7 days)
const generateWeeklyActivity = (): DayActivity[] => {
    const days: DayActivity[] = [];
    for (let i = 6; i >= 0; i--) {
        const date = new Date();
        date.setDate(date.getDate() - i);
        days.push({
            date,
            isActive: i !== 6, // All active except 7 days ago
            minutesStudied: i === 6 ? 0 : Math.floor(Math.random() * 120) + 30,
        });
    }
    return days;
};

// Sample Streak Data
export const sampleStreakData: StreakData = {
    currentStreak: 12,
    longestStreak: 21,
    lastActivityDate: new Date(),
    weeklyActivity: generateWeeklyActivity(),
    milestones: [
        { days: 7, achieved: true, achievedDate: new Date(Date.now() - 432000000), reward: '7 Day Badge', rewardBn: '৭ দিনের ব্যাজ' },
        { days: 14, achieved: false, reward: '14 Day Badge', rewardBn: '১৪ দিনের ব্যাজ' },
        { days: 30, achieved: false, reward: 'Monthly Streak', rewardBn: 'মাসিক স্ট্রিক' },
        { days: 100, achieved: false, reward: 'Century Streak', rewardBn: 'শতদিনের স্ট্রিক' },
    ],
};

// Sample Recent Activity
export const sampleRecentActivity: ActivityItem[] = [
    {
        id: 'activity-1',
        type: 'question',
        title: 'Answered 5 questions',
        titleBn: '৫টি প্রশ্নের উত্তর দিয়েছ',
        description: 'Bengali Chapter 1',
        descriptionBn: 'বাংলা অধ্যায় ১',
        timestamp: new Date(Date.now() - 1800000), // 30 mins ago
        metadata: { subjectId: 'bengali', questionCount: 5 },
    },
    {
        id: 'activity-2',
        type: 'test',
        title: 'Completed History Mock Test',
        titleBn: 'ইতিহাস মক টেস্ট সম্পূর্ণ করেছ',
        description: 'Score: 85%',
        descriptionBn: 'স্কোর: ৮৫%',
        timestamp: new Date(Date.now() - 7200000), // 2 hours ago
        metadata: { testId: 'test-history-1', score: 85 },
    },
    {
        id: 'activity-3',
        type: 'chapter',
        title: 'Completed Chapter',
        titleBn: 'অধ্যায় সম্পূর্ণ করেছ',
        description: 'Pather Dabi',
        descriptionBn: 'পথের দাবী',
        timestamp: new Date(Date.now() - 18000000), // 5 hours ago
        metadata: { chapterId: 'bengali-sem1-ch1' },
    },
    {
        id: 'activity-4',
        type: 'download',
        title: 'Downloaded Notes',
        titleBn: 'নোটস ডাউনলোড করেছ',
        description: 'Renaissance Notes',
        descriptionBn: 'রেনেসাঁস নোটস',
        timestamp: new Date(Date.now() - 86400000), // 1 day ago
        metadata: { resourceId: 'pdf-history-notes-ren' },
    },
    {
        id: 'activity-5',
        type: 'bookmark',
        title: 'Bookmarked Question',
        titleBn: 'প্রশ্ন বুকমার্ক করেছ',
        description: 'Important PYQ',
        descriptionBn: 'গুরুত্বপূর্ণ PYQ',
        timestamp: new Date(Date.now() - 172800000), // 2 days ago
    },
];

// Sample Quick Links
export const sampleQuickLinks: QuickLink[] = [
    { id: 'ql-subjects', label: 'Subjects', labelBn: 'বিষয়', href: '/subjects', icon: '📚', color: '#3B82F6', count: 6 },
    { id: 'ql-questions', label: 'Questions', labelBn: 'প্রশ্ন', href: '/subjects', icon: '📝', color: '#22C55E', count: 250 },
    { id: 'ql-tests', label: 'Mock Tests', labelBn: 'মক টেস্ট', href: '/tests', icon: '🧪', color: '#8B5CF6', count: 15 },
    { id: 'ql-pyq', label: 'PYQ Analysis', labelBn: 'PYQ বিশ্লেষণ', href: '/pyq', icon: '📊', color: '#F59E0B' },
    { id: 'ql-resources', label: 'Resources', labelBn: 'রিসোর্স', href: '/resources', icon: '📁', color: '#EF4444', count: 15 },
    { id: 'ql-bookmarks', label: 'Bookmarks', labelBn: 'বুকমার্ক', href: '/bookmarks', icon: '🔖', color: '#EC4899', count: 8 },
];

// Sample Recommended Items
export const sampleRecommendedItems: RecommendedItem[] = [
    {
        id: 'rec-1',
        type: 'chapter',
        title: 'Complete Renaissance Chapter',
        titleBn: 'রেনেসাঁস অধ্যায় সম্পূর্ণ করো',
        description: 'You\'re 90% done!',
        descriptionBn: 'তুমি ৯০% শেষ করেছ!',
        priority: 'high',
        reason: 'Almost complete',
        reasonBn: 'প্রায় শেষ',
        href: '/subjects/history/history-sem1-ch1',
        metadata: { subjectId: 'history' },
    },
    {
        id: 'rec-2',
        type: 'test',
        title: 'Take Bengali Mock Test',
        titleBn: 'বাংলা মক টেস্ট দাও',
        description: 'Test your knowledge',
        descriptionBn: 'তোমার জ্ঞান পরীক্ষা করো',
        priority: 'high',
        reason: 'Recommended for you',
        reasonBn: 'তোমার জন্য সুপারিশকৃত',
        href: '/tests/test-bengali-ch1/take',
        metadata: { subjectId: 'bengali', duration: 30 },
    },
    {
        id: 'rec-3',
        type: 'resource',
        title: 'Download Model Paper 2024',
        titleBn: 'মডেল পেপার ২০২৪ ডাউনলোড করো',
        priority: 'medium',
        reason: 'Most downloaded',
        reasonBn: 'সবচেয়ে বেশি ডাউনলোড',
        href: '/resources/view/pdf-model-arts-2024-1',
    },
];

// Exam dates for countdown
export const examDates = {
    hsExam2024: new Date('2024-03-15T10:00:00'),
    mockTest1: new Date('2024-02-01T10:00:00'),
};

// Get user stats
export function getUserStats(): UserStats {
    return sampleUserStats;
}

// Get subject progress
export function getSubjectProgress(): SubjectProgress[] {
    return sampleSubjectProgress;
}

// Get streak data
export function getStreakData(): StreakData {
    return sampleStreakData;
}

// Get recent activity
export function getRecentActivity(limit: number = 5): ActivityItem[] {
    return sampleRecentActivity.slice(0, limit);
}

// Get quick links
export function getQuickLinks(): QuickLink[] {
    return sampleQuickLinks;
}

// Get recommended items
export function getRecommendedItems(limit: number = 3): RecommendedItem[] {
    return sampleRecommendedItems.slice(0, limit);
}
