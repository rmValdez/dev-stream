"use client";

import React from "react";

interface PageWrapperProps {
  children: React.ReactNode;
}

export default function PageWrapper({ children }: PageWrapperProps) {
  return (
    <div className="flex-1 flex overflow-hidden">
      <main className="flex-1 flex flex-col overflow-y-auto custom-scrollbar relative">
        {/* Sticky Header */}
        <header className="sticky top-0 z-30 flex items-center justify-end px-8 py-5 h-20 pointer-events-none"></header>

        {/* Main Content Section */}
        <section className="px-8 py-6 space-y-6 max-w-5xl mx-auto w-full">
          {children}
          {/* Bottom Spacer */}
          <div className="h-48"></div>
        </section>
      </main>
    </div>
  );
}
