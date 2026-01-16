'use client';

import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { User as FirebaseUser } from 'firebase/auth';
import {
    onAuthStateChange,
    getCurrentUserData,
    signUpWithEmail,
    signInWithEmail,
    signInWithGoogle,
    logOut,
    resetPassword,
} from '@/lib/firebase';
import { User } from '@/types';

// Types
interface AuthContextType {
    firebaseUser: FirebaseUser | null;
    userData: User | null;
    loading: boolean;
    error: string | null;
    signUp: (email: string, password: string, displayName: string) => Promise<void>;
    signIn: (email: string, password: string) => Promise<void>;
    signInGoogle: () => Promise<void>;
    logout: () => Promise<void>;
    sendPasswordReset: (email: string) => Promise<void>;
    clearError: () => void;
}

// Default context value
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Provider component
interface AuthProviderProps {
    children: ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
    const [firebaseUser, setFirebaseUser] = useState<FirebaseUser | null>(null);
    const [userData, setUserData] = useState<User | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    // Listen for auth state changes
    useEffect(() => {
        // Only run on client side
        if (typeof window === 'undefined') {
            setLoading(false);
            return;
        }

        const unsubscribe = onAuthStateChange(async (user) => {
            setFirebaseUser(user);

            if (user) {
                // Fetch user data from Firestore
                const data = await getCurrentUserData(user.uid);
                setUserData(data);
            } else {
                setUserData(null);
            }

            setLoading(false);
        });

        // Cleanup subscription
        return () => unsubscribe();
    }, []);

    // Sign up function
    const signUp = async (email: string, password: string, displayName: string) => {
        try {
            setError(null);
            setLoading(true);
            await signUpWithEmail(email, password, displayName);
        } catch (err: unknown) {
            const errorCode = (err as { code?: string })?.code || 'auth/unknown-error';
            setError(errorCode);
            throw err;
        } finally {
            setLoading(false);
        }
    };

    // Sign in function
    const signIn = async (email: string, password: string) => {
        try {
            setError(null);
            setLoading(true);
            await signInWithEmail(email, password);
        } catch (err: unknown) {
            const errorCode = (err as { code?: string })?.code || 'auth/unknown-error';
            setError(errorCode);
            throw err;
        } finally {
            setLoading(false);
        }
    };

    // Sign in with Google
    const signInGoogle = async () => {
        try {
            setError(null);
            setLoading(true);
            await signInWithGoogle();
        } catch (err: unknown) {
            const errorCode = (err as { code?: string })?.code || 'auth/unknown-error';
            setError(errorCode);
            throw err;
        } finally {
            setLoading(false);
        }
    };

    // Logout function
    const logout = async () => {
        try {
            setError(null);
            await logOut();
            setUserData(null);
        } catch (err: unknown) {
            const errorCode = (err as { code?: string })?.code || 'auth/unknown-error';
            setError(errorCode);
            throw err;
        }
    };

    // Send password reset email
    const sendPasswordReset = async (email: string) => {
        try {
            setError(null);
            await resetPassword(email);
        } catch (err: unknown) {
            const errorCode = (err as { code?: string })?.code || 'auth/unknown-error';
            setError(errorCode);
            throw err;
        }
    };

    // Clear error
    const clearError = () => {
        setError(null);
    };

    const value: AuthContextType = {
        firebaseUser,
        userData,
        loading,
        error,
        signUp,
        signIn,
        signInGoogle,
        logout,
        sendPasswordReset,
        clearError,
    };

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
}

// Custom hook to use auth context
export function useAuth(): AuthContextType {
    const context = useContext(AuthContext);

    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }

    return context;
}

// Export context for advanced use cases
export { AuthContext };
