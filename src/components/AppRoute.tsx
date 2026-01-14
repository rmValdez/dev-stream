"use client";
import React from "react";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/store/auth.store";

interface ProtectedRouteProps {
  children: React.ReactNode;
}

export default function AppRoute({ children }: ProtectedRouteProps) {
  const router = useRouter();
  const { isAuthenticated, user } = useAuthStore();
  const [isChecking, setIsChecking] = useState(true);

  useEffect(() => {
    const checkAuth = () => {
      if (!isAuthenticated) {
        router.push("/login");
      } else {
        setIsChecking(false);
      }
    };

    const timer = setTimeout(checkAuth, 100);
    return () => clearTimeout(timer);
  }, [isAuthenticated, user, router]);

  if (isChecking) {
    return (
      <div className="h-screen w-full flex flex-col items-center justify-center bg-background-dark font-mono text-primary">
        <div className="relative group cursor-default">
          <div className="absolute -inset-1 bg-gradient-to-r from-primary to-secondary rounded-lg blur opacity-25 animate-pulse"></div>
          <div className="relative px-12 py-8 bg-black/40 backdrop-blur-xl rounded-lg border border-white/10 flex flex-col items-center gap-6">
            <h1 className="text-2xl font-black bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary uppercase tracking-[0.5em] animate-pulse">
              Initializing
            </h1>
            <p className="text-[10px] text-white/20 font-medium tracking-widest uppercase">
              Dev Stream Ops Center // Secure Connection
            </p>
          </div>
        </div>
      </div>
    );
  }

  return <React.Fragment>{children}</React.Fragment>;
}
