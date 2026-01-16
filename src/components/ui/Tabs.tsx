'use client';

import React, { createContext, useContext, useState } from 'react';
import { cn } from '@/lib/utils';

// Tabs Context
interface TabsContextType {
    activeTab: string;
    setActiveTab: (value: string) => void;
}

const TabsContext = createContext<TabsContextType | undefined>(undefined);

function useTabsContext() {
    const context = useContext(TabsContext);
    if (!context) {
        throw new Error('Tabs components must be used within a Tabs provider');
    }
    return context;
}

// Main Tabs Component
interface TabsProps {
    defaultValue: string;
    value?: string;
    onChange?: (value: string) => void;
    children: React.ReactNode;
    className?: string;
}

function Tabs({
    defaultValue,
    value,
    onChange,
    children,
    className,
}: TabsProps) {
    const [internalValue, setInternalValue] = useState(defaultValue);

    const activeTab = value !== undefined ? value : internalValue;

    const setActiveTab = (newValue: string) => {
        if (value === undefined) {
            setInternalValue(newValue);
        }
        onChange?.(newValue);
    };

    return (
        <TabsContext.Provider value={{ activeTab, setActiveTab }}>
            <div className={cn('w-full', className)}>
                {children}
            </div>
        </TabsContext.Provider>
    );
}

// Tabs List (container for tab triggers)
interface TabsListProps {
    children: React.ReactNode;
    className?: string;
    variant?: 'default' | 'pills' | 'underline';
    fullWidth?: boolean;
}

function TabsList({
    children,
    className,
    variant = 'default',
    fullWidth = false,
}: TabsListProps) {
    const variantClasses = {
        default: 'bg-gray-100 dark:bg-gray-800 p-1 rounded-lg',
        pills: 'gap-2',
        underline: 'border-b border-gray-200 dark:border-gray-800 gap-0',
    };

    return (
        <div
            role="tablist"
            className={cn(
                'flex items-center',
                variantClasses[variant],
                fullWidth && 'w-full',
                className
            )}
        >
            {children}
        </div>
    );
}

// Tab Trigger (individual tab button)
interface TabTriggerProps {
    value: string;
    children: React.ReactNode;
    disabled?: boolean;
    className?: string;
    icon?: React.ReactNode;
    variant?: 'default' | 'pills' | 'underline';
}

function TabTrigger({
    value,
    children,
    disabled = false,
    className,
    icon,
    variant = 'default',
}: TabTriggerProps) {
    const { activeTab, setActiveTab } = useTabsContext();
    const isActive = activeTab === value;

    const baseClasses = 'flex items-center gap-2 font-medium transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed';

    const variantClasses = {
        default: cn(
            'px-3 py-1.5 rounded-md text-sm',
            isActive
                ? 'bg-white dark:bg-gray-900 text-gray-900 dark:text-white shadow-sm'
                : 'text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
        ),
        pills: cn(
            'px-4 py-2 rounded-full text-sm',
            isActive
                ? 'bg-blue-600 text-white'
                : 'text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800'
        ),
        underline: cn(
            'px-4 py-3 text-sm border-b-2 -mb-px',
            isActive
                ? 'border-blue-600 text-gray-900 dark:text-white'
                : 'border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:border-gray-300 dark:hover:border-gray-700'
        ),
    };

    return (
        <button
            role="tab"
            type="button"
            aria-selected={isActive}
            disabled={disabled}
            onClick={() => setActiveTab(value)}
            className={cn(baseClasses, variantClasses[variant], className)}
        >
            {icon}
            {children}
        </button>
    );
}

// Tab Content
interface TabContentProps {
    value: string;
    children: React.ReactNode;
    className?: string;
    forceMount?: boolean;
}

function TabContent({
    value,
    children,
    className,
    forceMount = false,
}: TabContentProps) {
    const { activeTab } = useTabsContext();
    const isActive = activeTab === value;

    if (!isActive && !forceMount) {
        return null;
    }

    return (
        <div
            role="tabpanel"
            hidden={!isActive}
            className={cn(
                'mt-4 focus:outline-none animate-fade-in',
                !isActive && 'hidden',
                className
            )}
        >
            {children}
        </div>
    );
}

export { Tabs, TabsList, TabTrigger, TabContent };
