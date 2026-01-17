import { User } from "@/components/Organization/organizationData";
import apiClient from "./apiSauce";

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
        const { user } = response.data as LoginResponse;
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
      const response = await apiClient.post("/auth/logout", {});
      if (response.ok) {
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
        const { user } = (
          response.data as {
            response: { user: User };
          }
        ).response;
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
    return !!localStorage.getItem("user");
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
