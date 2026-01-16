// Google Drive Integration for PDF Hosting
// Provides utilities for embedding and fetching PDFs from Google Drive

// Google Drive Folder IDs (Update these with your actual folder IDs)
export const DRIVE_FOLDER_IDS = {
    // Root folder
    ROOT: process.env.NEXT_PUBLIC_GOOGLE_DRIVE_FOLDER_ID || '',

    // HS Arts folders by semester
    HS_ARTS: {
        SEMESTER_1: {
            BENGALI: {
                QUESTIONS: '',
                PYQ: '',
            },
            ENGLISH: {
                QUESTIONS: '',
                PYQ: '',
            },
            HISTORY: {
                QUESTIONS: '',
                PYQ: '',
            },
            GEOGRAPHY: {
                QUESTIONS: '',
                PYQ: '',
            },
            PHILOSOPHY: {
                QUESTIONS: '',
                PYQ: '',
            },
            POLITICAL_SCIENCE: {
                QUESTIONS: '',
                PYQ: '',
            },
            EDUCATION: {
                QUESTIONS: '',
                PYQ: '',
            },
            SANSKRIT: {
                QUESTIONS: '',
                PYQ: '',
            },
        },
        SEMESTER_2: {
            BENGALI: { QUESTIONS: '', PYQ: '' },
            ENGLISH: { QUESTIONS: '', PYQ: '' },
            HISTORY: { QUESTIONS: '', PYQ: '' },
            GEOGRAPHY: { QUESTIONS: '', PYQ: '' },
            PHILOSOPHY: { QUESTIONS: '', PYQ: '' },
            POLITICAL_SCIENCE: { QUESTIONS: '', PYQ: '' },
            EDUCATION: { QUESTIONS: '', PYQ: '' },
            SANSKRIT: { QUESTIONS: '', PYQ: '' },
        },
        SEMESTER_3: {
            BENGALI: { QUESTIONS: '', PYQ: '' },
            ENGLISH: { QUESTIONS: '', PYQ: '' },
            HISTORY: { QUESTIONS: '', PYQ: '' },
            GEOGRAPHY: { QUESTIONS: '', PYQ: '' },
            PHILOSOPHY: { QUESTIONS: '', PYQ: '' },
            POLITICAL_SCIENCE: { QUESTIONS: '', PYQ: '' },
            EDUCATION: { QUESTIONS: '', PYQ: '' },
            SANSKRIT: { QUESTIONS: '', PYQ: '' },
        },
        SEMESTER_4: {
            BENGALI: { QUESTIONS: '', PYQ: '' },
            ENGLISH: { QUESTIONS: '', PYQ: '' },
            HISTORY: { QUESTIONS: '', PYQ: '' },
            GEOGRAPHY: { QUESTIONS: '', PYQ: '' },
            PHILOSOPHY: { QUESTIONS: '', PYQ: '' },
            POLITICAL_SCIENCE: { QUESTIONS: '', PYQ: '' },
            EDUCATION: { QUESTIONS: '', PYQ: '' },
            SANSKRIT: { QUESTIONS: '', PYQ: '' },
        },
    },

    // Common resources
    COMMON: {
        SYLLABUS: '',
        EXAM_ROUTINE: '',
        STUDY_TIPS: '',
    },
};

// Subject ID mapping to Drive folder keys
export const SUBJECT_FOLDER_MAP: Record<string, string> = {
    'bengali': 'BENGALI',
    'english': 'ENGLISH',
    'history': 'HISTORY',
    'geography': 'GEOGRAPHY',
    'philosophy': 'PHILOSOPHY',
    'political-science': 'POLITICAL_SCIENCE',
    'education': 'EDUCATION',
    'sanskrit': 'SANSKRIT',
    'economics': 'ECONOMICS',
    'sociology': 'SOCIOLOGY',
};

// Convert Google Drive file ID to embeddable/downloadable URL
export function getDriveEmbedUrl(fileId: string): string {
    return `https://drive.google.com/file/d/${fileId}/preview`;
}

export function getDriveDownloadUrl(fileId: string): string {
    return `https://drive.google.com/uc?export=download&id=${fileId}`;
}

export function getDriveViewUrl(fileId: string): string {
    return `https://drive.google.com/file/d/${fileId}/view`;
}

export function getDriveThumbnailUrl(fileId: string, size: number = 200): string {
    return `https://drive.google.com/thumbnail?id=${fileId}&sz=w${size}`;
}

// Convert share link to file ID
export function extractFileId(shareLink: string): string | null {
    // Pattern 1: https://drive.google.com/file/d/{fileId}/view
    const pattern1 = /\/file\/d\/([a-zA-Z0-9_-]+)/;
    // Pattern 2: https://drive.google.com/open?id={fileId}
    const pattern2 = /[?&]id=([a-zA-Z0-9_-]+)/;
    // Pattern 3: https://drive.google.com/uc?id={fileId}
    const pattern3 = /\/uc\?.*id=([a-zA-Z0-9_-]+)/;

    const match = shareLink.match(pattern1) ||
        shareLink.match(pattern2) ||
        shareLink.match(pattern3);

    return match ? match[1] : null;
}

// Convert folder share link to folder ID
export function extractFolderId(shareLink: string): string | null {
    // Pattern: https://drive.google.com/drive/folders/{folderId}
    const pattern = /\/folders\/([a-zA-Z0-9_-]+)/;
    const match = shareLink.match(pattern);
    return match ? match[1] : null;
}

// PDF Resource type for Google Drive
export interface DriveResource {
    id: string;
    fileId: string;
    title: string;
    titleBn: string;
    description?: string;
    subjectId: string;
    semester: 1 | 2 | 3 | 4;
    type: 'question' | 'pyq' | 'notes' | 'syllabus' | 'other';
    year?: number; // For PYQ
    tags?: string[];
    downloadCount?: number;
    createdAt: string;
    updatedAt: string;
}

// Get embed URL for a resource
export function getResourceEmbedUrl(resource: DriveResource): string {
    return getDriveEmbedUrl(resource.fileId);
}

// Get download URL for a resource
export function getResourceDownloadUrl(resource: DriveResource): string {
    return getDriveDownloadUrl(resource.fileId);
}

// Validate if a file ID is valid
export async function validateDriveFileId(fileId: string): Promise<boolean> {
    try {
        const response = await fetch(getDriveThumbnailUrl(fileId, 100), {
            method: 'HEAD',
        });
        return response.ok;
    } catch {
        return false;
    }
}

// Generate folder path breadcrumb
export function getFolderBreadcrumb(
    subjectId: string,
    semester: number,
    type: 'question' | 'pyq'
): string[] {
    const subjectName = SUBJECT_FOLDER_MAP[subjectId] || subjectId.toUpperCase();
    return [
        'ProstutiAcademy_Resources',
        'HS_Arts',
        `Semester_${semester}`,
        subjectName.replace('_', ' '),
        type === 'pyq' ? 'PYQ' : 'Questions',
    ];
}

export default {
    DRIVE_FOLDER_IDS,
    SUBJECT_FOLDER_MAP,
    getDriveEmbedUrl,
    getDriveDownloadUrl,
    getDriveViewUrl,
    getDriveThumbnailUrl,
    extractFileId,
    extractFolderId,
    getResourceEmbedUrl,
    getResourceDownloadUrl,
    validateDriveFileId,
    getFolderBreadcrumb,
};
