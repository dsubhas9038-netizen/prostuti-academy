// Firestore Progress Service
// Handles all user progress CRUD operations

import {
    doc,
    getDoc,
    setDoc,
    updateDoc,
    onSnapshot,
    serverTimestamp,
    Timestamp,
    increment,
    arrayUnion,
    arrayRemove,
} from 'firebase/firestore';
import { getFirestoreInstance } from './config';
import {
    UserProgress,
    UserProgressDoc,
    UserBookmarks,
    UserBookmarksDoc,
    Bookmark,
    createDefaultProgress,
    createDefaultBookmarks,
    convertUserProgressDoc,
    convertUserBookmarksDoc,
    toTimestamp,
    calculateCompletion,
    shouldMaintainStreak,
} from '@/types/progress';

// Collection names
const PROGRESS_COLLECTION = 'userProgress';
const BOOKMARKS_COLLECTION = 'bookmarks';

// ==========================================
// USER PROGRESS OPERATIONS
// ==========================================

/**
 * Get user progress from Firestore
 */
export async function getUserProgress(userId: string): Promise<UserProgress> {
    const db = getFirestoreInstance();
    const docRef = doc(db, PROGRESS_COLLECTION, userId);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
        return convertUserProgressDoc(docSnap.data() as UserProgressDoc);
    }

    // Create default progress for new user
    const defaultProgress = createDefaultProgress(userId);
    await setUserProgress(userId, defaultProgress);
    return defaultProgress;
}

/**
 * Set/Create user progress in Firestore
 */
export async function setUserProgress(userId: string, progress: UserProgress): Promise<void> {
    const db = getFirestoreInstance();
    const docRef = doc(db, PROGRESS_COLLECTION, userId);

    const docData: any = {
        ...progress,
        lastActiveDate: toTimestamp(progress.lastActiveDate),
        createdAt: toTimestamp(progress.createdAt),
        updatedAt: serverTimestamp(),
        subjectProgress: Object.fromEntries(
            Object.entries(progress.subjectProgress).map(([key, value]) => [
                key,
                {
                    ...value,
                    lastAccessedAt: toTimestamp(value.lastAccessedAt),
                },
            ])
        ),
    };

    await setDoc(docRef, docData);
}

/**
 * Update specific progress fields
 */
export async function updateUserProgress(
    userId: string,
    updates: Partial<UserProgress>
): Promise<void> {
    const db = getFirestoreInstance();
    const docRef = doc(db, PROGRESS_COLLECTION, userId);

    const updateData: any = {
        ...updates,
        updatedAt: serverTimestamp(),
    };

    // Convert dates to timestamps
    if (updates.lastActiveDate) {
        updateData.lastActiveDate = toTimestamp(updates.lastActiveDate);
    }

    await updateDoc(docRef, updateData);
}

/**
 * Mark a question as read
 */
export async function markQuestionAsRead(
    userId: string,
    subjectId: string,
    subjectName: string,
    chapterId: string,
    questionId: string,
    totalQuestionsInSubject: number
): Promise<void> {
    const db = getFirestoreInstance();
    const docRef = doc(db, PROGRESS_COLLECTION, userId);
    const docSnap = await getDoc(docRef);

    const now = new Date();

    if (docSnap.exists()) {
        const data = docSnap.data() as UserProgressDoc;
        const subjectProgress = data.subjectProgress || {};
        const currentSubject = subjectProgress[subjectId] || {
            subjectId,
            subjectName,
            chaptersTotal: 0,
            chaptersCompleted: 0,
            questionsRead: [],
            questionsTotal: totalQuestionsInSubject,
            completionPercentage: 0,
            lastAccessedAt: Timestamp.now(),
        };

        // Add question if not already read
        if (!currentSubject.questionsRead.includes(questionId)) {
            const newQuestionsRead = [...currentSubject.questionsRead, questionId];

            // Update streak
            let newStreak = data.streak || 0;
            if (!shouldMaintainStreak(data.lastActiveDate.toDate())) {
                newStreak = 1; // Reset streak
            } else {
                const today = new Date();
                today.setHours(0, 0, 0, 0);
                const lastActive = data.lastActiveDate.toDate();
                lastActive.setHours(0, 0, 0, 0);
                if (today.getTime() !== lastActive.getTime()) {
                    newStreak = newStreak + 1; // Increment streak for new day
                }
            }

            await updateDoc(docRef, {
                totalQuestionsRead: increment(1),
                streak: newStreak,
                longestStreak: Math.max(data.longestStreak || 0, newStreak),
                lastActiveDate: Timestamp.now(),
                updatedAt: serverTimestamp(),
                [`subjectProgress.${subjectId}`]: {
                    ...currentSubject,
                    questionsRead: newQuestionsRead,
                    questionsTotal: totalQuestionsInSubject,
                    completionPercentage: calculateCompletion(newQuestionsRead.length, totalQuestionsInSubject),
                    lastAccessedAt: Timestamp.now(),
                },
            });
        }
    } else {
        // Create new progress document
        const newProgress = createDefaultProgress(userId);
        newProgress.totalQuestionsRead = 1;
        newProgress.streak = 1;
        newProgress.longestStreak = 1;
        newProgress.subjectProgress[subjectId] = {
            subjectId,
            subjectName,
            chaptersTotal: 0,
            chaptersCompleted: 0,
            questionsRead: [questionId],
            questionsTotal: totalQuestionsInSubject,
            completionPercentage: calculateCompletion(1, totalQuestionsInSubject),
            lastAccessedAt: now,
        };
        await setUserProgress(userId, newProgress);
    }
}

