"use client";

import React, { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { MOCK_MESSAGES, Message } from "./organizationData";

const PAGE_SIZE = 20;

export default function ChatRoom() {
  // Store messages in Chronological order (Oldest -> Newest)
  const [displayedMessages, setDisplayedMessages] = useState<Message[]>(() => {
    // Initial load: Get the last PAGE_SIZE messages
    const total = MOCK_MESSAGES.length;
    const start = Math.max(0, total - PAGE_SIZE);
    return MOCK_MESSAGES.slice(start, total);
  });

  const bottomRef = useRef<HTMLDivElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  // State to track if we are loading history to prevent auto-scrolling to bottom
  const [isLoadingHistory, setIsLoadingHistory] = useState(false);
  const prevScrollHeightRef = useRef(0);
  // Track if user is at bottom to auto-scroll on new messages
  const isAtBottomRef = useRef(true);
  // Force scroll to bottom (e.g. after sending)
  const forceScrollRef = useRef(false);

  // Initial scroll to bottom
  useEffect(() => {
    if (bottomRef.current) {
      bottomRef.current.scrollIntoView({ behavior: "auto" });
    }
  }, []);

  // Scroll Tracking
  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const { scrollTop, scrollHeight, clientHeight } = e.currentTarget;
    // Check if we are close to bottom (within 20px)
    const isBottom = Math.abs(scrollHeight - clientHeight - scrollTop) < 20;
    isAtBottomRef.current = isBottom;
  };

  // Logic to handle new messages (Scroll to bottom)
  useEffect(() => {
    // Only scroll if NOT loading history
    if (!isLoadingHistory) {
      if (forceScrollRef.current || isAtBottomRef.current) {
        bottomRef.current?.scrollIntoView({ behavior: "smooth" });
        forceScrollRef.current = false; // Reset force flag
      }
    }
  }, [displayedMessages, isLoadingHistory]);

  // Correct Scroll Restoration Logic for History
  React.useLayoutEffect(() => {
    if (isLoadingHistory && scrollRef.current) {
      const newScrollHeight = scrollRef.current.scrollHeight;
      const diff = newScrollHeight - prevScrollHeightRef.current;
      if (diff > 0) {
        scrollRef.current.scrollTop += diff;
      }
      setIsLoadingHistory(false);
    }
  }, [displayedMessages, isLoadingHistory]);

  const loadMore = () => {
    const total = MOCK_MESSAGES.length;
    const currentLength = displayedMessages.length;
    const nextCursor = total - currentLength;

    if (nextCursor <= 0) return; // No more messages

    const start = Math.max(0, nextCursor - PAGE_SIZE);
    const end = nextCursor;
    const olderChunk = MOCK_MESSAGES.slice(start, end);

    // Capture height BEFORE update
    if (scrollRef.current) {
      prevScrollHeightRef.current = scrollRef.current.scrollHeight;
    }

    setIsLoadingHistory(true);
    setDisplayedMessages((prev) => [...olderChunk, ...prev]);
  };

  // Input State
  const [inputValue, setInputValue] = useState("");

  const handleSend = () => {
    if (!inputValue.trim()) return;

    const newMessage: Message = {
      id: Date.now().toString(),
      user: {
        name: "Dev_Lead (You)",
        avatar:
          "https://replicate.delivery/pbxt/JR3pX7O7l5O4TfL8g6e4k8g8k8k8k8k8k8k8k8k8k8k8k8k8/https://lh3.googleusercontent.com/aida-public/AB6AXuC2Tkx2dc7TbK-Cx0HB2u64H6Rh7off1CUQYFWVPmJ14y7mZy29upnjlzPfjlHOrkkVY8GbQWt6f9W7kcYGN2yz2y-yEdtCFRDWKpcbpDPtPVF6DXyHTxHNBK3It5KQFUJGxtCu3E_vn7cn4qjAOHpTm4Mn_Gb6h1lbI0AWVqy53kial7DzWi2PvHxbZoKFF3Y1Q70WpDVMmeuapDgtDvq-JZDwkKKlQa1oNe6njTX2EdrSiSWWKXXG19lojDd4OyxrUnaNrfHS2g6c",
        color: "text-primary",
      },
      content: inputValue,
      timestamp: new Date().toLocaleTimeString([], {
        hour: "numeric",
        minute: "2-digit",
      }),
      isSystem: false,
    };

    forceScrollRef.current = true; // Force scroll for my own message
    setDisplayedMessages((prev) => [...prev, newMessage]);
    setInputValue("");
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSend();
    }
  };

  return (
    <div className="flex flex-col h-full bg-black/20 border border-white/5 rounded-2xl overflow-hidden backdrop-blur-sm">
      {/* Chat Header */}
      <div className="p-4 border-b border-white/5 bg-white/5 flex justify-between items-center shrink-0">
        <div className="flex items-center gap-3">
          <span className="material-symbols-outlined text-primary">forum</span>
          <span className="font-bold tracking-widest uppercase text-sm">
            General Channel
          </span>
          <span className="text-[10px] bg-white/10 px-2 py-0.5 rounded text-white/40">
            {MOCK_MESSAGES.length +
              (displayedMessages.length > 20
                ? displayedMessages.length - 20
                : 0)}{" "}
            Total
          </span>
        </div>
        <div className="flex gap-2">
          <span className="w-3 h-3 rounded-full bg-red-500/50"></span>
          <span className="w-3 h-3 rounded-full bg-yellow-500/50"></span>
          <span className="w-3 h-3 rounded-full bg-green-500/50"></span>
        </div>
      </div>

      {/* Messages Area - Standard Scroll */}
      <div
        ref={scrollRef}
        className="flex-1 overflow-y-auto p-6 custom-scrollbar min-h-0 flex flex-col gap-6"
        onScroll={handleScroll}
      >
        {/* Load More Trigger (Visually at Top) */}
        {displayedMessages.length < MOCK_MESSAGES.length && (
          <div className="text-center py-4 shrink-0">
            <button
              onClick={loadMore}
              className="text-xs text-primary/50 hover:text-primary font-mono uppercase tracking-wider"
            >
              Load History...
            </button>
          </div>
        )}

        {displayedMessages.map((msg) => (
          <div
            key={msg.id}
            className={`flex gap-4 shrink-0 ${
              msg.isSystem ? "opacity-70" : ""
            }`}
          >
            {!msg.isSystem && (
              <div className="shrink-0 w-10 h-10 rounded-lg overflow-hidden border border-white/10">
                <Image
                  src={msg.user.avatar}
                  alt={msg.user.name}
                  width={40}
                  height={40}
                  className="w-full h-full object-cover"
                />
              </div>
            )}
            <div className="flex-1">
              <div className="flex items-baseline gap-3 mb-1">
                <span
                  className={`text-xs font-bold ${msg.user.color} font-mono uppercase`}
                >
                  {msg.user.name}
                </span>
                <span className="text-[10px] text-white/20 font-mono">
                  {msg.timestamp}
                </span>
              </div>
              <p
                className={`text-sm leading-relaxed ${
                  msg.isSystem
                    ? "text-primary font-mono text-xs"
                    : "text-slate-200"
                }`}
              >
                {msg.content}
              </p>
            </div>
          </div>
        ))}

        {/* Invisible anchor for scrolling to bottom */}
        <div ref={bottomRef} />
      </div>

      {/* Input Area */}
      <div className="p-4 bg-white/5 border-t border-white/5 shrink-0">
        <div className="flex gap-4">
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Transmission..."
            className="flex-1 bg-black/40 border border-white/10 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-primary/50 transition-colors font-mono text-white placeholder-white/20"
          />
          <button
            onClick={handleSend}
            className="px-6 py-2 bg-primary/10 hover:bg-primary/20 text-primary border border-primary/20 rounded-lg font-bold uppercase tracking-wider text-xs transition-all flex items-center gap-2"
          >
            Send <span className="material-symbols-outlined text-sm">send</span>
          </button>
        </div>
      </div>
    </div>
  );
}
