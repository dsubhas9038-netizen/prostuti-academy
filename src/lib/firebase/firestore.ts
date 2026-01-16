import {
    collection,
    doc,
    getDoc,
    getDocs,
    setDoc,
    updateDoc,
    deleteDoc,
    query,
    where,
    orderBy,
    limit,
    DocumentData,
    QueryConstraint,
    serverTimestamp,
    increment,
    arrayUnion,
    arrayRemove,
    Timestamp,
} from 'firebase/firestore';
import { db } from './config';
import { Subject, Chapter, Question, Test, PDFResource as Resource } from '@/types';

// ==================== GENERIC HELPERS ====================

// Get a single document by ID
export async function getDocument<T>(
    collectionName: string,
    docId: string
): Promise<T | null> {
    try {
        const docRef = doc(db, collectionName, docId);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
            return { id: docSnap.id, ...docSnap.data() } as T;
        }
        return null;
    } catch (error) {
        console.error(`Error getting document from ${collectionName}:`, error);
        return null;
    }
}

// Get all documents from a collection with optional filters
export async function getDocuments<T>(
    collectionName: string,
    constraints: QueryConstraint[] = []
): Promise<T[]> {
    try {
        const collectionRef = collection(db, collectionName);
        const q = query(collectionRef, ...constraints);
        const querySnapshot = await getDocs(q);

        return querySnapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
        })) as T[];
    } catch (error) {
        console.error(`Error getting documents from ${collectionName}:`, error);
        return [];
    }
}

// Add or update a document
export async function setDocument(
    collectionName: string,
    docId: string,
    data: DocumentData,
    merge: boolean = true
): Promise<boolean> {
    try {
        const docRef = doc(db, collectionName, docId);
        await setDoc(docRef, data, { merge });
        return true;
    } catch (error) {
        console.error(`Error setting document in ${collectionName}:`, error);
        return false;
    }
}

// Update specific fields in a document
export async function updateDocument(
    collectionName: string,
    docId: string,
    data: DocumentData
): Promise<boolean> {
    try {
        const docRef = doc(db, collectionName, docId);
        await updateDoc(docRef, data);
        return true;
    } catch (error) {
        console.error(`Error updating document in ${collectionName}:`, error);
        return false;
    }
}

// Delete a document
export async function deleteDocument(
    collectionName: string,
    docId: string
): Promise<boolean> {
    try {
        const docRef = doc(db, collectionName, docId);
        await deleteDoc(docRef);
        return true;
    } catch (error) {
        console.error(`Error deleting document from ${collectionName}:`, error);
        return false;
    }
}

// ==================== SUBJECTS ====================

// Get all subjects
export async function getAllSubjects(stream?: string): Promise<Subject[]> {
    const constraints: QueryConstraint[] = [
        where('isActive', '==', true),
        orderBy('order', 'asc'),
    ];

    if (stream) {
        constraints.unshift(where('stream', '==', stream));
    }

    return getDocuments<Subject>('subjects', constraints);
}

// Get subject by ID
export async function getSubjectById(subjectId: string): Promise<Subject | null> {
    return getDocument<Subject>('subjects', subjectId);
}

// Get subjects by semester
export async function getSubjectsBySemester(
    semester: number,
    stream: string = 'arts'
): Promise<Subject[]> {
    return getDocuments<Subject>('subjects', [
        where('stream', '==', stream),
        where('semesters', 'array-contains', semester),
        where('isActive', '==', true),
        orderBy('order', 'asc'),
    ]);
}

// ==================== CHAPTERS ====================

// Get all chapters for a subject
export async function getChaptersBySubject(
    subjectId: string,
    semester?: number
): Promise<Chapter[]> {
    const constraints: QueryConstraint[] = [
        where('subjectId', '==', subjectId),
        where('isActive', '==', true),
        orderBy('order', 'asc'),
    ];

    if (semester) {
        constraints.splice(1, 0, where('semester', '==', semester));
    }

    return getDocuments<Chapter>('chapters', constraints);
}

// Get chapter by ID
export async function getChapterById(chapterId: string): Promise<Chapter | null> {
    return getDocument<Chapter>('chapters', chapterId);
}

// ==================== QUESTIONS ====================

// Get questions by chapter
export async function getQuestionsByChapter(
    chapterId: string,
    questionType?: string
): Promise<Question[]> {
    const constraints: QueryConstraint[] = [
        where('chapterId', '==', chapterId),
        where('isActive', '==', true),
        orderBy('order', 'asc'),
    ];

    if (questionType) {
        constraints.splice(1, 0, where('type', '==', questionType));
    }

    return getDocuments<Question>('questions', constraints);
}

// Get question by ID
export async function getQuestionById(questionId: string): Promise<Question | null> {
    return getDocument<Question>('questions', questionId);
}

// Get questions by subject
export async function getQuestionsBySubject(
    subjectId: string,
    semester?: number,
    limitCount?: number
): Promise<Question[]> {
    const constraints: QueryConstraint[] = [
        where('subjectId', '==', subjectId),
        where('isActive', '==', true),
        orderBy('importance', 'desc'),
    ];

    if (semester) {
        constraints.splice(1, 0, where('semester', '==', semester));
    }

    if (limitCount) {
        constraints.push(limit(limitCount));
    }

    return getDocuments<Question>('questions', constraints);
}

