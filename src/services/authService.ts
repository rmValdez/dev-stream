import { User } from "@/components/Organization/organizationData";
import apiClient from "./apiSauce";

const ACCESS_TOKEN_KEY = "ds_access_token";
const REFRESH_TOKEN_KEY = "ds_refresh_token";

interface LoginResponse {
  accessToken: string;
  refreshToken: string;
  user: User;
}

export const authService = {
  login: async (email: string, password: string): Promise<boolean> => {
    try {
      const response = await apiClient.post("/auth/login", {
        email,
        password,
      });

      if (response.ok && response.data) {
        const { accessToken, refreshToken, user } =
          response.data as LoginResponse;

        // Store tokens with unique keys
        localStorage.setItem(ACCESS_TOKEN_KEY, accessToken);
        localStorage.setItem(REFRESH_TOKEN_KEY, refreshToken);

        // Store user in sync with existing patterns but keep it simple
        localStorage.setItem("user", JSON.stringify(user));

        return true;
      }
      return false;
    } catch (error) {
      console.error("[authService] Login failed:", error);
      return false;
    }
  },

  logout: () => {
    // Clear all auth-related keys
    localStorage.removeItem(ACCESS_TOKEN_KEY);
    localStorage.removeItem(REFRESH_TOKEN_KEY);
    localStorage.removeItem("user");
    localStorage.removeItem("devstream_auth"); // Cleanup legacy
    localStorage.removeItem("auth-storage"); // Cleanup legacy
    window.location.href = "/login";
  },

  isAuthenticated: (): boolean => {
    if (typeof window === "undefined") return false;
    return !!localStorage.getItem(ACCESS_TOKEN_KEY);
  },

  getUser: () => {
    if (typeof window === "undefined") return null;
    const data = localStorage.getItem("user");
    try {
      return data ? JSON.parse(data) : null;
    } catch {
      return null;
    }
  },
};
