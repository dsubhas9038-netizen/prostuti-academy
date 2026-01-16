import {
    SubjectPYQAnalysis,
    ChapterPYQStats,
    TopicFrequency,
    YearData,
    TrendPrediction,
    PYQSummary,
    getImportanceLevel,
    getTrendProbability
} from '@/types/pyq';

// Sample PYQ Analysis Data

// Bengali Subject PYQ Data
const bengaliPYQAnalysis: SubjectPYQAnalysis = {
    subjectId: 'bengali',
    subjectName: 'Bengali',
    subjectNameBn: 'বাংলা',
    color: '#3B82F6',
    totalQuestions: 85,
    totalMarks: 200,
    yearsAnalyzed: [2019, 2020, 2021, 2022, 2023],
    repeatPercentage: 78,
    avgQuestionsPerYear: 17,
    avgMarksPerYear: 40,
    hotChapters: ['bengali-sem1-ch1', 'bengali-sem1-ch2'],
    topTopics: [
        {
            id: 'topic-pd-character',
            topic: 'Pather Dabi Character Analysis',
            topicBn: 'পথের দাবী চরিত্র বিশ্লেষণ',
            frequency: 5,
            yearsAsked: [2019, 2020, 2021, 2022, 2023],
            avgMarks: 5,
            importance: 'very-high',
            chapterId: 'bengali-sem1-ch1',
            lastAskedYear: 2023,
        },
        {
            id: 'topic-pd-naming',
            topic: 'Pather Dabi Title Significance',
            topicBn: 'পথের দাবী নামকরণের সার্থকতা',
            frequency: 4,
            yearsAsked: [2019, 2021, 2022, 2023],
            avgMarks: 5,
            importance: 'high',
            chapterId: 'bengali-sem1-ch1',
            lastAskedYear: 2023,
        },
        {
            id: 'topic-bh-character',
            topic: 'Bhaat Character Analysis',
            topicBn: 'ভাত গল্পের চরিত্র বিশ্লেষণ',
            frequency: 4,
            yearsAsked: [2020, 2021, 2022, 2023],
            avgMarks: 5,
            importance: 'high',
            chapterId: 'bengali-sem1-ch2',
            lastAskedYear: 2023,
        },
        {
            id: 'topic-pd-sabyasachi',
            topic: 'Sabyasachi Character',
            topicBn: 'সব্যসাচী চরিত্র',
            frequency: 3,
            yearsAsked: [2020, 2022, 2023],
            avgMarks: 3,
            importance: 'high',
            chapterId: 'bengali-sem1-ch1',
            lastAskedYear: 2023,
        },
    ],
    chapterStats: [
        {
            chapterId: 'bengali-sem1-ch1',
            chapterTitle: 'Pather Dabi',
            chapterTitleBn: 'পথের দাবী',
            subjectId: 'bengali',
            totalQuestions: 35,
            totalMarks: 85,
            avgQuestionsPerYear: 7,
            avgMarksPerYear: 17,
            isPredictedHot: true,
            predictedMarks: 15,
            yearsAsked: [2019, 2020, 2021, 2022, 2023],
            yearWiseData: [
                { year: 2023, totalQuestions: 8, totalMarks: 20, questionIds: ['q-bengali-pd-1', 'q-bengali-pd-2'] },
                { year: 2022, totalQuestions: 7, totalMarks: 18, questionIds: [] },
                { year: 2021, totalQuestions: 7, totalMarks: 16, questionIds: [] },
                { year: 2020, totalQuestions: 6, totalMarks: 15, questionIds: [] },
                { year: 2019, totalQuestions: 7, totalMarks: 16, questionIds: [] },
            ],
            topTopics: [],
        },
        {
            chapterId: 'bengali-sem1-ch2',
            chapterTitle: 'Bhaat',
            chapterTitleBn: 'ভাত',
            subjectId: 'bengali',
            totalQuestions: 28,
            totalMarks: 65,
            avgQuestionsPerYear: 5.6,
            avgMarksPerYear: 13,
            isPredictedHot: true,
            predictedMarks: 12,
            yearsAsked: [2019, 2020, 2021, 2022, 2023],
            yearWiseData: [
                { year: 2023, totalQuestions: 6, totalMarks: 14, questionIds: ['q-bengali-bh-1'] },
                { year: 2022, totalQuestions: 6, totalMarks: 13, questionIds: [] },
                { year: 2021, totalQuestions: 5, totalMarks: 12, questionIds: [] },
                { year: 2020, totalQuestions: 6, totalMarks: 14, questionIds: [] },
                { year: 2019, totalQuestions: 5, totalMarks: 12, questionIds: [] },
            ],
            topTopics: [],
        },
    ],
    yearWiseData: [
        { year: 2023, totalQuestions: 18, totalMarks: 45, questionIds: [] },
        { year: 2022, totalQuestions: 17, totalMarks: 42, questionIds: [] },
        { year: 2021, totalQuestions: 16, totalMarks: 40, questionIds: [] },
        { year: 2020, totalQuestions: 17, totalMarks: 38, questionIds: [] },
        { year: 2019, totalQuestions: 17, totalMarks: 35, questionIds: [] },
    ],
};

