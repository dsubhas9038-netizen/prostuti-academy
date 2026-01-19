// Admin Types

// Admin roles
export type AdminRole = 'super_admin' | 'admin' | 'moderator' | 'content_manager';

// Admin permissions
export type AdminPermission =
    | 'manage_users'
    | 'manage_questions'
    | 'manage_tests'
    | 'manage_resources'
    | 'manage_subjects'
    | 'view_analytics'
    | 'manage_settings'
    | 'manage_admins';

// Role permissions mapping
export const rolePermissions: Record<AdminRole, AdminPermission[]> = {
    super_admin: [
        'manage_users', 'manage_questions', 'manage_tests',
        'manage_resources', 'manage_subjects', 'view_analytics',
        'manage_settings', 'manage_admins'
    ],
    admin: [
        'manage_users', 'manage_questions', 'manage_tests',
        'manage_resources', 'manage_subjects', 'view_analytics'
    ],
    moderator: [
        'manage_questions', 'manage_tests', 'manage_resources'
    ],
    content_manager: [
        'manage_questions', 'manage_resources'
    ],
};

// Admin user
export interface AdminUser {
    id: string;
    email: string;
    displayName: string;
    photoURL?: string;
    role: AdminRole;
    permissions: AdminPermission[];
    createdAt: Date;
    lastLoginAt: Date;
    isActive: boolean;
}

// Admin stats
export interface AdminStats {
    totalUsers: number;
    activeUsers: number;
    totalQuestions: number;
    totalTests: number;
    totalResources: number;
    totalSubjects: number;
    testsCompleted: number;
    questionsAnswered: number;
    usersTrend: number; // percentage change
    questionsTrend: number;
    testsTrend: number;
    resourcesTrend: number;
}

// Recent activity
export interface AdminActivity {
    id: string;
    type: 'user' | 'question' | 'test' | 'resource' | 'settings';
    action: 'create' | 'update' | 'delete' | 'publish' | 'login';
    title: string;
    titleBn: string;
    description?: string;
    userId?: string;
    userName?: string;
    timestamp: Date;
    metadata?: Record<string, any>;
}

// Quick action
export interface QuickAction {
    id: string;
    label: string;
    labelBn: string;
    icon: string;
    href: string;
    color: string;
    permission: AdminPermission;
}

// Content item for management
export interface ContentItem {
    id: string;
    type: 'question' | 'test' | 'resource' | 'subject' | 'chapter';
    title: string;
    titleBn: string;
    status: 'draft' | 'published' | 'archived';
    createdAt: Date;
    updatedAt: Date;
    createdBy: string;
    views?: number;
    downloads?: number;
}

// Sidebar nav item
export interface AdminNavItem {
    id: string;
    label: string;
    labelBn: string;
    icon: string;
    href: string;
    permission?: AdminPermission;
    badge?: number;
    children?: AdminNavItem[];
}

// Admin role config
export const adminRoleConfig: Record<AdminRole, { label: string; labelBn: string; color: string }> = {
    super_admin: { label: 'Super Admin (Supreme)', labelBn: 'সুপার অ্যাডমিন (সুপ্রিম)', color: '#EF4444' },
    admin: { label: 'Admin', labelBn: 'অ্যাডমিন', color: '#8B5CF6' },
    moderator: { label: 'Moderator', labelBn: 'মডারেটর', color: '#3B82F6' },
    content_manager: { label: 'Content Manager', labelBn: 'কন্টেন্ট ম্যানেজার', color: '#22C55E' },
};

// Activity type config (renamed to avoid conflict with dashboard.ts)
export const adminActivityTypeConfig = {
    user: { icon: '👤', color: '#3B82F6' },
    question: { icon: '📝', color: '#22C55E' },
    test: { icon: '🧪', color: '#8B5CF6' },
    resource: { icon: '📄', color: '#F59E0B' },
    settings: { icon: '⚙️', color: '#6B7280' },
};

// Action type config
export const actionTypeConfig = {
    create: { label: 'Created', labelBn: 'তৈরি করা হয়েছে', color: '#22C55E' },
    update: { label: 'Updated', labelBn: 'আপডেট করা হয়েছে', color: '#3B82F6' },
    delete: { label: 'Deleted', labelBn: 'মুছে ফেলা হয়েছে', color: '#EF4444' },
    publish: { label: 'Published', labelBn: 'প্রকাশ করা হয়েছে', color: '#8B5CF6' },
    login: { label: 'Logged in', labelBn: 'লগইন করেছে', color: '#6B7280' },
};

// Check if user has permission
export function hasPermission(user: AdminUser, permission: AdminPermission): boolean {
    return user.permissions.includes(permission);
}

// Check if role has permission
export function roleHasPermission(role: AdminRole, permission: AdminPermission): boolean {
    return rolePermissions[role].includes(permission);
}

// Format relative time for admin
export function formatAdminTime(date: Date): string {
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / (1000 * 60));
    const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

    if (diffMins < 1) return 'Just now';
    if (diffMins < 60) return `${diffMins}m ago`;
    if (diffHours < 24) return `${diffHours}h ago`;
    if (diffDays < 7) return `${diffDays}d ago`;
    return date.toLocaleDateString();
}
