import { Test, TestQuestion, testTypeLabels } from '@/types';

// Sample Mock Tests
export const sampleTests: Test[] = [
    // ============ CHAPTER TESTS ============
    {
        id: 'test-bengali-ch1',
        title: 'Bengali Chapter 1 Test - Pather Dabi',
        titleBn: 'বাংলা অধ্যায় ১ টেস্ট - পথের দাবী',
        description: 'Test your understanding of Pather Dabi chapter',
        descriptionBn: 'পথের দাবী অধ্যায়ের উপর তোমার জ্ঞান যাচাই করো',
        subjectId: 'bengali',
        chapterId: 'bengali-sem1-ch1',
        semester: 1,
        type: 'chapter',
        duration: 30, // 30 minutes
        totalQuestions: 10,
        totalMarks: 25,
        questionIds: [
            'q-bengali-pd-1', 'q-bengali-pd-2', 'q-bengali-pd-3', 'q-bengali-pd-4'
        ],
        passingMarks: 10,
        passingPercentage: 40,
        difficulty: 'medium',
        isFree: true,
        price: 0,
        attemptCount: 156,
        avgScore: 68,
        instructions: [
            'You have 30 minutes to complete this test',
            'Answer all questions',
            'For SAQ, aim for 80-100 words',
            'Read each question carefully'
        ],
        instructionsBn: [
            'তোমার হাতে ৩০ মিনিট সময় আছে',
            'সব প্রশ্নের উত্তর দাও',
            'SAQ এর জন্য ৮০-১০০ শব্দ লেখো',
            'প্রতিটি প্রশ্ন মনোযোগ দিয়ে পড়ো'
        ],
        createdAt: new Date('2024-01-01'),
        isActive: true,
    },
    {
        id: 'test-english-ch1',
        title: 'English Chapter 1 Test - The Eyes Have It',
        titleBn: 'ইংরেজি অধ্যায় ১ টেস্ট - দ্য আইজ হ্যাভ ইট',
        description: 'Test your understanding of The Eyes Have It',
        descriptionBn: 'দ্য আইজ হ্যাভ ইট গদ্যের উপর তোমার জ্ঞান যাচাই করো',
        subjectId: 'english',
        chapterId: 'english-sem1-ch1',
        semester: 1,
        type: 'chapter',
        duration: 30,
        totalQuestions: 8,
        totalMarks: 20,
        questionIds: [
            'q-english-eh-1', 'q-english-eh-2', 'q-english-eh-3'
        ],
        passingMarks: 8,
        passingPercentage: 40,
        difficulty: 'medium',
        isFree: true,
        price: 0,
        attemptCount: 124,
        avgScore: 72,
        instructions: [
            'You have 30 minutes to complete this test',
            'Answer all questions',
        ],
        instructionsBn: [
            'তোমার হাতে ৩০ মিনিট সময় আছে',
            'সব প্রশ্নের উত্তর দাও',
        ],
        createdAt: new Date('2024-01-05'),
        isActive: true,
    },
    {
        id: 'test-history-ch1',
        title: 'History Chapter 1 Test - Renaissance',
        titleBn: 'ইতিহাস অধ্যায় ১ টেস্ট - রেনেসাঁস',
        description: 'Test your understanding of Renaissance',
        descriptionBn: 'রেনেসাঁস অধ্যায়ের উপর তোমার জ্ঞান যাচাই করো',
        subjectId: 'history',
        chapterId: 'history-sem1-ch1',
        semester: 1,
        type: 'chapter',
        duration: 45,
        totalQuestions: 12,
        totalMarks: 30,
        questionIds: [
            'q-history-ren-1', 'q-history-ren-2'
        ],
        passingMarks: 12,
        passingPercentage: 40,
        difficulty: 'hard',
        isFree: false,
        price: 49,
        attemptCount: 89,
        avgScore: 65,
        instructions: [
            'You have 45 minutes to complete this test',
            'For LAQ, write detailed answers with examples',
        ],
        instructionsBn: [
            'তোমার হাতে ৪৫ মিনিট সময় আছে',
            'LAQ এর জন্য উদাহরণ সহ বিস্তারিত উত্তর লেখো',
        ],
        createdAt: new Date('2024-01-10'),
        isActive: true,
    },

    // ============ SUBJECT TESTS ============
    {
        id: 'test-bengali-full',
        title: 'Bengali Full Subject Test',
        titleBn: 'বাংলা সম্পূর্ণ বিষয় টেস্ট',
        description: 'Complete Bengali subject test covering all chapters',
        descriptionBn: 'সব অধ্যায় সহ সম্পূর্ণ বাংলা বিষয় টেস্ট',
        subjectId: 'bengali',
        semester: null,
        type: 'subject',
        duration: 90,
        totalQuestions: 25,
        totalMarks: 60,
        questionIds: [
            'q-bengali-pd-1', 'q-bengali-pd-2', 'q-bengali-pd-3', 'q-bengali-pd-4',
            'q-bengali-bh-1'
        ],
        passingMarks: 24,
        passingPercentage: 40,
        difficulty: 'hard',
        isFree: false,
        price: 99,
        attemptCount: 67,
        avgScore: 58,
        instructions: [
            'You have 90 minutes to complete this test',
            'Test covers all chapters of Bengali',
            'Manage your time wisely',
        ],
        instructionsBn: [
            'তোমার হাতে ৯০ মিনিট সময় আছে',
            'বাংলার সব অধ্যায় থেকে প্রশ্ন আছে',
            'সময় ঠিকমতো ভাগ করে নাও',
        ],
        createdAt: new Date('2024-01-15'),
        isActive: true,
    },

    // ============ SEMESTER TESTS ============
    {
        id: 'test-sem1-arts',
        title: 'Semester 1 Complete Test (Arts)',
        titleBn: 'সেমিস্টার ১ সম্পূর্ণ টেস্ট (আর্টস)',
        description: 'Complete Semester 1 test covering all subjects',
        descriptionBn: 'সব বিষয় সহ সম্পূর্ণ সেমিস্টার ১ টেস্ট',
        subjectId: null,
        semester: 1,
        type: 'semester',
        duration: 180, // 3 hours
        totalQuestions: 50,
        totalMarks: 100,
        questionIds: [
            'q-bengali-pd-1', 'q-bengali-pd-2', 'q-english-eh-1', 'q-english-eh-2',
            'q-history-ren-1', 'q-history-ren-2', 'q-geo-atm-1', 'q-phil-log-1'
        ],
        passingMarks: 33,
        passingPercentage: 33,
        difficulty: 'hard',
        isFree: false,
        price: 199,
        attemptCount: 45,
        avgScore: 52,
        instructions: [
            'You have 3 hours to complete this test',
            'All subjects are covered',
            'Attempt all questions',
            'Use proper time management',
        ],
        instructionsBn: [
            'তোমার হাতে ৩ ঘণ্টা সময় আছে',
            'সব বিষয় থেকে প্রশ্ন আছে',
            'সব প্রশ্নের উত্তর দেওয়ার চেষ্টা করো',
            'সময় ব্যবস্থাপনা ঠিকমতো করো',
        ],
        createdAt: new Date('2024-02-01'),
        isActive: true,
    },

    // ============ FULL MOCK TESTS ============
    {
        id: 'test-full-mock-1',
        title: 'Full Mock Test 1 - HS Arts 2024',
        titleBn: 'সম্পূর্ণ মক টেস্ট ১ - উচ্চমাধ্যমিক আর্টস ২০২৪',
        description: 'Full simulation of HS exam',
        descriptionBn: 'উচ্চমাধ্যমিক পরীক্ষার সম্পূর্ণ সিমুলেশন',
        subjectId: null,
        semester: null,
        type: 'full',
        duration: 180,
        totalQuestions: 60,
        totalMarks: 150,
        questionIds: [
            'q-bengali-pd-1', 'q-bengali-pd-2', 'q-bengali-pd-3', 'q-bengali-pd-4',
            'q-english-eh-1', 'q-english-eh-2', 'q-english-eh-3',
            'q-history-ren-1', 'q-history-ren-2',
            'q-geo-atm-1', 'q-phil-log-1', 'q-bengali-bh-1'
        ],
        passingMarks: 50,
        passingPercentage: 33,
        difficulty: 'hard',
        isFree: false,
        price: 299,
        attemptCount: 34,
        avgScore: 48,
        instructions: [
            'This is a full mock test simulating real exam',
            'You have 3 hours',
            'Follow all exam rules',
            'Do not refresh the page during test',
        ],
        instructionsBn: [
            'এটি প্রকৃত পরীক্ষার সম্পূর্ণ সিমুলেশন',
            'তোমার হাতে ৩ ঘণ্টা সময় আছে',
            'সব পরীক্ষার নিয়ম মেনে চলো',
            'টেস্টের সময় পেজ রিফ্রেশ করো না',
        ],
        createdAt: new Date('2024-02-15'),
        isActive: true,
    },

    // ============ FREE PRACTICE TEST ============
    {
        id: 'test-free-practice',
        title: 'Free Practice Test',
        titleBn: 'বিনামূল্যে অনুশীলন টেস্ট',
        description: 'Quick practice test with mixed questions',
        descriptionBn: 'মিশ্র প্রশ্ন সহ দ্রুত অনুশীলন টেস্ট',
        subjectId: null,
        semester: null,
        type: 'chapter',
        duration: 15,
        totalQuestions: 5,
        totalMarks: 10,
        questionIds: [
            'q-bengali-pd-3', 'q-english-eh-3', 'q-bengali-pd-4'
        ],
        passingMarks: 4,
        passingPercentage: 40,
        difficulty: 'easy',
        isFree: true,
        price: 0,
        attemptCount: 523,
        avgScore: 78,
        instructions: [
            'Quick 15 minute practice test',
            'Perfect for daily practice',
        ],
        instructionsBn: [
            'দ্রুত ১৫ মিনিটের অনুশীলন টেস্ট',
            'প্রতিদিনের অনুশীলনের জন্য উপযুক্ত',
        ],
        createdAt: new Date('2024-01-01'),
        isActive: true,
    },
];

