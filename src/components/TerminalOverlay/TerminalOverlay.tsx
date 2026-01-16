"use client";

import React, { useState, useEffect } from "react";
import { usePathname } from "next/navigation";

export default function TerminalOverlay() {
  const [mounted, setMounted] = useState(false);
  const pathname = usePathname();
  const isMusicPage = pathname === "/social-mixes/music";

  const [height, setHeight] = useState(300);
  const [isDragging, setIsDragging] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const startYRef = React.useRef(0);
  const startHeightRef = React.useRef(0);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted || !isDragging) return;

    const handleMouseMove = (e: MouseEvent) => {
      const delta = startYRef.current - e.clientY;
      const bottomOffset = isMusicPage ? 90 : 0;
      const topMargin = 100;
      const maxAllowedHeight = window.innerHeight - topMargin - bottomOffset;

      const newHeight = Math.max(
        40,
        Math.min(maxAllowedHeight, startHeightRef.current + delta)
      );
      setHeight(newHeight);

      if (newHeight <= 48) setIsMinimized(true);
      else setIsMinimized(false);
    };

    const handleMouseUp = () => {
      setIsDragging(false);
      document.body.style.cursor = "default";
      document.body.style.userSelect = "auto";
    };

    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
    };
  }, [isDragging, isMusicPage, mounted]);

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    startYRef.current = e.clientY;
    startHeightRef.current = height;
    document.body.style.cursor = "ns-resize";
    document.body.style.userSelect = "none";
  };

  const toggleMinimize = () => {
    if (isMinimized) {
      setHeight(300);
      setIsMinimized(false);
    } else {
      setHeight(42);
      setIsMinimized(true);
    }
  };

  const toggleMaximize = () => {
    const bottomOffset = isMusicPage ? 90 : 0;
    const topMargin = 100;
    setHeight(window.innerHeight - topMargin - bottomOffset);
    setIsMinimized(false);
  };

  if (!mounted) return null;

  return (
    <div
      className={`fixed left-64 right-80 z-40 flex flex-col pointer-events-none px-6 transition-all duration-300 ${
        isMusicPage ? "bottom-[90px] pb-8" : "bottom-0 pb-6"
      }`}
    >
      <div
        className="terminal-glass border border-black/5 dark:border-white/10 rounded-xl overflow-hidden shadow-2xl pointer-events-auto flex flex-col relative transition-height duration-100 ease-out"
        style={{ height: `${height}px` }}
      >
        <div
          className="absolute top-0 left-0 right-0 h-1.5 cursor-ns-resize bg-transparent hover:bg-primary/50 transition-colors z-50"
          onMouseDown={handleMouseDown}
        />

        <div
          className="flex items-center justify-between px-4 py-2 bg-slate-100/60 dark:bg-black/60 border-b border-black/5 dark:border-white/5 shrink-0 select-none"
          onDoubleClick={toggleMinimize}
        >
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1.5 group">
              <button
                onClick={() => setHeight(0)}
                className="w-2.5 h-2.5 rounded-full bg-slate-300 dark:bg-white/10 border border-slate-400/20 dark:border-white/20 hover:bg-red-500 transition-colors"
                title="Close"
              ></button>
              <button
                onClick={toggleMinimize}
                className="w-2.5 h-2.5 rounded-full bg-slate-300 dark:bg-white/10 border border-slate-400/20 dark:border-white/20 hover:bg-yellow-500 transition-colors"
                title="Minimize"
              ></button>
              <button
                onClick={toggleMaximize}
                className="w-2.5 h-2.5 rounded-full bg-slate-300 dark:bg-white/10 border border-slate-400/20 dark:border-white/20 hover:bg-green-500 transition-colors"
                title="Maximize"
              ></button>
            </div>
            <span className="text-[10px] font-mono text-slate-500 dark:text-white/40 uppercase tracking-widest flex items-center gap-2">
              Main Console{" "}
              {isMinimized && (
                <span className="text-primary font-bold">{"// MINIMIZED"}</span>
              )}
            </span>
          </div>
          <div className="flex items-center gap-3">
            <div
              className="flex gap-1 opacity-20 hover:opacity-100 transition-opacity cursor-ns-resize"
              onMouseDown={handleMouseDown}
            >
              <span className="material-symbols-outlined text-[10px] transform rotate-90">
                drag_handle
              </span>
            </div>
            <button
              onClick={toggleMinimize}
              className="text-slate-500 hover:text-white transition-colors"
            >
              <span className="material-symbols-outlined text-sm">
                {isMinimized ? "keyboard_arrow_up" : "keyboard_arrow_down"}
              </span>
            </button>
          </div>
        </div>
        <div className="flex-1 p-5 font-mono text-xs overflow-y-auto custom-scrollbar space-y-1.5 bg-white/10 dark:bg-black/40 text-slate-900 dark:text-white">
          <div className="flex gap-3">
            <span className="text-slate-400 dark:text-white/20 shrink-0">
              11:42:01
            </span>
            <span className="text-slate-900 dark:text-white font-bold">
              [SUCCESS]
            </span>
            <span className="text-slate-600 dark:text-white/60">
              Hot Module Replacement connected.
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
