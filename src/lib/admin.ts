import {
    collection,
    doc,
    getDocs,
    getDoc,
    addDoc,
    updateDoc,
    deleteDoc,
    setDoc,
    query,
    where,
    orderBy,
    limit,
    getCountFromServer,
    serverTimestamp,
    Timestamp
} from 'firebase/firestore';
import { db } from '@/lib/firebase/config';

// Types
export interface Subject {
    id: string;
    name: string;
    nameBn: string;
    icon: string;
    color: string;
    stream: string;
    semesters: number[];
    totalChapters: number;
    totalQuestions: number;
    order: number;
    isActive: boolean;
    createdAt?: Timestamp;
    updatedAt?: Timestamp;
}

// COLLECTION REFERENCES
const SUBJECTS_COLLECTION = 'subjects';

// ==========================================
// RECENT ACTIVITY
// ==========================================

export async function getRealRecentActivities(limitCount: number = 5) {
    try {
        const [usersSnap, questionsSnap, testsSnap, resourcesSnap] = await Promise.all([
            getDocs(query(collection(db, 'users'), orderBy('createdAt', 'desc'), limit(limitCount))),
            getDocs(query(collection(db, 'questions'), orderBy('createdAt', 'desc'), limit(limitCount))),
            getDocs(query(collection(db, 'tests'), orderBy('createdAt', 'desc'), limit(limitCount))),
            getDocs(query(collection(db, 'resources'), orderBy('createdAt', 'desc'), limit(limitCount)))
        ]);

        const activities: any[] = [];

        usersSnap.forEach(doc => {
            const data = doc.data();
            activities.push({
                id: doc.id,
                type: 'user',
                action: 'create', // Assuming new user
                title: data.displayName || 'New User',
                titleBn: data.displayName || 'নতুন ব্যবহারকারী',
                description: data.email,
                timestamp: data.createdAt?.toDate() || new Date(),
                metadata: { role: data.role }
            });
        });

        questionsSnap.forEach(doc => {
            const data = doc.data();
            activities.push({
                id: doc.id,
                type: 'question',
                action: 'create',
                title: data.question ? (data.question.substring(0, 30) + '...') : 'New Question',
                titleBn: data.questionBn ? (data.questionBn.substring(0, 30) + '...') : 'নতুন প্রশ্ন',
                description: `Subject: ${data.subjectId}`,
                timestamp: data.createdAt?.toDate() || new Date(),
            });
        });

        testsSnap.forEach(doc => {
            const data = doc.data();
            activities.push({
                id: doc.id,
                type: 'test',
                action: 'create',
                title: data.title,
                titleBn: data.titleBn,
                description: `Code: ${data.code}`,
                timestamp: data.createdAt?.toDate() || new Date(),
            });
        });

        resourcesSnap.forEach(doc => {
            const data = doc.data();
            activities.push({
                id: doc.id,
                type: 'resource',
                action: 'create',
                title: data.title,
                titleBn: data.titleBn,
                description: data.type,
                timestamp: data.createdAt?.toDate() || new Date(),
            });
        });

        // Sort by timestamp desc and limit
        return activities
            .sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime())
            .slice(0, limitCount);

    } catch (error) {
        console.error('Error getting recent activities:', error);
        return [];
    }
}

// ==========================================
// USERS MANAGEMENT
// ==========================================

export async function getAdminDashboardStats() {
    try {
        const usersCount = await getCountFromServer(collection(db, 'users'));
        const questionsCount = await getCountFromServer(collection(db, 'questions'));
        const testsCount = await getCountFromServer(collection(db, 'tests'));
        const resourcesCount = await getCountFromServer(collection(db, 'resources'));
        const subjectsCount = await getCountFromServer(collection(db, SUBJECTS_COLLECTION));

        return {
            totalUsers: usersCount.data().count,
            activeUsers: Math.floor(usersCount.data().count * 0.8), // Mock active users for now
            totalQuestions: questionsCount.data().count,
            totalTests: testsCount.data().count,
            totalResources: resourcesCount.data().count,
            totalSubjects: subjectsCount.data().count,
            testsCompleted: 0, // Placeholder
            questionsAnswered: 0, // Placeholder
            usersTrend: 12, // Mock trend
            questionsTrend: 5, // Mock trend
            testsTrend: 8, // Mock trend
            resourcesTrend: 2 // Mock trend
        };
    } catch (error) {
        console.error('Error getting admin stats:', error);
        return {
            totalUsers: 0,
            activeUsers: 0,
            totalQuestions: 0,
            totalTests: 0,
            totalResources: 0,
            totalSubjects: 0,
            testsCompleted: 0,
            questionsAnswered: 0,
            usersTrend: 0,
            questionsTrend: 0,
            testsTrend: 0,
            resourcesTrend: 0
        };
    }
}

