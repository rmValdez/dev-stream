import React from "react";

export interface NavItem {
  label: string;
  href?: string;
  icon?: React.ReactNode;
  iconName?: string; // Material Symbols name
  children?: NavItem[];
}

export const NAVIGATION_ITEMS: NavItem[] = [
  {
    label: "Hot Modules",
    iconName: "grid_view",
    href: "/",
  },
  {
    label: "Social Mixes",
    iconName: "explore",
    children: [
      { label: "Music", href: "/social-mixes/music" },
      { label: "Messages", href: "/social-mixes/messages" },
      { label: "Podcasts", href: "/social-mixes/podcasts" },
      { label: "Live Radio", href: "/social-mixes/live-radio" },
    ],
  },
  {
    label: "Live Metrics",
    href: "/live-metrics",
    iconName: "analytics",
  },
  {
    label: "Deployments",
    href: "/deployments",
    iconName: "account_tree",
  },
  {
    label: "System Prefs",
    href: "/system-prefs",
    iconName: "settings",
  },
];

export const TRENDING_REPOS = [
  { label: "nextjs/turbo", href: "https://github.com/vercel/turbo" },
  { label: "rust-lang/core", href: "https://github.com/rust-lang/rust" },
  { label: "shadcn/ui", href: "https://github.com/shadcn/ui" },
];
