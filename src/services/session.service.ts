/**
 * NOTE: Authentication tokens are now managed via HttpOnly cookies.
 * These functions are mostly no-ops or for clearing client-side state.
 */

const getAuthToken = (): string | null => {
  // Tokens are in HttpOnly cookies and managed by the browser
  return null;
};

const getRefreshToken = (): string | null => {
  // Tokens are in HttpOnly cookies and managed by the browser
  return null;
};

const clearAuthTokens = (): void => {
  if (typeof window === "undefined") return;
  // Clear the user data from localStorage
  localStorage.removeItem("user");
  // The logout API call will handle clearing the HttpOnly cookies via Set-Cookie
};

const updateAccessToken = (_: string): void => {
  // Access tokens are updated via Set-Cookie headers from the backend
};

export { getAuthToken, getRefreshToken, clearAuthTokens, updateAccessToken };