// Get important/frequently asked questions
export async function getImportantQuestions(
    subjectId: string,
    limitCount: number = 10
): Promise<Question[]> {
    return getDocuments<Question>('questions', [
        where('subjectId', '==', subjectId),
        where('importance', '>=', 4),
        where('isActive', '==', true),
        orderBy('importance', 'desc'),
        limit(limitCount),
    ]);
}

// ==================== TESTS ====================

// Get all tests
export async function getAllTests(
    subjectId?: string,
    isFree?: boolean
): Promise<Test[]> {
    const constraints: QueryConstraint[] = [
        where('isActive', '==', true),
        orderBy('createdAt', 'desc'),
    ];

    if (subjectId) {
        constraints.unshift(where('subjectId', '==', subjectId));
    }

    if (isFree !== undefined) {
        constraints.unshift(where('isFree', '==', isFree));
    }

    return getDocuments<Test>('tests', constraints);
}

// Get test by ID
export async function getTestById(testId: string): Promise<Test | null> {
    return getDocument<Test>('tests', testId);
}

// ==================== RESOURCES ====================

// Get all resources
export async function getAllResources(
    type?: string,
    subjectId?: string
): Promise<Resource[]> {
    const constraints: QueryConstraint[] = [
        where('isActive', '==', true),
        orderBy('uploadedAt', 'desc'),
    ];

    if (type) {
        constraints.unshift(where('type', '==', type));
    }

    if (subjectId) {
        constraints.unshift(where('subjectId', '==', subjectId));
    }

    return getDocuments<Resource>('resources', constraints);
}

// Get PYQ resources
export async function getPYQResources(
    subjectId?: string,
    year?: number
): Promise<Resource[]> {
    const constraints: QueryConstraint[] = [
        where('type', '==', 'pyq'),
        where('isActive', '==', true),
        orderBy('year', 'desc'),
    ];

    if (subjectId) {
        constraints.unshift(where('subjectId', '==', subjectId));
    }

    if (year) {
        constraints.push(where('year', '==', year));
    }

    return getDocuments<Resource>('resources', constraints);
}

// Increment download count
export async function incrementDownloadCount(resourceId: string): Promise<void> {
    const resourceRef = doc(db, 'resources', resourceId);
    await updateDoc(resourceRef, {
        downloadCount: increment(1),
    });
}

// ==================== USER PROGRESS ====================

// Mark question as read
export async function markQuestionAsRead(
    userId: string,
    chapterId: string,
    questionId: string
): Promise<void> {
    const progressRef = doc(db, 'userProgress', `${userId}_${chapterId}`);

    await setDoc(
        progressRef,
        {
            userId,
            chapterId,
            questionsRead: arrayUnion(questionId),
            lastAccessedAt: serverTimestamp(),
        },
        { merge: true }
    );
}

// Toggle bookmark
export async function toggleBookmark(
    userId: string,
    questionId: string,
    isBookmarked: boolean
): Promise<void> {
    const bookmarkRef = doc(db, 'bookmarks', userId);

    if (isBookmarked) {
        await setDoc(
            bookmarkRef,
            {
                userId,
                questions: arrayUnion({
                    questionId,
                    addedAt: new Date(),
                    note: null,
                }),
            },
            { merge: true }
        );
    } else {
        // To remove, we need to get current data first
        const bookmarkDoc = await getDoc(bookmarkRef);
        if (bookmarkDoc.exists()) {
            const questions = bookmarkDoc.data().questions || [];
            const updatedQuestions = questions.filter(
                (q: { questionId: string }) => q.questionId !== questionId
            );
            await updateDoc(bookmarkRef, { questions: updatedQuestions });
        }
    }
}

// Get user bookmarks
export async function getUserBookmarks(userId: string): Promise<string[]> {
    const bookmarkDoc = await getDoc(doc(db, 'bookmarks', userId));

    if (bookmarkDoc.exists()) {
        const data = bookmarkDoc.data();
        return (data.questions || []).map((q: { questionId: string }) => q.questionId);
    }

    return [];
}

// Update user stats
export async function updateUserStats(
    userId: string,
    updates: {
        questionsRead?: number;
        testsTaken?: number;
        streak?: number;
    }
): Promise<void> {
    const userRef = doc(db, 'users', userId);
    const updateData: DocumentData = {};

    if (updates.questionsRead) {
        updateData.totalQuestionsRead = increment(updates.questionsRead);
    }
    if (updates.testsTaken) {
        updateData.totalTestsTaken = increment(updates.testsTaken);
    }
    if (updates.streak !== undefined) {
        updateData.streak = updates.streak;
    }

    await updateDoc(userRef, updateData);
}

// ==================== HELPERS ====================

// Convert Firestore Timestamp to Date
export function timestampToDate(timestamp: Timestamp | Date): Date {
    if (timestamp instanceof Timestamp) {
        return timestamp.toDate();
    }
    return timestamp;
}

// Export Firestore utilities for use elsewhere
export {
    collection,
    doc,
    query,
    where,
    orderBy,
    limit,
    serverTimestamp,
    increment,
    arrayUnion,
    arrayRemove,
};
