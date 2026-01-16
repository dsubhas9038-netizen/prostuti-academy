import {
    ChartData,
    UserGrowthData,
    ContentMetrics,
    TestPerformanceData,
    UserActivityData,
    OverviewMetrics,
    TopContentItem,
    AdminNotification,
    AuditLogEntry,
} from '@/types/analytics';

// User Growth Data (Last 12 months)
export const sampleUserGrowthData: UserGrowthData[] = [
    { period: 'Jan', totalUsers: 850, newUsers: 120, activeUsers: 620, churnedUsers: 15 },
    { period: 'Feb', totalUsers: 945, newUsers: 115, activeUsers: 680, churnedUsers: 20 },
    { period: 'Mar', totalUsers: 1050, newUsers: 130, activeUsers: 750, churnedUsers: 25 },
    { period: 'Apr', totalUsers: 1180, newUsers: 155, activeUsers: 820, churnedUsers: 25 },
    { period: 'May', totalUsers: 1320, newUsers: 170, activeUsers: 910, churnedUsers: 30 },
    { period: 'Jun', totalUsers: 1480, newUsers: 190, activeUsers: 1020, churnedUsers: 30 },
    { period: 'Jul', totalUsers: 1650, newUsers: 200, activeUsers: 1150, churnedUsers: 30 },
    { period: 'Aug', totalUsers: 1850, newUsers: 230, activeUsers: 1300, churnedUsers: 30 },
    { period: 'Sep', totalUsers: 2050, newUsers: 240, activeUsers: 1450, churnedUsers: 40 },
    { period: 'Oct', totalUsers: 2280, newUsers: 270, activeUsers: 1620, churnedUsers: 40 },
    { period: 'Nov', totalUsers: 2520, newUsers: 290, activeUsers: 1800, churnedUsers: 50 },
    { period: 'Dec', totalUsers: 2800, newUsers: 330, activeUsers: 2000, churnedUsers: 50 },
];

// User Growth Chart Data
export const userGrowthChartData: ChartData = {
    labels: sampleUserGrowthData.map(d => d.period),
    datasets: [
        {
            label: 'Total Users',
            data: sampleUserGrowthData.map(d => d.totalUsers),
            color: '#3B82F6',
        },
        {
            label: 'Active Users',
            data: sampleUserGrowthData.map(d => d.activeUsers),
            color: '#22C55E',
        },
        {
            label: 'New Users',
            data: sampleUserGrowthData.map(d => d.newUsers),
            color: '#8B5CF6',
        },
    ],
};

// Content Metrics
export const sampleContentMetrics: ContentMetrics = {
    totalQuestions: 250,
    questionsByType: [
        { type: 'Short', count: 85 },
        { type: 'Broad', count: 120 },
        { type: 'MCQ', count: 45 },
    ],
    questionsBySubject: [
        { subject: 'Bengali', count: 95 },
        { subject: 'English', count: 65 },
        { subject: 'History', count: 55 },
        { subject: 'Philosophy', count: 35 },
    ],
    totalTests: 15,
    testsByType: [
        { type: 'Chapter', count: 8 },
        { type: 'Full Mock', count: 5 },
        { type: 'Practice', count: 2 },
    ],
    totalResources: 45,
    resourcesByCategory: [
        { category: 'Notes', count: 18 },
        { category: 'Guides', count: 8 },
        { category: 'Model Papers', count: 10 },
        { category: 'Previous Papers', count: 9 },
    ],
    topContent: [
        { id: 'q1', title: 'Pather Dabi Summary', titleBn: 'পথের দাবী সারাংশ', type: 'question', views: 1250, engagement: 85, trend: 12 },
        { id: 't1', title: 'Bengali Full Mock', titleBn: 'বাংলা সম্পূর্ণ মক', type: 'test', views: 980, engagement: 78, trend: 8 },
        { id: 'r1', title: 'History Notes PDF', titleBn: 'ইতিহাস নোটস', type: 'resource', views: 890, engagement: 92, trend: 15 },
    ],
};

// Content Distribution Chart
export const contentDistributionChartData: ChartData = {
    labels: ['Questions', 'Tests', 'Resources'],
    datasets: [{
        label: 'Content',
        data: [250, 15, 45],
        color: '#3B82F6',
    }],
};

// Test Performance Data
export const sampleTestPerformance: TestPerformanceData[] = [
    {
        testId: 't1', testTitle: 'Bengali Full Mock Test', attempts: 450,
        avgScore: 72, completionRate: 85, avgDuration: 78, passRate: 68,
        scoreDistribution: [
            { range: '0-20', count: 15 },
            { range: '21-40', count: 45 },
            { range: '41-60', count: 110 },
            { range: '61-80', count: 180 },
            { range: '81-100', count: 100 },
        ],
    },
    {
        testId: 't2', testTitle: 'History Chapter 1', attempts: 280,
        avgScore: 68, completionRate: 90, avgDuration: 25, passRate: 62,
        scoreDistribution: [
            { range: '0-20', count: 10 },
            { range: '21-40', count: 35 },
            { range: '41-60', count: 85 },
            { range: '61-80', count: 110 },
            { range: '81-100', count: 40 },
        ],
    },
];

