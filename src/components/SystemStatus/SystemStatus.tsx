"use client";

import React from "react";

export default function SystemStatus() {
  return (
    <aside className="w-80 border-l border-black/5 dark:border-white/5 bg-white/95 dark:bg-background-dark/95 backdrop-blur-xl flex flex-col p-5 overflow-y-auto custom-scrollbar shrink-0 z-20">
      <div className="mb-8 border-b border-black/5 dark:border-white/10 pb-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 dark:text-white/40">
            Development Mode
          </h2>
          <div className="flex items-center gap-2 px-2 py-1 bg-ops-warning/10 border border-ops-warning/30 rounded">
            <div className="w-2 h-2 rounded-full bg-ops-warning shadow-[0_0_8px_#ff9d00]"></div>
            <span className="text-[10px] font-bold text-ops-warning tracking-tighter">
              LOCAL
            </span>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-3 mb-3">
          <div className="bg-black/5 dark:bg-white/5 rounded-lg p-3 border border-black/5 dark:border-white/5">
            <p className="text-[9px] uppercase font-bold text-slate-400 dark:text-white/30 mb-1">
              Status
            </p>
            <p className="text-xs font-black text-ops-warning">REBUILDING...</p>
          </div>
          <div className="bg-black/5 dark:bg-white/5 rounded-lg p-3 border border-black/5 dark:border-white/5">
            <p className="text-[9px] uppercase font-bold text-slate-400 dark:text-white/30 mb-1">
              Port
            </p>
            <p className="text-xs font-black text-primary font-mono">:3000</p>
          </div>
        </div>
      </div>

      <div className="mb-8 space-y-5">
        <h2 className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 dark:text-white/40 mb-4">
          Resource Usage
        </h2>
        <div className="space-y-2">
          <div className="flex justify-between text-[10px] font-bold">
            <span className="text-slate-500 dark:text-white/60">CPU LOAD</span>
            <span className="text-slate-900 dark:text-white">42%</span>
          </div>
          <div className="h-1 w-full bg-black/5 dark:bg-white/5 rounded-full overflow-hidden">
            <div
              className="h-full bg-slate-400 dark:bg-white/40"
              style={{ width: "42%" }}
            ></div>
          </div>
        </div>
      </div>
    </aside>
  );
}
