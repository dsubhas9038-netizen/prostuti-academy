// Dynamic Sitemap Generation for Next.js
// Generates sitemap.xml with all routes

import { MetadataRoute } from 'next';

// Base URL
const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://prostutiacademy.web.app';

// Static routes with their priority and change frequency
const staticRoutes = [
    { path: '', priority: 1.0, changeFrequency: 'daily' as const },
    { path: '/about', priority: 0.8, changeFrequency: 'monthly' as const },
    { path: '/contact', priority: 0.7, changeFrequency: 'monthly' as const },
    { path: '/subjects', priority: 0.9, changeFrequency: 'weekly' as const },
    { path: '/mock-tests', priority: 0.9, changeFrequency: 'weekly' as const },
    { path: '/resources', priority: 0.8, changeFrequency: 'weekly' as const },
    { path: '/pyq-analysis', priority: 0.8, changeFrequency: 'weekly' as const },
    { path: '/leaderboard', priority: 0.7, changeFrequency: 'daily' as const },
    { path: '/study-planner', priority: 0.7, changeFrequency: 'weekly' as const },
    { path: '/pricing', priority: 0.6, changeFrequency: 'monthly' as const },
    { path: '/terms', priority: 0.3, changeFrequency: 'yearly' as const },
    { path: '/privacy', priority: 0.3, changeFrequency: 'yearly' as const },
    { path: '/login', priority: 0.5, changeFrequency: 'monthly' as const },
    { path: '/signup', priority: 0.5, changeFrequency: 'monthly' as const },
];

// Subject IDs (Arts stream)
const subjectIds = [
    'bengali',
    'english',
    'history',
    'geography',
    'political-science',
    'philosophy',
    'education',
    'sanskrit',
    'economics',
    'sociology',
];

// Generate sitemap
export default function sitemap(): MetadataRoute.Sitemap {
    const currentDate = new Date().toISOString();

    // Static pages
    const staticPages = staticRoutes.map((route) => ({
        url: `${baseUrl}${route.path}`,
        lastModified: currentDate,
        changeFrequency: route.changeFrequency,
        priority: route.priority,
    }));

    // Subject pages
    const subjectPages = subjectIds.map((id) => ({
        url: `${baseUrl}/subjects/${id}`,
        lastModified: currentDate,
        changeFrequency: 'weekly' as const,
        priority: 0.8,
    }));

    // Mock test subject pages
    const testPages = subjectIds.slice(0, 6).map((id) => ({
        url: `${baseUrl}/mock-tests?subject=${id}`,
        lastModified: currentDate,
        changeFrequency: 'weekly' as const,
        priority: 0.7,
    }));

    // Combine all pages
    return [...staticPages, ...subjectPages, ...testPages];
}
