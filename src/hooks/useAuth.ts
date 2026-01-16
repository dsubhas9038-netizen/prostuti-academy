'use client';

import { useAuth as useAuthContext } from '@/context/AuthContext';
import { getAuthErrorMessage } from '@/lib/firebase';

export function useAuth() {
    const auth = useAuthContext();

    // Get error message in Bengali
    const errorMessage = auth.error ? getAuthErrorMessage(auth.error) : null;

    return {
        ...auth,
        errorMessage,
        isAuthenticated: !!auth.firebaseUser,
        isAdmin: auth.userData?.role === 'admin',
        userName: auth.userData?.displayName || auth.firebaseUser?.displayName || 'Student',
        userPhoto: auth.userData?.photoURL || auth.firebaseUser?.photoURL || null,
    };
}

// Safe version for components that might render before auth is ready
export function useAuthSafe() {
    try {
        return useAuth();
    } catch {
        return {
            firebaseUser: null,
            userData: null,
            loading: true,
            error: null,
            errorMessage: null,
            isAuthenticated: false,
            isAdmin: false,
            userName: 'Guest',
            userPhoto: null,
            signUp: async () => { },
            signIn: async () => { },
            signInGoogle: async () => { },
            logout: async () => { },
            sendPasswordReset: async () => { },
            clearError: () => { },
        };
    }
}
