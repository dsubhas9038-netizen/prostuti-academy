import { Chapter } from '@/types';

export const sampleChapters: Chapter[] = [
    // ============ BENGALI CHAPTERS ============
    // Semester 1
    {
        id: 'bengali-sem1-ch1',
        subjectId: 'bengali',
        semester: 1,
        chapterNumber: 1,
        title: 'Pather Dabi',
        titleBn: 'পথের দাবী',
        author: 'Sarat Chandra Chattopadhyay',
        authorBn: 'শরৎচন্দ্র চট্টোপাধ্যায়',
        description: 'A story about Apurba and his journey',
        descriptionBn: 'অপূর্বের গল্প এবং তার যাত্রা',
        totalQuestions: 25,
        pyqStats: {
            totalMarks: 45,
            avgMarksPerYear: 8,
            yearsAsked: [2023, 2022, 2021, 2020, 2019],
        },
        order: 1,
        isActive: true,
    },
    {
        id: 'bengali-sem1-ch2',
        subjectId: 'bengali',
        semester: 1,
        chapterNumber: 2,
        title: 'Bohiragoto',
        titleBn: 'বহিরাগত',
        author: 'Rabindranath Tagore',
        authorBn: 'রবীন্দ্রনাথ ঠাকুর',
        description: 'A play about social dynamics',
        descriptionBn: 'সামাজিক গতিশীলতার উপর একটি নাটক',
        totalQuestions: 22,
        pyqStats: {
            totalMarks: 38,
            avgMarksPerYear: 7,
            yearsAsked: [2023, 2022, 2020, 2019],
        },
        order: 2,
        isActive: true,
    },
    {
        id: 'bengali-sem1-ch3',
        subjectId: 'bengali',
        semester: 1,
        chapterNumber: 3,
        title: 'Rupnaraner Kule',
        titleBn: 'রূপনারানের কূলে',
        author: 'Rabindranath Tagore',
        authorBn: 'রবীন্দ্রনাথ ঠাকুর',
        description: 'A beautiful poem about nature',
        descriptionBn: 'প্রকৃতির উপর একটি সুন্দর কবিতা',
        totalQuestions: 18,
        pyqStats: {
            totalMarks: 32,
            avgMarksPerYear: 6,
            yearsAsked: [2023, 2021, 2020, 2018],
        },
        order: 3,
        isActive: true,
    },
    // Semester 2
    {
        id: 'bengali-sem2-ch1',
        subjectId: 'bengali',
        semester: 2,
        chapterNumber: 1,
        title: 'Bharat Tirth',
        titleBn: 'ভারততীর্থ',
        author: 'Rabindranath Tagore',
        authorBn: 'রবীন্দ্রনাথ ঠাকুর',
        description: 'A poem about unity in diversity',
        descriptionBn: 'বৈচিত্র্যে ঐক্য বিষয়ক কবিতা',
        totalQuestions: 20,
        pyqStats: {
            totalMarks: 40,
            avgMarksPerYear: 8,
            yearsAsked: [2023, 2022, 2021, 2020, 2019],
        },
        order: 1,
        isActive: true,
    },
    {
        id: 'bengali-sem2-ch2',
        subjectId: 'bengali',
        semester: 2,
        chapterNumber: 2,
        title: 'Krandasi',
        titleBn: 'ক্রন্দসী',
        author: 'Manik Bandopadhyay',
        authorBn: 'মানিক বন্দ্যোপাধ্যায়',
        description: 'A story of struggle and emotion',
        descriptionBn: 'সংগ্রাম এবং আবেগের গল্প',
        totalQuestions: 23,
        pyqStats: {
            totalMarks: 42,
            avgMarksPerYear: 8,
            yearsAsked: [2023, 2022, 2021, 2020],
        },
        order: 2,
        isActive: true,
    },
    // Semester 3
    {
        id: 'bengali-sem3-ch1',
        subjectId: 'bengali',
        semester: 3,
        chapterNumber: 1,
        title: 'Agnibeena',
        titleBn: 'অগ্নিবীণা',
        author: 'Kazi Nazrul Islam',
        authorBn: 'কাজী নজরুল ইসলাম',
        description: 'Collection of revolutionary poems',
        descriptionBn: 'বিদ্রোহী কবিতার সংকলন',
        totalQuestions: 28,
        pyqStats: {
            totalMarks: 50,
            avgMarksPerYear: 10,
            yearsAsked: [2023, 2022, 2021, 2020, 2019],
        },
        order: 1,
        isActive: true,
    },
    {
        id: 'bengali-sem3-ch2',
        subjectId: 'bengali',
        semester: 3,
        chapterNumber: 2,
        title: 'Nandini',
        titleBn: 'নন্দিনী',
        author: 'Rabindranath Tagore',
        authorBn: 'রবীন্দ্রনাথ ঠাকুর',
        description: 'A symbolic drama about freedom',
        descriptionBn: 'স্বাধীনতা বিষয়ক প্রতীকী নাটক',
        totalQuestions: 22,
        pyqStats: {
            totalMarks: 40,
            avgMarksPerYear: 8,
            yearsAsked: [2023, 2022, 2020, 2019],
        },
        order: 2,
        isActive: true,
    },

    // ============ ENGLISH CHAPTERS ============
    // Semester 1
    {
        id: 'english-sem1-ch1',
        subjectId: 'english',
        semester: 1,
        chapterNumber: 1,
        title: 'The Eyes Have It',
        titleBn: 'দ্য আইজ হ্যাভ ইট',
        author: 'Ruskin Bond',
        authorBn: 'রাস্কিন বন্ড',
        description: 'A story about perception and reality',
        descriptionBn: 'উপলব্ধি এবং বাস্তবতার গল্প',
        totalQuestions: 20,
        pyqStats: {
            totalMarks: 38,
            avgMarksPerYear: 7,
            yearsAsked: [2023, 2022, 2021, 2020, 2019],
        },
        order: 1,
        isActive: true,
    },
    {
        id: 'english-sem1-ch2',
        subjectId: 'english',
        semester: 1,
        chapterNumber: 2,
        title: 'Strong Roots',
        titleBn: 'স্ট্রং রুটস',
        author: 'APJ Abdul Kalam',
        authorBn: 'এ.পি.জে. আব্দুল কালাম',
        description: 'An autobiography excerpt',
        descriptionBn: 'আত্মজীবনীর অংশ',
        totalQuestions: 18,
        pyqStats: {
            totalMarks: 35,
            avgMarksPerYear: 7,
            yearsAsked: [2023, 2022, 2021, 2019],
        },
        order: 2,
        isActive: true,
    },
    {
        id: 'english-sem1-ch3',
        subjectId: 'english',
        semester: 1,
        chapterNumber: 3,
        title: 'On Killing A Tree',
        titleBn: 'অন কিলিং এ ট্রি',
        author: 'Gieve Patel',
        authorBn: 'গিভ প্যাটেল',
        description: 'A poem about nature destruction',
        descriptionBn: 'প্রকৃতি ধ্বংসের কবিতা',
        totalQuestions: 15,
        pyqStats: {
            totalMarks: 28,
            avgMarksPerYear: 5,
            yearsAsked: [2023, 2022, 2020, 2018],
        },
        order: 3,
        isActive: true,
    },
    // Semester 2
    {
        id: 'english-sem2-ch1',
        subjectId: 'english',
        semester: 2,
        chapterNumber: 1,
        title: 'The Proposal',
        titleBn: 'দ্য প্রপোজাল',
        author: 'Anton Chekhov',
        authorBn: 'আন্তন চেখভ',
        description: 'A one-act comedy about marriage proposal',
        descriptionBn: 'বিবাহের প্রস্তাব নিয়ে একটি একাঙ্ক কমেডি',
        totalQuestions: 18,
        pyqStats: {
            totalMarks: 35,
            avgMarksPerYear: 7,
            yearsAsked: [2023, 2022, 2021, 2019],
        },
        order: 1,
        isActive: true,
    },
    {
        id: 'english-sem2-ch2',
        subjectId: 'english',
        semester: 2,
        chapterNumber: 2,
        title: 'Asleep in the Valley',
        titleBn: 'অ্যাসলিপ ইন দ্য ভ্যালি',
        author: 'Arthur Rimbaud',
        authorBn: 'আর্থার র্যাঁবো',
        description: 'An anti-war poem',
        descriptionBn: 'যুদ্ধ বিরোধী কবিতা',
        totalQuestions: 15,
        pyqStats: {
            totalMarks: 28,
            avgMarksPerYear: 5,
            yearsAsked: [2023, 2021, 2020, 2018],
        },
        order: 2,
        isActive: true,
    },

    // ============ HISTORY CHAPTERS ============
    // Semester 1
    {
        id: 'history-sem1-ch1',
        subjectId: 'history',
        semester: 1,
        chapterNumber: 1,
        title: 'Renaissance and Reformation',
        titleBn: 'রেনেসাঁ ও ধর্মসংস্কার',
        author: null,
        authorBn: null,
        description: 'European Renaissance and religious reformation',
        descriptionBn: 'ইউরোপীয় রেনেসাঁ এবং ধর্মীয় সংস্কার',
        totalQuestions: 28,
        pyqStats: {
            totalMarks: 52,
            avgMarksPerYear: 10,
            yearsAsked: [2023, 2022, 2021, 2020, 2019],
        },
        order: 1,
        isActive: true,
    },
    {
        id: 'history-sem1-ch2',
        subjectId: 'history',
        semester: 1,
        chapterNumber: 2,
        title: 'French Revolution',
        titleBn: 'ফরাসি বিপ্লব',
        author: null,
        authorBn: null,
        description: 'The causes and effects of French Revolution',
        descriptionBn: 'ফরাসি বিপ্লবের কারণ ও প্রভাব',
        totalQuestions: 32,
        pyqStats: {
            totalMarks: 58,
            avgMarksPerYear: 11,
            yearsAsked: [2023, 2022, 2021, 2020, 2019],
        },
        order: 2,
        isActive: true,
    },
    // Semester 2
    {
        id: 'history-sem2-ch1',
        subjectId: 'history',
        semester: 2,
        chapterNumber: 1,
        title: 'Industrial Revolution',
        titleBn: 'শিল্প বিপ্লব',
        author: null,
        authorBn: null,
        description: 'The transformation of manufacturing',
        descriptionBn: 'উৎপাদন ব্যবস্থার রূপান্তর',
        totalQuestions: 25,
        pyqStats: {
            totalMarks: 48,
            avgMarksPerYear: 9,
            yearsAsked: [2023, 2022, 2021, 2020, 2019],
        },
        order: 1,
        isActive: true,
    },
    {
        id: 'history-sem2-ch2',
        subjectId: 'history',
        semester: 2,
        chapterNumber: 2,
        title: 'Imperialism and Colonialism',
        titleBn: 'সাম্রাজ্যবাদ ও উপনিবেশবাদ',
        author: null,
        authorBn: null,
        description: 'European expansion and colonization',
        descriptionBn: 'ইউরোপীয় সম্প্রসারণ ও উপনিবেশ স্থাপন',
        totalQuestions: 30,
        pyqStats: {
            totalMarks: 55,
            avgMarksPerYear: 11,
            yearsAsked: [2023, 2022, 2021, 2020, 2019],
        },
        order: 2,
        isActive: true,
    },

    // ============ GEOGRAPHY CHAPTERS ============
    // Semester 1
    {
        id: 'geography-sem1-ch1',
        subjectId: 'geography',
        semester: 1,
        chapterNumber: 1,
        title: 'Geomorphology',
        titleBn: 'ভূমিরূপবিদ্যা',
        author: null,
        authorBn: null,
        description: 'Study of landforms and their formation',
        descriptionBn: 'ভূমিরূপ এবং তাদের গঠনের অধ্যয়ন',
        totalQuestions: 24,
        pyqStats: {
            totalMarks: 45,
            avgMarksPerYear: 9,
            yearsAsked: [2023, 2022, 2021, 2020, 2019],
        },
        order: 1,
        isActive: true,
    },
    {
        id: 'geography-sem1-ch2',
        subjectId: 'geography',
        semester: 1,
        chapterNumber: 2,
        title: 'Atmosphere',
        titleBn: 'বায়ুমণ্ডল',
        author: null,
        authorBn: null,
        description: 'Study of atmospheric layers and climate',
        descriptionBn: 'বায়ুমণ্ডলের স্তর এবং জলবায়ুর অধ্যয়ন',
        totalQuestions: 22,
        pyqStats: {
            totalMarks: 40,
            avgMarksPerYear: 8,
            yearsAsked: [2023, 2022, 2021, 2020],
        },
        order: 2,
        isActive: true,
    },

    // ============ PHILOSOPHY CHAPTERS ============
    // Semester 1
    {
        id: 'philosophy-sem1-ch1',
        subjectId: 'philosophy',
        semester: 1,
        chapterNumber: 1,
        title: 'Nature and Scope of Philosophy',
        titleBn: 'দর্শনের প্রকৃতি ও পরিধি',
        author: null,
        authorBn: null,
        description: 'Introduction to philosophical thinking',
        descriptionBn: 'দার্শনিক চিন্তার পরিচয়',
        totalQuestions: 18,
        pyqStats: {
            totalMarks: 32,
            avgMarksPerYear: 6,
            yearsAsked: [2023, 2022, 2021, 2020],
        },
        order: 1,
        isActive: true,
    },
    {
        id: 'philosophy-sem1-ch2',
        subjectId: 'philosophy',
        semester: 1,
        chapterNumber: 2,
        title: 'Logic and Reasoning',
        titleBn: 'যুক্তিবিদ্যা',
        author: null,
        authorBn: null,
        description: 'Fundamentals of logical reasoning',
        descriptionBn: 'যৌক্তিক যুক্তির মৌলিক বিষয়',
        totalQuestions: 25,
        pyqStats: {
            totalMarks: 48,
            avgMarksPerYear: 9,
            yearsAsked: [2023, 2022, 2021, 2020, 2019],
        },
        order: 2,
        isActive: true,
    },

    // ============ POLITICAL SCIENCE CHAPTERS ============
    // Semester 1
    {
        id: 'polsci-sem1-ch1',
        subjectId: 'political-science',
        semester: 1,
        chapterNumber: 1,
        title: 'Nature of Political Science',
        titleBn: 'রাষ্ট্রবিজ্ঞানের প্রকৃতি',
        author: null,
        authorBn: null,
        description: 'Introduction to Political Science',
        descriptionBn: 'রাষ্ট্রবিজ্ঞানের পরিচয়',
        totalQuestions: 20,
        pyqStats: {
            totalMarks: 38,
            avgMarksPerYear: 7,
            yearsAsked: [2023, 2022, 2021, 2020],
        },
        order: 1,
        isActive: true,
    },

    // ============ EDUCATION CHAPTERS ============
    // Semester 1
    {
        id: 'education-sem1-ch1',
        subjectId: 'education',
        semester: 1,
        chapterNumber: 1,
        title: 'Meaning and Nature of Education',
        titleBn: 'শিক্ষার অর্থ ও প্রকৃতি',
        author: null,
        authorBn: null,
        description: 'Basic concepts of education',
        descriptionBn: 'শিক্ষার মৌলিক ধারণা',
        totalQuestions: 16,
        pyqStats: {
            totalMarks: 30,
            avgMarksPerYear: 6,
            yearsAsked: [2023, 2022, 2021, 2020],
        },
        order: 1,
        isActive: true,
    },

    // ============ SANSKRIT CHAPTERS ============
    // Semester 1
    {
        id: 'sanskrit-sem1-ch1',
        subjectId: 'sanskrit',
        semester: 1,
        chapterNumber: 1,
        title: 'Sanskrit Prose',
        titleBn: 'সংস্কৃত গদ্য',
        author: null,
        authorBn: null,
        description: 'Selected Sanskrit prose passages',
        descriptionBn: 'নির্বাচিত সংস্কৃত গদ্যাংশ',
        totalQuestions: 14,
        pyqStats: {
            totalMarks: 25,
            avgMarksPerYear: 5,
            yearsAsked: [2023, 2022, 2021],
        },
        order: 1,
        isActive: true,
    },
];

// Get chapters by subject ID
export function getChaptersBySubjectId(subjectId: string): Chapter[] {
    return sampleChapters
        .filter((chapter) => chapter.subjectId === subjectId && chapter.isActive)
        .sort((a, b) => a.order - b.order);
}

// Get chapters by subject ID and semester
export function getChaptersBySubjectAndSemester(
    subjectId: string,
    semester: number
): Chapter[] {
    return sampleChapters
        .filter(
            (chapter) =>
                chapter.subjectId === subjectId &&
                chapter.semester === semester &&
                chapter.isActive
        )
        .sort((a, b) => a.order - b.order);
}

// Get chapter by ID
export function getChapterById(chapterId: string): Chapter | undefined {
    return sampleChapters.find((chapter) => chapter.id === chapterId);
}

// Get total questions for a subject
export function getTotalQuestionsBySubject(subjectId: string): number {
    return sampleChapters
        .filter((chapter) => chapter.subjectId === subjectId)
        .reduce((total, chapter) => total + chapter.totalQuestions, 0);
}
