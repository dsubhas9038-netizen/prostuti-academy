import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signInWithPopup,
    GoogleAuthProvider,
    signOut,
    sendPasswordResetEmail,
    updateProfile,
    onAuthStateChanged,
    User as FirebaseUser,
    UserCredential,
} from 'firebase/auth';
import { doc, setDoc, getDoc, serverTimestamp } from 'firebase/firestore';
import { auth, db } from './config';
import { User } from '@/types';

// Google Auth Provider
const googleProvider = new GoogleAuthProvider();
googleProvider.setCustomParameters({
    prompt: 'select_account',
});

// Sign up with email and password
export async function signUpWithEmail(
    email: string,
    password: string,
    displayName: string
): Promise<UserCredential> {
    try {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);

        // Update display name
        await updateProfile(userCredential.user, { displayName });

        // Create user document in Firestore
        await createUserDocument(userCredential.user, { displayName });

        return userCredential;
    } catch (error) {
        console.error('Error signing up with email:', error);
        throw error;
    }
}

// Sign in with email and password
export async function signInWithEmail(
    email: string,
    password: string
): Promise<UserCredential> {
    try {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);

        // Update last login time
        await updateLastLogin(userCredential.user.uid);

        return userCredential;
    } catch (error) {
        console.error('Error signing in with email:', error);
        throw error;
    }
}

// Sign in with Google
export async function signInWithGoogle(): Promise<UserCredential> {
    try {
        const userCredential = await signInWithPopup(auth, googleProvider);

        // Check if user document exists, if not create one
        const userDoc = await getDoc(doc(db, 'users', userCredential.user.uid));

        if (!userDoc.exists()) {
            await createUserDocument(userCredential.user);
        } else {
            await updateLastLogin(userCredential.user.uid);
        }

        return userCredential;
    } catch (error) {
        console.error('Error signing in with Google:', error);
        throw error;
    }
}

// Sign out
export async function logOut(): Promise<void> {
    try {
        await signOut(auth);
    } catch (error) {
        console.error('Error signing out:', error);
        throw error;
    }
}

// Send password reset email
export async function resetPassword(email: string): Promise<void> {
    try {
        await sendPasswordResetEmail(auth, email);
    } catch (error) {
        console.error('Error sending password reset email:', error);
        throw error;
    }
}

// Create user document in Firestore
async function createUserDocument(
    user: FirebaseUser,
    additionalData?: { displayName?: string }
): Promise<void> {
    const userRef = doc(db, 'users', user.uid);

    const userData: Partial<User> = {
        uid: user.uid,
        email: user.email || '',
        displayName: additionalData?.displayName || user.displayName || 'Student',
        photoURL: user.photoURL,
        role: 'student',
        stream: 'arts',
        currentSemester: 1,
        preferredLanguage: 'bn',
        createdAt: new Date(),
        lastLoginAt: new Date(),
        streak: 0,
        totalQuestionsRead: 0,
        totalTestsTaken: 0,
        settings: {
            darkMode: false,
            notifications: true,
            fontSize: 'medium',
        },
    };

    await setDoc(userRef, {
        ...userData,
        createdAt: serverTimestamp(),
        lastLoginAt: serverTimestamp(),
    });
}

// Update last login timestamp
async function updateLastLogin(uid: string): Promise<void> {
    const userRef = doc(db, 'users', uid);
    await setDoc(userRef, { lastLoginAt: serverTimestamp() }, { merge: true });
}

// Get current user data from Firestore
export async function getCurrentUserData(uid: string): Promise<User | null> {
    try {
        const userDoc = await getDoc(doc(db, 'users', uid));
        if (userDoc.exists()) {
            return userDoc.data() as User;
        }
        return null;
    } catch (error) {
        console.error('Error getting user data:', error);
        return null;
    }
}

// Auth state observer
export function onAuthStateChange(callback: (user: FirebaseUser | null) => void) {
    return onAuthStateChanged(auth, callback);
}

// Get Firebase error message in Bengali
export function getAuthErrorMessage(errorCode: string): string {
    const errorMessages: Record<string, string> = {
        'auth/email-already-in-use': 'এই ইমেইল দিয়ে আগে থেকেই একাউন্ট আছে।',
        'auth/invalid-email': 'ইমেইল ঠিকানা সঠিক নয়।',
        'auth/operation-not-allowed': 'এই সাইন ইন পদ্ধতি বন্ধ আছে।',
        'auth/weak-password': 'পাসওয়ার্ড খুব দুর্বল। কমপক্ষে ৬ অক্ষর দিন।',
        'auth/user-disabled': 'এই একাউন্ট বন্ধ করা হয়েছে।',
        'auth/user-not-found': 'এই ইমেইল দিয়ে কোনো একাউন্ট নেই।',
        'auth/wrong-password': 'পাসওয়ার্ড ভুল হয়েছে।',
        'auth/too-many-requests': 'অনেকবার চেষ্টা করেছেন। কিছুক্ষণ পর আবার চেষ্টা করুন।',
        'auth/network-request-failed': 'ইন্টারনেট সংযোগ নেই। সংযোগ চেক করুন।',
        'auth/popup-closed-by-user': 'লগইন বাতিল করা হয়েছে।',
        'auth/invalid-credential': 'ইমেইল বা পাসওয়ার্ড ভুল হয়েছে।',
    };

    return errorMessages[errorCode] || 'একটি সমস্যা হয়েছে। আবার চেষ্টা করুন।';
}
