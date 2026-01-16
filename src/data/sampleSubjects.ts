import { Subject } from '@/types';

export const sampleSubjects: Subject[] = [
    {
        id: 'bengali',
        name: 'Bengali',
        nameBn: 'বাংলা',
        icon: '📕',
        color: '#DC2626',
        stream: 'arts',
        semesters: [1, 2, 3, 4],
        totalChapters: 12,
        totalQuestions: 245,
        order: 1,
        isActive: true,
    },
    {
        id: 'english',
        name: 'English',
        nameBn: 'ইংরেজি',
        icon: '📗',
        color: '#059669',
        stream: 'arts',
        semesters: [1, 2, 3, 4],
        totalChapters: 10,
        totalQuestions: 198,
        order: 2,
        isActive: true,
    },
    {
        id: 'history',
        name: 'History',
        nameBn: 'ইতিহাস',
        icon: '📘',
        color: '#2563EB',
        stream: 'arts',
        semesters: [1, 2, 3, 4],
        totalChapters: 8,
        totalQuestions: 156,
        order: 3,
        isActive: true,
    },
    {
        id: 'geography',
        name: 'Geography',
        nameBn: 'ভূগোল',
        icon: '📙',
        color: '#D97706',
        stream: 'arts',
        semesters: [1, 2, 3, 4],
        totalChapters: 10,
        totalQuestions: 134,
        order: 4,
        isActive: true,
    },
    {
        id: 'philosophy',
        name: 'Philosophy',
        nameBn: 'দর্শন',
        icon: '📓',
        color: '#7C3AED',
        stream: 'arts',
        semesters: [1, 2, 3, 4],
        totalChapters: 8,
        totalQuestions: 112,
        order: 5,
        isActive: true,
    },
    {
        id: 'political-science',
        name: 'Political Science',
        nameBn: 'রাষ্ট্রবিজ্ঞান',
        icon: '📔',
        color: '#DB2777',
        stream: 'arts',
        semesters: [1, 2, 3, 4],
        totalChapters: 9,
        totalQuestions: 145,
        order: 6,
        isActive: true,
    },
    {
        id: 'education',
        name: 'Education',
        nameBn: 'শিক্ষাবিজ্ঞান',
        icon: '📒',
        color: '#0891B2',
        stream: 'arts',
        semesters: [1, 2, 3, 4],
        totalChapters: 7,
        totalQuestions: 98,
        order: 7,
        isActive: true,
    },
    {
        id: 'sanskrit',
        name: 'Sanskrit',
        nameBn: 'সংস্কৃত',
        icon: '📚',
        color: '#CA8A04',
        stream: 'arts',
        semesters: [1, 2, 3, 4],
        totalChapters: 6,
        totalQuestions: 87,
        order: 8,
        isActive: true,
    },
];

// Get subject by ID
export function getSubjectById(id: string): Subject | undefined {
    return sampleSubjects.find((subject) => subject.id === id);
}

// Get subjects by semester
export function getSubjectsBySemester(semester: number): Subject[] {
    return sampleSubjects.filter((subject) =>
        subject.semesters.includes(semester) && subject.isActive
    );
}

// Get all active subjects
export function getAllActiveSubjects(): Subject[] {
    return sampleSubjects.filter((subject) => subject.isActive);
}
