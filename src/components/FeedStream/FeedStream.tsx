"use client";

import React from "react";

export default function FeedStream() {
  return (
    <div className="space-y-6">
      <div className="bg-white dark:bg-surface-dark border border-black/5 dark:border-white/5 rounded-2xl overflow-hidden group hover:border-black/10 dark:hover:border-white/15 transition-all shadow-xl">
        <div className="p-6 pb-0">
          <div className="flex gap-4 mb-4">
            <div className="w-12 h-12 rounded-full bg-slate-900 dark:bg-white flex-shrink-0 flex items-center justify-center font-bold text-white dark:text-black italic text-lg shadow-lg">
              SD
            </div>
            <div className="flex-1">
              <div className="flex items-center justify-between mb-1">
                <div className="flex items-baseline gap-2">
                  <span className="font-bold text-base hover:underline cursor-pointer text-slate-900 dark:text-white">
                    Sarah_Dev
                  </span>
                  <span className="text-[10px] text-slate-400 dark:text-white/30 uppercase tracking-widest">
                    Master Engineer
                  </span>
                </div>
                <span className="text-xs text-slate-400 dark:text-white/30">
                  14m ago
                </span>
              </div>
              <p className="text-[15px] text-slate-700 dark:text-white/90 leading-relaxed">
                Testing out the new UI grid system for the dashboard components.
                Everything is aligning perfectly in the latest build.
                #designsystem #frontend
              </p>
            </div>
          </div>
        </div>
        <div className="w-full px-6 mb-2">
          <div className="relative w-full aspect-video rounded-xl overflow-hidden border border-black/5 dark:border-white/10 bg-black group/media">
            <div
              className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover/media:scale-105 grayscale group-hover/media:grayscale-0"
              style={{
                backgroundImage:
                  "url('https://replicate.delivery/pbxt/JR3pX7O7l5O4TfL8g6e4k8g8k8k8k8k8k8k8k8k8k8k8k8k8/https://lh3.googleusercontent.com/aida-public/AB6AXuC2Tkx2dc7TbK-Cx0HB2u64H6Rh7off1CUQYFWVPmJ14y7mZy29upnjlzPfjlHOrkkVY8GbQWt6f9W7kcYGN2yz2y-yEdtCFRDWKpcbpDPtPVF6DXyHTxHNBK3It5KQFUJGxtCu3E_vn7cn4qjAOHpTm4Mn_Gb6h1lbI0AWVqy53kial7DzWi2PvHxbZoKFF3Y1Q70WpDVMmeuapDgtDvq-JZDwkKKlQa1oNe6njTX2EdrSiSWWKXXG19lojDd4OyxrUnaNrfHS2g6c')",
              }}
            ></div>
          </div>
        </div>
        <div className="p-6 pt-2">
          <div className="flex items-center gap-6 px-1">
            <button className="flex items-center gap-2 text-slate-400 dark:text-white/40 hover:text-primary transition-colors">
              <span className="material-symbols-outlined text-xl">
                favorite
              </span>
              <span className="text-xs font-mono">124</span>
            </button>
            <button className="flex items-center gap-2 text-slate-400 dark:text-white/40 hover:text-primary transition-colors">
              <span className="material-symbols-outlined text-xl">comment</span>
              <span className="text-xs font-mono">42</span>
            </button>
            <button className="flex items-center gap-2 text-slate-400 dark:text-white/40 hover:text-primary transition-colors">
              <span className="material-symbols-outlined text-xl">share</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
