const getAuthToken = (): string | null => {
  if (typeof window === "undefined") return null;
  try {
    const authStorage = localStorage.getItem("auth-storage");
    if (authStorage) {
      const parsed = JSON.parse(authStorage);
      if (parsed?.state?.access_token) return parsed.state.access_token;
    }
    return localStorage.getItem("access_token");
  } catch {
    return localStorage.getItem("access_token");
  }
};

const getRefreshToken = (): string | null => {
  if (typeof window === "undefined") return null;
  try {
    const authStorage = localStorage.getItem("auth-storage");
    if (authStorage) {
      const parsed = JSON.parse(authStorage);
      if (parsed?.state?.refresh_token) return parsed.state.refresh_token;
    }
    return localStorage.getItem("refresh_token");
  } catch {
    return localStorage.getItem("refresh_token");
  }
};

const clearAuthTokens = (): void => {
  if (typeof window === "undefined") return;
  localStorage.removeItem("access_token");
  localStorage.removeItem("refresh_token");
  localStorage.removeItem("user");
  localStorage.removeItem("auth-storage");
};

const updateAccessToken = (token: string): void => {
  if (typeof window === "undefined") return;
  localStorage.setItem("access_token", token);
  try {
    const authStorage = localStorage.getItem("auth-storage");
    if (authStorage) {
      const parsed = JSON.parse(authStorage);
      if (parsed?.state) {
        parsed.state.access_token = token;
        localStorage.setItem("auth-storage", JSON.stringify(parsed));
      }
    }
  } catch (error) {
    console.warn("[session.service] Failed to update auth-storage:", error);
  }
};

export { getAuthToken, getRefreshToken, clearAuthTokens, updateAccessToken };
