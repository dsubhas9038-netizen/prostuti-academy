'use client';

import { useState, useEffect, useMemo } from 'react';
import { Question, QuestionType } from '@/types';
import {
    getQuestionsByChapterId,
    getQuestionsByChapterAndType,
    getQuestionById as getQuestionByIdFromData,
    getQuestionCountsByChapter
} from '@/data';

interface UseQuestionsOptions {
    chapterId: string;
    type?: QuestionType | 'all' | 'pyq';
    searchQuery?: string;
}

interface UseQuestionsReturn {
    questions: Question[];
    loading: boolean;
    error: string | null;
    counts: {
        all: number;
        saq: number;
        laq: number;
        mcq: number;
        vsaq: number;
        pyq: number;
    };
    getQuestionById: (id: string) => Question | undefined;
    refetch: () => void;
}

export default function useQuestions(options: UseQuestionsOptions): UseQuestionsReturn {
    const { chapterId, type = 'all', searchQuery = '' } = options;

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    // Simulate loading delay
    useEffect(() => {
        setLoading(true);
        const timer = setTimeout(() => {
            setLoading(false);
        }, 400);
        return () => clearTimeout(timer);
    }, [chapterId, type, searchQuery]);

    // Get questions based on options
    const questions = useMemo(() => {
        let filtered = getQuestionsByChapterAndType(chapterId, type);

        // Search filter
        if (searchQuery.trim()) {
            const query = searchQuery.toLowerCase();
            filtered = filtered.filter(
                (q) =>
                    q.question.toLowerCase().includes(query) ||
                    q.questionBn.toLowerCase().includes(query) ||
                    q.answer.toLowerCase().includes(query) ||
                    q.answerBn.toLowerCase().includes(query)
            );
        }

        return filtered;
    }, [chapterId, type, searchQuery]);

    // Get counts
    const counts = useMemo(() => {
        return getQuestionCountsByChapter(chapterId);
    }, [chapterId]);

    // Get question by ID
    const getQuestionById = (id: string): Question | undefined => {
        return getQuestionByIdFromData(id);
    };

    // Refetch function
    const refetch = () => {
        setLoading(true);
        setTimeout(() => setLoading(false), 400);
    };

    return {
        questions,
        loading,
        error,
        counts,
        getQuestionById,
        refetch,
    };
}

// Hook for single question
export function useQuestion(questionId: string) {
    const [question, setQuestion] = useState<Question | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        setLoading(true);

        const timer = setTimeout(() => {
            const found = getQuestionByIdFromData(questionId);
            if (found) {
                setQuestion(found);
                setError(null);
            } else {
                setQuestion(null);
                setError('Question not found');
            }
            setLoading(false);
        }, 300);

        return () => clearTimeout(timer);
    }, [questionId]);

    return { question, loading, error };
}
