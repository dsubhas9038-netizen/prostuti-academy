export type TestType = 'chapter' | 'subject' | 'semester' | 'full';
export type AttemptStatus = 'in-progress' | 'completed' | 'abandoned';
export type TimerStatus = 'running' | 'paused' | 'warning' | 'critical' | 'expired';
export type QuestionStatus = 'not-visited' | 'current' | 'answered' | 'skipped' | 'marked';

// Main Test Interface
export interface Test {
    id: string;
    title: string;
    titleBn: string;
    description?: string;
    descriptionBn?: string;
    subjectId: string | null;
    chapterId?: string | null;
    semester: number | null;
    type: TestType;
    duration: number; // in minutes
    totalQuestions: number;
    totalMarks: number;
    questionIds: string[];
    passingMarks: number;
    passingPercentage: number;
    difficulty: 'easy' | 'medium' | 'hard';
    isFree: boolean;
    price: number;
    attemptCount: number;
    avgScore: number;
    instructions?: string[];
    instructionsBn?: string[];
    createdAt: Date;
    isActive: boolean;
}

// Test Question (question within a test)
export interface TestQuestion {
    id: string;
    questionId: string; // Reference to Question from sampleQuestions
    index: number; // 0-based index in test
    marks: number;
    negativeMarks?: number; // For MCQ negative marking
    isRequired?: boolean;
}

// Test Session (active test attempt)
export interface TestSession {
    id: string;
    testId: string;
    userId: string;
    test: Test;
    startedAt: Date;
    timeRemaining: number; // in seconds
    currentQuestionIndex: number;
    answers: Record<string, TestAnswer>; // questionId -> answer
    questionStatuses: Record<string, QuestionStatus>;
    status: 'active' | 'paused' | 'submitted' | 'expired';
    lastSavedAt?: Date;
    autoSaveEnabled: boolean;
}

// Test Answer
export interface TestAnswer {
    questionId: string;
    selectedOption: number | null; // For MCQ (0-based index)
    textAnswer: string | null; // For SAQ/LAQ
    isCorrect: boolean | null; // null until evaluated
    marksObtained: number | null;
    timeTaken: number; // in seconds
    answeredAt: Date;
    wordCount?: number;
}

// Test Attempt (completed test record)
export interface TestAttempt {
    id: string;
    userId: string;
    testId: string;
    startedAt: Date;
    completedAt: Date | null;
    status: AttemptStatus;
    answers: TestAnswer[];
    totalScore: number;
    maxScore: number;
    percentage: number;
    correctCount: number;
    wrongCount: number;
    skippedCount: number;
    timeTaken: number; // in seconds
    rank?: number; // Leaderboard rank
}

// Test Result (detailed result with analysis)
export interface TestResult {
    attempt: TestAttempt;
    test: Test;
    grade: 'A+' | 'A' | 'B+' | 'B' | 'C' | 'D' | 'F';
    passed: boolean;
    percentile?: number;
    strongAreas: string[];
    weakAreas: string[];
    recommendations: string[];
    questionWiseResults: QuestionResult[];
}

// Individual Question Result
export interface QuestionResult {
    questionId: string;
    questionText: string;
    questionTextBn: string;
    type: 'mcq' | 'saq' | 'laq' | 'vsaq';
    marks: number;
    marksObtained: number;
    userAnswer: string | null;
    correctAnswer: string;
    isCorrect: boolean;
    timeTaken: number;
    feedback?: string;
}

// Timer State
export interface TimerState {
    totalTime: number; // in seconds
    remainingTime: number;
    status: TimerStatus;
    isBlinking: boolean;
    formattedTime: string; // "MM:SS" or "HH:MM:SS"
}

// Test Type Labels
export const testTypeLabels = {
    chapter: { en: 'Chapter Test', bn: 'অধ্যায় টেস্ট', color: '#3B82F6' },
    subject: { en: 'Subject Test', bn: 'বিষয় টেস্ট', color: '#8B5CF6' },
    semester: { en: 'Semester Test', bn: 'সেমিস্টার টেস্ট', color: '#F59E0B' },
    full: { en: 'Full Mock Test', bn: 'সম্পূর্ণ মক টেস্ট', color: '#EF4444' },
};

// Difficulty Labels
export const difficultyLabels = {
    easy: { en: 'Easy', bn: 'সহজ', color: '#22C55E' },
    medium: { en: 'Medium', bn: 'মাঝারি', color: '#F59E0B' },
    hard: { en: 'Hard', bn: 'কঠিন', color: '#EF4444' },
};

// Grade Calculation
export function calculateGrade(percentage: number): 'A+' | 'A' | 'B+' | 'B' | 'C' | 'D' | 'F' {
    if (percentage >= 90) return 'A+';
    if (percentage >= 80) return 'A';
    if (percentage >= 70) return 'B+';
    if (percentage >= 60) return 'B';
    if (percentage >= 50) return 'C';
    if (percentage >= 40) return 'D';
    return 'F';
}

// Timer Status Calculation
export function getTimerStatus(remainingSeconds: number, totalSeconds: number): TimerStatus {
    if (remainingSeconds <= 0) return 'expired';
    if (remainingSeconds <= 60) return 'critical'; // 1 minute
    if (remainingSeconds <= 300) return 'warning'; // 5 minutes
    return 'running';
}

// Format Time
export function formatTime(seconds: number): string {
    if (seconds <= 0) return '00:00';

    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;

    if (hours > 0) {
        return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    }
    return `${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
}
