"use client";

import React from "react";

interface HotModuleNavProps {
  activeMode: string;
  onModeChange: (mode: string) => void;
}

const MODES = [
  { id: "STATUS", label: "Status", icon: "edit_note" },
  { id: "MEDIA", label: "Media", icon: "perm_media" },
  { id: "LIVE", label: "Live", icon: "broadcast_on_home" },
  { id: "GAME", label: "Game", icon: "sports_esports" },
  { id: "ARTICLE", label: "Article", icon: "article" },
];

export default function HotModuleNav({
  activeMode,
  onModeChange,
}: HotModuleNavProps) {
  return (
    <div className="flex items-center gap-1 p-1 bg-black/5 dark:bg-black/20 rounded-t-2xl border-b border-black/5 dark:border-white/5">
      {MODES.map((mode) => (
        <button
          key={mode.id}
          onClick={() => onModeChange(mode.id)}
          className={`relative group flex items-center gap-2 px-4 py-2 rounded-xl text-[10px] font-bold uppercase tracking-widest transition-all ${
            activeMode === mode.id
              ? "bg-white dark:bg-white/10 text-slate-900 dark:text-white shadow-sm"
              : "text-slate-500 dark:text-white/40 hover:text-slate-900 dark:hover:text-white hover:bg-black/5 dark:hover:bg-white/5"
          }`}
        >
          <span className="material-symbols-outlined text-base">
            {mode.icon}
          </span>
          {mode.label}
          {activeMode === mode.id && (
            <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1 h-1 bg-primary rounded-full mb-1"></span>
          )}
        </button>
      ))}
      <div className="ml-auto px-2">
        <span className="text-[9px] font-mono text-slate-400 dark:text-white/20">
          MODULE_READY
        </span>
      </div>
    </div>
  );
}
