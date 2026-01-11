"use client";

import React, { useState, useEffect } from "react";
import PageWrapper from "@/components/ReusableComponent/PageWrapperComponent";

import PageHeader from "@/components/PageHeader/PageHeader";

export default function MetricsPage() {
  const [metrics, setMetrics] = useState<number[]>([]);

  useEffect(() => {
    // Generate random values only on the client to avoid hydration mismatch
    const timer = setTimeout(() => setMetrics([98.4, 85.2, 42.1]), 0);
    return () => clearTimeout(timer);
  }, []);

  return (
    <PageWrapper>
      <div className="space-y-6">
        <PageHeader title="Live Metrics" />
        <div className="bg-white dark:bg-white/5 border border-black/10 dark:border-white/10 rounded-2xl p-8 backdrop-blur-xl transition-colors">
          <p className="text-slate-600 dark:text-white/60 font-mono text-sm leading-relaxed">
            [SYSTEM] Analyzing real-time data packets...
            <br />
            System performance at 98.4% efficiency.
          </p>
          <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
            {metrics.map((val, i) => (
              <div
                key={`metric-${i}`}
                className="h-32 bg-slate-50 dark:bg-white/5 border border-black/5 dark:border-white/5 rounded-xl flex flex-col items-center justify-center transition-colors shadow-sm dark:shadow-none"
              >
                <div className="text-xs text-slate-500 dark:text-white/30 uppercase mb-2 font-bold tracking-widest">
                  Metric {i + 1}
                </div>
                <div className="text-2xl font-black text-primary">{val}%</div>
              </div>
            ))}
            {metrics.length === 0 &&
              [1, 2, 3].map((i) => (
                <div
                  key={`skeleton-${i}`}
                  className="h-32 bg-slate-100 dark:bg-white/5 border border-black/5 dark:border-white/5 rounded-xl animate-pulse"
                ></div>
              ))}
          </div>
        </div>
      </div>
    </PageWrapper>
  );
}
