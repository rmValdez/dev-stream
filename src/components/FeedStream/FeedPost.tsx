import React from "react";
import Image from "next/image";
import { FeedPost as FeedPostType } from "./feedData";

interface FeedPostProps {
  post: FeedPostType;
  innerRef?: React.Ref<HTMLDivElement>;
}

export default function FeedPost({ post, innerRef }: FeedPostProps) {
  return (
    <div
      ref={innerRef}
      className="bg-white dark:bg-surface-dark border border-black/5 dark:border-white/5 rounded-2xl overflow-hidden group hover:border-black/10 dark:hover:border-white/15 transition-all shadow-xl"
    >
      <div className="p-6 pb-0">
        <div className="flex gap-4 mb-4">
          <div className="w-12 h-12 rounded-full bg-slate-900 dark:bg-white flex-shrink-0 flex items-center justify-center font-bold text-white dark:text-black italic text-lg shadow-lg">
            {post.author.initials}
          </div>
          <div className="flex-1">
            <div className="flex items-center justify-between mb-1">
              <div className="flex items-baseline gap-2">
                <span className="font-bold text-base hover:underline cursor-pointer text-slate-900 dark:text-white">
                  {post.author.name}
                </span>
                <span className="text-[10px] text-slate-400 dark:text-white/30 uppercase tracking-widest">
                  {post.author.role}
                </span>
              </div>
              <span className="text-xs text-slate-400 dark:text-white/30">
                {post.timestamp}
              </span>
            </div>
            <p className="text-[15px] text-slate-700 dark:text-white/90 leading-relaxed">
              {post.content} <br />
              <span className="text-primary opacity-80">
                {post.tags.join(" ")}
              </span>
            </p>
          </div>
        </div>
      </div>
      {post.image && (
        <div className="w-full px-6 mb-2">
          <div className="relative w-full aspect-video rounded-xl overflow-hidden border border-black/5 dark:border-white/10 bg-black group/media">
            <Image
              alt="Post media"
              src={post.image}
              fill
              className="object-cover bg-center transition-transform duration-700 group-hover/media:scale-105 grayscale group-hover/media:grayscale-0"
            />
          </div>
        </div>
      )}
      <div className="p-6 pt-2">
        <div className="flex items-center gap-6 px-1">
          <button className="flex items-center gap-2 text-slate-400 dark:text-white/40 hover:text-primary transition-colors">
            <span className="material-symbols-outlined text-xl">favorite</span>
            <span className="text-xs font-mono">{post.stats.likes}</span>
          </button>
          <button className="flex items-center gap-2 text-slate-400 dark:text-white/40 hover:text-primary transition-colors">
            <span className="material-symbols-outlined text-xl">comment</span>
            <span className="text-xs font-mono">{post.stats.comments}</span>
          </button>
          <button className="flex items-center gap-2 text-slate-400 dark:text-white/40 hover:text-primary transition-colors">
            <span className="material-symbols-outlined text-xl">share</span>
          </button>
        </div>
      </div>
    </div>
  );
}