export async function getUsers(): Promise<any[]> {
    try {
        const q = query(collection(db, 'users'), orderBy('createdAt', 'desc'));
        const querySnapshot = await getDocs(q);
        return querySnapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data(),
            // Ensure dates are converted from Timestamp
            createdAt: doc.data().createdAt?.toDate() || new Date(),
            lastLoginAt: doc.data().lastLoginAt?.toDate() || new Date()
        }));
    } catch (error) {
        console.error('Error getting users:', error);
        throw error;
    }
}

export async function deleteUser(id: string): Promise<void> {
    try {
        await deleteDoc(doc(db, 'users', id));
    } catch (error) {
        console.error('Error deleting user:', error);
        throw error;
    }
}

export async function updateUser(id: string, updates: any): Promise<void> {
    try {
        const docRef = doc(db, 'users', id);
        await updateDoc(docRef, {
            ...updates,
            updatedAt: serverTimestamp()
        });
    } catch (error) {
        console.error('Error updating user:', error);
        throw error;
    }
}

// ==========================================
// RESOURCES MANAGEMENT
// ==========================================

export async function getResources(): Promise<any[]> {
    try {
        const q = query(collection(db, 'resources'), orderBy('createdAt', 'desc'));
        const querySnapshot = await getDocs(q);
        return querySnapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data(),
            createdAt: doc.data().createdAt?.toDate() || new Date()
        }));
    } catch (error) {
        console.error('Error getting resources:', error);
        throw error;
    }
}

export async function addResource(data: any): Promise<string> {
    try {
        const docRef = await addDoc(collection(db, 'resources'), {
            ...data,
            createdAt: serverTimestamp(),
            updatedAt: serverTimestamp()
        });
        return docRef.id;
    } catch (error) {
        console.error('Error adding resource:', error);
        throw error;
    }
}

export async function deleteResource(id: string): Promise<void> {
    try {
        await deleteDoc(doc(db, 'resources', id));
    } catch (error) {
        console.error('Error deleting resource:', error);
        throw error;
    }
}

// ==========================================
// CHAPTERS MANAGEMENT
// ==========================================

export async function getAllChapters(): Promise<any[]> {
    try {
        const q = query(collection(db, 'chapters'), orderBy('createdAt', 'desc'));
        const querySnapshot = await getDocs(q);
        return querySnapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data(),
            createdAt: doc.data().createdAt?.toDate() || new Date()
        }));
    } catch (error) {
        console.error('Error getting chapters:', error);
        throw error;
    }
}

export async function addChapter(data: any): Promise<string> {
    try {
        const docRef = await addDoc(collection(db, 'chapters'), {
            ...data,
            createdAt: serverTimestamp(),
            updatedAt: serverTimestamp()
        });
        return docRef.id;
    } catch (error) {
        console.error('Error adding chapter:', error);
        throw error;
    }
}

export async function updateChapter(id: string, updates: any): Promise<void> {
    try {
        const docRef = doc(db, 'chapters', id);
        await updateDoc(docRef, {
            ...updates,
            updatedAt: serverTimestamp()
        });
    } catch (error) {
        console.error('Error updating chapter:', error);
        throw error;
    }
}

export async function deleteChapter(id: string): Promise<void> {
    try {
        await deleteDoc(doc(db, 'chapters', id));
    } catch (error) {
        console.error('Error deleting chapter:', error);
        throw error;
    }
}

// ==========================================
// QUESTIONS MANAGEMENT
// ==========================================

