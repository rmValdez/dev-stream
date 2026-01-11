import { USER_PROFILE } from "../data/userProfile";

const STORAGE_KEY = "devstream_auth";

export const authService = {
  login: async (username: string, password: string): Promise<boolean> => {
    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 500));

    if (
      username === USER_PROFILE.username &&
      password === USER_PROFILE.password
    ) {
      const randomId = () =>
        Math.random().toString(36).substring(2) +
        Math.random().toString(36).substring(2);

      const accessToken = `ey${randomId()}.${randomId()}.${randomId()}`;
      const refreshToken = `ref${randomId()}${randomId()}`;

      const userWithTokens = {
        ...USER_PROFILE,
        access_token: accessToken,
        refresh_token: refreshToken,
      };

      // Store in primary location
      localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify({
          isAuthenticated: true,
          user: userWithTokens,
        })
      );

      // Also store in expected locations for session.service.ts compatibility
      localStorage.setItem("access_token", accessToken);
      localStorage.setItem("refresh_token", refreshToken);
      localStorage.setItem("user", JSON.stringify(userWithTokens));

      return true;
    }
    return false;
  },

  logout: () => {
    localStorage.removeItem(STORAGE_KEY);
    // Clear all auth-related keys for complete logout
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");
    localStorage.removeItem("user");
    localStorage.removeItem("auth-storage");
    window.location.href = "/login";
  },

  isAuthenticated: (): boolean => {
    if (typeof window === "undefined") return false;
    const data = localStorage.getItem(STORAGE_KEY);
    return !!data;
  },

  getUser: () => {
    if (typeof window === "undefined") return null;
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data).user : null;
  },
};
