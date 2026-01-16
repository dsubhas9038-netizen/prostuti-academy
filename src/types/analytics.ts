// Analytics Types

// Time range for analytics
export type TimeRange = 'today' | '7days' | '30days' | '90days' | '1year' | 'all';

export const timeRangeConfig: Record<TimeRange, { label: string; labelBn: string; days: number }> = {
    today: { label: 'Today', labelBn: 'আজ', days: 1 },
    '7days': { label: '7 Days', labelBn: '৭ দিন', days: 7 },
    '30days': { label: '30 Days', labelBn: '৩০ দিন', days: 30 },
    '90days': { label: '90 Days', labelBn: '৯০ দিন', days: 90 },
    '1year': { label: '1 Year', labelBn: '১ বছর', days: 365 },
    all: { label: 'All Time', labelBn: 'সব সময়', days: 0 },
};

// Chart types
export type ChartType = 'line' | 'bar' | 'pie' | 'doughnut' | 'area';

// Data point for charts
export interface DataPoint {
    label: string;
    value: number;
    date?: Date;
}

// Chart dataset
export interface ChartDataset {
    label: string;
    data: number[];
    color: string;
    backgroundColor?: string;
}

// Chart data
export interface ChartData {
    labels: string[];
    datasets: ChartDataset[];
}

// User growth analytics
export interface UserGrowthData {
    period: string;
    totalUsers: number;
    newUsers: number;
    activeUsers: number;
    churnedUsers: number;
}

// Content analytics
export interface ContentMetrics {
    totalQuestions: number;
    questionsByType: { type: string; count: number }[];
    questionsBySubject: { subject: string; count: number }[];
    totalTests: number;
    testsByType: { type: string; count: number }[];
    totalResources: number;
    resourcesByCategory: { category: string; count: number }[];
    topContent: TopContentItem[];
}

// Top content item
export interface TopContentItem {
    id: string;
    title: string;
    titleBn: string;
    type: 'question' | 'test' | 'resource';
    views: number;
    engagement: number;
    trend: number;
}

// Test performance analytics
export interface TestPerformanceData {
    testId: string;
    testTitle: string;
    attempts: number;
    avgScore: number;
    completionRate: number;
    avgDuration: number;
    passRate: number;
    scoreDistribution: { range: string; count: number }[];
}

// User activity analytics
export interface UserActivityData {
    period: string;
    dailyActiveUsers: number;
    weeklyActiveUsers: number;
    monthlyActiveUsers: number;
    avgSessionDuration: number;
    questionsAnswered: number;
    testsCompleted: number;
    resourcesDownloaded: number;
}

// Overview metrics
export interface OverviewMetrics {
    users: { current: number; previous: number; trend: number };
    questions: { current: number; previous: number; trend: number };
    tests: { current: number; previous: number; trend: number };
    resources: { current: number; previous: number; trend: number };
    revenue?: { current: number; previous: number; trend: number };
}

// Notification types
export type NotificationType = 'info' | 'success' | 'warning' | 'error';

export interface AdminNotification {
    id: string;
    type: NotificationType;
    title: string;
    message: string;
    timestamp: Date;
    read: boolean;
    actionUrl?: string;
    actionLabel?: string;
}

// Audit log entry
export interface AuditLogEntry {
    id: string;
    action: string;
    actionBn: string;
    userId: string;
    userName: string;
    userRole: string;
    targetType: 'question' | 'test' | 'resource' | 'user' | 'settings';
    targetId?: string;
    targetTitle?: string;
    details?: string;
    ipAddress?: string;
    timestamp: Date;
}

// Settings section
export interface SettingsSection {
    id: string;
    title: string;
    titleBn: string;
    description: string;
    icon: string;
}

// Calculate trend percentage
export function calculateTrend(current: number, previous: number): number {
    if (previous === 0) return current > 0 ? 100 : 0;
    return Math.round(((current - previous) / previous) * 100 * 10) / 10;
}

// Format large numbers
export function formatNumber(num: number): string {
    if (num >= 1000000) return `${(num / 1000000).toFixed(1)}M`;
    if (num >= 1000) return `${(num / 1000).toFixed(1)}K`;
    return num.toString();
}

// Get chart colors
export const chartColors = {
    primary: '#3B82F6',
    secondary: '#8B5CF6',
    success: '#22C55E',
    warning: '#F59E0B',
    danger: '#EF4444',
    info: '#06B6D4',
    neutral: '#6B7280',
};

export const chartColorsPalette = [
    '#3B82F6', '#8B5CF6', '#22C55E', '#F59E0B',
    '#EF4444', '#06B6D4', '#EC4899', '#14B8A6'
];
