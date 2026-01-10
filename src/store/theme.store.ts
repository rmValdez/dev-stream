'use client';

import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';

export type Theme = 'light' | 'dark';

/**
 * Hook to manage theme using next-themes.
 * This replaces the old zustand-based theme store.
 * Compatible with the existing API: { theme, setTheme, toggleTheme }
 */
export function useThemeStore() {
  const { setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // Wait until mounted to avoid hydration mismatch
  useEffect(() => {
    const timer = setTimeout(() => {
      setMounted(true);
    }, 0);
    return () => clearTimeout(timer);
  }, []);

  const toggleTheme = () => {
    setTheme(resolvedTheme === 'dark' ? 'light' : 'dark');
  };

  // Return a consistent value during SSR to prevent hydration issues
  if (!mounted) {
    return {
      theme: 'dark' as Theme,
      setTheme: (newTheme: Theme) => setTheme(newTheme),
      toggleTheme,
    };
  }

  return {
    theme: (resolvedTheme || 'dark') as Theme,
    setTheme: (newTheme: Theme) => setTheme(newTheme),
    toggleTheme,
  };
}
