// Sample Data Exports
export {
    sampleSubjects,
    getAllActiveSubjects,
    getSubjectById,
} from './sampleSubjects';

export {
    sampleChapters,
    getChaptersBySubjectId,
    getChaptersBySubjectAndSemester,
    getChapterById,
    getTotalQuestionsBySubject
} from './sampleChapters';

export {
    sampleQuestions,
    getQuestionsByChapterId,
    getQuestionsByChapterAndType,
    getQuestionById,
    getImportantQuestionsBySubject,
    getPYQQuestionsBySubject,
    getQuestionCountsByChapter,
} from './sampleQuestions';

export {
    sampleTests,
    getTestById,
    getTestsByType,
    getTestsBySubject,
    getTestsByChapter,
    getFreeTests,
    getAllActiveTests,
    getPopularTests,
    getTestsByDifficulty,
} from './sampleTests';

export {
    samplePYQAnalysis,
    pyqSummary,
    getPYQAnalysisBySubject,
    getAllTopTopics,
    getTrendPredictions,
    getAggregatedYearData,
} from './samplePYQData';

export {
    samplePDFResources,
    getAllPDFResources,
    getPDFResourcesByCategory,
    getPDFResourcesBySubject,
    getFeaturedPDFResources,
    getPopularPDFResources,
    getNewPDFResources,
    getPDFResourceById,
    searchPDFResources,
    getCategoryCounts,
    getSubjectResourceCounts,
} from './samplePDFResources';

export {
    sampleUserStats,
    sampleSubjectProgress,
    sampleStreakData,
    sampleRecentActivity,
    sampleQuickLinks,
    sampleRecommendedItems,
    examDates,
    getUserStats,
    getSubjectProgress,
    getStreakData,
    getRecentActivity,
    getQuickLinks,
    getRecommendedItems,
} from './sampleDashboardData';
