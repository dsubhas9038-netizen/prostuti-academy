'use client';

import { useState, useEffect, useMemo } from 'react';
import {
    AdminUser,
    AdminStats,
    AdminActivity,
    QuickAction,
    AdminNavItem,
    AdminPermission,
    hasPermission
} from '@/types/admin';
import {
    sampleAdminUser,
    getRecentActivities,
    getQuickActions,
    getAdminNavItems
} from '@/data/sampleAdminData';
import { getAdminDashboardStats, getRealRecentActivities } from '@/lib/admin';

interface UseAdminReturn {
    // User
    adminUser: AdminUser | null;
    isAdmin: boolean;
    isSuperAdmin: boolean;

    // Data
    stats: AdminStats | null;
    recentActivities: AdminActivity[];
    quickActions: QuickAction[];
    navItems: AdminNavItem[];

    // State
    loading: boolean;
    error: string | null;

    // Permissions
    canManageUsers: boolean;
    canManageQuestions: boolean;
    canManageTests: boolean;
    canManageResources: boolean;
    canViewAnalytics: boolean;
    canManageSettings: boolean;

    // Actions
    checkPermission: (permission: AdminPermission) => boolean;
    refreshData: () => void;
}

export default function useAdmin(): UseAdminReturn {
    // State
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [adminUser, setAdminUser] = useState<AdminUser | null>(null);
    const [stats, setStats] = useState<AdminStats | null>(null);
    const [recentActivities, setRecentActivities] = useState<AdminActivity[]>([]);
    const [quickActions, setQuickActions] = useState<QuickAction[]>([]);
    const [navItems, setNavItems] = useState<AdminNavItem[]>([]);

    // Load data
    const loadData = async () => {
        setLoading(true);
        setError(null);

        try {
            // Simulate async fetch
            // Fetch real stats
            const [realStats, realActivities] = await Promise.all([
                getAdminDashboardStats(),
                getRealRecentActivities()
            ]);

            setAdminUser(sampleAdminUser); // Keep sample user for now as auth is handled by context but this hook might be used deeper
            setStats(realStats);
            setRecentActivities(realActivities);
            setQuickActions(getQuickActions());
            setNavItems(getAdminNavItems());
            setLoading(false);
        } catch (err) {
            setError('Failed to load admin data');
            setLoading(false);
        }
    };

    // Initial load
    useEffect(() => {
        loadData();
    }, []);

    // Check if user is admin
    const isAdmin = useMemo(() => {
        return !!adminUser && ['super_admin', 'admin', 'moderator', 'content_manager'].includes(adminUser.role);
    }, [adminUser]);

    // Check if super admin
    const isSuperAdmin = useMemo(() => {
        return adminUser?.role === 'super_admin';
    }, [adminUser]);

    // Permission checks
    const checkPermission = (permission: AdminPermission): boolean => {
        if (!adminUser) return false;
        return hasPermission(adminUser, permission);
    };

    const canManageUsers = useMemo(() => checkPermission('manage_users'), [adminUser]);
    const canManageQuestions = useMemo(() => checkPermission('manage_questions'), [adminUser]);
    const canManageTests = useMemo(() => checkPermission('manage_tests'), [adminUser]);
    const canManageResources = useMemo(() => checkPermission('manage_resources'), [adminUser]);
    const canViewAnalytics = useMemo(() => checkPermission('view_analytics'), [adminUser]);
    const canManageSettings = useMemo(() => checkPermission('manage_settings'), [adminUser]);

    // Refresh data
    const refreshData = () => {
        loadData();
    };

    return {
        adminUser,
        isAdmin,
        isSuperAdmin,
        stats,
        recentActivities,
        quickActions,
        navItems,
        loading,
        error,
        canManageUsers,
        canManageQuestions,
        canManageTests,
        canManageResources,
        canViewAnalytics,
        canManageSettings,
        checkPermission,
        refreshData,
    };
}

// Hook for admin stats only
export function useAdminStats() {
    const [stats, setStats] = useState<AdminStats | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadStats = async () => {
            setLoading(true);
            try {
                const data = await getAdminDashboardStats();
                setStats(data);
            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        };
        loadStats();
    }, []);

    return { stats, loading };
}

// Hook for recent activities only
export function useAdminActivities(limit: number = 5) {
    const [activities, setActivities] = useState<AdminActivity[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadActivities = async () => {
            setLoading(true);
            try {
                const data = await getRealRecentActivities();
                setActivities(data.slice(0, limit));
            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        };
        loadActivities();
    }, [limit]);

    return { activities, loading };
}
