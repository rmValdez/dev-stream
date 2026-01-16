"use client";

import React, { useState } from "react";
import HotModuleNav from "./SocialHotModule";

export default function PostCreator() {
  const [mode, setMode] = useState("STATUS");

  return (
    <div className="bg-white dark:bg-surface-dark border border-black/5 dark:border-white/10 rounded-2xl shadow-2xl overflow-hidden transition-all hover:border-black/10 dark:hover:border-white/20">
      <HotModuleNav activeMode={mode} onModeChange={setMode} />

      <div className="p-6">
        <div className="flex flex-col gap-4">
          <textarea
            className="w-full bg-black/5 dark:bg-black/30 border-none rounded-xl p-5 text-base text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-white/20 focus:ring-1 focus:ring-black/10 dark:focus:ring-white/20 resize-none h-28 transition-all font-sans"
            placeholder={`What are you shipping today? [${mode} MODE]`}
          ></textarea>
          <div className="flex items-center justify-between">
            <div className="flex gap-2">
              <button className="p-2.5 rounded-full hover:bg-black/5 dark:hover:bg-white/5 text-slate-400 dark:text-white/30 hover:text-slate-900 dark:hover:text-white transition-all">
                <span className="material-symbols-outlined text-2xl">
                  image
                </span>
              </button>
              <button className="p-2.5 rounded-full hover:bg-black/5 dark:hover:bg-white/5 text-slate-400 dark:text-white/30 hover:text-slate-900 dark:hover:text-white transition-all">
                <span className="material-symbols-outlined text-2xl">code</span>
              </button>
              <button className="p-2.5 rounded-full hover:bg-black/5 dark:hover:bg-white/5 text-slate-400 dark:text-white/30 hover:text-slate-900 dark:hover:text-white transition-all">
                <span className="material-symbols-outlined text-2xl">
                  emoji_emotions
                </span>
              </button>
            </div>
            <button className="px-8 py-2.5 bg-slate-900 dark:bg-white text-white dark:text-black font-bold uppercase text-xs tracking-widest rounded-full hover:scale-105 transition-all shadow-xl flex items-center gap-2">
              <span>Push Post</span>
              <span className="material-symbols-outlined text-sm">send</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
