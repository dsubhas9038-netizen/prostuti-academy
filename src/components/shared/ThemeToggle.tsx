'use client';

import React from 'react';
import { Sun, Moon, Monitor } from 'lucide-react';
import { useTheme } from '@/context';
import { cn } from '@/lib/utils';
import {
    Dropdown,
    DropdownTrigger,
    DropdownContent,
    DropdownItem,
} from '@/components/ui';

interface ThemeToggleProps {
    variant?: 'icon' | 'dropdown';
    className?: string;
}

function ThemeToggle({ variant = 'icon', className }: ThemeToggleProps) {
    const { theme, actualTheme, setTheme, toggleTheme } = useTheme();

    // Simple icon toggle
    if (variant === 'icon') {
        return (
            <button
                onClick={toggleTheme}
                className={cn(
                    'p-2 rounded-lg transition-colors',
                    'hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-500 hover:text-gray-900 dark:hover:text-white',
                    className
                )}
                title={actualTheme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
            >
                {actualTheme === 'dark' ? (
                    <Sun className="h-5 w-5" />
                ) : (
                    <Moon className="h-5 w-5" />
                )}
            </button>
        );
    }

    // Dropdown with system option
    return (
        <Dropdown className={className}>
            <DropdownTrigger asChild>
                <button
                    className={cn(
                        'p-2 rounded-lg transition-colors',
                        'hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-500 hover:text-gray-900 dark:hover:text-white'
                    )}
                >
                    {actualTheme === 'dark' ? (
                        <Moon className="h-5 w-5" />
                    ) : (
                        <Sun className="h-5 w-5" />
                    )}
                </button>
            </DropdownTrigger>
            <DropdownContent align="right">
                <DropdownItem
                    icon={<Sun className="h-4 w-4" />}
                    onClick={() => setTheme('light')}
                    selected={theme === 'light'}
                >
                    Light
                </DropdownItem>
                <DropdownItem
                    icon={<Moon className="h-4 w-4" />}
                    onClick={() => setTheme('dark')}
                    selected={theme === 'dark'}
                >
                    Dark
                </DropdownItem>
                <DropdownItem
                    icon={<Monitor className="h-4 w-4" />}
                    onClick={() => setTheme('system')}
                    selected={theme === 'system'}
                >
                    System
                </DropdownItem>
            </DropdownContent>
        </Dropdown>
    );
}

export default ThemeToggle;
