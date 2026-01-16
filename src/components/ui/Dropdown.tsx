'use client';

import React, { useState, useRef, useEffect } from 'react';
import { ChevronDown, Check } from 'lucide-react';
import { cn } from '@/lib/utils';

// Dropdown Context
interface DropdownContextType {
    isOpen: boolean;
    setIsOpen: (open: boolean) => void;
    closeDropdown: () => void;
}

const DropdownContext = React.createContext<DropdownContextType | undefined>(undefined);

function useDropdown() {
    const context = React.useContext(DropdownContext);
    if (!context) {
        throw new Error('Dropdown components must be used within a Dropdown');
    }
    return context;
}

// Main Dropdown Component
interface DropdownProps {
    children: React.ReactNode;
    className?: string;
}

function Dropdown({ children, className }: DropdownProps) {
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    const closeDropdown = () => setIsOpen(false);

    // Close on outside click
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    // Close on escape
    useEffect(() => {
        const handleEscape = (event: KeyboardEvent) => {
            if (event.key === 'Escape') {
                setIsOpen(false);
            }
        };

        document.addEventListener('keydown', handleEscape);
        return () => document.removeEventListener('keydown', handleEscape);
    }, []);

    return (
        <DropdownContext.Provider value={{ isOpen, setIsOpen, closeDropdown }}>
            <div ref={dropdownRef} className={cn('relative inline-block', className)}>
                {children}
            </div>
        </DropdownContext.Provider>
    );
}

// Dropdown Trigger
interface DropdownTriggerProps {
    children: React.ReactNode;
    asChild?: boolean;
    className?: string;
}

function DropdownTrigger({ children, asChild, className }: DropdownTriggerProps) {
    const { isOpen, setIsOpen } = useDropdown();

    if (asChild) {
        return (
            <div onClick={() => setIsOpen(!isOpen)} className={className}>
                {children}
            </div>
        );
    }

    return (
        <button
            type="button"
            onClick={() => setIsOpen(!isOpen)}
            className={cn(
                'inline-flex items-center gap-2 px-4 py-2 rounded-lg',
                'bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white font-medium',
                'hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors',
                className
            )}
        >
            {children}
            <ChevronDown
                className={cn(
                    'h-4 w-4 transition-transform duration-200',
                    isOpen && 'rotate-180'
                )}
            />
        </button>
    );
}

// Dropdown Content
interface DropdownContentProps {
    children: React.ReactNode;
    align?: 'left' | 'right' | 'center';
    sideOffset?: number;
    className?: string;
}

function DropdownContent({
    children,
    align = 'left',
    sideOffset = 4,
    className,
}: DropdownContentProps) {
    const { isOpen } = useDropdown();

    if (!isOpen) return null;

    const alignClasses = {
        left: 'left-0',
        right: 'right-0',
        center: 'left-1/2 -translate-x-1/2',
    };

    return (
        <div
            className={cn(
                'absolute z-50 min-w-[180px] py-1',
                'bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-lg shadow-lg',
                'animate-slide-down',
                alignClasses[align],
                className
            )}
            style={{ marginTop: sideOffset }}
        >
            {children}
        </div>
    );
}

// Dropdown Item
interface DropdownItemProps {
    children: React.ReactNode;
    onClick?: () => void;
    disabled?: boolean;
    destructive?: boolean;
    icon?: React.ReactNode;
    shortcut?: string;
    selected?: boolean;
    className?: string;
}

function DropdownItem({
    children,
    onClick,
    disabled = false,
    destructive = false,
    icon,
    shortcut,
    selected = false,
    className,
}: DropdownItemProps) {
    const { closeDropdown } = useDropdown();

    const handleClick = () => {
        if (disabled) return;
        onClick?.();
        closeDropdown();
    };

    return (
        <button
            type="button"
            disabled={disabled}
            onClick={handleClick}
            className={cn(
                'w-full flex items-center gap-2 px-3 py-2 text-sm text-left',
                'transition-colors',
                disabled
                    ? 'opacity-50 cursor-not-allowed'
                    : 'hover:bg-gray-100 dark:hover:bg-gray-800 cursor-pointer',
                destructive && 'text-red-500 hover:bg-red-50 dark:hover:bg-red-950',
                selected && 'bg-blue-50 dark:bg-blue-950',
                className
            )}
        >
            {icon && <span className="w-4 h-4">{icon}</span>}
            <span className="flex-1">{children}</span>
            {selected && <Check className="h-4 w-4 text-blue-600" />}
            {shortcut && (
                <span className="text-xs text-gray-400">{shortcut}</span>
            )}
        </button>
    );
}

// Dropdown Separator
function DropdownSeparator({ className }: { className?: string }) {
    return <div className={cn('h-px bg-gray-200 dark:bg-gray-800 my-1', className)} />;
}

// Dropdown Label
function DropdownLabel({
    children,
    className,
}: {
    children: React.ReactNode;
    className?: string;
}) {
    return (
        <div
            className={cn(
                'px-3 py-1.5 text-xs font-medium text-gray-500 dark:text-gray-400',
                className
            )}
        >
            {children}
        </div>
    );
}

export {
    Dropdown,
    DropdownTrigger,
    DropdownContent,
    DropdownItem,
    DropdownSeparator,
    DropdownLabel,
};
