"use client";

import React from "react";

export default function Footer() {
  return (
    <footer className="fixed bottom-0 left-0 right-0 h-8 bg-white/95 dark:bg-background-dark/95 border-t border-black/5 dark:border-white/5 backdrop-blur-xl z-50 flex items-center px-4 overflow-hidden">
      <div className="flex w-full items-center justify-between gap-6 text-[9px] font-black uppercase tracking-[0.15em] text-slate-400 dark:text-white/30">
        <div className="flex items-center gap-8 shrink-0">
          <div className="flex items-center gap-3">
            <span>Global Health</span>
            <div className="w-20 h-4 bg-slate-100 dark:bg-white/5 rounded-full"></div>
          </div>
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[12px]">
              account_tree
            </span>
            <span className="font-mono">main*</span>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <span>Workspace Latency: 12ms</span>
          <span className="border-l border-black/5 dark:border-white/5 pl-4">
            Session: 02:44:12
          </span>
        </div>
      </div>
    </footer>
  );
}
