export type QuestionType = 'mcq' | 'saq' | 'laq' | 'vsaq';
export type Difficulty = 'easy' | 'medium' | 'hard';

export interface Question {
    id: string;
    chapterId: string;
    subjectId: string;
    semester: number;

    // Question content
    type: QuestionType;
    marks: number;
    question: string;
    questionBn: string;

    // MCQ specific
    options: McqOption[] | null;

    // Answer content
    answer: string;
    answerBn: string;

    // Word count guidance
    wordCount: WordCount;

    // Marking strategy
    markingStrategy: MarkingStrategy | null;

    // Learning aids
    keyPoints: KeyPoint[];
    hints: Hint[];
    examinerTips: string | null;
    examinerTipsBn: string | null;

    // PYQ data
    yearsAsked: number[];
    isPYQ: boolean;

    // Importance & difficulty
    importance: 1 | 2 | 3 | 4 | 5;
    difficulty: Difficulty;
    isImportant: boolean;

    // Organization
    tags: string[];
    order: number;
    isActive: boolean;
}

export interface McqOption {
    text: string;
    textBn: string;
    isCorrect: boolean;
}

export interface WordCount {
    actual: number;
    min: number;
    max: number;
}

export interface MarkingStrategy {
    total: number;
    breakdown: MarkingBreakdown[];
    tips: string[];
    tipsBn: string[];
}

export interface MarkingBreakdown {
    point: string;
    pointBn: string;
    marks: number;
}

export interface KeyPoint {
    point: string;
    pointBn: string;
}

export interface Hint {
    hint: string;
    hintBn: string;
}

// Question type labels for display
export const questionTypeLabels = {
    mcq: { en: 'MCQ', bn: 'MCQ', color: '#22C55E' },
    saq: { en: 'Short Answer', bn: 'সংক্ষিপ্ত', color: '#3B82F6' },
    laq: { en: 'Long Answer', bn: 'রচনাধর্মী', color: '#8B5CF6' },
    vsaq: { en: 'Very Short', bn: 'অতি সংক্ষিপ্ত', color: '#6B7280' },
};

// Default word counts by question type
export const defaultWordCounts: Record<QuestionType, { min: number; max: number }> = {
    vsaq: { min: 20, max: 40 },
    saq: { min: 60, max: 100 },
    laq: { min: 200, max: 350 },
    mcq: { min: 0, max: 0 },
};