// History Subject PYQ Data
const historyPYQAnalysis: SubjectPYQAnalysis = {
    subjectId: 'history',
    subjectName: 'History',
    subjectNameBn: 'ইতিহাস',
    color: '#8B5CF6',
    totalQuestions: 92,
    totalMarks: 230,
    yearsAnalyzed: [2019, 2020, 2021, 2022, 2023],
    repeatPercentage: 82,
    avgQuestionsPerYear: 18.4,
    avgMarksPerYear: 46,
    hotChapters: ['history-sem1-ch1', 'history-sem1-ch2'],
    topTopics: [
        {
            id: 'topic-renaissance',
            topic: 'Renaissance',
            topicBn: 'রেনেসাঁস',
            frequency: 5,
            yearsAsked: [2019, 2020, 2021, 2022, 2023],
            avgMarks: 8,
            importance: 'very-high',
            chapterId: 'history-sem1-ch1',
            lastAskedYear: 2023,
        },
        {
            id: 'topic-renaissance-features',
            topic: 'Renaissance Features',
            topicBn: 'রেনেসাঁসের বৈশিষ্ট্য',
            frequency: 4,
            yearsAsked: [2019, 2021, 2022, 2023],
            avgMarks: 5,
            importance: 'high',
            chapterId: 'history-sem1-ch1',
            lastAskedYear: 2023,
        },
        {
            id: 'topic-industrial-rev',
            topic: 'Industrial Revolution',
            topicBn: 'শিল্প বিপ্লব',
            frequency: 4,
            yearsAsked: [2020, 2021, 2022, 2023],
            avgMarks: 8,
            importance: 'high',
            chapterId: 'history-sem1-ch2',
            lastAskedYear: 2023,
        },
    ],
    chapterStats: [
        {
            chapterId: 'history-sem1-ch1',
            chapterTitle: 'Renaissance',
            chapterTitleBn: 'রেনেসাঁস',
            subjectId: 'history',
            totalQuestions: 42,
            totalMarks: 105,
            avgQuestionsPerYear: 8.4,
            avgMarksPerYear: 21,
            isPredictedHot: true,
            predictedMarks: 20,
            yearsAsked: [2019, 2020, 2021, 2022, 2023],
            yearWiseData: [
                { year: 2023, totalQuestions: 9, totalMarks: 22, questionIds: ['q-history-ren-1', 'q-history-ren-2'] },
                { year: 2022, totalQuestions: 8, totalMarks: 20, questionIds: [] },
                { year: 2021, totalQuestions: 9, totalMarks: 22, questionIds: [] },
                { year: 2020, totalQuestions: 8, totalMarks: 20, questionIds: [] },
                { year: 2019, totalQuestions: 8, totalMarks: 21, questionIds: [] },
            ],
            topTopics: [],
        },
    ],
    yearWiseData: [
        { year: 2023, totalQuestions: 19, totalMarks: 48, questionIds: [] },
        { year: 2022, totalQuestions: 18, totalMarks: 46, questionIds: [] },
        { year: 2021, totalQuestions: 19, totalMarks: 47, questionIds: [] },
        { year: 2020, totalQuestions: 18, totalMarks: 45, questionIds: [] },
        { year: 2019, totalQuestions: 18, totalMarks: 44, questionIds: [] },
    ],
};