// User Activity Data (Last 7 days)
export const sampleUserActivityData: UserActivityData[] = [
    { period: 'Mon', dailyActiveUsers: 420, weeklyActiveUsers: 1500, monthlyActiveUsers: 2200, avgSessionDuration: 25, questionsAnswered: 850, testsCompleted: 45, resourcesDownloaded: 120 },
    { period: 'Tue', dailyActiveUsers: 480, weeklyActiveUsers: 1550, monthlyActiveUsers: 2250, avgSessionDuration: 28, questionsAnswered: 920, testsCompleted: 52, resourcesDownloaded: 135 },
    { period: 'Wed', dailyActiveUsers: 520, weeklyActiveUsers: 1600, monthlyActiveUsers: 2300, avgSessionDuration: 30, questionsAnswered: 980, testsCompleted: 58, resourcesDownloaded: 145 },
    { period: 'Thu', dailyActiveUsers: 490, weeklyActiveUsers: 1580, monthlyActiveUsers: 2280, avgSessionDuration: 27, questionsAnswered: 940, testsCompleted: 55, resourcesDownloaded: 140 },
    { period: 'Fri', dailyActiveUsers: 550, weeklyActiveUsers: 1650, monthlyActiveUsers: 2350, avgSessionDuration: 32, questionsAnswered: 1050, testsCompleted: 62, resourcesDownloaded: 160 },
    { period: 'Sat', dailyActiveUsers: 650, weeklyActiveUsers: 1750, monthlyActiveUsers: 2450, avgSessionDuration: 40, questionsAnswered: 1200, testsCompleted: 75, resourcesDownloaded: 180 },
    { period: 'Sun', dailyActiveUsers: 580, weeklyActiveUsers: 1700, monthlyActiveUsers: 2400, avgSessionDuration: 35, questionsAnswered: 1100, testsCompleted: 68, resourcesDownloaded: 165 },
];

// Overview Metrics
export const sampleOverviewMetrics: OverviewMetrics = {
    users: { current: 2800, previous: 2520, trend: 11.1 },
    questions: { current: 250, previous: 220, trend: 13.6 },
    tests: { current: 15, previous: 12, trend: 25.0 },
    resources: { current: 45, previous: 38, trend: 18.4 },
};

// Admin Notifications
export const sampleAdminNotifications: AdminNotification[] = [
    {
        id: 'n1', type: 'success', title: 'New User Milestone',
        message: 'Congratulations! You\'ve reached 2,500+ users.',
        timestamp: new Date(Date.now() - 3600000), read: false,
    },
    {
        id: 'n2', type: 'warning', title: 'Low Storage',
        message: 'Storage usage is at 85%. Consider cleanup.',
        timestamp: new Date(Date.now() - 7200000), read: false,
        actionUrl: '/admin/settings', actionLabel: 'View Storage',
    },
    {
        id: 'n3', type: 'info', title: 'Weekly Report Ready',
        message: 'Your weekly analytics report is available.',
        timestamp: new Date(Date.now() - 86400000), read: true,
        actionUrl: '/admin/analytics', actionLabel: 'View Report',
    },
    {
        id: 'n4', type: 'error', title: 'Failed Upload',
        message: 'PDF upload failed for "History Notes". Retry needed.',
        timestamp: new Date(Date.now() - 172800000), read: true,
        actionUrl: '/admin/resources', actionLabel: 'Retry',
    },
];

// Audit Log
export const sampleAuditLog: AuditLogEntry[] = [
    {
        id: 'a1', action: 'Created', actionBn: 'তৈরি করা হয়েছে',
        userId: 'admin-1', userName: 'Admin User', userRole: 'super_admin',
        targetType: 'question', targetId: 'q125', targetTitle: 'New question added',
        timestamp: new Date(Date.now() - 1800000),
    },
    {
        id: 'a2', action: 'Updated', actionBn: 'আপডেট করা হয়েছে',
        userId: 'admin-1', userName: 'Admin User', userRole: 'super_admin',
        targetType: 'test', targetId: 't15', targetTitle: 'Mock test updated',
        timestamp: new Date(Date.now() - 3600000),
    },
    {
        id: 'a3', action: 'Deleted', actionBn: 'মুছে ফেলা হয়েছে',
        userId: 'mod-1', userName: 'Moderator', userRole: 'moderator',
        targetType: 'resource', targetId: 'r45', targetTitle: 'Old PDF removed',
        timestamp: new Date(Date.now() - 7200000),
    },
    {
        id: 'a4', action: 'Published', actionBn: 'প্রকাশ করা হয়েছে',
        userId: 'admin-1', userName: 'Admin User', userRole: 'super_admin',
        targetType: 'test', targetId: 't14', targetTitle: 'History mock test published',
        timestamp: new Date(Date.now() - 14400000),
    },
    {
        id: 'a5', action: 'Suspended', actionBn: 'স্থগিত করা হয়েছে',
        userId: 'admin-1', userName: 'Admin User', userRole: 'admin',
        targetType: 'user', targetId: 'u45', targetTitle: 'User suspended for violation',
        timestamp: new Date(Date.now() - 86400000),
    },
];

// Getters
export function getUserGrowthData(): UserGrowthData[] {
    return sampleUserGrowthData;
}

export function getUserGrowthChartData(): ChartData {
    return userGrowthChartData;
}

export function getContentMetrics(): ContentMetrics {
    return sampleContentMetrics;
}

export function getTestPerformance(): TestPerformanceData[] {
    return sampleTestPerformance;
}

export function getUserActivityData(): UserActivityData[] {
    return sampleUserActivityData;
}

export function getOverviewMetrics(): OverviewMetrics {
    return sampleOverviewMetrics;
}

export function getAdminNotifications(): AdminNotification[] {
    return sampleAdminNotifications;
}

export function getAuditLog(limit: number = 10): AuditLogEntry[] {
    return sampleAuditLog.slice(0, limit);
}
