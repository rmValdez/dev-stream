import React from "react";
import PageWrapper from "@/components/PageWrapper/PageWrapper";

export default function RadioPage() {
  return (
    <PageWrapper>
      <div className="space-y-6">
        <h1 className="text-2xl font-black uppercase tracking-widest text-primary glitch-text">
          Social Mixes // Live Radio
        </h1>
        <div className="bg-white/5 border border-white/10 rounded-2xl p-8 backdrop-blur-xl">
          <p className="text-white/60 font-mono text-sm leading-relaxed">
            [SYSTEM] Tuning to orbital transmission...
            <br />
            Global frequencies synchronized.
          </p>
          <div className="mt-8 flex items-center gap-6">
            <div className="w-16 h-16 rounded-full border-4 border-primary border-t-transparent animate-spin"></div>
            <div className="flex-1 h-2 bg-white/10 rounded-full overflow-hidden">
              <div className="h-full bg-primary w-2/3 animate-pulse"></div>
            </div>
          </div>
        </div>
      </div>
    </PageWrapper>
  );
}
