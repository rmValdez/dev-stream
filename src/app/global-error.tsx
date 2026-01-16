"use client";

import React from "react";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html>
      <body>
        <div className="flex flex-col items-center justify-center min-h-screen bg-black text-white p-8 font-mono">
          <div className="relative group">
            <div className="absolute -inset-1 bg-gradient-to-r from-red-500 to-ops-danger rounded-lg blur opacity-25 animate-pulse"></div>
            <div className="relative px-12 py-8 bg-black/40 backdrop-blur-xl rounded-lg border border-red-500/20 flex flex-col items-center gap-6 max-w-lg">
              <h2 className="text-2xl font-black text-red-500 uppercase tracking-[0.3em] animate-pulse">
                System Critical Error
              </h2>
              <p className="text-xs text-white/40 font-medium tracking-widest uppercase text-center leading-relaxed">
                A critical exception has occurred in the mainframe core.
                <br />
                Security protocols might be compromised.
              </p>

              <div className="w-full bg-red-500/10 p-4 rounded border border-red-500/20">
                <code className="text-[10px] text-red-400 break-all">
                  ERROR_CODE: {error.digest || "CORE_DUMP_FAILURE"}
                  <br />
                  MESSAGE:{" "}
                  {error.message || "Unknown hardware failure detected."}
                </code>
              </div>

              <button
                onClick={() => reset()}
                className="px-8 py-3 bg-red-500 hover:bg-red-600 text-white font-bold rounded-lg transition-all uppercase text-[10px] tracking-[0.2em] shadow-lg shadow-red-500/20 active:scale-95"
              >
                Attempt Core Recovery
              </button>
            </div>
          </div>
        </div>
      </body>
    </html>
  );
}
