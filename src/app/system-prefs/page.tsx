import React from "react";
import PageWrapper from "@/components/PageWrapper/PageWrapper";

export default function SettingsPage() {
  return (
    <PageWrapper>
      <div className="space-y-6">
        <h1 className="text-2xl font-black uppercase tracking-widest text-primary glitch-text">
          System Prefs
        </h1>
        <div className="bg-white/5 border border-white/10 rounded-2xl p-8 backdrop-blur-xl">
          <p className="text-white/60 font-mono text-sm leading-relaxed">
            [SYSTEM] Accessing core configurations...
            <br />
            Security protocols and aesthetic parameters ready for modification.
          </p>
          <div className="mt-8 space-y-6">
            <div className="flex items-center justify-between">
              <span className="text-xs uppercase tracking-widest">
                Dark Mode Strategy
              </span>
              <div className="w-10 h-5 bg-primary rounded-full relative">
                <div className="absolute right-1 top-1 w-3 h-3 bg-white rounded-full"></div>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-xs uppercase tracking-widest">
                Mesh Gradient Intensity
              </span>
              <div className="w-32 h-1 bg-white/10 rounded-full">
                <div className="w-1/2 h-full bg-primary rounded-full"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </PageWrapper>
  );
}
