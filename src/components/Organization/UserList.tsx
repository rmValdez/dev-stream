"use client";

import React, { useState } from "react";
import Image from "next/image";
import { MOCK_USERS, User } from "./organizationData";

export default function UserList() {
  // Allow independent open states for each group
  const [openStates, setOpenStates] = useState<Record<string, boolean>>({
    online: true,
    dnd: false,
    offline: false,
  });

  // Group users by status
  const groupedUsers = {
    online: MOCK_USERS.filter((u) => u.status === "online"),
    dnd: MOCK_USERS.filter((u) => u.status === "dnd"),
    offline: MOCK_USERS.filter((u) => u.status === "offline"),
  };

  const toggleStatus = (status: string) => {
    setOpenStates((prev) => ({
      ...prev,
      [status]: !prev[status],
    }));
  };

  const renderUserGroup = (
    title: string,
    key: "online" | "dnd" | "offline",
    users: User[],
    colorClass: string
  ) => {
    const isOpen = openStates[key];

    return (
      <div className="border-b border-white/5 last:border-0 flex flex-col min-h-0 shrink-0">
        <button
          onClick={() => toggleStatus(key)}
          className={`w-full flex items-center justify-between p-3 hover:bg-white/5 transition-colors shrink-0 ${
            isOpen ? "bg-white/5" : ""
          }`}
        >
          <div className="flex items-center gap-3">
            <span
              className={`material-symbols-outlined text-sm ${
                isOpen ? "text-white" : "text-white/50"
              }`}
            >
              {isOpen ? "expand_more" : "chevron_right"}
            </span>
            <span
              className={`text-xs font-bold uppercase tracking-wider ${colorClass}`}
            >
              {title}
            </span>
          </div>
          <span className="text-[10px] font-mono bg-white/5 px-2 py-0.5 rounded text-white/40">
            {users.length}
          </span>
        </button>

        {isOpen && (
          <div className="p-2 space-y-1 bg-black/20">
            {users.map((user) => (
              <div
                key={user.id}
                className="group flex items-center gap-3 p-2 rounded-lg hover:bg-white/5 transition-colors cursor-pointer"
              >
                <div className="relative shrink-0">
                  <div className="w-8 h-8 rounded-lg overflow-hidden border border-white/10 group-hover:border-primary/50 transition-colors">
                    <Image
                      src={user.avatar}
                      alt={user.name}
                      width={32}
                      height={32}
                      className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all"
                    />
                  </div>
                  <div
                    className={`absolute -bottom-1 -right-1 w-3 h-3 rounded-full border-2 border-black ${
                      user.status === "online"
                        ? "bg-green-500"
                        : user.status === "dnd"
                        ? "bg-orange-500"
                        : "bg-gray-500"
                    }`}
                  ></div>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-bold text-slate-200 truncate group-hover:text-primary transition-colors">
                    {user.name}
                  </p>
                  <p className="text-[10px] text-white/30 truncate uppercase tracking-wider font-mono">
                    {user.role}
                  </p>
                </div>
              </div>
            ))}
            {users.length === 0 && (
              <div className="p-4 text-center text-white/20 text-[10px] font-mono italic">
                No users {key}
              </div>
            )}
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="h-full bg-black/20 border border-white/5 rounded-2xl overflow-hidden backdrop-blur-sm flex flex-col">
      <div className="p-4 border-b border-white/5 bg-white/5 shrink-0">
        <div className="flex items-center gap-2">
          <span className="material-symbols-outlined text-primary text-sm">
            group
          </span>
          <span className="font-bold tracking-widest uppercase text-xs">
            Members
          </span>
          <span className="ml-auto text-[10px] bg-primary/20 text-primary px-2 py-0.5 rounded-full font-mono">
            {MOCK_USERS.length}
          </span>
        </div>
      </div>
      <div className="flex-1 overflow-y-auto custom-scrollbar min-h-0">
        {renderUserGroup(
          "Online",
          "online",
          groupedUsers.online,
          "text-green-400"
        )}
        {renderUserGroup(
          "Do Not Disturb",
          "dnd",
          groupedUsers.dnd,
          "text-orange-400"
        )}
        {renderUserGroup(
          "Offline",
          "offline",
          groupedUsers.offline,
          "text-slate-400"
        )}
      </div>
    </div>
  );
}
