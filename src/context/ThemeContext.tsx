'use client';

import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';

type Theme = 'light' | 'dark' | 'system';

interface ThemeContextType {
    theme: Theme;
    actualTheme: 'light' | 'dark';
    setTheme: (theme: Theme) => void;
    toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

interface ThemeProviderProps {
    children: ReactNode;
}

export function ThemeProvider({ children }: ThemeProviderProps) {
    const [theme, setThemeState] = useState<Theme>('system');
    const [actualTheme, setActualTheme] = useState<'light' | 'dark'>('light');
    const [mounted, setMounted] = useState(false);

    // Load theme from localStorage on mount
    useEffect(() => {
        setMounted(true);
        const savedTheme = localStorage.getItem('theme') as Theme | null;
        if (savedTheme) {
            setThemeState(savedTheme);
        }
    }, []);

    // Update actual theme based on theme setting and system preference
    useEffect(() => {
        if (!mounted) return;

        const updateActualTheme = () => {
            if (theme === 'system') {
                const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
                setActualTheme(systemPrefersDark ? 'dark' : 'light');
            } else {
                setActualTheme(theme);
            }
        };

        updateActualTheme();

        // Listen for system theme changes
        const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
        const handleChange = () => {
            if (theme === 'system') {
                updateActualTheme();
            }
        };

        mediaQuery.addEventListener('change', handleChange);
        return () => mediaQuery.removeEventListener('change', handleChange);
    }, [theme, mounted]);

    // Apply theme to document
    useEffect(() => {
        if (!mounted) return;

        const root = document.documentElement;

        if (actualTheme === 'dark') {
            root.classList.add('dark');
        } else {
            root.classList.remove('dark');
        }
    }, [actualTheme, mounted]);

    // Set theme function
    const setTheme = (newTheme: Theme) => {
        setThemeState(newTheme);
        localStorage.setItem('theme', newTheme);
    };

    // Toggle between light and dark
    const toggleTheme = () => {
        const newTheme = actualTheme === 'light' ? 'dark' : 'light';
        setTheme(newTheme);
    };

    const value: ThemeContextType = {
        theme,
        actualTheme,
        setTheme,
        toggleTheme,
    };

    // Prevent hydration mismatch by not rendering until mounted
    if (!mounted) {
        return (
            <ThemeContext.Provider value={value}>
                {children}
            </ThemeContext.Provider>
        );
    }

    return (
        <ThemeContext.Provider value={value}>
            {children}
        </ThemeContext.Provider>
    );
}

// Custom hook
export function useTheme(): ThemeContextType {
    const context = useContext(ThemeContext);

    if (context === undefined) {
        throw new Error('useTheme must be used within a ThemeProvider');
    }

    return context;
}

export { ThemeContext };
