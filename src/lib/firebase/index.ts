// Firebase Configuration
export { app, auth, db } from './config';
export { default as firebaseConfig } from './config';

// Authentication Functions
export {
    signUpWithEmail,
    signInWithEmail,
    signInWithGoogle,
    logOut,
    resetPassword,
    getCurrentUserData,
    onAuthStateChange,
    getAuthErrorMessage,
} from './auth';

// Firestore Functions
export {
    // Generic helpers
    getDocument,
    getDocuments,
    setDocument,
    updateDocument,
    deleteDocument,

    // Subjects
    getAllSubjects,
    getSubjectById,
    getSubjectsBySemester,

    // Chapters
    getChaptersBySubject,
    getChapterById,

    // Questions
    getQuestionsByChapter,
    getQuestionById,
    getQuestionsBySubject,
    getImportantQuestions,

    // Tests
    getAllTests,
    getTestById,

    // Resources
    getAllResources,
    getPYQResources,
    incrementDownloadCount,

    // User Progress
    markQuestionAsRead,
    toggleBookmark,
    getUserBookmarks,
    updateUserStats,

    // Helpers
    timestampToDate,
    serverTimestamp,

} from './firestore';
