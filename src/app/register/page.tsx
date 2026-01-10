"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";

export default function RegisterPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // For now, registration just redirects to login as it's a dummy flow
    // In a real app, this would call authService.register()
    router.push("/login");
  };

  return (
    <div className="min-h-screen bg-black flex items-center justify-center p-4 relative overflow-hidden">
      {/* Background Ambience */}
      <div className="absolute top-0 left-0 w-full h-full z-0">
        <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-purple-500/20 blur-[150px] rounded-full opacity-20 animate-pulse"></div>
      </div>

      <div className="w-full max-w-md bg-black/40 border border-white/10 rounded-2xl p-8 backdrop-blur-xl relative z-10 shadow-2xl">
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold tracking-tight text-white mb-2">
            Join The Organization
          </h1>
          <p className="text-sm text-white/40">Create your secure identity.</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <label className="text-xs font-bold uppercase tracking-wider text-white/50 ml-1">
              Username
            </label>
            <input
              type="text"
              className="w-full bg-white/5 border border-white/10 rounded-lg py-3 px-4 text-sm text-white focus:outline-none focus:border-primary/50 transition-colors"
              placeholder="Choose a codename"
              required
              value={formData.username}
              onChange={(e) =>
                setFormData({ ...formData, username: e.target.value })
              }
            />
          </div>
          <div className="space-y-2">
            <label className="text-xs font-bold uppercase tracking-wider text-white/50 ml-1">
              Email
            </label>
            <input
              type="email"
              className="w-full bg-white/5 border border-white/10 rounded-lg py-3 px-4 text-sm text-white focus:outline-none focus:border-primary/50 transition-colors"
              placeholder="agent@example.com"
              required
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-wider text-white/50 ml-1">
                Password
              </label>
              <input
                type="password"
                className="w-full bg-white/5 border border-white/10 rounded-lg py-3 px-4 text-sm text-white focus:outline-none focus:border-primary/50 transition-colors"
                placeholder="••••••"
                required
                value={formData.password}
                onChange={(e) =>
                  setFormData({ ...formData, password: e.target.value })
                }
              />
            </div>
            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-wider text-white/50 ml-1">
                Confirm
              </label>
              <input
                type="password"
                className="w-full bg-white/5 border border-white/10 rounded-lg py-3 px-4 text-sm text-white focus:outline-none focus:border-primary/50 transition-colors"
                placeholder="••••••"
                required
                value={formData.confirmPassword}
                onChange={(e) =>
                  setFormData({ ...formData, confirmPassword: e.target.value })
                }
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-white/10 hover:bg-white/20 text-white font-bold py-3 rounded-lg transition-all mt-4 border border-white/5"
          >
            Initialize Account
          </button>
        </form>

        <div className="mt-8 text-center">
          <p className="text-xs text-white/30">
            Already have credentials?{" "}
            <a href="/login" className="text-primary hover:underline">
              System Login
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
