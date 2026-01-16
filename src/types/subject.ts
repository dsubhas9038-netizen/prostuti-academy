export interface Subject {
    id: string;
    name: string;
    nameBn: string;
    icon: string;
    color: string;
    stream: 'arts' | 'commerce' | 'science' | 'common';
    semesters: number[];
    totalChapters: number;
    totalQuestions: number;
    order: number;
    isActive: boolean;
}
