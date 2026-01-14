"use client";
import { useState } from "react";
import { USER_PROFILE } from "@/data/userProfile";
import Image from "next/image";
import { AuthUserDetail } from "@/interfaces/user.interface";
import FileUploadButton from "../ReusableComponent/FileUpload/FileUploadButton";
import FileUploadModal from "../ReusableComponent/FileUpload/FileUploadModal";
import FileList from "../ReusableComponent/FileUpload/FileList";
import Calendar from "../ReusableComponent/Calendar/Calendar";

interface ProfileProps {
  userData?: AuthUserDetail | null;
}

export default function Profile({ userData }: ProfileProps) {
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);
  const [fileRefreshTrigger, setFileRefreshTrigger] = useState(0);
  const displayData = userData
    ? {
        ...USER_PROFILE, // Keep mock fields like avatar for now if missing in API
        first_name: userData.firstName,
        last_name: userData.lastName,
        username: userData.username,
        email: userData.email,
        role: userData.role,
        id: userData.id,
      }
    : USER_PROFILE;
  return (
    <div className="flex-1 p-8 overflow-y-auto h-full">
      <div className="max-w-4xl mx-auto space-y-8">
        {/* Header / Banner Card */}
        <div className="relative overflow-hidden rounded-2xl bg-black/40 border border-white/10 backdrop-blur-md">
          {/* Decorative Background */}
          <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-r from-primary/20 via-purple-500/10 to-blue-500/10"></div>

          <div className="relative px-8 pb-8 pt-20 flex flex-col md:flex-row items-end gap-6">
            <div className="relative">
              <div className="w-32 h-32 rounded-full border-4 border-black overflow-hidden relative z-10">
                <Image
                  src={displayData.avatar}
                  alt={displayData.username}
                  fill
                  className="object-cover"
                />
              </div>
              <div
                className={`absolute bottom-2 right-2 w-5 h-5 rounded-full border-2 border-black z-20 ${
                  displayData.status === "online"
                    ? "bg-green-500"
                    : "bg-gray-500"
                }`}
              ></div>
            </div>

            <div className="flex-1 mb-2">
              <h1 className="text-3xl font-bold text-white tracking-tight">
                {displayData.first_name} {displayData.last_name}
              </h1>
              <p className="text-primary font-mono text-sm tracking-wider uppercase mb-1">
                @{displayData.username} {displayData.role}
              </p>
              <p className="text-white/40 text-sm flex items-center gap-2">
                <span className="material-symbols-outlined text-sm">mail</span>
                {displayData.email}
              </p>
            </div>

            <div className="flex gap-3 mb-2">
              <button className="px-4 py-2 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 text-white/80 text-sm font-medium transition-colors">
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
              key={i}
              className="p-6 rounded-xl bg-black/20 border border-white/5 flex items-center gap-4"
            >
              <div>
                <p className="text-xs text-white/30 uppercase tracking-widest font-bold">
                  {stat.label}
                </p>
                <p className="text-xl font-bold text-white">{stat.value}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Details Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Left Column: Personal Info */}
          <div className="space-y-6">
            <div className="p-6 rounded-2xl bg-black/20 border border-white/5">
              <h3 className="text-lg font-bold text-white mb-6 flex items-center gap-2">
                <span className="material-symbols-outlined text-primary">
                  fingerprint
                </span>
                Identity
              </h3>

              <div className="space-y-4">
                <div className="flex justify-between items-center py-2 border-b border-white/5">
                  <span className="text-sm text-white/40">Full Name</span>
                  <span className="text-sm text-white/80 font-mono">
                    {displayData.first_name} {displayData.middle_name}{" "}
                    {displayData.last_name}
                  </span>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-white/5">
                  <span className="text-sm text-white/40">Gender</span>
                  <span className="text-sm text-white/80 font-mono">
                    {displayData.gender}
                  </span>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-white/5">
                  <span className="text-sm text-white/40">User ID</span>
                  <span className="text-sm text-white/80 font-mono">
                    #{displayData.id}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Security/Tokens (Mock Display) */}
          <div className="space-y-6">
            <div className="p-6 rounded-2xl bg-black/20 border border-white/5">
              <h3 className="text-lg font-bold text-white mb-6 flex items-center gap-2">
                <span className="material-symbols-outlined text-primary">
                  security
                </span>
                Security Clearance
              </h3>

              <div className="space-y-4">
                <div className="p-3 rounded-lg bg-black/40 border border-white/5 font-mono text-xs break-all">
                  <div className="text-white/30 mb-1 flex items-center gap-1">
                    <span className="material-symbols-outlined text-[10px]">
                      key
                    </span>
                    ACCESS_TOKEN
                  </div>
                  <div className="text-primary/80 opacity-50 blur-[2px] hover:blur-none transition-all cursor-crosshair">
                    {displayData.access_token || "Not generated"}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Calendar Section */}
        <Calendar
          onEventClick={(event) => console.log("Event clicked:", event)}
        />

        {/* PDF Files Section */}
        <div className="p-6 rounded-2xl bg-black/20 border border-white/5">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-bold text-white flex items-center gap-2">
              <span className="material-symbols-outlined text-primary">
                folder
              </span>
              My PDF Files
            </h3>
            <FileUploadButton
              onUploadClick={() => setIsUploadModalOpen(true)}
            />
          </div>
          <FileList refreshTrigger={fileRefreshTrigger} />
        </div>
      </div>

      {/* Upload Modal */}
      <FileUploadModal
        isOpen={isUploadModalOpen}
        onClose={() => setIsUploadModalOpen(false)}
        onUploadSuccess={() => {
          setFileRefreshTrigger((prev) => prev + 1);
        }}
      />
    </div>
  );
}
