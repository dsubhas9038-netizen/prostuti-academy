export interface User {
    uid: string;
    email: string;
    displayName: string | null;
    photoURL: string | null;
    role: 'student' | 'admin';
    stream: 'arts' | 'commerce' | 'science';
    currentSemester: 1 | 2 | 3 | 4;
    preferredLanguage: 'bn' | 'en';
    createdAt: Date;
    lastLoginAt: Date;
    streak: number;
    totalQuestionsRead: number;
    totalTestsTaken: number;
    settings: UserSettings;
}

export interface UserSettings {
    darkMode: boolean;
    notifications: boolean;
    fontSize: 'small' | 'medium' | 'large';
}

// Renamed to avoid conflict with progress.ts
export interface ChapterProgress {
    userId: string;
    chapterId: string;
    subjectId: string;
    questionsRead: string[];
    questionsBookmarked: string[];
    completionPercentage: number;
    lastAccessedAt: Date;
}

// Renamed to avoid conflict with progress.ts
export interface UserBookmark {
    userId: string;
    questionId: string;
    addedAt: Date;
    note: string | null;
}
