import React from "react";
import PageWrapper from "@/components/PageWrapper/PageWrapper";

export default function PodcastsPage() {
  return (
    <PageWrapper>
      <div className="space-y-6">
        <h1 className="text-2xl font-black uppercase tracking-widest text-primary glitch-text">
          Social Mixes // Podcasts
        </h1>
        <div className="bg-white/5 border border-white/10 rounded-2xl p-8 backdrop-blur-xl">
          <p className="text-white/60 font-mono text-sm leading-relaxed">
            [SYSTEM] Scanning audio repositories...
            <br />
            Latest architectural discussions ready for streaming.
          </p>
          <div className="mt-8 flex gap-4">
            <div className="w-24 h-24 bg-white/5 border border-white/10 rounded-xl"></div>
            <div className="flex-1 space-y-2">
              <div className="h-4 bg-white/10 rounded w-3/4"></div>
              <div className="h-4 bg-white/5 rounded w-1/2"></div>
            </div>
          </div>
        </div>
      </div>
    </PageWrapper>
  );
}
