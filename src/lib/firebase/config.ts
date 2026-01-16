'use client';

import { initializeApp, getApps, getApp, FirebaseApp } from 'firebase/app';
import { getAuth, Auth } from 'firebase/auth';
import { getFirestore, Firestore } from 'firebase/firestore';

// Firebase configuration using environment variables
const firebaseConfig = {
    apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
    authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
    projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
    storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
    measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID,
};

// Initialize Firebase App (singleton pattern)
function getFirebaseApp(): FirebaseApp {
    if (getApps().length > 0) {
        return getApp();
    }
    return initializeApp(firebaseConfig);
}

// Lazy-initialized Firebase instances
let _app: FirebaseApp | null = null;
let _auth: Auth | null = null;
let _db: Firestore | null = null;

// Get Firebase App instance
export function getFirebaseAppInstance(): FirebaseApp {
    if (!_app) {
        _app = getFirebaseApp();
    }
    return _app;
}

// Get Firebase Auth instance
export function getAuthInstance(): Auth {
    if (!_auth) {
        _auth = getAuth(getFirebaseAppInstance());
    }
    return _auth;
}

// Get Firestore instance
export function getFirestoreInstance(): Firestore {
    if (!_db) {
        _db = getFirestore(getFirebaseAppInstance());
    }
    return _db;
}

// Direct exports for backwards compatibility
// These will be initialized on first access
export const app = typeof window !== 'undefined' ? getFirebaseAppInstance() : ({} as FirebaseApp);
export const auth = typeof window !== 'undefined' ? getAuthInstance() : ({} as Auth);
export const db = typeof window !== 'undefined' ? getFirestoreInstance() : ({} as Firestore);

export default firebaseConfig;
