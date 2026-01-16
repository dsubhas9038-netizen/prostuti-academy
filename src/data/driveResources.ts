// Google Drive PDF Resources Data
// Contains all PDF resources hosted on Google Drive

import { DriveResource } from '@/lib/drive/googleDrive';

// Sample PDF Resources (Replace fileIds with actual Google Drive file IDs)
export const driveResources: DriveResource[] = [
    // ==========================================
    // SEMESTER 4 - BENGALI
    // ==========================================
    {
        id: 'ben-s4-q1',
        fileId: 'YOUR_GOOGLE_DRIVE_FILE_ID_HERE',
        title: 'Bengali Question Bank - Complete',
        titleBn: 'বাংলা প্রশ্ন ব্যাংক - সম্পূর্ণ',
        description: 'সম্পূর্ণ বাংলা প্রশ্ন ব্যাংক with exam-oriented answers',
        subjectId: 'bengali',
        semester: 4,
        type: 'question',
        tags: ['সাহিত্য', 'ব্যাকরণ', 'রচনা'],
        createdAt: '2024-01-01T00:00:00Z',
        updatedAt: '2024-01-01T00:00:00Z',
    },
    {
        id: 'ben-s4-pyq1',
        fileId: 'YOUR_GOOGLE_DRIVE_FILE_ID_HERE',
        title: 'Bengali PYQ 2023',
        titleBn: 'বাংলা বিগত বছরের প্রশ্ন ২০২৩',
        description: '2023 HS পরীক্ষার বাংলা প্রশ্নপত্র with solutions',
        subjectId: 'bengali',
        semester: 4,
        type: 'pyq',
        year: 2023,
        tags: ['PYQ', '2023', 'Solutions'],
        createdAt: '2024-01-01T00:00:00Z',
        updatedAt: '2024-01-01T00:00:00Z',
    },

    // ==========================================
    // SEMESTER 4 - ENGLISH
    // ==========================================
    {
        id: 'eng-s4-q1',
        fileId: 'YOUR_GOOGLE_DRIVE_FILE_ID_HERE',
        title: 'English Question Bank - Complete',
        titleBn: 'ইংরেজি প্রশ্ন ব্যাংক - সম্পূর্ণ',
        description: 'Complete English question bank with grammar and literature',
        subjectId: 'english',
        semester: 4,
        type: 'question',
        tags: ['Literature', 'Grammar', 'Writing'],
        createdAt: '2024-01-01T00:00:00Z',
        updatedAt: '2024-01-01T00:00:00Z',
    },
    {
        id: 'eng-s4-pyq1',
        fileId: 'YOUR_GOOGLE_DRIVE_FILE_ID_HERE',
        title: 'English PYQ 2023',
        titleBn: 'ইংরেজি বিগত বছরের প্রশ্ন ২০২৩',
        description: '2023 HS পরীক্ষার English প্রশ্নপত্র',
        subjectId: 'english',
        semester: 4,
        type: 'pyq',
        year: 2023,
        tags: ['PYQ', '2023'],
        createdAt: '2024-01-01T00:00:00Z',
        updatedAt: '2024-01-01T00:00:00Z',
    },

    // ==========================================
    // SEMESTER 4 - HISTORY
    // ==========================================
    {
        id: 'his-s4-q1',
        fileId: 'YOUR_GOOGLE_DRIVE_FILE_ID_HERE',
        title: 'History Question Bank - Complete',
        titleBn: 'ইতিহাস প্রশ্ন ব্যাংক - সম্পূর্ণ',
        description: 'Complete History question bank covering all chapters',
        subjectId: 'history',
        semester: 4,
        type: 'question',
        tags: ['World History', 'Indian History'],
        createdAt: '2024-01-01T00:00:00Z',
        updatedAt: '2024-01-01T00:00:00Z',
    },
    {
        id: 'his-s4-pyq1',
        fileId: 'YOUR_GOOGLE_DRIVE_FILE_ID_HERE',
        title: 'History PYQ 2023',
        titleBn: 'ইতিহাস বিগত বছরের প্রশ্ন ২০২৩',
        subjectId: 'history',
        semester: 4,
        type: 'pyq',
        year: 2023,
        createdAt: '2024-01-01T00:00:00Z',
        updatedAt: '2024-01-01T00:00:00Z',
    },

    // ==========================================
    // SEMESTER 4 - GEOGRAPHY
    // ==========================================
    {
        id: 'geo-s4-q1',
        fileId: 'YOUR_GOOGLE_DRIVE_FILE_ID_HERE',
        title: 'Geography Question Bank',
        titleBn: 'ভূগোল প্রশ্ন ব্যাংক',
        subjectId: 'geography',
        semester: 4,
        type: 'question',
        createdAt: '2024-01-01T00:00:00Z',
        updatedAt: '2024-01-01T00:00:00Z',
    },

    // ==========================================
    // SEMESTER 4 - PHILOSOPHY
    // ==========================================
    {
        id: 'phi-s4-q1',
        fileId: 'YOUR_GOOGLE_DRIVE_FILE_ID_HERE',
        title: 'Philosophy Question Bank',
        titleBn: 'দর্শন প্রশ্ন ব্যাংক',
        subjectId: 'philosophy',
        semester: 4,
        type: 'question',
        createdAt: '2024-01-01T00:00:00Z',
        updatedAt: '2024-01-01T00:00:00Z',
    },

    // ==========================================
    // SEMESTER 4 - POLITICAL SCIENCE
    // ==========================================
    {
        id: 'pol-s4-q1',
        fileId: 'YOUR_GOOGLE_DRIVE_FILE_ID_HERE',
        title: 'Political Science Question Bank',
        titleBn: 'রাষ্ট্রবিজ্ঞান প্রশ্ন ব্যাংক',
        subjectId: 'political-science',
        semester: 4,
        type: 'question',
        createdAt: '2024-01-01T00:00:00Z',
        updatedAt: '2024-01-01T00:00:00Z',
    },

    // ==========================================
    // SEMESTER 4 - EDUCATION
    // ==========================================
    {
        id: 'edu-s4-q1',
        fileId: 'YOUR_GOOGLE_DRIVE_FILE_ID_HERE',
        title: 'Education Question Bank',
        titleBn: 'শিক্ষা বিজ্ঞান প্রশ্ন ব্যাংক',
        subjectId: 'education',
        semester: 4,
        type: 'question',
        createdAt: '2024-01-01T00:00:00Z',
        updatedAt: '2024-01-01T00:00:00Z',
    },

    // ==========================================
    // COMMON RESOURCES
    // ==========================================
    {
        id: 'common-syllabus',
        fileId: 'YOUR_GOOGLE_DRIVE_FILE_ID_HERE',
        title: 'HS Arts Syllabus 2024',
        titleBn: 'উচ্চ মাধ্যমিক Arts সিলেবাস ২০২৪',
        subjectId: 'common',
        semester: 4,
        type: 'syllabus',
        createdAt: '2024-01-01T00:00:00Z',
        updatedAt: '2024-01-01T00:00:00Z',
    },
];

// Get resources by subject
export function getResourcesBySubject(subjectId: string): DriveResource[] {
    return driveResources.filter((r) => r.subjectId === subjectId);
}

// Get resources by semester
export function getResourcesBySemester(semester: 1 | 2 | 3 | 4): DriveResource[] {
    return driveResources.filter((r) => r.semester === semester);
}

// Get resources by type
export function getResourcesByType(type: DriveResource['type']): DriveResource[] {
    return driveResources.filter((r) => r.type === type);
}

// Get PYQ by year
export function getPYQByYear(year: number): DriveResource[] {
    return driveResources.filter((r) => r.type === 'pyq' && r.year === year);
}

// Get resource by ID
export function getResourceById(id: string): DriveResource | undefined {
    return driveResources.find((r) => r.id === id);
}

// Search resources
export function searchResources(query: string): DriveResource[] {
    const lowerQuery = query.toLowerCase();
    return driveResources.filter(
        (r) =>
            r.title.toLowerCase().includes(lowerQuery) ||
            r.titleBn.includes(query) ||
            r.description?.toLowerCase().includes(lowerQuery) ||
            r.tags?.some((t) => t.toLowerCase().includes(lowerQuery))
    );
}

export default driveResources;
