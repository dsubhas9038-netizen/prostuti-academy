// SEO Constants and Configuration
// Centralized SEO configuration values

// Social media profiles
export const socialProfiles = {
    facebook: 'https://facebook.com/prostutiacademy',
    twitter: 'https://twitter.com/prostutiacademy',
    instagram: 'https://instagram.com/prostutiacademy',
    youtube: 'https://youtube.com/@prostutiacademy',
    linkedin: 'https://linkedin.com/company/prostutiacademy',
};

// Page priorities for sitemap
export const pagePriorities = {
    home: 1.0,
    subjects: 0.9,
    mockTests: 0.9,
    pyqAnalysis: 0.8,
    resources: 0.8,
    leaderboard: 0.7,
    studyPlanner: 0.7,
    about: 0.6,
    contact: 0.6,
    pricing: 0.6,
    auth: 0.5,
    legal: 0.3,
};

// Change frequencies for sitemap
export const changeFrequencies = {
    daily: 'daily' as const,
    weekly: 'weekly' as const,
    monthly: 'monthly' as const,
    yearly: 'yearly' as const,
    never: 'never' as const,
};

// OG Image dimensions
export const ogImageDimensions = {
    width: 1200,
    height: 630,
};

// Twitter card types
export const twitterCardTypes = {
    summary: 'summary',
    summaryLargeImage: 'summary_large_image',
    app: 'app',
    player: 'player',
};

// Common meta robots values
export const robotsDirectives = {
    default: 'index, follow',
    noIndex: 'noindex, follow',
    noFollow: 'index, nofollow',
    none: 'noindex, nofollow',
    noArchive: 'noarchive',
    noSnippet: 'nosnippet',
};

// Language codes
export const languageCodes = {
    bengali: 'bn',
    english: 'en',
    bengaliBD: 'bn-BD',
    bengaliIN: 'bn-IN',
};

// Locale settings
export const localeSettings = {
    default: 'bn_BD',
    alternates: ['en_US', 'bn_IN'],
};

// Subject names with translations
export const subjectNames: Record<string, { en: string; bn: string }> = {
    bengali: { en: 'Bengali', bn: 'বাংলা' },
    english: { en: 'English', bn: 'ইংরেজি' },
    history: { en: 'History', bn: 'ইতিহাস' },
    geography: { en: 'Geography', bn: 'ভূগোল' },
    'political-science': { en: 'Political Science', bn: 'রাষ্ট্রবিজ্ঞান' },
    philosophy: { en: 'Philosophy', bn: 'দর্শন' },
    education: { en: 'Education', bn: 'শিক্ষা বিজ্ঞান' },
    sanskrit: { en: 'Sanskrit', bn: 'সংস্কৃত' },
    economics: { en: 'Economics', bn: 'অর্থনীতি' },
    sociology: { en: 'Sociology', bn: 'সমাজবিদ্যা' },
};

// Common FAQs for SEO
export const commonFAQs = [
    {
        question: 'ProstutiAcademy কি সম্পূর্ণ ফ্রি?',
        answer: 'হ্যাঁ, ProstutiAcademy সম্পূর্ণ ফ্রি! আমাদের সমস্ত question bank, mock tests, এবং study materials বিনামূল্যে ব্যবহার করতে পারবে।',
    },
    {
        question: 'কোন ক্লাসের জন্য এই প্ল্যাটফর্ম?',
        answer: 'ProstutiAcademy মূলত West Bengal Higher Secondary (Class 11-12) Arts stream এর students দের জন্য তৈরি।',
    },
    {
        question: 'মোবাইলে ব্যবহার করা যাবে?',
        answer: 'হ্যাঁ, আমাদের platform সম্পূর্ণ mobile-friendly এবং PWA হিসাবে install করা যায়।',
    },
    {
        question: 'কোন কোন বিষয় আছে?',
        answer: 'Bengali, English, History, Geography, Political Science, Philosophy, Education, Sanskrit, Economics, এবং Sociology।',
    },
    {
        question: 'Mock test কিভাবে দেব?',
        answer: 'Mock Tests section এ গিয়ে তোমার বিষয় select করে test start করতে পারবে। Real exam pattern এ প্রস্তুত হতে পারবে।',
    },
];

// SEO-friendly URL slugs
export const urlSlugs = {
    subjects: '/subjects',
    mockTests: '/mock-tests',
    pyqAnalysis: '/pyq-analysis',
    resources: '/resources',
    leaderboard: '/leaderboard',
    studyPlanner: '/study-planner',
    dashboard: '/dashboard',
    pricing: '/pricing',
    about: '/about',
    contact: '/contact',
    terms: '/terms',
    privacy: '/privacy',
    login: '/login',
    signup: '/signup',
};

// Canonical URL helpers
export function getCanonicalUrl(path: string, baseUrl?: string): string {
    const base = baseUrl || process.env.NEXT_PUBLIC_SITE_URL || 'https://prostutiacademy.web.app';
    const cleanPath = path.startsWith('/') ? path : `/${path}`;
    return `${base}${cleanPath}`;
}

// Generate hreflang tags
export function generateHreflangTags(path: string) {
    const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://prostutiacademy.web.app';
    const url = `${baseUrl}${path}`;

    return [
        { hreflang: 'bn', href: url },
        { hreflang: 'en', href: url },
        { hreflang: 'x-default', href: url },
    ];
}

export default {
    socialProfiles,
    pagePriorities,
    changeFrequencies,
    ogImageDimensions,
    twitterCardTypes,
    robotsDirectives,
    languageCodes,
    localeSettings,
    subjectNames,
    commonFAQs,
    urlSlugs,
    getCanonicalUrl,
    generateHreflangTags,
};
