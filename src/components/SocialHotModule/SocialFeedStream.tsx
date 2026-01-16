"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import FeedPostComponent from "./SocialFeedPost";
import { FeedPost, generateMockPosts } from "./feedData";

export default function FeedStream() {
  const [posts, setPosts] = useState<FeedPost[]>([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const observer = useRef<IntersectionObserver | null>(null);

  const lastPostRef = useCallback(
    (node: HTMLDivElement) => {
      if (loading) return;
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore) {
          setPage((prev) => prev + 1);
        }
      });
      if (node) observer.current.observe(node);
    },
    [loading, hasMore]
  );

  useEffect(() => {
    setLoading(true);
    // Simulate API delay
    const timeout = setTimeout(() => {
      const newPosts = generateMockPosts(page, 5);
      setPosts((prev) => [...prev, ...newPosts]);
      setLoading(false);
      if (page > 10) setHasMore(false); // Stop after 10 pages
    }, 1000);

    return () => clearTimeout(timeout);
  }, [page]);

  return (
    <div className="space-y-6 pb-20">
      {posts.map((post, index) => {
        const isLast = index === posts.length - 1;
        return (
          <FeedPostComponent
            key={post.id}
            post={post}
            innerRef={isLast ? lastPostRef : undefined}
          />
        );
      })}

      {loading && (
        <div className="flex justify-center p-8">
          <div className="flex items-center gap-2 text-primary font-mono text-xs uppercase tracking-widest animate-pulse">
            <span className="w-2 h-2 rounded-full bg-primary animate-bounce"></span>
            <span
              className="w-2 h-2 rounded-full bg-primary animate-bounce"
              style={{ animationDelay: "0.1s" }}
            ></span>
            <span
              className="w-2 h-2 rounded-full bg-primary animate-bounce"
              style={{ animationDelay: "0.2s" }}
            ></span>
            Loading Stream...
          </div>
        </div>
      )}

      {!hasMore && !loading && (
        <div className="text-center p-8 text-slate-400 dark:text-white/20 font-mono text-xs uppercase tracking-widest">
          No more posts to load
        </div>
      )}
    </div>
  );
}
