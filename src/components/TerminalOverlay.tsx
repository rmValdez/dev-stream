"use client";

import React from "react";

export default function TerminalOverlay() {
  return (
    <div className="fixed bottom-8 left-64 right-80 z-40 flex flex-col pointer-events-none px-6">
      <div className="terminal-glass border border-black/5 dark:border-white/10 rounded-xl overflow-hidden shadow-2xl pointer-events-auto flex flex-col max-h-[400px]">
        <div className="flex items-center justify-between px-4 py-2 bg-slate-100/60 dark:bg-black/60 border-b border-black/5 dark:border-white/5">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1.5">
              <div className="w-2.5 h-2.5 rounded-full bg-slate-300 dark:bg-white/10 border border-slate-400/20 dark:border-white/20"></div>
              <div className="w-2.5 h-2.5 rounded-full bg-slate-300 dark:bg-white/10 border border-slate-400/20 dark:border-white/20"></div>
              <div className="w-2.5 h-2.5 rounded-full bg-slate-300 dark:bg-white/10 border border-slate-400/20 dark:border-white/20"></div>
            </div>
            <span className="text-[10px] font-mono text-slate-500 dark:text-white/40 uppercase tracking-widest">
              Main Console
            </span>
          </div>
        </div>
        <div className="flex-1 p-5 font-mono text-xs overflow-y-auto custom-scrollbar space-y-1.5 bg-white/10 dark:bg-black/40 text-slate-900 dark:text-white">
          <div className="flex gap-3">
            <span className="text-slate-400 dark:text-white/20 shrink-0">
              11:42:01
            </span>
            <span className="text-slate-900 dark:text-white font-bold">
              [SUCCESS]
            </span>
            <span className="text-slate-600 dark:text-white/60">
              Hot Module Replacement connected.
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
