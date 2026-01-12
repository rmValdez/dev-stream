const getAuthToken = (): string | null => {
  if (typeof window === "undefined") return null;
  return localStorage.getItem("ds_access_token");
};

const getRefreshToken = (): string | null => {
  if (typeof window === "undefined") return null;
  return localStorage.getItem("ds_refresh_token");
};

const clearAuthTokens = (): void => {
  if (typeof window === "undefined") return;
  localStorage.removeItem("ds_access_token");
  localStorage.removeItem("ds_refresh_token");
  localStorage.removeItem("user");
};

const updateAccessToken = (token: string): void => {
  if (typeof window === "undefined") return;
  localStorage.setItem("ds_access_token", token);
};

export { getAuthToken, getRefreshToken, clearAuthTokens, updateAccessToken };
