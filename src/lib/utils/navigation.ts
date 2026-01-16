import {
    Home,
    BookOpen,
    FileQuestion,
    ClipboardList,
    FileText,
    BarChart3,
    Trophy,
    User,
    LucideIcon,
} from 'lucide-react';

export interface NavLink {
    label: string;
    labelBn: string;
    href: string;
    icon: LucideIcon;
    requiresAuth?: boolean;
    mobileOnly?: boolean;
    desktopOnly?: boolean;
}

// Main navigation links
export const mainNavLinks: NavLink[] = [
    {
        label: 'Home',
        labelBn: 'হোম',
        href: '/',
        icon: Home,
    },
    {
        label: 'Subjects',
        labelBn: 'বিষয়সমূহ',
        href: '/subjects',
        icon: BookOpen,
    },
    {
        label: 'Mock Tests',
        labelBn: 'মক টেস্ট',
        href: '/mock-tests',
        icon: ClipboardList,
    },
    {
        label: 'Resources',
        labelBn: 'রিসোর্স',
        href: '/resources',
        icon: FileText,
    },
    {
        label: 'PYQ Analysis',
        labelBn: 'বিগত বছরের প্রশ্ন',
        href: '/pyq-analysis',
        icon: BarChart3,
        desktopOnly: true,
    },
];

// Mobile bottom navigation links
export const mobileNavLinks: NavLink[] = [
    {
        label: 'Home',
        labelBn: 'হোম',
        href: '/',
        icon: Home,
    },
    {
        label: 'Subjects',
        labelBn: 'বিষয়',
        href: '/subjects',
        icon: BookOpen,
    },
    {
        label: 'Tests',
        labelBn: 'টেস্ট',
        href: '/mock-tests',
        icon: ClipboardList,
    },
    {
        label: 'Progress',
        labelBn: 'প্রগতি',
        href: '/dashboard/progress',
        icon: BarChart3,
        requiresAuth: true,
    },
    {
        label: 'Profile',
        labelBn: 'প্রোফাইল',
        href: '/dashboard',
        icon: User,
        requiresAuth: true,
    },
];

// Dashboard sidebar links
export const dashboardLinks: NavLink[] = [
    {
        label: 'Dashboard',
        labelBn: 'ড্যাশবোর্ড',
        href: '/dashboard',
        icon: Home,
    },
    {
        label: 'My Progress',
        labelBn: 'আমার প্রগতি',
        href: '/dashboard/progress',
        icon: BarChart3,
    },
    {
        label: 'Bookmarks',
        labelBn: 'বুকমার্ক',
        href: '/dashboard/bookmarks',
        icon: FileQuestion,
    },
    {
        label: 'Test History',
        labelBn: 'টেস্ট হিস্ট্রি',
        href: '/dashboard/tests',
        icon: ClipboardList,
    },
    {
        label: 'Leaderboard',
        labelBn: 'লিডারবোর্ড',
        href: '/leaderboard',
        icon: Trophy,
    },
];
