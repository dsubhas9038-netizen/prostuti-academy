// Progress Types for Firestore Persistence

import { Timestamp } from 'firebase/firestore';

// ==========================================
// USER PROGRESS
// ==========================================

// Renamed to avoid conflict with dashboard.ts
export interface UserSubjectProgress {
    subjectId: string;
    subjectName: string;
    chaptersTotal: number;
    chaptersCompleted: number;
    questionsRead: string[]; // questionIds
    questionsTotal: number;
    completionPercentage: number;
    lastAccessedAt: Date;
}

export interface UserProgress {
    userId: string;
    totalQuestionsRead: number;
    totalTestsTaken: number;
    totalTestsPassed: number;
    averageScore: number;
    streak: number;
    longestStreak: number;
    lastActiveDate: Date;
    subjectProgress: Record<string, UserSubjectProgress>;
    createdAt: Date;
    updatedAt: Date;
}

// Firestore document format
export interface UserProgressDoc {
    userId: string;
    totalQuestionsRead: number;
    totalTestsTaken: number;
    totalTestsPassed: number;
    averageScore: number;
    streak: number;
    longestStreak: number;
    lastActiveDate: Timestamp;
    subjectProgress: Record<string, {
        subjectId: string;
        subjectName: string;
        chaptersTotal: number;
        chaptersCompleted: number;
        questionsRead: string[];
        questionsTotal: number;
        completionPercentage: number;
        lastAccessedAt: Timestamp;
    }>;
    createdAt: Timestamp;
    updatedAt: Timestamp;
}

// ==========================================
// BOOKMARKS
// ==========================================

export interface Bookmark {
    questionId: string;
    subjectId: string;
    subjectName: string;
    chapterId: string;
    chapterName: string;
    questionText: string;
    questionType: 'mcq' | 'saq' | 'laq' | 'vsaq';
    marks: number;
    addedAt: Date;
    note?: string;
}

export interface UserBookmarks {
    userId: string;
    bookmarks: Bookmark[];
    totalCount: number;
    updatedAt: Date;
}

// Firestore document format
export interface UserBookmarksDoc {
    userId: string;
    bookmarks: {
        questionId: string;
        subjectId: string;
        subjectName: string;
        chapterId: string;
        chapterName: string;
        questionText: string;
        questionType: string;
        marks: number;
        addedAt: Timestamp;
        note?: string;
    }[];
    totalCount: number;
    updatedAt: Timestamp;
}

// ==========================================
// TEST ATTEMPTS
// ==========================================

// Renamed to avoid conflict with test.ts
export interface ProgressTestAnswer {
    questionId: string;
    selectedOption?: number;
    textAnswer?: string;
    isCorrect: boolean;
    marksObtained: number;
    timeTaken: number; // seconds
}

// Renamed to avoid conflict with test.ts
export interface ProgressTestAttempt {
    id: string;
    userId: string;
    testId: string;
    testTitle: string;
    subjectId?: string;
    subjectName?: string;
    startedAt: Date;
    completedAt?: Date;
    status: 'in-progress' | 'completed' | 'abandoned';
    answers: ProgressTestAnswer[];
    totalQuestions: number;
    attemptedQuestions: number;
    correctAnswers: number;
    wrongAnswers: number;
    skippedQuestions: number;
    totalMarks: number;
    marksObtained: number;
    percentage: number;
    timeTaken: number; // total seconds
    passed: boolean;
}

// Firestore document format
export interface TestAttemptDoc {
    userId: string;
    testId: string;
    testTitle: string;
    subjectId?: string;
    subjectName?: string;
    startedAt: Timestamp;
    completedAt?: Timestamp;
    status: string;
    answers: ProgressTestAnswer[];
    totalQuestions: number;
    attemptedQuestions: number;
    correctAnswers: number;
    wrongAnswers: number;
    skippedQuestions: number;
    totalMarks: number;
    marksObtained: number;
    percentage: number;
    timeTaken: number;
    passed: boolean;
}

// ==========================================
// STREAK SYSTEM
// ==========================================

