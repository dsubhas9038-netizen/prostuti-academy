// useTestAttempts Hook
// Real-time test attempt management with Firestore

'use client';

import { useState, useEffect, useCallback, useMemo } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { ProgressTestAttempt as TestAttempt, ProgressTestAnswer as TestAnswer } from '@/types/progress';
import {
    startTestAttempt,
    saveAnswer,
    completeTestAttempt,
    abandonTestAttempt,
    getTestAttempt,
    getUserTestAttempts,
    getTestAttemptsByTest,
    subscribeToTestAttempts,
    getBestAttempt,
    getTestStats,
} from '@/lib/firebase/testAttemptService';
import toast from 'react-hot-toast';

interface UseTestAttemptsReturn {
    attempts: TestAttempt[];
    currentAttempt: TestAttempt | null;
    isLoading: boolean;
    error: Error | null;
    // Test lifecycle
    startTest: (
        testId: string,
        testTitle: string,
        totalQuestions: number,
        totalMarks: number,
        subjectId?: string,
        subjectName?: string
    ) => Promise<string>;
    submitAnswer: (answer: TestAnswer) => Promise<void>;
    finishTest: (timeTaken: number) => Promise<TestAttempt>;
    abandonTest: () => Promise<void>;
    // Data access
    getAttemptsByTest: (testId: string) => Promise<TestAttempt[]>;
    getBestScore: (testId: string) => Promise<number | null>;
    loadAttempt: (attemptId: string) => Promise<void>;
    // Stats
    stats: {
        totalAttempts: number;
        completedTests: number;
        passedTests: number;
        averageScore: number;
    };
    refreshStats: () => Promise<void>;
    // Filters
    completedAttempts: TestAttempt[];
    inProgressAttempts: TestAttempt[];
    recentAttempts: TestAttempt[];
}

