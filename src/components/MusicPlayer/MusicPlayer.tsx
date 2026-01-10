"use client";

import React from "react";

export default function MusicPlayer() {
  return (
    <footer className="fixed bottom-0 left-0 right-0 h-[90px] bg-black border-t border-white/10 z-[60] flex items-center px-4">
      <div className="flex justify-between items-center w-full">
        {/* Track Info */}
        <div className="flex items-center gap-4 min-w-[180px] w-1/3">
          <div className="w-14 h-14 rounded overflow-hidden shadow-lg shrink-0">
            <img
              alt="Cover Art"
              className="w-full h-full object-cover"
              src="https://replicate.delivery/pbxt/JR3pX7O7l5O4TfL8g6e4k8g8k8k8k8k8k8k8k8k8k8k8k8k8/https://lh3.googleusercontent.com/aida-public/AB6AXuAuk1psAPI6zLzZjjKWpf6Ak8i3ggvxrOH6ZhaStngEEgsE8Jo76lKywSIwTP6k_qZZla5sYl0XRUPm_N000RNc-Gdvx2S5zYcDhHHIYKhq4GCS9umtNVo1QpRCyMDaPbvHLS5tq8mwLW6ZkRudhMyLnCQb4zRD1CAip3xZTFSJADawiF0SkG15agpGJiCcyfWPtDdfKKGQe8oVwYA7T_R2jl10DEuTxAd6FrmfjpI8QOqZuWmBOuRrEEFrL4o2XlpnAMOgAyki7bze"
            />
          </div>
          <div className="flex flex-col min-w-0">
            <a
              className="text-sm font-bold text-white hover:underline truncate"
              href="#"
            >
              SYNTH_WAVE_INIT.EXE
            </a>
            <a
              className="text-[11px] text-spotify-lightgrey hover:underline hover:text-white truncate"
              href="#"
            >
              Sarah_Dev x Logic_Gate
            </a>
          </div>
          <button className="flex items-center justify-center ml-2">
            <span className="material-symbols-outlined text-[20px] text-spotify-lightgrey hover:text-white transition-colors">
              favorite
            </span>
          </button>
        </div>

        {/* Controls */}
        <div className="flex flex-col items-center max-w-[722px] w-1/3">
          <div className="flex items-center gap-6 mb-2">
            <button className="material-symbols-outlined text-spotify-lightgrey hover:text-white transition-colors text-[20px]">
              shuffle
            </button>
            <button className="material-symbols-outlined text-spotify-lightgrey hover:text-white transition-colors text-[24px]">
              skip_previous
            </button>
            <button className="w-8 h-8 rounded-full bg-white text-black flex items-center justify-center hover:scale-105 active:scale-95 transition-all">
              <span
                className="material-symbols-outlined text-[20px] fill-1"
                style={{ fontVariationSettings: "'FILL' 1" }}
              >
                play_arrow
              </span>
            </button>
            <button className="material-symbols-outlined text-spotify-lightgrey hover:text-white transition-colors text-[24px]">
              skip_next
            </button>
            <button className="material-symbols-outlined text-spotify-lightgrey hover:text-white transition-colors text-[20px]">
              repeat
            </button>
          </div>
          <div className="flex items-center gap-2 w-full">
            <span className="text-[11px] text-spotify-lightgrey min-w-[32px] text-right">
              0:45
            </span>
            <div className="flex-1 h-1 bg-white/10 rounded-full relative group cursor-pointer range-container">
              <div
                className="absolute left-0 top-0 h-full bg-white group-hover:bg-[#1db954] rounded-full progress-bar"
                style={{ width: "30%" }}
              ></div>
              <input
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                max="100"
                min="0"
                type="range"
                defaultValue="30"
              />
            </div>
            <span className="text-[11px] text-spotify-lightgrey min-w-[32px]">
              3:52
            </span>
          </div>
        </div>

        {/* Volume & Extras */}
        <div className="flex items-center justify-end gap-3 w-1/3">
          <button className="material-symbols-outlined text-spotify-lightgrey hover:text-white transition-colors text-[20px]">
            lyrics
          </button>
          <button className="material-symbols-outlined text-spotify-lightgrey hover:text-white transition-colors text-[20px]">
            queue_music
          </button>
          <button className="material-symbols-outlined text-spotify-lightgrey hover:text-white transition-colors text-[20px]">
            devices
          </button>
          <div className="flex items-center gap-2 w-24 group range-container">
            <span className="material-symbols-outlined text-spotify-lightgrey hover:text-white transition-colors text-[20px]">
              volume_up
            </span>
            <div className="flex-1 h-1 bg-white/10 rounded-full relative cursor-pointer">
              <div
                className="absolute left-0 top-0 h-full bg-white group-hover:bg-[#1db954] rounded-full progress-bar"
                style={{ width: "70%" }}
              ></div>
              <input
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                max="100"
                min="0"
                type="range"
                defaultValue="70"
              />
            </div>
          </div>
          <button className="material-symbols-outlined text-spotify-lightgrey hover:text-white transition-colors text-[20px]">
            open_in_full
          </button>
        </div>
      </div>
    </footer>
  );
}
