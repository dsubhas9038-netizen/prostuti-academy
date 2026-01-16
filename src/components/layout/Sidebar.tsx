'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
    ChevronLeft,
    ChevronRight,
    Home,
    BarChart3,
    Bookmark,
    ClipboardList,
    Trophy,
    Settings,
    HelpCircle,
    LogOut,
    Flame,
    Target,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { useAuth } from '@/hooks/useAuth';
import { Avatar, ProgressBar } from '@/components/ui';
import { dashboardLinks } from '@/lib/utils/navigation';

interface SidebarProps {
    className?: string;
}

function Sidebar({ className }: SidebarProps) {
    const pathname = usePathname();
    const { userData, userName, userPhoto, logout } = useAuth();
    const [isCollapsed, setIsCollapsed] = useState(false);

    // Check if link is active
    const isActiveLink = (href: string) => {
        if (href === '/dashboard') {
            return pathname === '/dashboard';
        }
        return pathname.startsWith(href);
    };

    // Calculate mock progress (will be replaced with real data)
    const overallProgress = userData?.totalQuestionsRead
        ? Math.min((userData.totalQuestionsRead / 500) * 100, 100)
        : 25;

    return (
        <aside
            className={cn(
                'fixed left-0 top-16 bottom-0 z-30',
                'bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-800',
                'transition-all duration-300 ease-in-out',
                'hidden lg:flex flex-col',
                isCollapsed ? 'w-20' : 'w-64',
                className
            )}
        >
            {/* Toggle Button */}
            <button
                onClick={() => setIsCollapsed(!isCollapsed)}
                className={cn(
                    'absolute -right-3 top-6 z-10',
                    'w-6 h-6 rounded-full',
                    'bg-blue-600 text-white',
                    'flex items-center justify-center',
                    'shadow-md hover:scale-110 transition-transform'
                )}
            >
                {isCollapsed ? (
                    <ChevronRight className="h-4 w-4" />
                ) : (
                    <ChevronLeft className="h-4 w-4" />
                )}
            </button>

            {/* User Section */}
            <div className={cn(
                'p-4 border-b border-gray-200 dark:border-gray-800',
                isCollapsed && 'flex justify-center'
            )}>
                {isCollapsed ? (
                    <Avatar src={userPhoto} name={userName} size="md" />
                ) : (
                    <div className="flex items-center gap-3">
                        <Avatar src={userPhoto} name={userName} size="lg" />
                        <div className="flex-1 min-w-0">
                            <p className="font-medium text-gray-900 dark:text-white truncate">{userName}</p>
                            <p className="text-xs text-gray-500 capitalize">
                                {userData?.stream || 'Arts'} • Sem {userData?.currentSemester || 1}
                            </p>
                        </div>
                    </div>
                )}
            </div>

            {/* Stats Section (only when expanded) */}
            {!isCollapsed && (
                <div className="p-4 border-b border-gray-200 dark:border-gray-800">
                    {/* Streak */}
                    <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center gap-2">
                            <div className="p-1.5 rounded-lg bg-orange-100 dark:bg-orange-900/30">
                                <Flame className="h-4 w-4 text-orange-500" />
                            </div>
                            <span className="text-sm text-gray-500">Streak</span>
                        </div>
                        <span className="text-sm font-semibold text-gray-900 dark:text-white">
                            {userData?.streak || 0} days
                        </span>
                    </div>

                    {/* Progress */}
                    <div>
                        <div className="flex items-center justify-between mb-2">
                            <div className="flex items-center gap-2">
                                <div className="p-1.5 rounded-lg bg-blue-100 dark:bg-blue-900/30">
                                    <Target className="h-4 w-4 text-blue-600" />
                                </div>
                                <span className="text-sm text-gray-500">Progress</span>
                            </div>
                            <span className="text-sm font-semibold text-gray-900 dark:text-white">
                                {Math.round(overallProgress)}%
                            </span>
                        </div>
                        <ProgressBar value={overallProgress} size="sm" />
                    </div>
                </div>
            )}

            {/* Navigation Links */}
            <nav className="flex-1 overflow-y-auto p-3">
                <ul className="space-y-1">
                    {dashboardLinks.map((link) => {
                        const isActive = isActiveLink(link.href);
                        const Icon = link.icon;

                        return (
                            <li key={link.href}>
                                <Link
                                    href={link.href}
                                    className={cn(
                                        'flex items-center gap-3 px-3 py-2.5 rounded-lg',
                                        'transition-all duration-200',
                                        'group',
                                        isCollapsed && 'justify-center',
                                        isActive
                                            ? 'bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400'
                                            : 'text-gray-500 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-800'
                                    )}
                                    title={isCollapsed ? link.label : undefined}
                                >
                                    <Icon className={cn(
                                        'h-5 w-5 flex-shrink-0',
                                        'transition-transform group-hover:scale-110'
                                    )} />
                                    {!isCollapsed && (
                                        <span className="text-sm font-medium">{link.label}</span>
                                    )}
                                    {!isCollapsed && isActive && (
                                        <div className="ml-auto w-1.5 h-1.5 rounded-full bg-blue-600" />
                                    )}
                                </Link>
                            </li>
                        );
                    })}
                </ul>

                {/* Divider */}
                <div className="my-4 border-t border-gray-200 dark:border-gray-800" />

                {/* Secondary Links */}
                <ul className="space-y-1">
                    <li>
                        <Link
                            href="/dashboard/settings"
                            className={cn(
                                'flex items-center gap-3 px-3 py-2.5 rounded-lg',
                                'text-gray-500 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-800',
                                'transition-colors',
                                isCollapsed && 'justify-center'
                            )}
                            title={isCollapsed ? 'Settings' : undefined}
                        >
                            <Settings className="h-5 w-5" />
                            {!isCollapsed && <span className="text-sm">Settings</span>}
                        </Link>
                    </li>
                    <li>
                        <Link
                            href="/contact"
                            className={cn(
                                'flex items-center gap-3 px-3 py-2.5 rounded-lg',
                                'text-gray-500 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-800',
                                'transition-colors',
                                isCollapsed && 'justify-center'
                            )}
                            title={isCollapsed ? 'Help' : undefined}
                        >
                            <HelpCircle className="h-5 w-5" />
                            {!isCollapsed && <span className="text-sm">Help & Support</span>}
                        </Link>
                    </li>
                </ul>
            </nav>

            {/* Logout Button */}
            <div className="p-3 border-t border-gray-200 dark:border-gray-800">
                <button
                    onClick={() => logout()}
                    className={cn(
                        'flex items-center gap-3 w-full px-3 py-2.5 rounded-lg',
                        'text-gray-500 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-950',
                        'transition-colors',
                        isCollapsed && 'justify-center'
                    )}
                    title={isCollapsed ? 'Logout' : undefined}
                >
                    <LogOut className="h-5 w-5" />
                    {!isCollapsed && <span className="text-sm">Logout</span>}
                </button>
            </div>
        </aside>
    );
}

export default Sidebar;
