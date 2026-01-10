"use client";

import React from "react";
import PageWrapper from "@/components/ReusableComponent/PageWrapperComponent";

import PageHeader from "@/components/PageHeader/PageHeader";

export default function DeploymentsPage() {
  return (
    <PageWrapper>
      <div className="space-y-6">
        <PageHeader title="Deployments" />
        <div className="bg-white/5 border border-white/10 rounded-2xl p-8 backdrop-blur-xl">
          <p className="text-white/60 font-mono text-sm leading-relaxed">
            [SYSTEM] Accessing CI/CD pipelines...
            <br />
            All production nodes operational.
          </p>
          <div className="mt-8 space-y-3">
            {[1, 2].map((i) => (
              <div
                key={i}
                className="flex items-center justify-between p-4 bg-white/5 border border-white/5 rounded-lg"
              >
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 rounded-full bg-ops-green shadow-[0_0_8px_#00ff9d]"></div>
                  <span className="text-xs font-bold uppercase tracking-widest">
                    v2.4.{i} Prod
                  </span>
                </div>
                <span className="text-[10px] font-mono text-white/20">
                  SUCCESS
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </PageWrapper>
  );
}
