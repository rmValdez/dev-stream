"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { isLoggedIn } from "@/components/Auth/LoginPage";

export default function Home() {
  const router = useRouter();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;

    // If logged in, redirect to hot-modules
    // If not, redirect to login
    if (isLoggedIn()) {
      router.push("/hot-modules");
    } else {
      router.push("/login");
    }
  }, [router, mounted]);

  // Return a minimal loading state while mounting/redirecting
  return (
    <div className="h-screen w-full flex items-center justify-center bg-black">
      <div className="w-12 h-12 border-4 border-primary/20 border-t-primary rounded-full animate-spin"></div>
    </div>
  );
}