// English Subject PYQ Data
const englishPYQAnalysis: SubjectPYQAnalysis = {
    subjectId: 'english',
    subjectName: 'English',
    subjectNameBn: 'ইংরেজি',
    color: '#22C55E',
    totalQuestions: 78,
    totalMarks: 180,
    yearsAnalyzed: [2019, 2020, 2021, 2022, 2023],
    repeatPercentage: 75,
    avgQuestionsPerYear: 15.6,
    avgMarksPerYear: 36,
    hotChapters: ['english-sem1-ch1'],
    topTopics: [
        {
            id: 'topic-eyes-have-it',
            topic: 'The Eyes Have It',
            topicBn: 'দ্য আইজ হ্যাভ ইট',
            frequency: 5,
            yearsAsked: [2019, 2020, 2021, 2022, 2023],
            avgMarks: 6,
            importance: 'very-high',
            chapterId: 'english-sem1-ch1',
            lastAskedYear: 2023,
        },
        {
            id: 'topic-strong-roots',
            topic: 'Strong Roots',
            topicBn: 'স্ট্রং রুটস',
            frequency: 4,
            yearsAsked: [2020, 2021, 2022, 2023],
            avgMarks: 5,
            importance: 'high',
            chapterId: 'english-sem1-ch2',
            lastAskedYear: 2023,
        },
    ],
    chapterStats: [
        {
            chapterId: 'english-sem1-ch1',
            chapterTitle: 'The Eyes Have It',
            chapterTitleBn: 'দ্য আইজ হ্যাভ ইট',
            subjectId: 'english',
            totalQuestions: 32,
            totalMarks: 75,
            avgQuestionsPerYear: 6.4,
            avgMarksPerYear: 15,
            isPredictedHot: true,
            predictedMarks: 15,
            yearsAsked: [2019, 2020, 2021, 2022, 2023],
            yearWiseData: [
                { year: 2023, totalQuestions: 7, totalMarks: 16, questionIds: ['q-english-eh-1', 'q-english-eh-2'] },
                { year: 2022, totalQuestions: 6, totalMarks: 14, questionIds: [] },
                { year: 2021, totalQuestions: 7, totalMarks: 16, questionIds: [] },
                { year: 2020, totalQuestions: 6, totalMarks: 14, questionIds: [] },
                { year: 2019, totalQuestions: 6, totalMarks: 15, questionIds: [] },
            ],
            topTopics: [],
        },
    ],
    yearWiseData: [
        { year: 2023, totalQuestions: 16, totalMarks: 38, questionIds: [] },
        { year: 2022, totalQuestions: 15, totalMarks: 35, questionIds: [] },
        { year: 2021, totalQuestions: 16, totalMarks: 37, questionIds: [] },
        { year: 2020, totalQuestions: 15, totalMarks: 35, questionIds: [] },
        { year: 2019, totalQuestions: 16, totalMarks: 35, questionIds: [] },
    ],
};

// All subjects analysis
export const samplePYQAnalysis: SubjectPYQAnalysis[] = [
    bengaliPYQAnalysis,
    historyPYQAnalysis,
    englishPYQAnalysis,
];

// PYQ Summary
export const pyqSummary: PYQSummary = {
    totalQuestions: 255,
    totalSubjects: 3,
    yearsAnalyzed: 5,
    repeatPercentage: 78,
    importantTopicsCount: 45,
    lastUpdated: new Date('2024-01-15'),
};

// Get PYQ analysis by subject
export function getPYQAnalysisBySubject(subjectId: string): SubjectPYQAnalysis | undefined {
    return samplePYQAnalysis.find(s => s.subjectId === subjectId);
}

// Get all top topics across subjects
export function getAllTopTopics(): TopicFrequency[] {
    const allTopics: TopicFrequency[] = [];
    samplePYQAnalysis.forEach(subject => {
        allTopics.push(...subject.topTopics);
    });
    return allTopics.sort((a, b) => b.frequency - a.frequency);
}

// Get trend predictions
export function getTrendPredictions(subjectId?: string): TrendPrediction[] {
    const predictions: TrendPrediction[] = [];
    const subjects = subjectId
        ? samplePYQAnalysis.filter(s => s.subjectId === subjectId)
        : samplePYQAnalysis;

    subjects.forEach(subject => {
        subject.topTopics.forEach(topic => {
            const probability = getTrendProbability(topic.lastAskedYear, topic.frequency);

            predictions.push({
                topic: topic.topic,
                topicBn: topic.topicBn,
                chapterId: topic.chapterId,
                chapterTitle: subject.chapterStats.find(c => c.chapterId === topic.chapterId)?.chapterTitle || '',
                probability,
                lastAskedYear: topic.lastAskedYear,
                gapYears: 2024 - topic.lastAskedYear,
                avgMarks: topic.avgMarks,
                reasoning: `Asked ${topic.frequency} times in last 5 years`,
                reasoningBn: `বিগত ৫ বছরে ${topic.frequency} বার এসেছে`,
            });
        });
    });

    return predictions.sort((a, b) => {
        const order = { 'very-high': 0, 'high': 1, 'medium': 2, 'low': 3 };
        return order[a.probability] - order[b.probability];
    });
}

// Get year-wise data aggregated
export function getAggregatedYearData(): YearData[] {
    const yearMap = new Map<number, YearData>();

    samplePYQAnalysis.forEach(subject => {
        subject.yearWiseData.forEach(yd => {
            const existing = yearMap.get(yd.year);
            if (existing) {
                existing.totalQuestions += yd.totalQuestions;
                existing.totalMarks += yd.totalMarks;
            } else {
                yearMap.set(yd.year, { ...yd, questionIds: [] });
            }
        });
    });

    return Array.from(yearMap.values()).sort((a, b) => b.year - a.year);
}
