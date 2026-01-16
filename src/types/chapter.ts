export interface Chapter {
    id: string;
    subjectId: string;
    semester: 1 | 2 | 3 | 4;
    chapterNumber: number;
    title: string;
    titleBn: string;
    author: string | null;
    authorBn: string | null;
    description: string;
    descriptionBn: string;
    totalQuestions: number;
    pyqStats: PyqStats;
    order: number;
    isActive: boolean;
}

export interface PyqStats {
    totalMarks: number;
    avgMarksPerYear: number;
    yearsAsked: number[];
}
