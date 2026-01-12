"use client";

import { create } from "zustand";
import { authService } from "@/services/authService";
import { User } from "@/components/Organization/organizationData";

interface AuthState {
  isAuthenticated: boolean;
  user: User | null;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  checkAuth: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  isAuthenticated: false,
  user: null,

  login: async (email, password) => {
    const success = await authService.login(email, password);
    if (success) {
      set({
        isAuthenticated: true,
        user: authService.getUser() as User,
      });
      return true;
    }
    return false;
  },

  logout: () => {
    authService.logout();
    set({ isAuthenticated: false, user: null });
  },

  checkAuth: () => {
    const isAuth = authService.isAuthenticated();
    if (isAuth) {
      set({
        isAuthenticated: true,
        user: authService.getUser() as User,
      });
    } else {
      set({ isAuthenticated: false, user: null });
    }
  },
}));
