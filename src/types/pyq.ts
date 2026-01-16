// PYQ Analysis Types

// Year data for a specific year's exam
export interface YearData {
    year: number;
    totalQuestions: number;
    totalMarks: number;
    questionIds: string[];
}

// Topic frequency tracking
export interface TopicFrequency {
    id: string;
    topic: string;
    topicBn: string;
    frequency: number; // How many times asked
    yearsAsked: number[];
    avgMarks: number;
    importance: 'very-high' | 'high' | 'medium' | 'low';
    chapterId: string;
    lastAskedYear: number;
}

// Chapter-wise PYQ statistics
export interface ChapterPYQStats {
    chapterId: string;
    chapterTitle: string;
    chapterTitleBn: string;
    subjectId: string;
    totalQuestions: number;
    totalMarks: number;
    yearWiseData: YearData[];
    avgQuestionsPerYear: number;
    avgMarksPerYear: number;
    topTopics: TopicFrequency[];
    isPredictedHot: boolean; // Predicted for next exam
    predictedMarks: number;
    yearsAsked: number[];
}

// Subject-wide PYQ analysis
export interface SubjectPYQAnalysis {
    subjectId: string;
    subjectName: string;
    subjectNameBn: string;
    color: string;
    totalQuestions: number;
    totalMarks: number;
    yearsAnalyzed: number[];
    repeatPercentage: number; // % of questions that repeat
    chapterStats: ChapterPYQStats[];
    topTopics: TopicFrequency[];
    yearWiseData: YearData[];
    avgQuestionsPerYear: number;
    avgMarksPerYear: number;
    hotChapters: string[]; // Chapters predicted hot for next exam
}

// Trend prediction for upcoming exam
export interface TrendPrediction {
    topic: string;
    topicBn: string;
    chapterId: string;
    chapterTitle: string;
    probability: 'very-high' | 'high' | 'medium' | 'low';
    lastAskedYear: number;
    gapYears: number; // Years since last asked
    avgMarks: number;
    reasoning: string;
    reasoningBn: string;
}

// Overall PYQ summary  
export interface PYQSummary {
    totalQuestions: number;
    totalSubjects: number;
    yearsAnalyzed: number;
    repeatPercentage: number;
    importantTopicsCount: number;
    lastUpdated: Date;
}

// Year badge configuration
export const yearColors: Record<number, { bg: string; text: string; label: string }> = {
    2024: { bg: 'bg-purple-100 dark:bg-purple-900/30', text: 'text-purple-600', label: 'Latest' },
    2023: { bg: 'bg-blue-100 dark:bg-blue-900/30', text: 'text-blue-600', label: 'Recent' },
    2022: { bg: 'bg-green-100 dark:bg-green-900/30', text: 'text-green-600', label: '' },
    2021: { bg: 'bg-yellow-100 dark:bg-yellow-900/30', text: 'text-yellow-600', label: '' },
    2020: { bg: 'bg-orange-100 dark:bg-orange-900/30', text: 'text-orange-600', label: '' },
    2019: { bg: 'bg-gray-100 dark:bg-gray-800', text: 'text-gray-600', label: '' },
};

// Importance configuration
export const importanceConfig = {
    'very-high': {
        color: '#EF4444',
        bg: 'bg-red-100 dark:bg-red-900/30',
        text: 'text-red-600',
        label: 'অত্যন্ত গুরুত্বপূর্ণ',
        labelEn: 'Very Important',
        minFrequency: 5
    },
    'high': {
        color: '#F59E0B',
        bg: 'bg-yellow-100 dark:bg-yellow-900/30',
        text: 'text-yellow-600',
        label: 'গুরুত্বপূর্ণ',
        labelEn: 'Important',
        minFrequency: 3
    },
    'medium': {
        color: '#22C55E',
        bg: 'bg-green-100 dark:bg-green-900/30',
        text: 'text-green-600',
        label: 'মাঝারি',
        labelEn: 'Medium',
        minFrequency: 2
    },
    'low': {
        color: '#6B7280',
        bg: 'bg-gray-100 dark:bg-gray-800',
        text: 'text-gray-600',
        label: 'কম',
        labelEn: 'Low',
        minFrequency: 1
    },
};

// Helper function to get importance level
export function getImportanceLevel(frequency: number): TopicFrequency['importance'] {
    if (frequency >= 5) return 'very-high';
    if (frequency >= 3) return 'high';
    if (frequency >= 2) return 'medium';
    return 'low';
}

// Helper function to calculate trend probability
export function getTrendProbability(
    lastAskedYear: number,
    frequency: number,
    currentYear: number = 2024
): TrendPrediction['probability'] {
    const gapYears = currentYear - lastAskedYear;

    // If asked every year and gap > 1, high probability
    if (frequency >= 4 && gapYears >= 2) return 'very-high';
    if (frequency >= 3 && gapYears >= 2) return 'high';
    if (frequency >= 2 && gapYears >= 1) return 'medium';
    return 'low';
}
