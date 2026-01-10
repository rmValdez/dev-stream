import React from "react";
import PageWrapper from "@/components/PageWrapper/PageWrapper";

export default function MusicPage() {
  return (
    <PageWrapper>
      <div className="space-y-6">
        <h1 className="text-2xl font-black uppercase tracking-widest text-primary glitch-text">
          Social Mixes // Music
        </h1>
        <div className="bg-white/5 border border-white/10 rounded-2xl p-8 backdrop-blur-xl">
          <p className="text-white/60 font-mono text-sm leading-relaxed">
            [SYSTEM] Audio interface initializing...
            <br />
            Deep focus frequencies under optimization.
          </p>
          <div className="mt-8 grid grid-cols-2 gap-4">
            <div className="h-24 bg-primary/10 border border-primary/20 rounded-xl animate-pulse"></div>
            <div className="h-24 bg-secondary/10 border border-secondary/20 rounded-xl animate-pulse"></div>
          </div>
        </div>
      </div>
    </PageWrapper>
  );
}
