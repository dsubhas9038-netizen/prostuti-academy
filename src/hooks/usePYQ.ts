'use client';

import { useState, useEffect, useMemo } from 'react';
import {
    SubjectPYQAnalysis,
    ChapterPYQStats,
    TopicFrequency,
    TrendPrediction,
    PYQSummary,
    YearData
} from '@/types/pyq';
import {
    samplePYQAnalysis,
    pyqSummary,
    getPYQAnalysisBySubject,
    getAllTopTopics,
    getTrendPredictions,
    getAggregatedYearData
} from '@/data/samplePYQData';

interface UsePYQOptions {
    subjectId?: string;
    year?: number;
}

interface UsePYQReturn {
    // Data
    subjectAnalysis: SubjectPYQAnalysis | null;
    allSubjectsAnalysis: SubjectPYQAnalysis[];
    summary: PYQSummary;
    topTopics: TopicFrequency[];
    chapterStats: ChapterPYQStats[];
    yearData: YearData[];
    trendPredictions: TrendPrediction[];

    // State
    loading: boolean;
    error: string | null;

    // Filters
    selectedYear: number | null;
    setSelectedYear: (year: number | null) => void;

    // Helpers
    getChapterById: (chapterId: string) => ChapterPYQStats | undefined;
    getTopTopicsByChapter: (chapterId: string) => TopicFrequency[];
}

export default function usePYQ(options: UsePYQOptions = {}): UsePYQReturn {
    const { subjectId, year } = options;

    // State
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [selectedYear, setSelectedYear] = useState<number | null>(year || null);

    // Simulate loading
    useEffect(() => {
        setLoading(true);
        const timer = setTimeout(() => {
            setLoading(false);
        }, 300);
        return () => clearTimeout(timer);
    }, [subjectId, year]);

    // Get subject analysis
    const subjectAnalysis = useMemo(() => {
        if (!subjectId) return null;
        return getPYQAnalysisBySubject(subjectId) || null;
    }, [subjectId]);

    // Get all subjects analysis
    const allSubjectsAnalysis = useMemo(() => {
        return samplePYQAnalysis;
    }, []);

    // Get top topics
    const topTopics = useMemo(() => {
        if (subjectId && subjectAnalysis) {
            return subjectAnalysis.topTopics;
        }
        return getAllTopTopics();
    }, [subjectId, subjectAnalysis]);

    // Get chapter stats
    const chapterStats = useMemo(() => {
        if (subjectId && subjectAnalysis) {
            return subjectAnalysis.chapterStats;
        }
        // Aggregate from all subjects
        const allChapters: ChapterPYQStats[] = [];
        samplePYQAnalysis.forEach(s => {
            allChapters.push(...s.chapterStats);
        });
        return allChapters;
    }, [subjectId, subjectAnalysis]);

    // Get year data
    const yearData = useMemo(() => {
        if (subjectId && subjectAnalysis) {
            return subjectAnalysis.yearWiseData;
        }
        return getAggregatedYearData();
    }, [subjectId, subjectAnalysis]);

    // Get trend predictions
    const trendPredictions = useMemo(() => {
        return getTrendPredictions(subjectId);
    }, [subjectId]);

    // Get chapter by ID
    const getChapterById = (chapterId: string): ChapterPYQStats | undefined => {
        return chapterStats.find(c => c.chapterId === chapterId);
    };

    // Get top topics by chapter
    const getTopTopicsByChapter = (chapterId: string): TopicFrequency[] => {
        return topTopics.filter(t => t.chapterId === chapterId);
    };

    return {
        subjectAnalysis,
        allSubjectsAnalysis,
        summary: pyqSummary,
        topTopics,
        chapterStats,
        yearData,
        trendPredictions,
        loading,
        error,
        selectedYear,
        setSelectedYear,
        getChapterById,
        getTopTopicsByChapter,
    };
}

// Hook for single subject PYQ
export function useSubjectPYQ(subjectId: string) {
    return usePYQ({ subjectId });
}
