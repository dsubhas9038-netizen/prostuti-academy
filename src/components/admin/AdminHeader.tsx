'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
    Menu,
    Bell,
    Search,
    Plus,
    ChevronDown,
    User,
    Settings,
    LogOut,
    Moon,
    Sun
} from 'lucide-react';
import { useTheme } from '@/context/ThemeContext';
import { useAuth } from '@/hooks';
import { Button, Badge, Avatar, Dropdown } from '@/components/ui';
import { sampleQuickActions } from '@/data/sampleAdminData';
import { cn } from '@/lib/utils';

interface AdminHeaderProps {
    title?: string;
    titleBn?: string;
    onSidebarToggle: () => void;
    sidebarCollapsed: boolean;
}

function AdminHeader({
    title,
    titleBn,
    onSidebarToggle,
    sidebarCollapsed
}: AdminHeaderProps) {
    const { theme, toggleTheme } = useTheme();
    const { firebaseUser, userName, userPhoto, logout } = useAuth();
    const [showNotifications, setShowNotifications] = useState(false);
    const [showQuickActions, setShowQuickActions] = useState(false);

    // Sample notifications
    const notifications = [
        { id: 1, title: 'New user registered', time: '5m ago', read: false },
        { id: 2, title: 'Test submitted', time: '15m ago', read: false },
        { id: 3, title: 'Resource downloaded 100+', time: '1h ago', read: true },
    ];

    const unreadCount = notifications.filter(n => !n.read).length;

    return (
        <header className="h-16 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 px-6 flex items-center justify-between sticky top-0 z-40">
            {/* Left: Toggle & Title */}
            <div className="flex items-center gap-4">
                <button
                    onClick={onSidebarToggle}
                    className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-600 dark:text-gray-400 lg:hidden"
                >
                    <Menu className="h-5 w-5" />
                </button>

                {title && (
                    <div>
                        <h1 className="text-lg font-semibold text-gray-900 dark:text-white">
                            {title}
                        </h1>
                        {titleBn && (
                            <p className="text-xs text-gray-500 font-bengali">{titleBn}</p>
                        )}
                    </div>
                )}
            </div>

            {/* Right: Actions */}
            <div className="flex items-center gap-3">
                {/* Search */}
                <div className="hidden md:flex items-center gap-2 px-3 py-1.5 bg-gray-100 dark:bg-gray-700 rounded-lg">
                    <Search className="h-4 w-4 text-gray-400" />
                    <input
                        type="text"
                        placeholder="Search..."
                        className="bg-transparent border-none outline-none text-sm text-gray-700 dark:text-gray-300 w-48"
                    />
                    <kbd className="text-xs text-gray-400 bg-gray-200 dark:bg-gray-600 px-1.5 py-0.5 rounded">⌘K</kbd>
                </div>

                {/* Quick Actions */}
                <div className="relative">
                    <Button
                        variant="primary"
                        size="sm"
                        onClick={() => setShowQuickActions(!showQuickActions)}
                        leftIcon={<Plus className="h-4 w-4" />}
                        className="hidden sm:flex"
                    >
                        Quick Add
                        <ChevronDown className="h-4 w-4 ml-1" />
                    </Button>

                    {showQuickActions && (
                        <div className="absolute right-0 top-full mt-2 w-48 bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 py-2 z-50">
                            {sampleQuickActions.map((action) => (
                                <Link key={action.id} href={action.href}>
                                    <div
                                        className="flex items-center gap-3 px-4 py-2 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                                        onClick={() => setShowQuickActions(false)}
                                    >
                                        <span className="text-lg">{action.icon}</span>
                                        <span className="text-sm text-gray-700 dark:text-gray-300">
                                            {action.label}
                                        </span>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    )}
                </div>

                {/* Theme Toggle */}
                <button
                    onClick={toggleTheme}
                    className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-600 dark:text-gray-400"
                >
                    {theme === 'dark' ? (
                        <Sun className="h-5 w-5" />
                    ) : (
                        <Moon className="h-5 w-5" />
                    )}
                </button>

                {/* Notifications */}
                <div className="relative">
                    <button
                        onClick={() => setShowNotifications(!showNotifications)}
                        className="relative p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-600 dark:text-gray-400"
                    >
                        <Bell className="h-5 w-5" />
                        {unreadCount > 0 && (
                            <span className="absolute top-1 right-1 w-4 h-4 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
                                {unreadCount}
                            </span>
                        )}
                    </button>

                    {showNotifications && (
                        <div className="absolute right-0 top-full mt-2 w-72 bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 py-2 z-50">
                            <div className="px-4 py-2 border-b border-gray-200 dark:border-gray-700">
                                <h3 className="font-semibold text-gray-900 dark:text-white">
                                    Notifications
                                </h3>
                            </div>
                            {notifications.map((notif) => (
                                <div
                                    key={notif.id}
                                    className={cn(
                                        'px-4 py-3 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors',
                                        !notif.read && 'bg-blue-50 dark:bg-blue-900/20'
                                    )}
                                >
                                    <p className="text-sm text-gray-900 dark:text-white">{notif.title}</p>
                                    <p className="text-xs text-gray-500 mt-1">{notif.time}</p>
                                </div>
                            ))}
                            <Link href="/admin/notifications">
                                <div className="px-4 py-2 text-center text-sm text-blue-600 hover:underline">
                                    View all
                                </div>
                            </Link>
                        </div>
                    )}
                </div>

                {/* User Menu */}
                <div className="flex items-center gap-3 pl-3 border-l border-gray-200 dark:border-gray-700">
                    <Avatar
                        src={userPhoto || undefined}
                        name={userName || firebaseUser?.email || 'Admin'}
                        size="sm"
                    />
                    <div className="hidden md:block">
                        <p className="text-sm font-medium text-gray-900 dark:text-white">
                            {userName || 'Admin'}
                        </p>
                        <p className="text-xs text-gray-500">Super Admin</p>
                    </div>
                </div>
            </div>
        </header>
    );
}

export default AdminHeader;
