// useUserProgress Hook
// Real-time user progress tracking with Firestore

'use client';

import { useState, useEffect, useCallback } from 'react';
import { useAuth } from '@/hooks/useAuth';
import {
    UserProgress,
    UserSubjectProgress,
    createDefaultProgress,
} from '@/types/progress';
import {
    getUserProgress,
    updateUserProgress,
    markQuestionAsRead,
    subscribeToProgress,
} from '@/lib/firebase/progressService';

interface UseUserProgressReturn {
    progress: UserProgress | null;
    isLoading: boolean;
    error: Error | null;
    // Actions
    markAsRead: (
        subjectId: string,
        subjectName: string,
        chapterId: string,
        questionId: string,
        totalQuestions: number
    ) => Promise<void>;
    getSubjectProgress: (subjectId: string) => UserSubjectProgress | null;
    refreshProgress: () => Promise<void>;
    // Computed values
    totalQuestionsRead: number;
    totalTestsTaken: number;
    streak: number;
    overallCompletion: number;
}

export function useUserProgress(): UseUserProgressReturn {
    const { firebaseUser } = useAuth();
    const [progress, setProgress] = useState<UserProgress | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<Error | null>(null);

    // Subscribe to real-time progress updates
    useEffect(() => {
        if (!firebaseUser?.uid) {
            setProgress(null);
            setIsLoading(false);
            return;
        }

        setIsLoading(true);
        setError(null);

        // Subscribe to real-time updates
        const unsubscribe = subscribeToProgress(
            firebaseUser.uid,
            (updatedProgress) => {
                setProgress(updatedProgress);
                setIsLoading(false);
            },
            (err) => {
                setError(err);
                setIsLoading(false);
            }
        );

        return () => unsubscribe();
    }, [firebaseUser?.uid]);

    // Mark question as read
    const markAsRead = useCallback(
        async (
            subjectId: string,
            subjectName: string,
            chapterId: string,
            questionId: string,
            totalQuestions: number
        ) => {
            if (!firebaseUser?.uid) return;

            try {
                await markQuestionAsRead(
                    firebaseUser.uid,
                    subjectId,
                    subjectName,
                    chapterId,
                    questionId,
                    totalQuestions
                );
            } catch (err) {
                console.error('Error marking question as read:', err);
                throw err;
            }
        },
        [firebaseUser?.uid]
    );

    // Get progress for a specific subject
    const getSubjectProgress = useCallback(
        (subjectId: string): UserSubjectProgress | null => {
            if (!progress?.subjectProgress) return null;
            return progress.subjectProgress[subjectId] || null;
        },
        [progress?.subjectProgress]
    );

    // Manually refresh progress
    const refreshProgress = useCallback(async () => {
        if (!firebaseUser?.uid) return;

        setIsLoading(true);
        try {
            const freshProgress = await getUserProgress(firebaseUser.uid);
            setProgress(freshProgress);
        } catch (err) {
            setError(err as Error);
        } finally {
            setIsLoading(false);
        }
    }, [firebaseUser?.uid]);

    // Computed values
    const totalQuestionsRead = progress?.totalQuestionsRead || 0;
    const totalTestsTaken = progress?.totalTestsTaken || 0;
    const streak = progress?.streak || 0;

    // Calculate overall completion
    const overallCompletion = (() => {
        if (!progress?.subjectProgress) return 0;
        const subjects = Object.values(progress.subjectProgress);
        if (subjects.length === 0) return 0;

        const totalCompletion = subjects.reduce(
            (sum, s) => sum + s.completionPercentage,
            0
        );
        return Math.round(totalCompletion / subjects.length);
    })();

    return {
        progress,
        isLoading,
        error,
        markAsRead,
        getSubjectProgress,
        refreshProgress,
        totalQuestionsRead,
        totalTestsTaken,
        streak,
        overallCompletion,
    };
}

// Compact hook for quick access to progress stats
export function useProgressStats() {
    const { progress, isLoading } = useUserProgress();

    return {
        isLoading,
        totalQuestionsRead: progress?.totalQuestionsRead || 0,
        totalTestsTaken: progress?.totalTestsTaken || 0,
        streak: progress?.streak || 0,
        longestStreak: progress?.longestStreak || 0,
        averageScore: progress?.averageScore || 0,
    };
}

export default useUserProgress;