/**
 * Subscribe to real-time progress updates
 */
export function subscribeToProgress(
    userId: string,
    onUpdate: (progress: UserProgress) => void,
    onError?: (error: Error) => void
): () => void {
    const db = getFirestoreInstance();
    const docRef = doc(db, PROGRESS_COLLECTION, userId);

    return onSnapshot(
        docRef,
        (docSnap) => {
            if (docSnap.exists()) {
                onUpdate(convertUserProgressDoc(docSnap.data() as UserProgressDoc));
            } else {
                // Return default progress
                onUpdate(createDefaultProgress(userId));
            }
        },
        (error) => {
            console.error('Progress subscription error:', error);
            onError?.(error);
        }
    );
}

// ==========================================
// BOOKMARK OPERATIONS
// ==========================================

/**
 * Get user bookmarks from Firestore
 */
export async function getUserBookmarks(userId: string): Promise<UserBookmarks> {
    const db = getFirestoreInstance();
    const docRef = doc(db, BOOKMARKS_COLLECTION, userId);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
        return convertUserBookmarksDoc(docSnap.data() as UserBookmarksDoc);
    }

    return createDefaultBookmarks(userId);
}

/**
 * Add a bookmark
 */
export async function addBookmark(userId: string, bookmark: Bookmark): Promise<void> {
    const db = getFirestoreInstance();
    const docRef = doc(db, BOOKMARKS_COLLECTION, userId);
    const docSnap = await getDoc(docRef);

    const bookmarkData = {
        ...bookmark,
        addedAt: toTimestamp(bookmark.addedAt),
    };

    if (docSnap.exists()) {
        // Check if already bookmarked
        const data = docSnap.data() as UserBookmarksDoc;
        const alreadyBookmarked = data.bookmarks.some(b => b.questionId === bookmark.questionId);

        if (!alreadyBookmarked) {
            await updateDoc(docRef, {
                bookmarks: arrayUnion(bookmarkData),
                totalCount: increment(1),
                updatedAt: serverTimestamp(),
            });
        }
    } else {
        // Create new bookmarks document
        await setDoc(docRef, {
            userId,
            bookmarks: [bookmarkData],
            totalCount: 1,
            updatedAt: serverTimestamp(),
        });
    }
}

/**
 * Remove a bookmark
 */
export async function removeBookmark(userId: string, questionId: string): Promise<void> {
    const db = getFirestoreInstance();
    const docRef = doc(db, BOOKMARKS_COLLECTION, userId);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
        const data = docSnap.data() as UserBookmarksDoc;
        const bookmarkToRemove = data.bookmarks.find(b => b.questionId === questionId);

        if (bookmarkToRemove) {
            // We need to get the exact object to remove
            const updatedBookmarks = data.bookmarks.filter(b => b.questionId !== questionId);

            await updateDoc(docRef, {
                bookmarks: updatedBookmarks,
                totalCount: Math.max(0, data.totalCount - 1),
                updatedAt: serverTimestamp(),
            });
        }
    }
}

/**
 * Check if question is bookmarked
 */
export async function isBookmarked(userId: string, questionId: string): Promise<boolean> {
    const bookmarks = await getUserBookmarks(userId);
    return bookmarks.bookmarks.some(b => b.questionId === questionId);
}

/**
 * Subscribe to real-time bookmark updates
 */
export function subscribeToBookmarks(
    userId: string,
    onUpdate: (bookmarks: UserBookmarks) => void,
    onError?: (error: Error) => void
): () => void {
    const db = getFirestoreInstance();
    const docRef = doc(db, BOOKMARKS_COLLECTION, userId);

    return onSnapshot(
        docRef,
        (docSnap) => {
            if (docSnap.exists()) {
                onUpdate(convertUserBookmarksDoc(docSnap.data() as UserBookmarksDoc));
            } else {
                onUpdate(createDefaultBookmarks(userId));
            }
        },
        (error) => {
            console.error('Bookmarks subscription error:', error);
            onError?.(error);
        }
    );
}

/**
 * Update bookmark note
 */
export async function updateBookmarkNote(
    userId: string,
    questionId: string,
    note: string
): Promise<void> {
    const db = getFirestoreInstance();
    const docRef = doc(db, BOOKMARKS_COLLECTION, userId);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
        const data = docSnap.data() as UserBookmarksDoc;
        const updatedBookmarks = data.bookmarks.map(b =>
            b.questionId === questionId ? { ...b, note } : b
        );

        await updateDoc(docRef, {
            bookmarks: updatedBookmarks,
            updatedAt: serverTimestamp(),
        });
    }
}

export default {
    // Progress
    getUserProgress,
    setUserProgress,
    updateUserProgress,
    markQuestionAsRead,
    subscribeToProgress,
    // Bookmarks
    getUserBookmarks,
    addBookmark,
    removeBookmark,
    isBookmarked,
    subscribeToBookmarks,
    updateBookmarkNote,
};
