"use client";

import React from "react";

export default function SystemStatus() {
  return (
    <aside className="w-80 border-l border-black/10 dark:border-white/5 bg-white dark:bg-background-dark flex flex-col shrink-0 z-20">
      <div className="p-6 border-b border-black/10 dark:border-white/10">
        <h2 className="text-[10px] font-black uppercase tracking-[0.2em] text-primary mb-1">
          Local Monitoring
        </h2>
        <h3 className="text-xl font-bold tracking-tight text-slate-900 dark:text-white">
          Dev Instance
        </h3>
      </div>
      <div className="flex-1 overflow-y-auto custom-scrollbar">
        <div className="p-6 space-y-4 border-b border-black/5 dark:border-white/5">
          <div className="flex items-center justify-between">
            <h4 className="text-[10px] font-black uppercase tracking-widest text-slate-500 dark:text-white/40">
              System Resources
            </h4>
            <span className="flex h-2 w-2 rounded-full bg-ops-green shadow-[0_0_8px_#00ff9d]"></span>
          </div>
          <div className="space-y-3">
            <div className="space-y-1">
              <div className="flex justify-between items-center text-[10px] font-mono uppercase">
                <span className="text-slate-600 dark:text-white/60">
                  CPU Load
                </span>
                <span className="text-primary font-bold">42%</span>
              </div>
              <div className="h-1 bg-slate-200 dark:bg-white/5 rounded-full overflow-hidden">
                <div
                  className="h-full bg-primary"
                  style={{ width: "42%" }}
                ></div>
              </div>
            </div>
            <div className="space-y-1">
              <div className="flex justify-between items-center text-[10px] font-mono uppercase">
                <span className="text-slate-600 dark:text-white/60">
                  RAM Usage
                </span>
                <span className="text-secondary font-bold">12.4GB / 32GB</span>
              </div>
              <div className="h-1 bg-slate-200 dark:bg-white/5 rounded-full overflow-hidden">
                <div
                  className="h-full bg-secondary"
                  style={{ width: "38%" }}
                ></div>
              </div>
            </div>
            <div className="flex items-center gap-4 text-slate-500 dark:text-white/40">
              <div className="flex items-center gap-1.5">
                <span className="material-symbols-outlined text-sm">
                  arrow_upward
                </span>
                <span className="text-[10px] font-mono">24.5 MB/s</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="material-symbols-outlined text-sm">
                  arrow_downward
                </span>
                <span className="text-[10px] font-mono">1.2 GB/s</span>
              </div>
            </div>
          </div>
        </div>
        <div className="p-6 space-y-4 border-b border-black/5 dark:border-white/5">
          <div className="flex items-center justify-between">
            <h4 className="text-[10px] font-black uppercase tracking-widest text-slate-500 dark:text-white/40">
              Active Databases
            </h4>
            <span className="text-[9px] font-mono px-1.5 py-0.5 bg-ops-green/10 text-ops-green border border-ops-green/20 rounded uppercase">
              Live
            </span>
          </div>
          <div className="space-y-3">
            <div className="flex items-center gap-3 p-2.5 rounded-lg bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10">
              <span className="material-symbols-outlined text-primary text-lg">
                database
              </span>
              <div className="flex-1 min-w-0">
                <p className="text-[11px] font-bold truncate text-slate-900 dark:text-white">
                  postgresql_local
                </p>
                <p className="text-[9px] font-mono text-slate-500 dark:text-white/40">
                  Port: 5432 • 12 Conns
                </p>
              </div>
              <span className="text-[9px] font-mono text-ops-green">4ms</span>
            </div>
            <div className="flex items-center gap-3 p-2.5 rounded-lg bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10">
              <span className="material-symbols-outlined text-ops-warning text-lg">
                hub
              </span>
              <div className="flex-1 min-w-0">
                <p className="text-[11px] font-bold truncate text-slate-900 dark:text-white">
                  redis_cache
                </p>
                <p className="text-[9px] font-mono text-slate-500 dark:text-white/40">
                  Port: 6379 • Idle
                </p>
              </div>
              <span className="text-[9px] font-mono text-ops-warning">
                12ms
              </span>
            </div>
          </div>
        </div>
        <div className="p-6 space-y-4">
          <div className="flex items-center justify-between">
            <h4 className="text-[10px] font-black uppercase tracking-widest text-slate-500 dark:text-white/40">
              Editor Activity
            </h4>
            <span className="text-[9px] font-mono text-primary">VS CODE</span>
          </div>
          <div className="bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 p-3 rounded-xl space-y-3">
            <div className="flex items-start gap-3">
              <span className="material-symbols-outlined text-slate-500 dark:text-white/40">
                description
              </span>
              <div className="flex-1 min-w-0">
                <p className="text-[11px] font-bold text-slate-900 dark:text-white truncate">
                  src/components/Player.tsx
                </p>
                <p className="text-[9px] font-mono text-slate-500 dark:text-white/40">
                  Modified 2m ago
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <div className="flex-1 h-1 bg-slate-200 dark:bg-white/5 rounded-full overflow-hidden flex">
                <div
                  className="h-full bg-ops-green"
                  style={{ width: "60%" }}
                ></div>
                <div
                  className="h-full bg-ops-danger"
                  style={{ width: "15%" }}
                ></div>
              </div>
              <span className="text-[9px] font-mono text-slate-600 dark:text-white/60">
                +124 -22
              </span>
            </div>
            <div className="flex items-center gap-2 pt-1">
              <span className="w-2 h-2 rounded-full bg-primary animate-pulse"></span>
              <span className="text-[9px] font-mono text-slate-500 dark:text-white/40 uppercase tracking-widest">
                Compiling Assets...
              </span>
            </div>
          </div>
        </div>
      </div>
      <div className="p-6 border-t border-black/10 dark:border-white/10 bg-slate-50 dark:bg-black/40">
        <div className="flex items-center justify-between mb-2">
          <span className="text-[10px] font-black uppercase tracking-widest text-slate-500 dark:text-white/40">
            Dev Session Hub
          </span>
          <span className="material-symbols-outlined text-sm text-primary">
            terminal
          </span>
        </div>
        <p className="text-[10px] font-mono text-slate-500 dark:text-white/30 leading-tight">
          Listening for localhost:3000 events...
        </p>
      </div>
    </aside>
  );
}
