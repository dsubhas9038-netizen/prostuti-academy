import { PDFResource, PDFCategory, pdfCategoryConfig } from '@/types/pdf';

// Sample PDF Resources
export const samplePDFResources: PDFResource[] = [
    // ============ BENGALI NOTES ============
    {
        id: 'pdf-bengali-notes-pd',
        title: 'Pather Dabi Complete Notes',
        titleBn: 'পথের দাবী সম্পূর্ণ নোটস',
        description: 'Comprehensive notes covering all aspects of Pather Dabi',
        descriptionBn: 'পথের দাবী গল্পের সম্পূর্ণ বিশ্লেষণ ও নোটস',
        category: 'notes',
        subjectId: 'bengali',
        chapterId: 'bengali-sem1-ch1',
        semester: 1,
        fileUrl: 'https://drive.google.com/file/d/example1/view',
        thumbnailUrl: '/images/pdf-thumbnails/bengali-notes.png',
        fileSize: 2540,
        pageCount: 25,
        format: 'pdf',
        author: 'ProstutiAcademy',
        authorBn: 'প্রস্তুতি একাডেমি',
        publishedDate: new Date('2024-01-10'),
        downloads: 2350,
        views: 5200,
        rating: 4.5,
        ratingCount: 128,
        isFree: true,
        isPremium: false,
        isFeatured: true,
        isNew: false,
        isPopular: true,
        isActive: true,
        tags: ['পথের দাবী', 'শরৎচন্দ্র', 'গদ্য', 'সেমিস্টার ১'],
    },
    {
        id: 'pdf-bengali-notes-bh',
        title: 'Bhaat Complete Notes',
        titleBn: 'ভাত সম্পূর্ণ নোটস',
        description: 'Detailed notes on Bhaat by Mahasweta Devi',
        descriptionBn: 'মহাশ্বেতা দেবীর ভাত গল্পের বিস্তারিত নোটস',
        category: 'notes',
        subjectId: 'bengali',
        chapterId: 'bengali-sem1-ch2',
        semester: 1,
        fileUrl: 'https://drive.google.com/file/d/example2/view',
        fileSize: 1850,
        pageCount: 18,
        format: 'pdf',
        author: 'ProstutiAcademy',
        publishedDate: new Date('2024-01-15'),
        downloads: 1890,
        views: 4100,
        rating: 4.3,
        ratingCount: 95,
        isFree: true,
        isPremium: false,
        isFeatured: false,
        isNew: true,
        isPopular: true,
        isActive: true,
        tags: ['ভাত', 'মহাশ্বেতা দেবী', 'গদ্য'],
    },

    // ============ ENGLISH NOTES ============
    {
        id: 'pdf-english-notes-eh',
        title: 'The Eyes Have It Notes',
        titleBn: 'দ্য আইজ হ্যাভ ইট নোটস',
        description: 'Complete analysis of The Eyes Have It by Ruskin Bond',
        descriptionBn: 'রাস্কিন বন্ডের গল্পের সম্পূর্ণ বিশ্লেষণ',
        category: 'notes',
        subjectId: 'english',
        chapterId: 'english-sem1-ch1',
        semester: 1,
        fileUrl: 'https://drive.google.com/file/d/example3/view',
        fileSize: 1650,
        pageCount: 15,
        format: 'pdf',
        author: 'ProstutiAcademy',
        publishedDate: new Date('2024-01-12'),
        downloads: 1780,
        views: 3900,
        rating: 4.8,
        ratingCount: 112,
        isFree: true,
        isPremium: false,
        isFeatured: true,
        isNew: false,
        isPopular: true,
        isActive: true,
        tags: ['The Eyes Have It', 'Ruskin Bond', 'Prose'],
    },
    {
        id: 'pdf-english-guide-grammar',
        title: 'English Grammar Complete Guide',
        titleBn: 'ইংরেজি গ্রামার সম্পূর্ণ গাইড',
        description: 'Comprehensive grammar rules and examples',
        descriptionBn: 'সম্পূর্ণ গ্রামার রুলস এবং উদাহরণ',
        category: 'guides',
        subjectId: 'english',
        semester: null,
        fileUrl: 'https://drive.google.com/file/d/example4/view',
        fileSize: 4200,
        pageCount: 45,
        format: 'pdf',
        author: 'ProstutiAcademy',
        publishedDate: new Date('2024-01-08'),
        downloads: 3200,
        views: 7500,
        rating: 4.9,
        ratingCount: 256,
        isFree: false,
        isPremium: true,
        isFeatured: true,
        isNew: false,
        isPopular: true,
        isActive: true,
        tags: ['Grammar', 'English', 'Guide'],
    },

    // ============ HISTORY NOTES ============
    {
        id: 'pdf-history-notes-ren',
        title: 'Renaissance Complete Notes',
        titleBn: 'রেনেসাঁস সম্পূর্ণ নোটস',
        description: 'Detailed notes on Renaissance period',
        descriptionBn: 'রেনেসাঁস যুগের বিস্তারিত নোটস',
        category: 'notes',
        subjectId: 'history',
        chapterId: 'history-sem1-ch1',
        semester: 1,
        fileUrl: 'https://drive.google.com/file/d/example5/view',
        fileSize: 3100,
        pageCount: 32,
        format: 'pdf',
        author: 'ProstutiAcademy',
        publishedDate: new Date('2024-01-14'),
        downloads: 1520,
        views: 3200,
        rating: 4.2,
        ratingCount: 78,
        isFree: true,
        isPremium: false,
        isFeatured: false,
        isNew: true,
        isPopular: false,
        isActive: true,
        tags: ['রেনেসাঁস', 'ইতিহাস', 'সেমিস্টার ১'],
    },

    // ============ SYLLABUS ============
    {
        id: 'pdf-syllabus-arts-2024',
        title: 'HS Arts Syllabus 2024',
        titleBn: 'উচ্চমাধ্যমিক আর্টস সিলেবাস ২০২৪',
        description: 'Complete syllabus for HS Arts 2024',
        descriptionBn: 'উচ্চমাধ্যমিক আর্টস ২০২৪ সম্পূর্ণ সিলেবাস',
        category: 'syllabus',
        subjectId: null,
        semester: null,
        fileUrl: 'https://drive.google.com/file/d/example6/view',
        fileSize: 850,
        pageCount: 12,
        format: 'pdf',
        author: 'WBCHSE',
        publishedDate: new Date('2024-01-01'),
        downloads: 5200,
        views: 12000,
        rating: 4.7,
        ratingCount: 312,
        isFree: true,
        isPremium: false,
        isFeatured: true,
        isNew: false,
        isPopular: true,
        isActive: true,
        tags: ['Syllabus', 'Arts', '2024', 'WBCHSE'],
    },
    {
        id: 'pdf-syllabus-bengali-2024',
        title: 'Bengali Syllabus 2024',
        titleBn: 'বাংলা সিলেবাস ২০২৪',
        description: 'Complete Bengali subject syllabus',
        descriptionBn: 'বাংলা বিষয়ের সম্পূর্ণ সিলেবাস',
        category: 'syllabus',
        subjectId: 'bengali',
        semester: null,
        fileUrl: 'https://drive.google.com/file/d/example7/view',
        fileSize: 420,
        pageCount: 6,
        format: 'pdf',
        author: 'WBCHSE',
        publishedDate: new Date('2024-01-01'),
        downloads: 2100,
        views: 4500,
        rating: 4.5,
        ratingCount: 145,
        isFree: true,
        isPremium: false,
        isFeatured: false,
        isNew: false,
        isPopular: false,
        isActive: true,
        tags: ['Syllabus', 'Bengali', '2024'],
    },

    // ============ MODEL PAPERS ============
    {
        id: 'pdf-model-arts-2024-1',
        title: 'Model Paper 1 - Arts 2024',
        titleBn: 'মডেল পেপার ১ - আর্টস ২০২৪',
        description: 'Full model paper with solutions',
        descriptionBn: 'সম্পূর্ণ মডেল পেপার সমাধান সহ',
        category: 'model-papers',
        subjectId: null,
        semester: null,
        fileUrl: 'https://drive.google.com/file/d/example8/view',
        fileSize: 3500,
        pageCount: 35,
        format: 'pdf',
        author: 'ProstutiAcademy',
        publishedDate: new Date('2024-02-01'),
        downloads: 4800,
        views: 9500,
        rating: 4.9,
        ratingCount: 289,
        isFree: false,
        isPremium: true,
        isFeatured: true,
        isNew: true,
        isPopular: true,
        isActive: true,
        tags: ['Model Paper', 'Arts', '2024', 'Solutions'],
    },
    {
        id: 'pdf-model-bengali-2024',
        title: 'Bengali Model Paper 2024',
        titleBn: 'বাংলা মডেল পেপার ২০২৪',
        description: 'Bengali subject model paper',
        descriptionBn: 'বাংলা বিষয়ের মডেল পেপার',
        category: 'model-papers',
        subjectId: 'bengali',
        semester: null,
        fileUrl: 'https://drive.google.com/file/d/example9/view',
        fileSize: 1200,
        pageCount: 12,
        format: 'pdf',
        author: 'ProstutiAcademy',
        publishedDate: new Date('2024-02-05'),
        downloads: 2100,
        views: 4200,
        rating: 4.6,
        ratingCount: 156,
        isFree: true,
        isPremium: false,
        isFeatured: false,
        isNew: true,
        isPopular: false,
        isActive: true,
        tags: ['Model Paper', 'Bengali', '2024'],
    },

    // ============ PREVIOUS PAPERS ============
    {
        id: 'pdf-pyq-2023-bengali',
        title: 'Bengali PYQ 2023',
        titleBn: 'বাংলা প্রশ্নপত্র ২০২৩',
        description: 'Previous year question paper with solutions',
        descriptionBn: 'বিগত বছরের প্রশ্নপত্র সমাধান সহ',
        category: 'previous-papers',
        subjectId: 'bengali',
        semester: null,
        year: 2023,
        fileUrl: 'https://drive.google.com/file/d/example10/view',
        fileSize: 1800,
        pageCount: 18,
        format: 'pdf',
        author: 'WBCHSE',
        publishedDate: new Date('2023-04-15'),
        downloads: 3500,
        views: 7200,
        rating: 4.8,
        ratingCount: 234,
        isFree: true,
        isPremium: false,
        isFeatured: true,
        isNew: false,
        isPopular: true,
        isActive: true,
        tags: ['PYQ', 'Bengali', '2023'],
    },
    {
        id: 'pdf-pyq-2023-english',
        title: 'English PYQ 2023',
        titleBn: 'ইংরেজি প্রশ্নপত্র ২০২৩',
        description: 'Previous year question paper',
        descriptionBn: 'বিগত বছরের প্রশ্নপত্র',
        category: 'previous-papers',
        subjectId: 'english',
        semester: null,
        year: 2023,
        fileUrl: 'https://drive.google.com/file/d/example11/view',
        fileSize: 1500,
        pageCount: 15,
        format: 'pdf',
        author: 'WBCHSE',
        publishedDate: new Date('2023-04-15'),
        downloads: 2800,
        views: 5800,
        rating: 4.6,
        ratingCount: 189,
        isFree: true,
        isPremium: false,
        isFeatured: false,
        isNew: false,
        isPopular: true,
        isActive: true,
        tags: ['PYQ', 'English', '2023'],
    },
    {
        id: 'pdf-pyq-2023-history',
        title: 'History PYQ 2023',
        titleBn: 'ইতিহাস প্রশ্নপত্র ২০২৩',
        description: 'Previous year question paper',
        descriptionBn: 'বিগত বছরের প্রশ্নপত্র',
        category: 'previous-papers',
        subjectId: 'history',
        semester: null,
        year: 2023,
        fileUrl: 'https://drive.google.com/file/d/example12/view',
        fileSize: 1650,
        pageCount: 16,
        format: 'pdf',
        author: 'WBCHSE',
        publishedDate: new Date('2023-04-15'),
        downloads: 2200,
        views: 4600,
        rating: 4.5,
        ratingCount: 145,
        isFree: true,
        isPremium: false,
        isFeatured: false,
        isNew: false,
        isPopular: false,
        isActive: true,
        tags: ['PYQ', 'History', '2023'],
    },

    // ============ SOLUTIONS ============
    {
        id: 'pdf-solution-pyq-2023-bengali',
        title: 'Bengali PYQ 2023 Solutions',
        titleBn: 'বাংলা ২০২৩ সমাধান',
        description: 'Detailed solutions for Bengali 2023 PYQ',
        descriptionBn: 'বাংলা ২০২৩ প্রশ্নপত্রের বিস্তারিত সমাধান',
        category: 'solutions',
        subjectId: 'bengali',
        semester: null,
        year: 2023,
        fileUrl: 'https://drive.google.com/file/d/example13/view',
        fileSize: 2800,
        pageCount: 28,
        format: 'pdf',
        author: 'ProstutiAcademy',
        publishedDate: new Date('2023-05-01'),
        downloads: 4100,
        views: 8500,
        rating: 4.9,
        ratingCount: 312,
        isFree: false,
        isPremium: true,
        isFeatured: true,
        isNew: false,
        isPopular: true,
        isActive: true,
        tags: ['Solutions', 'Bengali', '2023', 'PYQ'],
    },

    // ============ GUIDES ============
    {
        id: 'pdf-guide-exam-prep',
        title: 'HS Exam Preparation Guide',
        titleBn: 'উচ্চমাধ্যমিক পরীক্ষা প্রস্তুতি গাইড',
        description: 'Complete guide for HS exam preparation',
        descriptionBn: 'উচ্চমাধ্যমিক পরীক্ষার সম্পূর্ণ প্রস্তুতি গাইড',
        category: 'guides',
        subjectId: null,
        semester: null,
        fileUrl: 'https://drive.google.com/file/d/example14/view',
        fileSize: 5200,
        pageCount: 55,
        format: 'pdf',
        author: 'ProstutiAcademy',
        publishedDate: new Date('2024-01-20'),
        downloads: 6800,
        views: 15000,
        rating: 4.8,
        ratingCount: 456,
        isFree: false,
        isPremium: true,
        isFeatured: true,
        isNew: true,
        isPopular: true,
        isActive: true,
        tags: ['Guide', 'Exam Preparation', 'HS', 'Tips'],
    },
];

