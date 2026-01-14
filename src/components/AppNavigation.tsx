import React from "react";
import { UserRole } from "@/utils/roleUtils";

export interface NavItem {
  label: string;
  href?: string;
  role?: string;
  icon?: React.ReactNode;
  iconName?: string; // Material Symbols name
  children?: NavItem[];
  requiredRoles?: UserRole | UserRole[]; // Only show to these roles
  excludedRoles?: UserRole | UserRole[]; // Hide from these roles
}

export const NAVIGATION_ITEMS: NavItem[] = [
  {
    label: "Hot Modules",
    iconName: "grid_view",
    href: "/hot-modules",
  },
  {
    label: "Social Mixes",
    iconName: "explore",
    children: [
      { label: "Music", href: "/social-mixes/music" },
      { label: "Radio Podcasts", href: "/social-mixes/podcasts" },
    ],
  },
  {
    label: "The Organization",
    iconName: "groups",
    href: "/theOrganization",
  },
  {
    label: "Live Metrics",
    href: "/live-metrics",
    iconName: "analytics",
    requiredRoles: ["admin"],
  },
  {
    label: "Deployments",
    href: "/deployments",
    iconName: "account_tree",
    requiredRoles: ["admin"],
  },
  {
    label: "System Prefs",
    href: "/system-prefs",
    iconName: "settings",
  },
  {
    label: "Dev Stream Management",
    iconName: "people",
    requiredRoles: ["admin"],
    children: [
      {
        label: "User Management",
        href: "/admin/user-management",
      },
      { label: "Dashboard", href: "/admin/dashboard" },
      { label: "Feedback", href: "/admin/feedback" },
      { label: "Settings", href: "/admin/settings" },
    ],
  },
];

export interface RepoItem {
  label: string;
  href: string;
  iconName?: string;
}

export const TRENDING_REPOS: RepoItem[] = [
  {
    label: "nextjs/turbo",
    href: "https://github.com/vercel/turbo",
    iconName: "bolt",
  },
  {
    label: "rust-lang/core",
    href: "https://github.com/rust-lang/rust",
    iconName: "settings_input_component",
  },
  {
    label: "shadcn/ui",
    href: "https://github.com/shadcn/ui",
    iconName: "category",
  },
];
