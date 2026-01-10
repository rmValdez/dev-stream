"use client";

import React, { useEffect } from "react";

import IntroAnimation from "@/components/IntroAnimation";
import FeedStream from "@/components/FeedStream/FeedStream";
import PostCreator from "@/components/PostCreator/PostCreator";
import PageHeader from "@/components/PageHeader/PageHeader";

import { useRouter } from "next/navigation";
import { useAuthStore } from "@/store/auth.store";

import { useUIStore } from "@/store/ui.store";

export default function Home() {
  const router = useRouter();
  const { isAuthenticated, checkAuth } = useAuthStore();
  const { hasSeenIntro, setHasSeenIntro } = useUIStore();

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  useEffect(() => {
    if (!isAuthenticated) {
      router.push("/login");
    }
  }, [isAuthenticated, router]);

  const handleIntroComplete = () => {
    setHasSeenIntro(true);
  };

  // Don't render protected content until authorized
  if (!isAuthenticated) {
    return null; // Or a loading spinner
  }

  return (
    <>
      {!hasSeenIntro ? (
        <IntroAnimation onComplete={handleIntroComplete} />
      ) : (
        <div className="flex h-full w-full justify-center overflow-hidden">
          {/* Centered Feed Area with Max Width */}
          <div className="w-full max-w-3xl h-full overflow-y-auto scrollbar-hide px-4 pt-6">
            <div className="space-y-6">
              <PageHeader
                title="Hot Modules"
                description="Live feed updates and system notifications"
              />
              <PostCreator />
              <FeedStream />
            </div>
          </div>
        </div>
      )}
    </>
  );
}
