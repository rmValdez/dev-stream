"use client";

import React, { useState, useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import { useAuthStore } from "@/store/auth.store";
import { useThemeStore } from "@/store/theme.store";
import { useUIStore } from "@/store/ui.store";
import {
  NAVIGATION_ITEMS,
  TRENDING_REPOS,
  NavItem,
} from "@/components/AppNavigation";
import Footer from "@/components/Footer";
import TerminalOverlay from "@/components/TerminalOverlay/TerminalOverlay";
import AppRoute from "@/components/AppRoute";
import SystemStatus from "@/components/SystemStatus/SystemStatus";

interface AppLayoutProps {
  children?: React.ReactNode;
}

export default function AppLayout({ children }: AppLayoutProps) {
  const pathname = usePathname();
  const router = useRouter();
  const { user } = useAuthStore();
  const { toggleTheme } = useThemeStore();
  const { expandedMenus, toggleMenu, isMobileMenuOpen, toggleMobileMenu } =
    useUIStore();

  const [mounted, setMounted] = useState(false);

  // Hydration safety
  useEffect(() => {
    const timer = setTimeout(() => setMounted(true), 0);
    return () => clearTimeout(timer);
  }, []);

  const isActive = (href?: string) => {
    if (!href) return false;
    return pathname === href;
  };

  const isMenuActive = (item: NavItem): boolean => {
    if (item.href && isActive(item.href)) return true;
    if (item.children) {
      return item.children.some((child) => isMenuActive(child));
    }
    return false;
  };

  const renderNavItem = (item: NavItem) => {
    const hasChildren = item.children && item.children.length > 0;
    const isExpanded = expandedMenus.includes(item.label);
    const active = item.href ? isActive(item.href) : isMenuActive(item);

    return (
      <div key={item.label} className="group">
        <div
          onClick={() => {
            if (hasChildren) {
              toggleMenu(item.label);
            } else if (item.href) {
              router.push(item.href);
            }
          }}
          className={`flex items-center gap-4 px-4 py-3 rounded-lg transition-all cursor-pointer ${
            active
              ? "bg-black/[0.05] dark:bg-white/[0.05] text-slate-900 dark:text-white"
              : "text-slate-500 dark:text-white/40 hover:text-slate-900 dark:hover:text-white hover:bg-black/[0.03] dark:hover:bg-white/[0.03]"
          }`}
        >
          {item.iconName && (
            <span className="material-symbols-outlined text-xl shrink-0">
              {item.iconName}
            </span>
          )}
          <span className="text-sm font-semibold tracking-wide">
            {item.label}
          </span>
          {hasChildren && (
            <span
              className={`material-symbols-outlined text-sm ml-auto transition-transform ${
                isExpanded ? "rotate-180" : ""
              }`}
            >
              expand_more
            </span>
          )}
        </div>

        {hasChildren && isExpanded && (
          <div className="pl-12 space-y-2 mt-1 mb-4">
            {item.children?.map((child) => (
              <a
                key={child.label}
                onClick={() => child.href && router.push(child.href)}
                className={`block text-xs font-bold transition-colors uppercase tracking-widest cursor-pointer ${
                  isActive(child.href)
                    ? "text-primary"
                    : "text-slate-400 dark:text-white/20 hover:text-primary dark:hover:text-primary"
                }`}
              >
                {child.label}
              </a>
            ))}
          </div>
        )}
      </div>
    );
  };

  return (
    <AppRoute>
      <div className="flex h-screen w-full relative mesh-gradient font-display text-slate-900 dark:text-white overflow-hidden">
        {/* Sidebar Consolidated */}
        <aside
          className={`w-64 border-r border-black/5 dark:border-white/5 bg-white dark:bg-background-dark flex flex-col justify-between p-6 shrink-0 z-20 transition-all ${
            isMobileMenuOpen
              ? "translate-x-0"
              : "-translate-x-full md:translate-x-0"
          }`}
        >
          <div className="space-y-6 overflow-y-auto custom-scrollbar pr-2">
            {/* Logo Section */}
            <div className="flex items-center gap-4 px-1 py-1">
              <button
                className="relative w-12 h-12 rounded-full border border-slate-900/20 dark:border-white/20 bg-slate-900 dark:bg-black flex items-center justify-center flex-shrink-0 shadow-2xl transition-all hover:scale-105 active:scale-95 group overflow-hidden"
                onClick={toggleTheme}
              >
                <div className="relative z-10 ds-logo-font font-bold flex items-center justify-center text-white">
                  <span className="text-xl -mr-1">D</span>
                  <span className="text-xl italic translate-y-0.5">S</span>
                </div>
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/40">
                  <span className="material-symbols-outlined text-white text-lg dark:hidden">
                    dark_mode
                  </span>
                  <span className="material-symbols-outlined text-white text-lg hidden dark:block">
                    light_mode
                  </span>
                </div>
                <div className="absolute bottom-1 right-1 w-2.5 h-2.5 rounded-full bg-primary border-2 border-black hidden dark:block"></div>
                <div className="absolute bottom-1 right-1 w-2.5 h-2.5 rounded-full bg-slate-400 border-2 border-white block dark:hidden"></div>
              </button>
              <div className="flex flex-col">
                <span className="text-[12px] font-bold tracking-[0.4em] uppercase font-mono truncate text-slate-900 dark:text-white">
                  Dev Stream
                </span>
              </div>
            </div>

            {/* User Section */}
            <div
              onClick={() => router.push("/profile")}
              className="flex items-center gap-3 bg-black/[0.03] dark:bg-white/[0.03] rounded-xl p-3 border border-black/5 dark:border-white/5 group cursor-pointer hover:bg-black/[0.05] dark:hover:bg-white/10 transition-all"
            >
              <div
                className="w-10 h-10 rounded-full bg-cover border border-black/10 dark:border-white/10 grayscale group-hover:grayscale-0 transition-all shadow-lg flex-shrink-0"
                style={{
                  backgroundImage:
                    "url('https://replicate.delivery/pbxt/JR3pX7O7l5O4TfL8g6e4k8g8k8k8k8k8k8k8k8k8k8k8k8k8/https://lh3.googleusercontent.com/aida-public/AB6AXuC2Tkx2dc7TbK-Cx0HB2u64H6Rh7off1CUQYFWVPmJ14y7mZy29upnjlzPfjlHOrkkVY8GbQWt6f9W7kcYGN2yz2y-yEdtCFRDWKpcbpDPtPVF6DXyHTxHNBK3It5KQFUJGxtCu3E_vn7cn4qjAOHpTm4Mn_Gb6h1lbI0AWVqy53kial7DzWi2PvHxbZoKFF3Y1Q70WpDVMmeuapDgtDvq-JZDwkKKlQa1oNe6njTX2EdrSiSWWKXXG19lojDd4OyxrUnaNrfHS2g6c')",
                }}
              ></div>
              <div className="overflow-hidden">
                <p className="text-sm font-bold tracking-wide text-slate-900 dark:text-white truncate">
                  @{mounted ? user?.username || "DevMaster" : "DevMaster"}
                </p>
                <p className="text-[9px] text-slate-500 dark:text-white/40 font-bold uppercase tracking-wider">
                  {mounted
                    ? user?.name || "System Architect"
                    : "System Architect"}
                </p>
              </div>
            </div>

            {/* Dynamic Navigation */}
            <nav className="space-y-1">
              {NAVIGATION_ITEMS.map((item) => renderNavItem(item))}
            </nav>

            {/* Trending Section */}
            <div className="pt-2">
              <p className="px-4 text-[10px] uppercase tracking-[0.2em] text-slate-400 dark:text-white/20 font-bold mb-4">
                Trending Repos
              </p>
              <div className="space-y-3 px-4">
                {TRENDING_REPOS.map((repo) => (
                  <a
                    key={repo.label}
                    href={repo.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs text-slate-500 dark:text-white/40 hover:text-slate-900 dark:hover:text-white cursor-pointer transition-colors truncate flex items-center gap-2"
                  >
                    <span className="w-1 h-1 rounded-full bg-slate-300 dark:bg-white/20"></span>
                    {repo.label}
                  </a>
                ))}
              </div>
            </div>
          </div>

          <div className="pt-6">
            <button className="w-full py-3 bg-slate-900 dark:bg-white text-white dark:text-black text-sm font-bold rounded-lg uppercase tracking-widest hover:opacity-90 transition-all flex items-center justify-center gap-2">
              <span className="material-symbols-outlined text-sm font-bold">
                add
              </span>
              New Session
            </button>
          </div>
        </aside>

        {/* Dynamic Content Area */}
        <div className="flex-1 flex overflow-hidden">{children}</div>

        <SystemStatus />

        <TerminalOverlay />
        <Footer />

        {/* mobile overlay */}
        {isMobileMenuOpen && (
          <div
            className="sidebar-overlay fixed inset-0 bg-black/50 z-10 md:hidden"
            onClick={toggleMobileMenu}
          />
        )}
      </div>
    </AppRoute>
  );
}
