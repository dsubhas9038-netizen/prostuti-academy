// Test Attempt Service
// Handles all test attempt CRUD operations in Firestore

import {
    doc,
    getDoc,
    setDoc,
    updateDoc,
    collection,
    query,
    where,
    orderBy,
    limit,
    getDocs,
    onSnapshot,
    serverTimestamp,
    Timestamp,
    increment,
    addDoc,
} from 'firebase/firestore';
import { getFirestoreInstance } from './config';
import {
    ProgressTestAttempt as TestAttempt,
    TestAttemptDoc,
    ProgressTestAnswer as TestAnswer,
    convertTestAttemptDoc,
    toTimestamp,
} from '@/types/progress';

// Collection name
const TEST_ATTEMPTS_COLLECTION = 'testAttempts';
const PROGRESS_COLLECTION = 'userProgress';

// ==========================================
// TEST ATTEMPT OPERATIONS
// ==========================================

/**
 * Start a new test attempt
 */
export async function startTestAttempt(
    userId: string,
    testId: string,
    testTitle: string,
    totalQuestions: number,
    totalMarks: number,
    subjectId?: string,
    subjectName?: string
): Promise<string> {
    const db = getFirestoreInstance();
    const attemptsRef = collection(db, TEST_ATTEMPTS_COLLECTION);

    const attemptData: Omit<TestAttemptDoc, 'completedAt'> = {
        userId,
        testId,
        testTitle,
        subjectId,
        subjectName,
        startedAt: Timestamp.now(),
        status: 'in-progress',
        answers: [],
        totalQuestions,
        attemptedQuestions: 0,
        correctAnswers: 0,
        wrongAnswers: 0,
        skippedQuestions: totalQuestions,
        totalMarks,
        marksObtained: 0,
        percentage: 0,
        timeTaken: 0,
        passed: false,
    };

    const docRef = await addDoc(attemptsRef, attemptData);
    return docRef.id;
}

/**
 * Save answer for a question
 */
export async function saveAnswer(
    attemptId: string,
    answer: TestAnswer
): Promise<void> {
    const db = getFirestoreInstance();
    const docRef = doc(db, TEST_ATTEMPTS_COLLECTION, attemptId);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
        const data = docSnap.data() as TestAttemptDoc;
        const existingAnswers = data.answers || [];

        // Check if answer already exists for this question
        const answerIndex = existingAnswers.findIndex(
            (a) => a.questionId === answer.questionId
        );

        let updatedAnswers: TestAnswer[];
        if (answerIndex >= 0) {
            // Update existing answer
            updatedAnswers = [...existingAnswers];
            updatedAnswers[answerIndex] = answer;
        } else {
            // Add new answer
            updatedAnswers = [...existingAnswers, answer];
        }

        // Calculate stats
        const attemptedQuestions = updatedAnswers.length;
        const correctAnswers = updatedAnswers.filter((a) => a.isCorrect).length;
        const wrongAnswers = updatedAnswers.filter((a) => !a.isCorrect).length;
        const skippedQuestions = data.totalQuestions - attemptedQuestions;
        const marksObtained = updatedAnswers.reduce((sum, a) => sum + a.marksObtained, 0);

        await updateDoc(docRef, {
            answers: updatedAnswers,
            attemptedQuestions,
            correctAnswers,
            wrongAnswers,
            skippedQuestions,
            marksObtained,
        });
    }
}

/**
 * Complete test attempt
 */
export async function completeTestAttempt(
    attemptId: string,
    timeTaken: number,
    passingPercentage: number = 40
): Promise<TestAttempt> {
    const db = getFirestoreInstance();
    const docRef = doc(db, TEST_ATTEMPTS_COLLECTION, attemptId);
    const docSnap = await getDoc(docRef);

    if (!docSnap.exists()) {
        throw new Error('Test attempt not found');
    }

    const data = docSnap.data() as TestAttemptDoc;
    const percentage = data.totalMarks > 0
        ? Math.round((data.marksObtained / data.totalMarks) * 100)
        : 0;
    const passed = percentage >= passingPercentage;

    await updateDoc(docRef, {
        status: 'completed',
        completedAt: Timestamp.now(),
        timeTaken,
        percentage,
        passed,
    });

    // Update user progress
    await updateUserProgressAfterTest(data.userId, percentage, passed);

    return convertTestAttemptDoc(attemptId, {
        ...data,
        status: 'completed',
        completedAt: Timestamp.now(),
        timeTaken,
        percentage,
        passed,
    });
}

/**
 * Abandon test attempt
 */
export async function abandonTestAttempt(attemptId: string): Promise<void> {
    const db = getFirestoreInstance();
    const docRef = doc(db, TEST_ATTEMPTS_COLLECTION, attemptId);

    await updateDoc(docRef, {
        status: 'abandoned',
        completedAt: Timestamp.now(),
    });
}

/**
 * Get test attempt by ID
 */
export async function getTestAttempt(attemptId: string): Promise<TestAttempt | null> {
    const db = getFirestoreInstance();
    const docRef = doc(db, TEST_ATTEMPTS_COLLECTION, attemptId);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
        return convertTestAttemptDoc(attemptId, docSnap.data() as TestAttemptDoc);
    }

    return null;
}

