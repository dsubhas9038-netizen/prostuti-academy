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
    getAdminStats,
    getRecentActivities,
    getQuickActions,
    getAdminNavItems
} from '@/data/sampleAdminData';

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
    const loadData = () => {
        setLoading(true);
        setError(null);

        try {
            // Simulate async fetch
            setTimeout(() => {
                setAdminUser(sampleAdminUser);
                setStats(getAdminStats());
                setRecentActivities(getRecentActivities(10));
                setQuickActions(getQuickActions());
                setNavItems(getAdminNavItems());
                setLoading(false);
            }, 300);
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
        setLoading(true);
        setTimeout(() => {
            setStats(getAdminStats());
            setLoading(false);
        }, 200);
    }, []);

    return { stats, loading };
}

// Hook for recent activities only
export function useAdminActivities(limit: number = 5) {
    const [activities, setActivities] = useState<AdminActivity[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setLoading(true);
        setTimeout(() => {
            setActivities(getRecentActivities(limit));
            setLoading(false);
        }, 200);
    }, [limit]);

    return { activities, loading };
}