export function useTestAttempts(): UseTestAttemptsReturn {
    const { firebaseUser } = useAuth();
    const [attempts, setAttempts] = useState<TestAttempt[]>([]);
    const [currentAttempt, setCurrentAttempt] = useState<TestAttempt | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<Error | null>(null);
    const [stats, setStats] = useState({
        totalAttempts: 0,
        completedTests: 0,
        passedTests: 0,
        averageScore: 0,
    });

    // Subscribe to real-time test attempts
    useEffect(() => {
        if (!firebaseUser?.uid) {
            setAttempts([]);
            setIsLoading(false);
            return;
        }

        setIsLoading(true);
        setError(null);

        const unsubscribe = subscribeToTestAttempts(
            firebaseUser.uid,
            (updatedAttempts) => {
                setAttempts(updatedAttempts);
                setIsLoading(false);
            },
            (err) => {
                setError(err);
                setIsLoading(false);
            }
        );

        // Load initial stats
        refreshStats();

        return () => unsubscribe();
    }, [firebaseUser?.uid]);

    // Start a new test
    const startTest = useCallback(
        async (
            testId: string,
            testTitle: string,
            totalQuestions: number,
            totalMarks: number,
            subjectId?: string,
            subjectName?: string
        ): Promise<string> => {
            if (!firebaseUser?.uid) {
                toast.error('Login à¦•à¦°à§‹ à¦Ÿà§‡à¦¸à§à¦Ÿ à¦¦à¦¿à¦¤à§‡');
                throw new Error('User not authenticated');
            }

            try {
                const attemptId = await startTestAttempt(
                    firebaseUser.uid,
                    testId,
                    testTitle,
                    totalQuestions,
                    totalMarks,
                    subjectId,
                    subjectName
                );

                // Load the new attempt
                const attempt = await getTestAttempt(attemptId);
                if (attempt) {
                    setCurrentAttempt(attempt);
                }

                toast.success('à¦Ÿà§‡à¦¸à§à¦Ÿ à¦¶à§à¦°à§ à¦¹à¦¯à¦¼à§‡à¦›à§‡! ðŸ“');
                return attemptId;
            } catch (err) {
                console.error('Error starting test:', err);
                toast.error('à¦Ÿà§‡à¦¸à§à¦Ÿ à¦¶à§à¦°à§ à¦•à¦°à¦¤à§‡ à¦¸à¦®à¦¸à§à¦¯à¦¾ à¦¹à¦¯à¦¼à§‡à¦›à§‡');
                throw err;
            }
        },
        [firebaseUser?.uid]
    );

    // Submit answer for current attempt
    const submitAnswer = useCallback(
        async (answer: TestAnswer) => {
            if (!currentAttempt?.id) {
                throw new Error('No active test attempt');
            }

            try {
                await saveAnswer(currentAttempt.id, answer);
            } catch (err) {
                console.error('Error saving answer:', err);
                throw err;
            }
        },
        [currentAttempt?.id]
    );

    // Finish current test
    const finishTest = useCallback(
        async (timeTaken: number): Promise<TestAttempt> => {
            if (!currentAttempt?.id) {
                throw new Error('No active test attempt');
            }

            try {
                const result = await completeTestAttempt(currentAttempt.id, timeTaken);
                setCurrentAttempt(null);

                // Refresh stats
                await refreshStats();

                if (result.passed) {
                    toast.success(`à¦ªà¦¾à¦¶ à¦•à¦°à§‡à¦›à§‹! ðŸŽ‰ Score: ${result.percentage}%`);
                } else {
                    toast('à¦Ÿà§‡à¦¸à§à¦Ÿ à¦¶à§‡à¦· à¦¹à¦¯à¦¼à§‡à¦›à§‡', { icon: 'ðŸ“Š' });
                }

                return result;
            } catch (err) {
                console.error('Error completing test:', err);
                toast.error('à¦Ÿà§‡à¦¸à§à¦Ÿ à¦¶à§‡à¦· à¦•à¦°à¦¤à§‡ à¦¸à¦®à¦¸à§à¦¯à¦¾ à¦¹à¦¯à¦¼à§‡à¦›à§‡');
                throw err;
            }
        },
        [currentAttempt?.id]
    );

    // Abandon current test
    const abandonTest = useCallback(async () => {
        if (!currentAttempt?.id) return;

        try {
            await abandonTestAttempt(currentAttempt.id);
            setCurrentAttempt(null);
            toast('à¦Ÿà§‡à¦¸à§à¦Ÿ à¦¬à¦¾à¦¤à¦¿à¦² à¦•à¦°à¦¾ à¦¹à¦¯à¦¼à§‡à¦›à§‡', { icon: 'âŒ' });
        } catch (err) {
            console.error('Error abandoning test:', err);
            throw err;
        }
    }, [currentAttempt?.id]);

    // Get attempts for a specific test
    const getAttemptsByTest = useCallback(
        async (testId: string): Promise<TestAttempt[]> => {
            if (!firebaseUser?.uid) return [];
            return getTestAttemptsByTest(firebaseUser.uid, testId);
        },
        [firebaseUser?.uid]
    );

    // Get best score for a test
    const getBestScore = useCallback(
        async (testId: string): Promise<number | null> => {
            if (!firebaseUser?.uid) return null;
            const best = await getBestAttempt(firebaseUser.uid, testId);
            return best?.percentage ?? null;
        },
        [firebaseUser?.uid]
    );

    // Load a specific attempt
    const loadAttempt = useCallback(async (attemptId: string) => {
        try {
            const attempt = await getTestAttempt(attemptId);
            setCurrentAttempt(attempt);
        } catch (err) {
            console.error('Error loading attempt:', err);
            throw err;
        }
    }, []);

    // Refresh stats
    const refreshStats = useCallback(async () => {
        if (!firebaseUser?.uid) return;

        try {
            const newStats = await getTestStats(firebaseUser.uid);
            setStats(newStats);
        } catch (err) {
            console.error('Error refreshing stats:', err);
        }
    }, [firebaseUser?.uid]);

    // Memoized filtered attempts
    const completedAttempts = useMemo(
        () => attempts.filter((a) => a.status === 'completed'),
        [attempts]
    );

    const inProgressAttempts = useMemo(
        () => attempts.filter((a) => a.status === 'in-progress'),
        [attempts]
    );

    const recentAttempts = useMemo(
        () => attempts.slice(0, 5),
        [attempts]
    );

    return {
        attempts,
        currentAttempt,
        isLoading,
        error,
        startTest,
        submitAnswer,
        finishTest,
        abandonTest,
        getAttemptsByTest,
        getBestScore,
        loadAttempt,
        stats,
        refreshStats,
        completedAttempts,
        inProgressAttempts,
        recentAttempts,
    };
}

// Compact hook for test stats only
export function useTestStats() {
    const { stats, isLoading, refreshStats } = useTestAttempts();
    return { ...stats, isLoading, refresh: refreshStats };
}

export default useTestAttempts;

