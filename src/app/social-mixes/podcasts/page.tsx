import React from "react";
import PageWrapper from "@/components/PageWrapper/PageWrapper";

import PageHeader from "@/components/PageHeader/PageHeader";

export default function PodcastsPage() {
  return (
    <PageWrapper>
      <PageHeader
        title="Radio Podcasts"
        description="Listen to the latest dev logs and live broadcast stations."
      />
      <div className="p-8">
        <div className="vibe-glass rounded-xl p-12 text-center border border-white/10">
          <span className="material-symbols-outlined text-4xl mb-4 text-primary">
            podcasts
          </span>
          <h2 className="text-xl font-bold mb-2">Broadcast Center</h2>
          <p className="text-white/40 font-mono text-sm max-w-md mx-auto">
            Tune in to live developer radio or catch up on archived podcasts.
            New episodes released every Tuesday.
          </p>
        </div>
      </div>
    </PageWrapper>
  );
}
