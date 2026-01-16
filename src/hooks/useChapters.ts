'use client';

import { useState, useEffect, useMemo } from 'react';
import { Chapter } from '@/types';
import {
    getChaptersBySubjectId,
    getChaptersBySubjectAndSemester,
    getChapterById as getChapterByIdFromData
} from '@/data';

interface UseChaptersOptions {
    subjectId: string;
    semester?: number | 'all';
}

interface UseChaptersReturn {
    chapters: Chapter[];
    loading: boolean;
    error: string | null;
    getChapterById: (id: string) => Chapter | undefined;
    refetch: () => void;
}

export default function useChapters(options: UseChaptersOptions): UseChaptersReturn {
    const { subjectId, semester = 'all' } = options;

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    // Simulate loading delay
    useEffect(() => {
        setLoading(true);
        const timer = setTimeout(() => {
            setLoading(false);
        }, 400);
        return () => clearTimeout(timer);
    }, [subjectId, semester]);

    // Get chapters based on options
    const chapters = useMemo(() => {
        if (semester === 'all') {
            return getChaptersBySubjectId(subjectId);
        }
        return getChaptersBySubjectAndSemester(subjectId, semester as number);
    }, [subjectId, semester]);

    // Get chapter by ID
    const getChapterById = (id: string): Chapter | undefined => {
        return getChapterByIdFromData(id);
    };

    // Refetch function
    const refetch = () => {
        setLoading(true);
        setTimeout(() => setLoading(false), 400);
    };

    return {
        chapters,
        loading,
        error,
        getChapterById,
        refetch,
    };
}

// Hook for single chapter
export function useChapter(chapterId: string) {
    const [chapter, setChapter] = useState<Chapter | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        setLoading(true);

        // Simulate API call
        const timer = setTimeout(() => {
            const found = getChapterByIdFromData(chapterId);
            if (found) {
                setChapter(found);
                setError(null);
            } else {
                setChapter(null);
                setError('Chapter not found');
            }
            setLoading(false);
        }, 300);

        return () => clearTimeout(timer);
    }, [chapterId]);

    return { chapter, loading, error };
}