// Renamed to avoid conflict with dashboard.ts
export interface UserStreakData {
    userId: string;
    currentStreak: number;
    longestStreak: number;
    lastActiveDate: Date;
    streakHistory: {
        date: Date;
        questionsRead: number;
        testsCompleted: number;
    }[];
}

// ==========================================
// HELPER FUNCTIONS
// ==========================================

// Convert Firestore Timestamp to Date
export function toDate(timestamp: Timestamp | Date): Date {
    if (timestamp instanceof Timestamp) {
        return timestamp.toDate();
    }
    return timestamp;
}

// Convert Date to Firestore Timestamp
export function toTimestamp(date: Date): Timestamp {
    return Timestamp.fromDate(date);
}

// Convert UserProgressDoc to UserProgress
export function convertUserProgressDoc(doc: UserProgressDoc): UserProgress {
    return {
        ...doc,
        lastActiveDate: toDate(doc.lastActiveDate),
        createdAt: toDate(doc.createdAt),
        updatedAt: toDate(doc.updatedAt),
        subjectProgress: Object.fromEntries(
            Object.entries(doc.subjectProgress).map(([key, value]) => [
                key,
                {
                    ...value,
                    lastAccessedAt: toDate(value.lastAccessedAt),
                },
            ])
        ),
    };
}

// Convert UserBookmarksDoc to UserBookmarks
export function convertUserBookmarksDoc(doc: UserBookmarksDoc): UserBookmarks {
    return {
        ...doc,
        updatedAt: toDate(doc.updatedAt),
        bookmarks: doc.bookmarks.map((b) => ({
            ...b,
            questionType: b.questionType as Bookmark['questionType'],
            addedAt: toDate(b.addedAt),
        })),
    };
}

// Convert TestAttemptDoc to ProgressTestAttempt
export function convertTestAttemptDoc(id: string, doc: TestAttemptDoc): ProgressTestAttempt {
    return {
        id,
        ...doc,
        status: doc.status as ProgressTestAttempt['status'],
        startedAt: toDate(doc.startedAt),
        completedAt: doc.completedAt ? toDate(doc.completedAt) : undefined,
    };
}

// Calculate completion percentage
export function calculateCompletion(completed: number, total: number): number {
    if (total === 0) return 0;
    return Math.round((completed / total) * 100);
}

// Check if streak should be maintained
export function shouldMaintainStreak(lastActiveDate: Date): boolean {
    const now = new Date();
    const lastActive = new Date(lastActiveDate);

    // Reset time parts
    now.setHours(0, 0, 0, 0);
    lastActive.setHours(0, 0, 0, 0);

    const diffDays = Math.floor((now.getTime() - lastActive.getTime()) / (1000 * 60 * 60 * 24));

    // Streak maintained if last active was today or yesterday
    return diffDays <= 1;
}

// Calculate streak
export function calculateStreak(lastActiveDate: Date, currentStreak: number): number {
    if (shouldMaintainStreak(lastActiveDate)) {
        return currentStreak;
    }
    // Streak broken
    return 0;
}

// Default progress for new users
export function createDefaultProgress(userId: string): UserProgress {
    const now = new Date();
    return {
        userId,
        totalQuestionsRead: 0,
        totalTestsTaken: 0,
        totalTestsPassed: 0,
        averageScore: 0,
        streak: 0,
        longestStreak: 0,
        lastActiveDate: now,
        subjectProgress: {},
        createdAt: now,
        updatedAt: now,
    };
}

// Default bookmarks for new users
export function createDefaultBookmarks(userId: string): UserBookmarks {
    return {
        userId,
        bookmarks: [],
        totalCount: 0,
        updatedAt: new Date(),
    };
}

export default {
    toDate,
    toTimestamp,
    convertUserProgressDoc,
    convertUserBookmarksDoc,
    convertTestAttemptDoc,
    calculateCompletion,
    shouldMaintainStreak,
    calculateStreak,
    createDefaultProgress,
    createDefaultBookmarks,
};