// Get test by ID
export function getTestById(testId: string): Test | undefined {
    return sampleTests.find((test) => test.id === testId);
}

// Get tests by type
export function getTestsByType(type: Test['type']): Test[] {
    return sampleTests.filter((test) => test.type === type && test.isActive);
}

// Get tests by subject
export function getTestsBySubject(subjectId: string): Test[] {
    return sampleTests.filter((test) => test.subjectId === subjectId && test.isActive);
}

// Get tests by chapter
export function getTestsByChapter(chapterId: string): Test[] {
    return sampleTests.filter((test) => test.chapterId === chapterId && test.isActive);
}

// Get free tests
export function getFreeTests(): Test[] {
    return sampleTests.filter((test) => test.isFree && test.isActive);
}

// Get all active tests
export function getAllActiveTests(): Test[] {
    return sampleTests.filter((test) => test.isActive);
}

// Get tests sorted by popularity
export function getPopularTests(limit: number = 5): Test[] {
    return [...sampleTests]
        .filter((test) => test.isActive)
        .sort((a, b) => b.attemptCount - a.attemptCount)
        .slice(0, limit);
}

// Get tests by difficulty
export function getTestsByDifficulty(difficulty: Test['difficulty']): Test[] {
    return sampleTests.filter((test) => test.difficulty === difficulty && test.isActive);
}
