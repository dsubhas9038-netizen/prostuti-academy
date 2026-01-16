// UI Store using Zustand

import { create } from 'zustand';

interface UIState {
    sidebarOpen: boolean;
    mobileMenuOpen: boolean;
    language: 'bn' | 'en';
    setSidebarOpen: (open: boolean) => void;
    toggleSidebar: () => void;
    setMobileMenuOpen: (open: boolean) => void;
    toggleMobileMenu: () => void;
    setLanguage: (lang: 'bn' | 'en') => void;
    toggleLanguage: () => void;
}

export const useUIStore = create<UIState>((set) => ({
    sidebarOpen: true,
    mobileMenuOpen: false,
    language: 'bn',
    setSidebarOpen: (open) => set({ sidebarOpen: open }),
    toggleSidebar: () => set((state) => ({ sidebarOpen: !state.sidebarOpen })),
    setMobileMenuOpen: (open) => set({ mobileMenuOpen: open }),
    toggleMobileMenu: () => set((state) => ({ mobileMenuOpen: !state.mobileMenuOpen })),
    setLanguage: (language) => set({ language }),
    toggleLanguage: () => set((state) => ({ language: state.language === 'bn' ? 'en' : 'bn' })),
}));
