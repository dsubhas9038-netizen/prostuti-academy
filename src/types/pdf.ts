// PDF Resource Types

// PDF Category types
export type PDFCategory = 'notes' | 'guides' | 'syllabus' | 'model-papers' | 'previous-papers' | 'solutions';

// PDF Format types
export type PDFFormat = 'pdf' | 'doc' | 'ppt';

// PDF Resource interface
export interface PDFResource {
    id: string;
    title: string;
    titleBn: string;
    description?: string;
    descriptionBn?: string;
    category: PDFCategory;
    subjectId: string | null;
    chapterId?: string | null;
    semester?: number | null;

    // File details
    fileUrl: string;
    thumbnailUrl?: string;
    fileSize: number; // in KB
    pageCount?: number;
    format: PDFFormat;

    // Metadata
    author?: string;
    authorBn?: string;
    publishedDate: Date;
    updatedDate?: Date;
    year?: number; // For previous papers

    // Stats
    downloads: number;
    views: number;
    rating: number; // 0-5
    ratingCount: number;

    // Flags
    isFree: boolean;
    isPremium: boolean;
    isFeatured: boolean;
    isNew: boolean;
    isPopular: boolean;
    isActive: boolean;

    // Tags
    tags: string[];
}

// PDF Category configuration
export const pdfCategoryConfig = {
    'notes': {
        label: 'Notes',
        labelBn: 'নোটস',
        icon: '📝',
        color: '#3B82F6',
        bg: 'bg-blue-100 dark:bg-blue-900/30',
        text: 'text-blue-600',
    },
    'guides': {
        label: 'Guides',
        labelBn: 'গাইড',
        icon: '📚',
        color: '#8B5CF6',
        bg: 'bg-purple-100 dark:bg-purple-900/30',
        text: 'text-purple-600',
    },
    'syllabus': {
        label: 'Syllabus',
        labelBn: 'সিলেবাস',
        icon: '📋',
        color: '#22C55E',
        bg: 'bg-green-100 dark:bg-green-900/30',
        text: 'text-green-600',
    },
    'model-papers': {
        label: 'Model Papers',
        labelBn: 'মডেল পেপার',
        icon: '📊',
        color: '#F59E0B',
        bg: 'bg-yellow-100 dark:bg-yellow-900/30',
        text: 'text-yellow-600',
    },
    'previous-papers': {
        label: 'Previous Papers',
        labelBn: 'বিগত বছরের প্রশ্ন',
        icon: '📄',
        color: '#EF4444',
        bg: 'bg-red-100 dark:bg-red-900/30',
        text: 'text-red-600',
    },
    'solutions': {
        label: 'Solutions',
        labelBn: 'সমাধান',
        icon: '✅',
        color: '#10B981',
        bg: 'bg-emerald-100 dark:bg-emerald-900/30',
        text: 'text-emerald-600',
    },
};

// Format file size
export function formatFileSize(sizeInKB: number): string {
    if (sizeInKB < 1024) {
        return `${sizeInKB} KB`;
    }
    return `${(sizeInKB / 1024).toFixed(1)} MB`;
}

// Format download count
export function formatDownloads(count: number): string {
    if (count >= 1000000) {
        return `${(count / 1000000).toFixed(1)}M`;
    }
    if (count >= 1000) {
        return `${(count / 1000).toFixed(1)}K`;
    }
    return count.toString();
}

// Get rating stars
export function getRatingStars(rating: number): string {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;
    const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);

    return '★'.repeat(fullStars) + (hasHalfStar ? '½' : '') + '☆'.repeat(emptyStars);
}
