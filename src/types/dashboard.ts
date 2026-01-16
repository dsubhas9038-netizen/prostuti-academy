// Dashboard Types

// User overall stats
export interface UserStats {
    userId: string;
    totalProgress: number; // 0-100 percentage
    questionsSolved: number;
    testsTaken: number;
    testsCompleted: number;
    avgTestScore: number;
    totalStudyTimeMinutes: number;
    currentStreak: number;
    longestStreak: number;
    lastActiveDate: Date;
    rank?: number;
    totalPoints: number;
}

// Subject-wise progress
export interface SubjectProgress {
    subjectId: string;
    subjectName: string;
    subjectNameBn: string;
    color: string;
    progress: number; // 0-100
    chaptersCompleted: number;
    totalChapters: number;
    questionsAttempted: number;
    totalQuestions: number;
    lastStudiedDate?: Date;
}

// Streak data
export interface StreakData {
    currentStreak: number;
    longestStreak: number;
    lastActivityDate: Date;
    weeklyActivity: DayActivity[];
    milestones: StreakMilestone[];
}

export interface DayActivity {
    date: Date;
    isActive: boolean;
    minutesStudied: number;
}

export interface StreakMilestone {
    days: number;
    achieved: boolean;
    achievedDate?: Date;
    reward?: string;
    rewardBn?: string;
}

// Activity item for timeline
export interface ActivityItem {
    id: string;
    type: 'question' | 'test' | 'chapter' | 'download' | 'bookmark' | 'login';
    title: string;
    titleBn: string;
    description?: string;
    descriptionBn?: string;
    timestamp: Date;
    metadata?: {
        subjectId?: string;
        chapterId?: string;
        testId?: string;
        resourceId?: string;
        score?: number;
        questionCount?: number;
    };
}

// Quick link item
export interface QuickLink {
    id: string;
    label: string;
    labelBn: string;
    href: string;
    icon: string;
    color: string;
    count?: number;
}

// Recommended content item
export interface RecommendedItem {
    id: string;
    type: 'question' | 'test' | 'resource' | 'chapter';
    title: string;
    titleBn: string;
    description?: string;
    descriptionBn?: string;
    priority: 'high' | 'medium' | 'low';
    reason: string;
    reasonBn: string;
    href: string;
    metadata?: {
        subjectId?: string;
        difficulty?: string;
        duration?: number;
    };
}

// Activity type configuration
export const activityTypeConfig = {
    'question': {
        icon: '📝',
        color: '#3B82F6',
        label: 'Answered',
        labelBn: 'উত্তর দিয়েছ',
    },
    'test': {
        icon: '🧪',
        color: '#8B5CF6',
        label: 'Took test',
        labelBn: 'পরীক্ষা দিয়েছ',
    },
    'chapter': {
        icon: '✅',
        color: '#22C55E',
        label: 'Completed',
        labelBn: 'সম্পূর্ণ করেছ',
    },
    'download': {
        icon: '📥',
        color: '#6B7280',
        label: 'Downloaded',
        labelBn: 'ডাউনলোড করেছ',
    },
    'bookmark': {
        icon: '🔖',
        color: '#F59E0B',
        label: 'Bookmarked',
        labelBn: 'বুকমার্ক করেছ',
    },
    'login': {
        icon: '👋',
        color: '#10B981',
        label: 'Logged in',
        labelBn: 'লগইন করেছ',
    },
};

// Format study time
export function formatStudyTime(minutes: number): string {
    if (minutes < 60) {
        return `${minutes} min`;
    }
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return mins > 0 ? `${hours}h ${mins}m` : `${hours}h`;
}

// Format relative time
export function formatRelativeTime(date: Date): string {
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / (1000 * 60));
    const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

    if (diffMins < 1) return 'এইমাত্র';
    if (diffMins < 60) return `${diffMins} মিনিট আগে`;
    if (diffHours < 24) return `${diffHours} ঘণ্টা আগে`;
    if (diffDays < 7) return `${diffDays} দিন আগে`;
    return date.toLocaleDateString('bn-BD');
}

// Get greeting based on time
export function getGreeting(): { text: string; textBn: string; emoji: string } {
    const hour = new Date().getHours();

    if (hour < 6) return { text: 'Good Night', textBn: 'শুভ রাত্রি', emoji: '🌙' };
    if (hour < 12) return { text: 'Good Morning', textBn: 'শুভ সকাল', emoji: '🌅' };
    if (hour < 17) return { text: 'Good Afternoon', textBn: 'শুভ দুপুর', emoji: '☀️' };
    if (hour < 21) return { text: 'Good Evening', textBn: 'শুভ সন্ধ্যা', emoji: '🌆' };
    return { text: 'Good Night', textBn: 'শুভ রাত্রি', emoji: '🌙' };
}
