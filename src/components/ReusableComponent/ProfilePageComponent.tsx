"use client";

import React from "react";
import Image from "next/image";
import { USER_PROFILE } from "../../data/userProfile";

export default function ProfilePageComponent() {
  return (
    <div className="flex-1 p-8 overflow-y-auto h-full">
      <div className="max-w-4xl mx-auto space-y-8">
        {/* Header / Banner Card */}
        <div className="relative overflow-hidden rounded-2xl bg-white dark:bg-black/40 border border-black/10 dark:border-white/10 backdrop-blur-md transition-colors shadow-sm dark:shadow-none">
          {/* Decorative Background */}
          <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-r from-primary/20 via-purple-500/10 to-blue-500/10"></div>

          <div className="relative px-8 pb-8 pt-20 flex flex-col md:flex-row items-end gap-6">
            <div className="relative">
              <div className="w-32 h-32 rounded-full border-4 border-white dark:border-black overflow-hidden relative z-10 shadow-xl">
                <Image
                  src={USER_PROFILE.avatar}
                  alt={USER_PROFILE.username}
                  fill
                  className="object-cover"
                />
              </div>
              <div
                className={`absolute bottom-2 right-2 w-5 h-5 rounded-full border-2 border-white dark:border-black z-20 ${
                  USER_PROFILE.status === "online"
                    ? "bg-green-500"
                    : "bg-gray-500"
                }`}
              ></div>
            </div>

            <div className="flex-1 mb-2">
              <h1 className="text-3xl font-bold text-slate-900 dark:text-white tracking-tight">
                {USER_PROFILE.first_name} {USER_PROFILE.last_name}
              </h1>
              <p className="text-primary font-mono text-sm tracking-wider uppercase mb-1">
                @{USER_PROFILE.username} {USER_PROFILE.role}
              </p>
              <p className="text-slate-500 dark:text-white/40 text-sm flex items-center gap-2">
                <span className="material-symbols-outlined text-sm">mail</span>
                {USER_PROFILE.email}
              </p>
            </div>

            <div className="flex gap-3 mb-2">
              <button className="px-4 py-2 rounded-lg bg-slate-100 dark:bg-white/5 hover:bg-slate-200 dark:hover:bg-white/10 border border-black/5 dark:border-white/10 text-slate-700 dark:text-white/80 text-sm font-medium transition-colors">
                Edit Profile
              </button>
              <button className="px-4 py-2 rounded-lg bg-primary/10 hover:bg-primary/20 border border-primary/20 text-primary text-sm font-medium transition-colors">
                Share
              </button>
            </div>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[
            { label: "Level", value: "Senior Dev", icon: "military_tech" },
            { label: "Contributions", value: "1,248", icon: "commit" },
            { label: "Reputation", value: "98.5%", icon: "verified" },
          ].map((stat, i) => (
            <div
              key={`stat-${i}-${stat.label}`}
              className="p-6 rounded-xl bg-white dark:bg-black/20 border border-black/5 dark:border-white/5 flex items-center gap-4 transition-colors shadow-sm dark:shadow-none"
            >
              <div className="w-12 h-12 rounded-lg bg-slate-50 dark:bg-white/5 flex items-center justify-center text-slate-400 dark:text-white/40">
                <span className="material-symbols-outlined text-2xl">
                  {stat.icon}
                </span>
              </div>
              <div>
                <p className="text-xs text-slate-500 dark:text-white/30 uppercase tracking-widest font-bold">
                  {stat.label}
                </p>
                <p className="text-xl font-bold text-slate-900 dark:text-white">
                  {stat.value}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Details Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Left Column: Personal Info */}
          <div className="space-y-6">
            <div className="p-6 rounded-2xl bg-white dark:bg-black/20 border border-black/5 dark:border-white/5 transition-colors shadow-sm dark:shadow-none">
              <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-6 flex items-center gap-2">
                <span className="material-symbols-outlined text-primary">
                  fingerprint
                </span>
                Identity
              </h3>

              <div className="space-y-4">
                <div className="flex justify-between items-center py-2 border-b border-black/5 dark:border-white/5">
                  <span className="text-sm text-slate-500 dark:text-white/40">
                    Full Name
                  </span>
                  <span className="text-sm text-slate-800 dark:text-white/80 font-mono">
                    {USER_PROFILE.first_name} {USER_PROFILE.middle_name}{" "}
                    {USER_PROFILE.last_name}
                  </span>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-black/5 dark:border-white/5">
                  <span className="text-sm text-slate-500 dark:text-white/40">
                    Gender
                  </span>
                  <span className="text-sm text-slate-800 dark:text-white/80 font-mono">
                    {USER_PROFILE.gender}
                  </span>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-black/5 dark:border-white/5">
                  <span className="text-sm text-slate-500 dark:text-white/40">
                    User ID
                  </span>
                  <span className="text-sm text-slate-800 dark:text-white/80 font-mono">
                    #{USER_PROFILE.id}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Security/Tokens (Mock Display) */}
          <div className="space-y-6">
            <div className="p-6 rounded-2xl bg-white dark:bg-black/20 border border-black/5 dark:border-white/5 transition-colors shadow-sm dark:shadow-none">
              <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-6 flex items-center gap-2">
                <span className="material-symbols-outlined text-primary">
                  security
                </span>
                Security Clearance
              </h3>

              <div className="space-y-4">
                <div className="p-3 rounded-lg bg-slate-50 dark:bg-black/40 border border-black/5 dark:border-white/5 font-mono text-xs break-all">
                  <div className="text-slate-400 dark:text-white/30 mb-1 flex items-center gap-1">
                    <span className="material-symbols-outlined text-[10px]">
                      key
                    </span>
                    ACCESS_TOKEN
                  </div>
                  <div className="text-primary/80 opacity-50 blur-[2px] hover:blur-none transition-all cursor-crosshair">
                    {USER_PROFILE.access_token || "Not generated"}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
