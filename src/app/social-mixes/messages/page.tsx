import React from "react";
import PageWrapper from "@/components/PageWrapper/PageWrapper";

export default function MessagesPage() {
  return (
    <PageWrapper>
      <div className="space-y-6">
        <h1 className="text-2xl font-black uppercase tracking-widest text-primary glitch-text">
          Social Mixes // Messages
        </h1>
        <div className="bg-white/5 border border-white/10 rounded-2xl p-8 backdrop-blur-xl">
          <p className="text-white/60 font-mono text-sm leading-relaxed">
            [SYSTEM] Decrypting communication streams...
            <br />
            No new encrypted signals detected.
          </p>
          <div className="mt-8 space-y-4">
            <div className="h-12 bg-white/5 border border-white/5 rounded-lg"></div>
            <div className="h-12 bg-white/5 border border-white/5 rounded-lg"></div>
          </div>
        </div>
      </div>
    </PageWrapper>
  );
}
