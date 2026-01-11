"use client";

import React from "react";
import PageWrapper from "@/components/ReusableComponent/PageWrapperComponent";

import PageHeader from "@/components/PageHeader/PageHeader";

export default function DeploymentsPage() {
  return (
    <PageWrapper>
      <div className="space-y-6">
        <PageHeader title="Deployments" />
        <div className="bg-white dark:bg-white/5 border border-black/10 dark:border-white/10 rounded-2xl p-8 backdrop-blur-xl transition-colors">
          <p className="text-slate-600 dark:text-white/60 font-mono text-sm leading-relaxed">
            [SYSTEM] Accessing CI/CD pipelines...
            <br />
            All production nodes operational.
          </p>
          <div className="mt-8 space-y-3">
            {[1, 2].map((i) => (
              <div
                key={`deploy-${i}`}
                className="flex items-center justify-between p-4 bg-slate-50 dark:bg-white/5 border border-black/5 dark:border-white/5 rounded-lg transition-colors"
              >
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 rounded-full bg-ops-green shadow-[0_0_8px_#00ff9d]"></div>
                  <span className="text-xs font-bold uppercase tracking-widest text-slate-900 dark:text-white">
                    v2.4.{i} Prod
                  </span>
                </div>
                <span className="text-[10px] font-mono text-slate-400 dark:text-white/20">
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
