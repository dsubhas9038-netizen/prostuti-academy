import {
    AdminUser,
    AdminStats,
    AdminActivity,
    QuickAction,
    AdminNavItem,
    ContentItem
} from '@/types/admin';

// Sample Admin User
export const sampleAdminUser: AdminUser = {
    id: 'admin-1',
    email: 'admin@prostutiacademy.com',
    displayName: 'Admin User',
    photoURL: undefined,
    role: 'super_admin',
    permissions: [
        'manage_users', 'manage_questions', 'manage_tests',
        'manage_resources', 'manage_subjects', 'view_analytics',
        'manage_settings', 'manage_admins'
    ],
    createdAt: new Date('2024-01-01'),
    lastLoginAt: new Date(),
    isActive: true,
};

// Sample Admin Stats
export const sampleAdminStats: AdminStats = {
    totalUsers: 1245,
    activeUsers: 892,
    totalQuestions: 250,
    totalTests: 15,
    totalResources: 45,
    totalSubjects: 6,
    testsCompleted: 3200,
    questionsAnswered: 45000,
    usersTrend: 12.5,
    questionsTrend: 8.3,
    testsTrend: 15.2,
    resourcesTrend: 5.7,
};

// Sample Recent Activities
export const sampleAdminActivities: AdminActivity[] = [
    {
        id: 'activity-1',
        type: 'user',
        action: 'login',
        title: 'New User Registered',
        titleBn: 'নতুন ব্যবহারকারী নিবন্ধন করেছে',
        description: 'rahul@example.com',
        userName: 'Rahul Das',
        timestamp: new Date(Date.now() - 1800000), // 30 mins ago
    },
    {
        id: 'activity-2',
        type: 'question',
        action: 'create',
        title: '5 Questions Added',
        titleBn: '৫টি প্রশ্ন যোগ করা হয়েছে',
        description: 'Bengali Chapter 1',
        userName: 'Admin',
        timestamp: new Date(Date.now() - 7200000), // 2 hours ago
    },
    {
        id: 'activity-3',
        type: 'test',
        action: 'publish',
        title: 'Mock Test Published',
        titleBn: 'মক টেস্ট প্রকাশ করা হয়েছে',
        description: 'History Full Mock Test',
        userName: 'Admin',
        timestamp: new Date(Date.now() - 18000000), // 5 hours ago
    },
    {
        id: 'activity-4',
        type: 'resource',
        action: 'create',
        title: 'PDF Uploaded',
        titleBn: 'PDF আপলোড করা হয়েছে',
        description: 'Renaissance Notes',
        userName: 'Content Manager',
        timestamp: new Date(Date.now() - 86400000), // 1 day ago
    },
    {
        id: 'activity-5',
        type: 'settings',
        action: 'update',
        title: 'Settings Updated',
        titleBn: 'সেটিংস আপডেট করা হয়েছে',
        description: 'Exam date changed',
        userName: 'Super Admin',
        timestamp: new Date(Date.now() - 172800000), // 2 days ago
    },
];

// Quick Actions
export const sampleQuickActions: QuickAction[] = [
    {
        id: 'qa-1',
        label: 'Add Question',
        labelBn: 'প্রশ্ন যোগ করুন',
        icon: '📝',
        href: '/admin/questions/new',
        color: '#22C55E',
        permission: 'manage_questions',
    },
    {
        id: 'qa-2',
        label: 'Create Test',
        labelBn: 'টেস্ট তৈরি করুন',
        icon: '🧪',
        href: '/admin/tests/new',
        color: '#8B5CF6',
        permission: 'manage_tests',
    },
    {
        id: 'qa-3',
        label: 'Upload PDF',
        labelBn: 'PDF আপলোড করুন',
        icon: '📄',
        href: '/admin/resources/upload',
        color: '#F59E0B',
        permission: 'manage_resources',
    },
    {
        id: 'qa-4',
        label: 'Add User',
        labelBn: 'ব্যবহারকারী যোগ করুন',
        icon: '👤',
        href: '/admin/users/new',
        color: '#3B82F6',
        permission: 'manage_users',
    },
];

// Admin Navigation Items
export const adminNavItems: AdminNavItem[] = [
    {
        id: 'dashboard',
        label: 'Dashboard',
        labelBn: 'ড্যাশবোর্ড',
        icon: '📊',
        href: '/admin',
    },
    {
        id: 'questions',
        label: 'Questions',
        labelBn: 'প্রশ্নসমূহ',
        icon: '📝',
        href: '/admin/questions',
        permission: 'manage_questions',
        badge: 250,
    },
    {
        id: 'tests',
        label: 'Tests',
        labelBn: 'টেস্টসমূহ',
        icon: '🧪',
        href: '/admin/tests',
        permission: 'manage_tests',
        badge: 15,
    },
    {
        id: 'resources',
        label: 'Resources',
        labelBn: 'রিসোর্সসমূহ',
        icon: '📄',
        href: '/admin/resources',
        permission: 'manage_resources',
        badge: 45,
    },
    {
        id: 'subjects',
        label: 'Subjects',
        labelBn: 'বিষয়সমূহ',
        icon: '📚',
        href: '/admin/subjects',
        permission: 'manage_subjects',
        badge: 6,
    },
    {
        id: 'users',
        label: 'Users',
        labelBn: 'ব্যবহারকারী',
        icon: '👥',
        href: '/admin/users',
        permission: 'manage_users',
        badge: 1245,
    },
    {
        id: 'analytics',
        label: 'Analytics',
        labelBn: 'বিশ্লেষণ',
        icon: '📈',
        href: '/admin/analytics',
        permission: 'view_analytics',
    },
    {
        id: 'settings',
        label: 'Settings',
        labelBn: 'সেটিংস',
        icon: '⚙️',
        href: '/admin/settings',
        permission: 'manage_settings',
    },
];

// Sample Content Items
export const sampleContentItems: ContentItem[] = [
    {
        id: 'content-1',
        type: 'question',
        title: 'Pather Dabi Summary Question',
        titleBn: 'পথের দাবী সারাংশ প্রশ্ন',
        status: 'published',
        createdAt: new Date('2024-01-15'),
        updatedAt: new Date('2024-01-15'),
        createdBy: 'Admin',
        views: 350,
    },
    {
        id: 'content-2',
        type: 'test',
        title: 'Bengali Full Mock Test',
        titleBn: 'বাংলা সম্পূর্ণ মক টেস্ট',
        status: 'published',
        createdAt: new Date('2024-01-10'),
        updatedAt: new Date('2024-01-12'),
        createdBy: 'Admin',
        views: 1200,
    },
    {
        id: 'content-3',
        type: 'resource',
        title: 'History Notes PDF',
        titleBn: 'ইতিহাস নোটস PDF',
        status: 'published',
        createdAt: new Date('2024-01-08'),
        updatedAt: new Date('2024-01-08'),
        createdBy: 'Content Manager',
        downloads: 890,
    },
];

// Get admin stats
export function getAdminStats(): AdminStats {
    return sampleAdminStats;
}

// Get recent activities
export function getRecentActivities(limit: number = 5): AdminActivity[] {
    return sampleAdminActivities.slice(0, limit);
}

// Get quick actions
export function getQuickActions(): QuickAction[] {
    return sampleQuickActions;
}

// Get nav items
export function getAdminNavItems(): AdminNavItem[] {
    return adminNavItems;
}
