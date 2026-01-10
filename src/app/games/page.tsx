"use client";

import React from "react";
import PageWrapper from "@/components/ReusableComponent/PageWrapperComponent";

import PageHeader from "@/components/PageHeader/PageHeader";

export default function GamesPage() {
  return (
    <PageWrapper>
      <div className="space-y-6">
        <PageHeader title="Hot Modules // Games" />
        <div className="bg-white/5 border border-white/10 rounded-2xl p-8 backdrop-blur-xl">
          <p className="text-white/60 font-mono text-sm leading-relaxed">
            [SYSTEM] Initializing game runtime...
            <br />
            Graphics pipelines optimized for high performance.
          </p>
          <div className="mt-8 grid grid-cols-2 gap-4">
            <div className="h-32 bg-white/5 border border-white/10 rounded-xl relative group overflow-hidden cursor-pointer hover:border-primary/50 transition-all">
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="material-symbols-outlined text-4xl text-white/20 group-hover:text-primary transition-colors">
                  sports_esports
                </span>
              </div>
            </div>
            <div className="h-32 bg-white/5 border border-white/10 rounded-xl relative group overflow-hidden cursor-pointer hover:border-primary/50 transition-all">
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="material-symbols-outlined text-4xl text-white/20 group-hover:text-primary transition-colors">
                  videogame_asset
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </PageWrapper>
  );
}