export async function getAllQuestions(): Promise<any[]> {
    try {
        const q = query(collection(db, 'questions'), orderBy('createdAt', 'desc')); // Limit might be needed
        const querySnapshot = await getDocs(q);
        return querySnapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data(),
            createdAt: doc.data().createdAt?.toDate() || new Date()
        }));
    } catch (error) {
        console.error('Error getting questions:', error);
        throw error;
    }
}

export async function addQuestion(data: any): Promise<string> {
    try {
        const docRef = await addDoc(collection(db, 'questions'), {
            ...data,
            createdAt: serverTimestamp(),
            updatedAt: serverTimestamp()
        });
        return docRef.id;
    } catch (error) {
        console.error('Error adding question:', error);
        throw error;
    }
}

export async function updateQuestion(id: string, updates: any): Promise<void> {
    try {
        const docRef = doc(db, 'questions', id);
        await updateDoc(docRef, {
            ...updates,
            updatedAt: serverTimestamp()
        });
    } catch (error) {
        console.error('Error updating question:', error);
        throw error;
    }
}

export async function deleteQuestion(id: string): Promise<void> {
    try {
        await deleteDoc(doc(db, 'questions', id));
    } catch (error) {
        console.error('Error deleting question:', error);
        throw error;
    }
}

// ==========================================
// TEST EXPORTS (For compatibility)
// ==========================================
export const fetchAdminUsers = getUsers;
export const fetchAdminQuestions = getAllQuestions;
export const fetchAdminTests = getAllTests;

// ==========================================
// TESTS MANAGEMENT
// ==========================================

export async function getAllTests(): Promise<any[]> {
    try {
        const q = query(collection(db, 'tests'), orderBy('createdAt', 'desc'));
        const querySnapshot = await getDocs(q);
        return querySnapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data(),
            createdAt: doc.data().createdAt?.toDate() || new Date()
        }));
    } catch (error) {
        console.error('Error getting tests:', error);
        throw error;
    }
}

export async function addTest(data: any): Promise<string> {
    try {
        const docRef = await addDoc(collection(db, 'tests'), {
            ...data,
            createdAt: serverTimestamp(),
            updatedAt: serverTimestamp()
        });
        return docRef.id;
    } catch (error) {
        console.error('Error adding test:', error);
        throw error;
    }
}

export async function deleteTest(id: string): Promise<void> {
    try {
        await deleteDoc(doc(db, 'tests', id));
    } catch (error) {
        console.error('Error deleting test:', error);
        throw error;
    }
}

export async function updateTest(id: string, updates: any): Promise<void> {
    try {
        const docRef = doc(db, 'tests', id);
        await updateDoc(docRef, {
            ...updates,
            updatedAt: serverTimestamp()
        });
    } catch (error) {
        console.error('Error updating test:', error);
        throw error;
    }
}

// ==========================================
// SUBJECTS MANAGEMENT
// ==========================================

export async function getSubjects(): Promise<Subject[]> {
    try {
        const q = query(collection(db, SUBJECTS_COLLECTION), orderBy('order', 'asc'));
        const querySnapshot = await getDocs(q);
        return querySnapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
        })) as Subject[];
    } catch (error) {
        console.error('Error getting subjects:', error);
        throw error;
    }
}

export async function addSubject(subjectData: Omit<Subject, 'id' | 'createdAt' | 'updatedAt'>): Promise<string> {
    try {
        const docRef = await addDoc(collection(db, SUBJECTS_COLLECTION), {
            ...subjectData,
            createdAt: serverTimestamp(),
            updatedAt: serverTimestamp()
        });
        return docRef.id;
    } catch (error) {
        console.error('Error adding subject:', error);
        throw error;
    }
}

export async function updateSubject(id: string, updates: Partial<Subject>): Promise<void> {
    try {
        const docRef = doc(db, SUBJECTS_COLLECTION, id);
        await updateDoc(docRef, {
            ...updates,
            updatedAt: serverTimestamp()
        });
    } catch (error) {
        console.error('Error updating subject:', error);
        throw error;
    }
}

export async function deleteSubject(id: string): Promise<void> {
    try {
        await deleteDoc(doc(db, SUBJECTS_COLLECTION, id));
    } catch (error) {
        console.error('Error deleting subject:', error);
        throw error;
    }
}
