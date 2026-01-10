"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";

interface UIState {
  expandedMenus: string[];
  isMobileMenuOpen: boolean;
  hasSeenIntro: boolean;
  toggleMenu: (label: string) => void;
  setMobileMenuOpen: (open: boolean) => void;
  toggleMobileMenu: () => void;
  setHasSeenIntro: (seen: boolean) => void;
}

export const useUIStore = create<UIState>()(
  persist(
    (set) => ({
      expandedMenus: ["Social Mixes"], // Default open as per design
      isMobileMenuOpen: false,
      hasSeenIntro: false,
      toggleMenu: (label: string) =>
        set((state) => ({
          expandedMenus: state.expandedMenus.includes(label)
            ? state.expandedMenus.filter((i) => i !== label)
            : [...state.expandedMenus, label],
        })),
      setMobileMenuOpen: (open: boolean) => set({ isMobileMenuOpen: open }),
      toggleMobileMenu: () =>
        set((state) => ({ isMobileMenuOpen: !state.isMobileMenuOpen })),
      setHasSeenIntro: (seen: boolean) => set({ hasSeenIntro: seen }),
    }),
    {
      name: "ui-storage",
    }
  )
);
