"use client";

import React from "react";
import PageWrapper from "@/components/ReusableComponent/PageWrapperComponent";

import PageHeader from "@/components/PageHeader/PageHeader";

export default function SettingsPage() {
  return (
    <PageWrapper>
      <div className="space-y-6">
        <PageHeader title="System Prefs" />
        <div className="bg-white dark:bg-white/5 border border-black/10 dark:border-white/10 rounded-2xl p-8 backdrop-blur-xl transition-colors">
          <p className="text-slate-600 dark:text-white/60 font-mono text-sm leading-relaxed">
            [SYSTEM] Accessing core configurations...
            <br />
            Security protocols and aesthetic parameters ready for modification.
          </p>
          <div className="mt-8 space-y-6">
            <div className="flex items-center justify-between">
              <span className="text-xs uppercase tracking-widest text-slate-900 dark:text-white font-bold">
                Dark Mode Strategy
              </span>
              <div className="w-10 h-5 bg-primary/20 dark:bg-primary rounded-full relative border border-primary/30">
                <div className="absolute right-1 top-1 w-3 h-3 bg-white dark:bg-white rounded-full shadow-sm"></div>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-xs uppercase tracking-widest text-slate-900 dark:text-white font-bold">
                Mesh Gradient Intensity
              </span>
              <div className="w-32 h-1 bg-slate-200 dark:bg-white/10 rounded-full overflow-hidden">
                <div className="w-1/2 h-full bg-primary rounded-full"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </PageWrapper>
  );
}