// Get all active resources
export function getAllPDFResources(): PDFResource[] {
    return samplePDFResources.filter(r => r.isActive);
}

// Get resources by category
export function getPDFResourcesByCategory(category: PDFCategory): PDFResource[] {
    return samplePDFResources.filter(r => r.category === category && r.isActive);
}

// Get resources by subject
export function getPDFResourcesBySubject(subjectId: string): PDFResource[] {
    return samplePDFResources.filter(r => r.subjectId === subjectId && r.isActive);
}

// Get featured resources
export function getFeaturedPDFResources(): PDFResource[] {
    return samplePDFResources.filter(r => r.isFeatured && r.isActive);
}

// Get popular resources
export function getPopularPDFResources(limit: number = 6): PDFResource[] {
    return [...samplePDFResources]
        .filter(r => r.isActive)
        .sort((a, b) => b.downloads - a.downloads)
        .slice(0, limit);
}

// Get new resources
export function getNewPDFResources(limit: number = 6): PDFResource[] {
    return [...samplePDFResources]
        .filter(r => r.isNew && r.isActive)
        .slice(0, limit);
}

// Get resource by ID
export function getPDFResourceById(id: string): PDFResource | undefined {
    return samplePDFResources.find(r => r.id === id);
}

// Search resources
export function searchPDFResources(query: string): PDFResource[] {
    const lowerQuery = query.toLowerCase();
    return samplePDFResources.filter(r =>
        r.isActive && (
            r.title.toLowerCase().includes(lowerQuery) ||
            r.titleBn.toLowerCase().includes(lowerQuery) ||
            r.tags.some(tag => tag.toLowerCase().includes(lowerQuery))
        )
    );
}

// Get category counts
export function getCategoryCounts(): Record<PDFCategory, number> {
    const counts: Partial<Record<PDFCategory, number>> = {};
    samplePDFResources.filter(r => r.isActive).forEach(r => {
        counts[r.category] = (counts[r.category] || 0) + 1;
    });
    return counts as Record<PDFCategory, number>;
}

// Get subject resource counts
export function getSubjectResourceCounts(): Record<string, number> {
    const counts: Record<string, number> = {};
    samplePDFResources.filter(r => r.isActive && r.subjectId).forEach(r => {
        if (r.subjectId) {
            counts[r.subjectId] = (counts[r.subjectId] || 0) + 1;
        }
    });
    return counts;
}
