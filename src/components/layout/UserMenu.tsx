'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import {
    User,
    Settings,
    BookMarked,
    BarChart3,
    LogOut,
    LogIn,
    UserPlus,
    Shield,
} from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import { Avatar, ConfirmDialog } from '@/components/ui';
import {
    Dropdown,
    DropdownTrigger,
    DropdownContent,
    DropdownItem,
    DropdownSeparator,
} from '@/components/ui';
import { cn } from '@/lib/utils';
import toast from 'react-hot-toast';

interface UserMenuProps {
    className?: string;
}

function UserMenu({ className }: UserMenuProps) {
    const router = useRouter();
    const {
        isAuthenticated,
        userData,
        userName,
        userPhoto,
        isAdmin,
        logout
    } = useAuth();

    const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);
    const [isLoggingOut, setIsLoggingOut] = useState(false);

    const handleLogout = async () => {
        setIsLoggingOut(true);
        try {
            await logout();
            toast.success('সফলভাবে লগআউট হয়েছে!');
            router.push('/');
        } catch (error) {
            console.error('Logout error:', error);
            toast.error('লগআউট করতে সমস্যা হয়েছে');
        } finally {
            setIsLoggingOut(false);
            setShowLogoutConfirm(false);
        }
    };

    // Not logged in - show login/signup buttons
    if (!isAuthenticated) {
        return (
            <div className={cn('flex items-center gap-2', className)}>
                <button
                    onClick={() => router.push('/login')}
                    className="hidden sm:flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                >
                    <LogIn className="h-4 w-4" />
                    Login
                </button>
                <button
                    onClick={() => router.push('/signup')}
                    className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium bg-blue-600 text-white hover:bg-blue-700 transition-colors"
                >
                    <UserPlus className="h-4 w-4 hidden sm:block" />
                    Sign Up
                </button>
            </div>
        );
    }

    // Logged in - show user menu dropdown
    return (
        <>
            <Dropdown className={className}>
                <DropdownTrigger asChild>
                    <button className="flex items-center gap-2 p-1 pr-3 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
                        <Avatar
                            src={userPhoto}
                            name={userName}
                            size="sm"
                        />
                        <span className="hidden md:block text-sm font-medium text-gray-900 dark:text-white max-w-[100px] truncate">
                            {userName}
                        </span>
                    </button>
                </DropdownTrigger>

                <DropdownContent align="right" className="w-56">
                    {/* User Info */}
                    <div className="px-3 py-2 border-b border-gray-200 dark:border-gray-700">
                        <p className="text-sm font-medium text-gray-900 dark:text-white truncate">{userName}</p>
                        <p className="text-xs text-gray-500 truncate">{userData?.email}</p>
                        {userData?.stream && (
                            <span className="inline-block mt-1 px-2 py-0.5 bg-blue-100 dark:bg-blue-900/30 text-blue-600 text-xs rounded-full capitalize">
                                {userData.stream} • Semester {userData.currentSemester}
                            </span>
                        )}
                    </div>

                    {/* Menu Items */}
                    <div className="py-1">
                        <DropdownItem
                            icon={<User className="h-4 w-4" />}
                            onClick={() => router.push('/dashboard')}
                        >
                            Dashboard
                        </DropdownItem>

                        <DropdownItem
                            icon={<BarChart3 className="h-4 w-4" />}
                            onClick={() => router.push('/dashboard/progress')}
                        >
                            My Progress
                        </DropdownItem>

                        <DropdownItem
                            icon={<BookMarked className="h-4 w-4" />}
                            onClick={() => router.push('/dashboard/bookmarks')}
                        >
                            Bookmarks
                        </DropdownItem>

                        <DropdownItem
                            icon={<Settings className="h-4 w-4" />}
                            onClick={() => router.push('/dashboard/settings')}
                        >
                            Settings
                        </DropdownItem>
                    </div>

                    {/* Admin Link */}
                    {isAdmin && (
                        <>
                            <DropdownSeparator />
                            <DropdownItem
                                icon={<Shield className="h-4 w-4" />}
                                onClick={() => router.push('/admin')}
                            >
                                Admin Panel
                            </DropdownItem>
                        </>
                    )}

                    {/* Logout */}
                    <DropdownSeparator />
                    <DropdownItem
                        icon={<LogOut className="h-4 w-4" />}
                        onClick={() => setShowLogoutConfirm(true)}
                        destructive
                    >
                        Logout
                    </DropdownItem>
                </DropdownContent>
            </Dropdown>

            {/* Logout Confirmation Dialog */}
            <ConfirmDialog
                isOpen={showLogoutConfirm}
                onClose={() => setShowLogoutConfirm(false)}
                onConfirm={handleLogout}
                title="Logout করতে চাও?"
                message="তুমি কি সত্যিই logout করতে চাও?"
                confirmText="Logout"
                cancelText="Cancel"
                variant="warning"
                isLoading={isLoggingOut}
            />
        </>
    );
}

export default UserMenu;
