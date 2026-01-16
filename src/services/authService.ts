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
        localStorage.setItem(ACCESS_TOKEN_KEY, accessToken);
        localStorage.setItem(REFRESH_TOKEN_KEY, refreshToken);
        localStorage.setItem("user", JSON.stringify(user));
        return true;
      }
      return false;
    } catch (error) {
      console.error("[authService] Login failed:", error);
      return false;
    }
  },

  logout: async () => {
    try {
      const refreshToken = localStorage.getItem(REFRESH_TOKEN_KEY);
      const response = await apiClient.post("/auth/logout", { refreshToken });
      if (response.ok && response.data) {
        localStorage.removeItem(ACCESS_TOKEN_KEY);
        localStorage.removeItem(REFRESH_TOKEN_KEY);
        localStorage.removeItem("user");
        window.location.href = "/login";
        return true;
      }
      return false;
    } catch (error) {
      console.error("[authService] Logout failed:", error);
      return false;
    }
  },

  register: async (data: {
    email: string;
    password: string;
    username: string;
    firstName?: string;
    lastName?: string;
  }): Promise<{ success: boolean; message?: string }> => {
    try {
      const response = await apiClient.post("/auth/register", data);

      if (response.ok && response.data) {
        const { accessToken, refreshToken, user } = (
          response.data as {
            response: { accessToken: string; refreshToken: string; user: User };
          }
        ).response;
        localStorage.setItem(ACCESS_TOKEN_KEY, accessToken);
        localStorage.setItem(REFRESH_TOKEN_KEY, refreshToken);
        localStorage.setItem("user", JSON.stringify(user));
        return { success: true };
      }
      return {
        success: false,
        message:
          (response.data as { message?: string })?.message ||
          "Registration failed",
      };
    } catch (error) {
      console.error("[authService] Registration failed:", error);
      return {
        success: false,
        message: (error as Error).message || "An unexpected error occurred",
      };
    }
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
