import React from "react";

interface PageHeaderProps {
  title: string;
  description?: string;
}

export default function PageHeader({ title, description }: PageHeaderProps) {
  return (
    <div className="space-y-1">
      <h1 className="text-2xl font-black uppercase tracking-widest text-primary glitch-text">
        {title}
      </h1>
      {description && (
        <p className="text-sm font-mono text-slate-500 dark:text-white/40">
          {description}
        </p>
      )}
    </div>
  );
}
