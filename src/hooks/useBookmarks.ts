// useBookmarks Hook
// Real-time bookmark management with Firestore

'use client';

import { useState, useEffect, useCallback, useMemo } from 'react';
import { useAuth } from '@/hooks/useAuth';
import {
    UserBookmarks,
    Bookmark,
    createDefaultBookmarks,
} from '@/types/progress';
import {
    getUserBookmarks,
    addBookmark,
    removeBookmark,
    isBookmarked,
    subscribeToBookmarks,
    updateBookmarkNote,
} from '@/lib/firebase/progressService';
import toast from 'react-hot-toast';

interface UseBookmarksReturn {
    bookmarks: Bookmark[];
    totalCount: number;
    isLoading: boolean;
    error: Error | null;
    // Actions
    addToBookmarks: (bookmark: Omit<Bookmark, 'addedAt'>) => Promise<void>;
    removeFromBookmarks: (questionId: string) => Promise<void>;
    toggleBookmark: (bookmark: Omit<Bookmark, 'addedAt'>) => Promise<void>;
    updateNote: (questionId: string, note: string) => Promise<void>;
    isQuestionBookmarked: (questionId: string) => boolean;
    getBookmark: (questionId: string) => Bookmark | undefined;
    // Filters
    filterBySubject: (subjectId: string) => Bookmark[];
    filterByType: (type: Bookmark['questionType']) => Bookmark[];
    sortByDate: (order: 'asc' | 'desc') => Bookmark[];
}

export function useBookmarks(): UseBookmarksReturn {
    const { firebaseUser } = useAuth();
    const [userBookmarks, setUserBookmarks] = useState<UserBookmarks | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<Error | null>(null);

    // Subscribe to real-time bookmark updates
    useEffect(() => {
        if (!firebaseUser?.uid) {
            setUserBookmarks(null);
            setIsLoading(false);
            return;
        }

        setIsLoading(true);
        setError(null);

        const unsubscribe = subscribeToBookmarks(
            firebaseUser.uid,
            (updatedBookmarks) => {
                setUserBookmarks(updatedBookmarks);
                setIsLoading(false);
            },
            (err) => {
                setError(err);
                setIsLoading(false);
            }
        );

        return () => unsubscribe();
    }, [firebaseUser?.uid]);

    // Add bookmark
    const addToBookmarks = useCallback(
        async (bookmark: Omit<Bookmark, 'addedAt'>) => {
            if (!firebaseUser?.uid) {
                toast.error('Login করো bookmark করতে');
                return;
            }

            try {
                const fullBookmark: Bookmark = {
                    ...bookmark,
                    addedAt: new Date(),
                };
                await addBookmark(firebaseUser.uid, fullBookmark);
                toast.success('Bookmark করা হয়েছে! 🔖');
            } catch (err) {
                console.error('Error adding bookmark:', err);
                toast.error('Bookmark করতে সমস্যা হয়েছে');
                throw err;
            }
        },
        [firebaseUser?.uid]
    );

    // Remove bookmark
    const removeFromBookmarks = useCallback(
        async (questionId: string) => {
            if (!firebaseUser?.uid) return;

            try {
                await removeBookmark(firebaseUser.uid, questionId);
                toast.success('Bookmark সরানো হয়েছে');
            } catch (err) {
                console.error('Error removing bookmark:', err);
                toast.error('Bookmark সরাতে সমস্যা হয়েছে');
                throw err;
            }
        },
        [firebaseUser?.uid]
    );

    // Toggle bookmark
    const toggleBookmark = useCallback(
        async (bookmark: Omit<Bookmark, 'addedAt'>) => {
            if (!firebaseUser?.uid) {
                toast.error('Login করো bookmark করতে');
                return;
            }

            const exists = userBookmarks?.bookmarks.some(
                (b) => b.questionId === bookmark.questionId
            );

            if (exists) {
                await removeFromBookmarks(bookmark.questionId);
            } else {
                await addToBookmarks(bookmark);
            }
        },
        [firebaseUser?.uid, userBookmarks?.bookmarks, addToBookmarks, removeFromBookmarks]
    );

    // Update note
    const updateNote = useCallback(
        async (questionId: string, note: string) => {
            if (!firebaseUser?.uid) return;

            try {
                await updateBookmarkNote(firebaseUser.uid, questionId, note);
                toast.success('Note আপডেট হয়েছে');
            } catch (err) {
                console.error('Error updating note:', err);
                toast.error('Note আপডেট করতে সমস্যা হয়েছে');
                throw err;
            }
        },
        [firebaseUser?.uid]
    );

    // Check if question is bookmarked
    const isQuestionBookmarked = useCallback(
        (questionId: string): boolean => {
            if (!userBookmarks?.bookmarks) return false;
            return userBookmarks.bookmarks.some((b) => b.questionId === questionId);
        },
        [userBookmarks?.bookmarks]
    );

    // Get specific bookmark
    const getBookmark = useCallback(
        (questionId: string): Bookmark | undefined => {
            return userBookmarks?.bookmarks.find((b) => b.questionId === questionId);
        },
        [userBookmarks?.bookmarks]
    );

    // Filter by subject
    const filterBySubject = useCallback(
        (subjectId: string): Bookmark[] => {
            if (!userBookmarks?.bookmarks) return [];
            return userBookmarks.bookmarks.filter((b) => b.subjectId === subjectId);
        },
        [userBookmarks?.bookmarks]
    );

    // Filter by type
    const filterByType = useCallback(
        (type: Bookmark['questionType']): Bookmark[] => {
            if (!userBookmarks?.bookmarks) return [];
            return userBookmarks.bookmarks.filter((b) => b.questionType === type);
        },
        [userBookmarks?.bookmarks]
    );

    // Sort by date
    const sortByDate = useCallback(
        (order: 'asc' | 'desc'): Bookmark[] => {
            if (!userBookmarks?.bookmarks) return [];
            const sorted = [...userBookmarks.bookmarks].sort((a, b) => {
                const dateA = new Date(a.addedAt).getTime();
                const dateB = new Date(b.addedAt).getTime();
                return order === 'asc' ? dateA - dateB : dateB - dateA;
            });
            return sorted;
        },
        [userBookmarks?.bookmarks]
    );

    // Memoized bookmarks list
    const bookmarks = useMemo(
        () => userBookmarks?.bookmarks || [],
        [userBookmarks?.bookmarks]
    );

    return {
        bookmarks,
        totalCount: userBookmarks?.totalCount || 0,
        isLoading,
        error,
        addToBookmarks,
        removeFromBookmarks,
        toggleBookmark,
        updateNote,
        isQuestionBookmarked,
        getBookmark,
        filterBySubject,
        filterByType,
        sortByDate,
    };
}

// Compact hook for checking bookmark status
export function useIsBookmarked(questionId: string): boolean {
    const { isQuestionBookmarked } = useBookmarks();
    return isQuestionBookmarked(questionId);
}

export default useBookmarks;
