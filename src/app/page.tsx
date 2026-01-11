"use client";

import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import { isLoggedIn } from "@/components/Auth/LoginPage";
import IntroAnimation from "@/components/IntroAnimation";
import { useUIStore } from "@/store/ui.store";

export default function Home() {
  const router = useRouter();
  const { hasSeenIntro, setHasSeenIntro } = useUIStore();

  useEffect(() => {
    // If not authenticated, go to login.
    // If authenticated, go to hot-modules.
    if (isLoggedIn()) {
      router.push("/hot-modules");
    } else {
      router.push("/login");
    }
  }, [router]);

  // Handle intro animation logic if we want to show it before redirecting
  // For now, we are redirecting immediately, but keeping this for structure
  const handleIntroComplete = () => {
    setHasSeenIntro(true);
    if (isLoggedIn()) {
      router.push("/hot-modules");
    } else {
      router.push("/login");
    }
  };

  // Show intro only if not seen
  if (!hasSeenIntro) {
    return <IntroAnimation onComplete={handleIntroComplete} />;
  }

  return null; // or a loading spinner while redirecting
}
