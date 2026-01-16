// App Constants
export const APP_NAME = 'ProstutiAcademy';
export const APP_SLOGAN = 'তোমার EXAM আমাদের প্রস্তুতি';
export const APP_DESCRIPTION = 'West Bengal HS পরীক্ষার জন্য সেরা প্রস্তুতি - সম্পূর্ণ ফ্রি!';

// Stream Types
export const STREAMS = {
    ARTS: 'arts',
    COMMERCE: 'commerce',
    SCIENCE: 'science',
} as const;

export type Stream = (typeof STREAMS)[keyof typeof STREAMS];

// Semesters
export const SEMESTERS = [1, 2, 3, 4] as const;
export type Semester = (typeof SEMESTERS)[number];

// Question Types
export const QUESTION_TYPES = {
    MCQ: 'mcq',
    SAQ: 'saq',      // Short Answer Question (2 marks)
    LAQ: 'laq',      // Long Answer Question (5-10 marks)
    VSAQ: 'vsaq',    // Very Short Answer Question (1 mark)
} as const;

export type QuestionType = (typeof QUESTION_TYPES)[keyof typeof QUESTION_TYPES];

// Word Count Configuration per Question Type
export const MARKS_CONFIG = {
    vsaq: { marks: 1, minWords: 10, maxWords: 20 },
    saq: { marks: 2, minWords: 40, maxWords: 60 },
    laq_5: { marks: 5, minWords: 150, maxWords: 200 },
    laq_10: { marks: 10, minWords: 300, maxWords: 400 },
} as const;

// Arts Subjects
export const ARTS_SUBJECTS = [
    { id: 'bengali', name: 'Bengali', nameBn: 'বাংলা', icon: '📕', color: '#DC2626' },
    { id: 'english', name: 'English', nameBn: 'English', icon: '📗', color: '#059669' },
    { id: 'history', name: 'History', nameBn: 'ইতিহাস', icon: '📘', color: '#2563EB' },
    { id: 'geography', name: 'Geography', nameBn: 'ভূগোল', icon: '📙', color: '#D97706' },
    { id: 'philosophy', name: 'Philosophy', nameBn: 'দর্শন', icon: '📓', color: '#7C3AED' },
    { id: 'political-science', name: 'Political Science', nameBn: 'রাষ্ট্রবিজ্ঞান', icon: '📔', color: '#DB2777' },
    { id: 'education', name: 'Education', nameBn: 'শিক্ষাবিজ্ঞান', icon: '📒', color: '#0891B2' },
    { id: 'sanskrit', name: 'Sanskrit', nameBn: 'সংস্কৃত', icon: '📚', color: '#CA8A04' },
] as const;

// Navigation Links
export const NAV_LINKS = [
    { href: '/', label: 'Home', labelBn: 'হোম', icon: 'Home' },
    { href: '/subjects', label: 'Subjects', labelBn: 'বিষয়', icon: 'BookOpen' },
    { href: '/mock-tests', label: 'Mock Tests', labelBn: 'মক টেস্ট', icon: 'FileText' },
    { href: '/resources', label: 'Resources', labelBn: 'রিসোর্স', icon: 'FolderOpen' },
    { href: '/pyq-analysis', label: 'PYQ Analysis', labelBn: 'PYQ বিশ্লেষণ', icon: 'BarChart3' },
] as const;

// Dashboard Links
export const DASHBOARD_LINKS = [
    { href: '/dashboard', label: 'Overview', labelBn: 'ওভারভিউ', icon: 'LayoutDashboard' },
    { href: '/dashboard/progress', label: 'My Progress', labelBn: 'আমার অগ্রগতি', icon: 'TrendingUp' },
    { href: '/dashboard/bookmarks', label: 'Bookmarks', labelBn: 'বুকমার্ক', icon: 'Bookmark' },
    { href: '/dashboard/tests', label: 'My Tests', labelBn: 'আমার টেস্ট', icon: 'ClipboardList' },
    { href: '/dashboard/settings', label: 'Settings', labelBn: 'সেটিংস', icon: 'Settings' },
] as const;

// Colors
export const COLORS = {
    primary: '#2563EB',
    primaryDark: '#1E40AF',
    primaryLight: '#DBEAFE',
    success: '#10B981',
    warning: '#F59E0B',
    error: '#EF4444',
    neutral: '#6B7280',
    bengaliAccent: '#DC2626',
    examAlert: '#7C3AED',
    gold: '#FBBF24',
} as const;

// Google Drive Base URLs
export const DRIVE_URLS = {
    view: 'https://drive.google.com/file/d/',
    preview: 'https://drive.google.com/file/d/',
    embed: 'https://drive.google.com/file/d/',
} as const;

export function getDrivePreviewUrl(fileId: string): string {
    return `https://drive.google.com/file/d/${fileId}/preview`;
}

export function getDriveDownloadUrl(fileId: string): string {
    return `https://drive.google.com/uc?export=download&id=${fileId}`;
}
