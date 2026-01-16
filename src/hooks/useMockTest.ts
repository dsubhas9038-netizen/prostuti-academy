'use client';

import { useState, useCallback } from 'react';
import { sampleTests } from '@/data/sampleTests';

export function useMockTest(testId?: string) {
    const [isLoading, setIsLoading] = useState(false);
    const [currentTest, setCurrentTest] = useState<any>(null);
    const [answers, setAnswers] = useState<Record<string, string>>({});
    const [isSubmitted, setIsSubmitted] = useState(false);

    const loadTest = useCallback(async (id: string) => {
        setIsLoading(true);
        try {
            const test = sampleTests.find(t => t.id === id);
            setCurrentTest(test || null);
        } finally {
            setIsLoading(false);
        }
    }, []);

    const submitAnswer = useCallback((questionId: string, answer: string) => {
        setAnswers(prev => ({ ...prev, [questionId]: answer }));
    }, []);

    const submitTest = useCallback(() => {
        setIsSubmitted(true);
    }, []);

    const resetTest = useCallback(() => {
        setAnswers({});
        setIsSubmitted(false);
    }, []);

    return {
        isLoading,
        currentTest,
        answers,
        isSubmitted,
        loadTest,
        submitAnswer,
        submitTest,
        resetTest,
    };
}

export default useMockTest;
