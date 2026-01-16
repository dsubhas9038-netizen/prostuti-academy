export type ResourceType = 'pyq' | 'syllabus' | 'notes' | 'routine';

export interface Resource {
    id: string;
    title: string;
    titleBn: string;
    type: ResourceType;
    subjectId: string | null;
    semester: number | null;
    year: number | null;
    driveFileId: string;
    driveLink: string;
    embedLink: string;
    fileSize: string;
    downloadCount: number;
    uploadedAt: Date;
    isActive: boolean;
}
