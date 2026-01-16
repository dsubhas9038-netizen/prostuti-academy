'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
    ChevronLeft,
    ChevronRight,
    LogOut,
    Shield
} from 'lucide-react';
import { AdminNavItem } from '@/types/admin';
import { adminNavItems } from '@/data/sampleAdminData';
import { Badge } from '@/components/ui';
import { cn } from '@/lib/utils';

interface AdminSidebarProps {
    collapsed: boolean;
    onToggle: () => void;
}

// Icon mapping
const iconMap: Record<string, string> = {
    '📊': '📊', '📝': '📝', '🧪': '🧪', '📄': '📄',
    '📚': '📚', '👥': '👥', '📈': '📈', '⚙️': '⚙️',
};

function AdminSidebar({ collapsed, onToggle }: AdminSidebarProps) {
    const pathname = usePathname();

    // Check if nav item is active
    const isActive = (href: string) => {
        if (href === '/admin') return pathname === '/admin';
        return pathname.startsWith(href);
    };

    return (
        <aside className={cn(
            'fixed left-0 top-0 h-screen bg-gray-900 border-r border-gray-800 transition-all duration-300 z-50',
            collapsed ? 'w-20' : 'w-72'
        )}>
            {/* Logo */}
            <div className="h-16 flex items-center justify-between px-4 border-b border-gray-800">
                <Link href="/admin" className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl flex items-center justify-center">
                        <Shield className="h-6 w-6 text-white" />
                    </div>
                    {!collapsed && (
                        <div>
                            <h1 className="font-bold text-white text-lg">Admin Panel</h1>
                            <p className="text-xs text-gray-500">ProstutiAcademy</p>
                        </div>
                    )}
                </Link>

                {/* Collapse Button */}
                <button
                    onClick={onToggle}
                    className="p-2 rounded-lg hover:bg-gray-800 text-gray-400 hover:text-white transition-colors"
                >
                    {collapsed ? (
                        <ChevronRight className="h-5 w-5" />
                    ) : (
                        <ChevronLeft className="h-5 w-5" />
                    )}
                </button>
            </div>

            {/* Navigation */}
            <nav className="p-4 space-y-1 overflow-y-auto h-[calc(100vh-8rem)]">
                {adminNavItems.map((item) => {
                    const active = isActive(item.href);

                    return (
                        <Link key={item.id} href={item.href}>
                            <div className={cn(
                                'flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all group',
                                active
                                    ? 'bg-gradient-to-r from-indigo-500/20 to-purple-500/20 text-indigo-400 border border-indigo-500/30'
                                    : 'text-gray-400 hover:bg-gray-800 hover:text-white'
                            )}>
                                {/* Icon */}
                                <span className={cn(
                                    'text-xl flex-shrink-0 transition-transform group-hover:scale-110',
                                    active && 'scale-110'
                                )}>
                                    {item.icon}
                                </span>

                                {/* Label */}
                                {!collapsed && (
                                    <>
                                        <span className="flex-1 font-medium text-sm">
                                            {item.label}
                                        </span>

                                        {/* Badge */}
                                        {item.badge !== undefined && (
                                            <Badge
                                                size="sm"
                                                className={cn(
                                                    active
                                                        ? 'bg-indigo-500/30 text-indigo-300'
                                                        : 'bg-gray-800 text-gray-400'
                                                )}
                                            >
                                                {item.badge > 999 ? '999+' : item.badge}
                                            </Badge>
                                        )}
                                    </>
                                )}
                            </div>
                        </Link>
                    );
                })}
            </nav>

            {/* Bottom Section */}
            <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-gray-800">
                <Link href="/">
                    <div className={cn(
                        'flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all',
                        'text-gray-400 hover:bg-red-500/10 hover:text-red-400'
                    )}>
                        <LogOut className="h-5 w-5" />
                        {!collapsed && (
                            <span className="font-medium text-sm">Exit Admin</span>
                        )}
                    </div>
                </Link>
            </div>
        </aside>
    );
}

export default AdminSidebar;
