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

      localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify({
          isAuthenticated: true,
          user: userWithTokens,
          // Keeping root level for backward compat if needed by other services briefly,
          // but user request implies user object usually.
          // Actually, let's stick to the structure they might expect if they said "go to user profile".
          // But for safety with the manual edits in socket/api services which look for root or state,
          // I should be careful.
          // Wait, the manual code in socket.service.ts (Step 2427) checks: parsed?.state?.access_token.
          // That implies they might be using a store persistence that wraps it in 'state'.
          // BUT authService uses 'devstream_auth' key (STORAGE_KEY), while socket service checks 'auth-storage' (Zustand persist).

          // The user manually created `authSession.service.ts` which checks `auth-storage` OR `access_token` direct key.
          // My `authService` is writing to `devstream_auth`.
          // This is a disconnect.
        })
      );

      // We must sync with the 'auth-storage' that the user seems to be using/expecting via Zustand persist
      // OR we update authService to use the same keys.
      // Given the user manually edited `apiSauce` and `socket.service` to look for keys,
      // I should align.

      // Taking a closer look at the user's `authSession.service.ts`:
      // It looks for `auth-storage` (Zustand) OR `localStorage.getItem("access_token")`.

      // I will update authService to write to the locations the USER's new code expects.
      localStorage.setItem("access_token", accessToken);
      localStorage.setItem("refresh_token", refreshToken);
      localStorage.setItem("user", JSON.stringify(userWithTokens));

      return true;
    }
    return false;
  },

  logout: () => {
    localStorage.removeItem(STORAGE_KEY);
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
