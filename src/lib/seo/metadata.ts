// SEO Metadata Utilities
// Provides consistent metadata across pages

import { Metadata } from 'next';

// Base configuration
export const siteConfig = {
    name: 'ProstutiAcademy',
    nameBn: 'প্রস্তুতি একাডেমি',
    tagline: 'তোমার EXAM আমাদের প্রস্তুতি',
    description: 'West Bengal HS পরীক্ষার জন্য সেরা প্রস্তুতি - সম্পূর্ণ ফ্রি! বাংলা ও English-এ Exam-oriented questions, mock tests, এবং PYQ analysis।',
    url: process.env.NEXT_PUBLIC_SITE_URL || 'https://prostutiacademy.web.app',
    ogImage: '/og-image.png',
    twitter: '@prostutiacademy',
    locale: 'bn_BD',
    creator: 'ProstutiAcademy Team',
};

// Default keywords
export const defaultKeywords = [
    'WB HS Exam',
    'West Bengal',
    'Higher Secondary',
    'HS Arts',
    'Bengali Medium',
    'Question Bank',
    'Mock Test',
    'PYQ',
    'Previous Year Questions',
    'WBCHSE',
    'Class 11',
    'Class 12',
    'Semester 4',
    'উচ্চ মাধ্যমিক',
    'পরীক্ষা প্রস্তুতি',
    'বাংলা মাধ্যম',
];

// Subject-specific keywords
export const subjectKeywords: Record<string, string[]> = {
    bengali: ['বাংলা', 'Bengali Literature', 'Bangla Grammar', 'বাংলা সাহিত্য'],
    english: ['English Literature', 'English Grammar', 'ইংরেজি'],
    history: ['ইতিহাস', 'World History', 'Indian History', 'বিশ্ব ইতিহাস'],
    geography: ['ভূগোল', 'Physical Geography', 'Human Geography'],
    'political-science': ['রাষ্ট্রবিজ্ঞান', 'Political Theory', 'Indian Politics'],
    philosophy: ['দর্শন', 'Logic', 'Ethics', 'যুক্তিবিদ্যা'],
    education: ['শিক্ষা বিজ্ঞান', 'Teaching Methods', 'Child Psychology'],
    sanskrit: ['সংস্কৃত', 'Sanskrit Literature', 'Sanskrit Grammar'],
    economics: ['অর্থনীতি', 'Microeconomics', 'Macroeconomics'],
    sociology: ['সমাজবিদ্যা', 'Social Theory', 'Indian Society'],
};

// Generate page metadata
export function generateMetadata({
    title,
    description,
    keywords = [],
    path = '',
    image,
    noIndex = false,
}: {
    title: string;
    description?: string;
    keywords?: string[];
    path?: string;
    image?: string;
    noIndex?: boolean;
}): Metadata {
    const fullTitle = title === siteConfig.name
        ? `${siteConfig.name} - ${siteConfig.tagline}`
        : `${title} | ${siteConfig.name}`;

    const fullDescription = description || siteConfig.description;
    const fullUrl = `${siteConfig.url}${path}`;
    const ogImage = image || siteConfig.ogImage;

    return {
        title: fullTitle,
        description: fullDescription,
        keywords: [...defaultKeywords, ...keywords],
        authors: [{ name: siteConfig.creator }],
        creator: siteConfig.creator,
        publisher: siteConfig.name,
        metadataBase: new URL(siteConfig.url),
        alternates: {
            canonical: fullUrl,
            languages: {
                'bn-BD': fullUrl,
                'en-US': fullUrl,
            },
        },
        openGraph: {
            title: fullTitle,
            description: fullDescription,
            url: fullUrl,
            siteName: siteConfig.name,
            images: [
                {
                    url: ogImage,
                    width: 1200,
                    height: 630,
                    alt: title,
                },
            ],
            locale: siteConfig.locale,
            type: 'website',
        },
        twitter: {
            card: 'summary_large_image',
            title: fullTitle,
            description: fullDescription,
            images: [ogImage],
            creator: siteConfig.twitter,
        },
        robots: noIndex ? {
            index: false,
            follow: false,
        } : {
            index: true,
            follow: true,
            googleBot: {
                index: true,
                follow: true,
                'max-video-preview': -1,
                'max-image-preview': 'large',
                'max-snippet': -1,
            },
        },
        verification: {
            google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION,
        },
    };
}

// Generate subject page metadata
export function generateSubjectMetadata(
    subjectId: string,
    subjectName: string,
    subjectNameBn: string
): Metadata {
    const keywords = subjectKeywords[subjectId] || [];

    return generateMetadata({
        title: `${subjectName} (${subjectNameBn})`,
        description: `${subjectName} এর জন্য সেরা প্রস্তুতি। ${subjectNameBn} বিষয়ে Exam-oriented questions, mock tests, এবং PYQ analysis।`,
        keywords: [...keywords, subjectName, subjectNameBn],
        path: `/subjects/${subjectId}`,
    });
}

// Generate chapter page metadata
export function generateChapterMetadata(
    subjectName: string,
    chapterName: string,
    chapterNameBn: string
): Metadata {
    return generateMetadata({
        title: `${chapterName} - ${subjectName}`,
        description: `${chapterNameBn} অধ্যায়ের সম্পূর্ণ প্রশ্ন ব্যাংক। ${subjectName} এর ${chapterName} থেকে গুরুত্বপূর্ণ প্রশ্ন ও উত্তর।`,
        keywords: [chapterName, chapterNameBn, subjectName],
    });
}

// Generate mock test metadata
export function generateTestMetadata(
    testTitle: string,
    subjectName?: string
): Metadata {
    return generateMetadata({
        title: testTitle,
        description: `${testTitle} - ${subjectName || 'HS'} পরীক্ষার জন্য Mock Test। Real exam pattern অনুযায়ী প্রস্তুত হও।`,
        keywords: ['Mock Test', 'Practice Test', 'Online Exam'],
        path: '/mock-tests',
    });
}

export default {
    siteConfig,
    defaultKeywords,
    subjectKeywords,
    generateMetadata,
    generateSubjectMetadata,
    generateChapterMetadata,
    generateTestMetadata,
};