/**
 * Get user's test attempts
 */
export async function getUserTestAttempts(
    userId: string,
    limitCount: number = 20
): Promise<TestAttempt[]> {
    const db = getFirestoreInstance();
    const attemptsRef = collection(db, TEST_ATTEMPTS_COLLECTION);

    const q = query(
        attemptsRef,
        where('userId', '==', userId),
        orderBy('startedAt', 'desc'),
        limit(limitCount)
    );

    const querySnapshot = await getDocs(q);

    return querySnapshot.docs.map((doc) =>
        convertTestAttemptDoc(doc.id, doc.data() as TestAttemptDoc)
    );
}

/**
 * Get attempts for a specific test
 */
export async function getTestAttemptsByTest(
    userId: string,
    testId: string
): Promise<TestAttempt[]> {
    const db = getFirestoreInstance();
    const attemptsRef = collection(db, TEST_ATTEMPTS_COLLECTION);

    const q = query(
        attemptsRef,
        where('userId', '==', userId),
        where('testId', '==', testId),
        orderBy('startedAt', 'desc')
    );

    const querySnapshot = await getDocs(q);

    return querySnapshot.docs.map((doc) =>
        convertTestAttemptDoc(doc.id, doc.data() as TestAttemptDoc)
    );
}

/**
 * Subscribe to real-time test attempts
 */
export function subscribeToTestAttempts(
    userId: string,
    onUpdate: (attempts: TestAttempt[]) => void,
    onError?: (error: Error) => void,
    limitCount: number = 20
): () => void {
    const db = getFirestoreInstance();
    const attemptsRef = collection(db, TEST_ATTEMPTS_COLLECTION);

    const q = query(
        attemptsRef,
        where('userId', '==', userId),
        orderBy('startedAt', 'desc'),
        limit(limitCount)
    );

    return onSnapshot(
        q,
        (querySnapshot) => {
            const attempts = querySnapshot.docs.map((doc) =>
                convertTestAttemptDoc(doc.id, doc.data() as TestAttemptDoc)
            );
            onUpdate(attempts);
        },
        (error) => {
            console.error('Test attempts subscription error:', error);
            onError?.(error);
        }
    );
}

/**
 * Update user progress after completing a test
 */
async function updateUserProgressAfterTest(
    userId: string,
    percentage: number,
    passed: boolean
): Promise<void> {
    const db = getFirestoreInstance();
    const docRef = doc(db, PROGRESS_COLLECTION, userId);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
        const data = docSnap.data();
        const totalTests = (data.totalTestsTaken || 0) + 1;
        const totalPassed = (data.totalTestsPassed || 0) + (passed ? 1 : 0);
        const currentAvg = data.averageScore || 0;

        // Calculate new average score
        const newAverage = Math.round(
            ((currentAvg * (totalTests - 1)) + percentage) / totalTests
        );

        await updateDoc(docRef, {
            totalTestsTaken: increment(1),
            totalTestsPassed: passed ? increment(1) : data.totalTestsPassed,
            averageScore: newAverage,
            updatedAt: serverTimestamp(),
        });
    } else {
        // Create progress document if doesn't exist
        await setDoc(docRef, {
            userId,
            totalQuestionsRead: 0,
            totalTestsTaken: 1,
            totalTestsPassed: passed ? 1 : 0,
            averageScore: percentage,
            streak: 1,
            longestStreak: 1,
            lastActiveDate: Timestamp.now(),
            subjectProgress: {},
            createdAt: serverTimestamp(),
            updatedAt: serverTimestamp(),
        });
    }
}

/**
 * Get best attempt for a test
 */
export async function getBestAttempt(
    userId: string,
    testId: string
): Promise<TestAttempt | null> {
    const attempts = await getTestAttemptsByTest(userId, testId);

    if (attempts.length === 0) return null;

    // Filter completed attempts and find best score
    const completedAttempts = attempts.filter((a) => a.status === 'completed');
    if (completedAttempts.length === 0) return null;

    return completedAttempts.reduce((best, current) =>
        current.percentage > best.percentage ? current : best
    );
}

/**
 * Get test attempt stats
 */
export async function getTestStats(userId: string): Promise<{
    totalAttempts: number;
    completedTests: number;
    passedTests: number;
    averageScore: number;
    averageTime: number;
}> {
    const attempts = await getUserTestAttempts(userId, 100);

    const completedAttempts = attempts.filter((a) => a.status === 'completed');
    const passedAttempts = completedAttempts.filter((a) => a.passed);

    const totalScore = completedAttempts.reduce((sum, a) => sum + a.percentage, 0);
    const totalTime = completedAttempts.reduce((sum, a) => sum + a.timeTaken, 0);

    return {
        totalAttempts: attempts.length,
        completedTests: completedAttempts.length,
        passedTests: passedAttempts.length,
        averageScore: completedAttempts.length > 0
            ? Math.round(totalScore / completedAttempts.length)
            : 0,
        averageTime: completedAttempts.length > 0
            ? Math.round(totalTime / completedAttempts.length)
            : 0,
    };
}

export default {
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
};
