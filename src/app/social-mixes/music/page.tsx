"use client";

import MusicPlayer from "@/components/MusicPlayer/MusicPlayer";
import React, { useState, useRef } from "react";
import { Track, MOCK_TRACKS } from "@/components/MusicPlayer/trackData";

export default function MusicPage() {
  const [tracks, setTracks] = useState<Track[]>(MOCK_TRACKS);
  const containerRef = useRef<HTMLDivElement>(null);
  const [draggedTrackId, setDraggedTrackId] = useState<string | null>(null);

  const handleDragStart = (e: React.DragEvent, id: string) => {
    setDraggedTrackId(id);
    e.dataTransfer.effectAllowed = "move";
  };

  const handleDragEnd = (e: React.DragEvent) => {
    if (!draggedTrackId || !containerRef.current) return;

    // Check if drop coordinates are outside the container
    const rect = containerRef.current.getBoundingClientRect();
    const isOutside =
      e.clientX < rect.left ||
      e.clientX > rect.right ||
      e.clientY < rect.top ||
      e.clientY > rect.bottom;

    if (isOutside) {
      setTracks((prev) => prev.filter((t) => t.id !== draggedTrackId));
    }
    setDraggedTrackId(null);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();

    // In a real app, we would check e.dataTransfer.files[0].type === 'audio/mpeg'
    const droppedFiles = Array.from(e.dataTransfer.files);
    const hasNonMp3 = droppedFiles.some((file) => !file.name.endsWith(".mp3"));

    if (hasNonMp3) {
      alert("Only MP3 files are allowed in this session workspace.");
      return;
    }

    if (!draggedTrackId) {
      // Simulate adding a file drop (Mocking an MP3)
      const newTrack: Track = {
        id: `t-${Date.now()}`,
        title: "Imported_Track_01.mp3",
        artist: "Local_User",
        bpm: 120,
        key: "C",
        duration: "03:00",
        status: "queued",
        cover:
          "https://replicate.delivery/pbxt/JR3pX7O7l5O4TfL8g6e4k8g8k8k8k8k8k8k8k8k8k8k8k8k8/https://lh3.googleusercontent.com/aida-public/AB6AXuAuk1psAPI6zLzZjjKWpf6Ak8i3ggvxrOH6ZhaStngEEgsE8Jo76lKywSIwTP6k_qZZla5sYl0XRUPm_N000RNc-Gdvx2S5zYcDhHHIYKhq4GCS9umtNVo1QpRCyMDaPbvHLS5tq8mwLW6ZkRudhMyLnCQb4zRD1CAip3xZTFSJADawiF0SkG15agpGJiCcyfWPtDdfKKGQe8oVwYA7T_R2jl10DEuTxAd6FrmfjpI8QOqZuWmBOuRrEEFrL4o2XlpnAMOgAyki7bze",
      };
      setTracks((prev) => [...prev, newTrack]);
    }
  };

  return (
    <>
      <div className="flex-1 p-8 relative h-full max-w-5xl mx-auto w-full">
        {/* Fixed Header */}
        <div className="flex justify-between items-end h-[60px] mb-4">
          <div>
            <span className="text-[10px] font-black uppercase tracking-[0.4em] text-primary mb-2 block">
              Track Management
            </span>
            <h1 className="text-4xl font-black italic tracking-tighter glitch-text uppercase">
              Session Workspace
            </h1>
          </div>
          <div className="flex gap-4">
            <button className="flex items-center gap-2 px-4 py-2 vibe-glass rounded-lg text-xs font-bold uppercase tracking-widest hover:text-primary transition-all">
              <span className="material-symbols-outlined text-sm">save</span>{" "}
              Sync Session
            </button>
          </div>
        </div>

        {/* Dynamic Playlist Container - Positioned between Header and Terminal */}
        {/* Adjusted to bottom-[160px] for more spacing above Terminal (at 122px) */}
        <div
          ref={containerRef}
          onDragOver={(e) => e.preventDefault()}
          onDrop={handleDrop}
          className="absolute top-[100px] bottom-[200px] left-8 right-8 overflow-y-auto custom-scrollbar border-2 border-dashed border-white/5 hover:border-primary/30 rounded-2xl transition-colors bg-black/10 backdrop-blur-sm p-4"
        >
          {tracks.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center opacity-40">
              <span className="material-symbols-outlined text-4xl mb-2">
                queue_music
              </span>
              <p className="uppercase tracking-widest text-xs">
                Playlist Empty
              </p>
              <p className="text-[10px] font-mono mt-1">
                Drag .mp3 tracks here to add
              </p>
            </div>
          ) : (
            <div className="space-y-2">
              {tracks.map((track) => (
                <div
                  key={track.id}
                  draggable
                  onDragStart={(e) => handleDragStart(e, track.id)}
                  onDragEnd={handleDragEnd}
                  className="group flex items-center gap-4 p-4 rounded-xl vibe-glass hover:bg-white/[0.08] transition-all cursor-move border-l-2 border-transparent hover:border-primary active:cursor-grabbing active:scale-[0.99]"
                >
                  <span className="material-symbols-outlined text-white/20 group-hover:text-primary">
                    drag_indicator
                  </span>
                  <div
                    className="w-10 h-10 rounded-lg bg-cover bg-center border border-white/10"
                    style={{
                      backgroundImage: `url('${track.cover}')`,
                    }}
                  ></div>
                  <div className="flex-1">
                    <p className="text-sm font-bold tracking-tight">
                      {track.title}
                    </p>
                    <p className="text-[10px] font-mono text-white/40 uppercase">
                      {track.artist}
                    </p>
                  </div>
                  <div className="flex items-center gap-6">
                    {track.status === "playing" ? (
                      <span className="text-[10px] font-mono text-ops-green px-2 py-0.5 bg-ops-green/10 rounded border border-ops-green/20 font-bold">
                        PLAYING
                      </span>
                    ) : (
                      <span className="text-[10px] font-mono text-white/20 px-2 py-0.5 bg-white/5 rounded border border-white/10 uppercase">
                        {track.status}
                      </span>
                    )}
                    <span className="text-[10px] font-mono text-white/40">
                      {track.duration}
                    </span>
                    <span className="material-symbols-outlined text-white/20 hover:text-ops-danger cursor-pointer">
                      more_vert
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
      <MusicPlayer />
    </>
  );
}
