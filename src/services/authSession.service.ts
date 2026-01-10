const getAuthToken = (): string | null => {
  if (typeof window === 'undefined') return null;
  try {
    const authStorage = localStorage.getItem('auth-storage');
    if (authStorage) {
      const parsed = JSON.parse(authStorage);
      if (parsed?.state?.accessToken) return parsed.state.accessToken;
    }
    return localStorage.getItem('accessToken');
  } catch {
    return localStorage.getItem('accessToken');
  }
};

const getRefreshToken = (): string | null => {
  if (typeof window === 'undefined') return null;
  try {
    const authStorage = localStorage.getItem('auth-storage');
    if (authStorage) {
      const parsed = JSON.parse(authStorage);
      if (parsed?.state?.refreshToken) return parsed.state.refreshToken;
    }
    return localStorage.getItem('refreshToken');
  } catch {
    return localStorage.getItem('refreshToken');
  }
};

const clearAuthTokens = (): void => {
  if (typeof window === 'undefined') return;
  localStorage.removeItem('accessToken');
  localStorage.removeItem('refreshToken');
  localStorage.removeItem('user');
  localStorage.removeItem('auth-storage');
};

const updateAccessToken = (token: string): void => {
  if (typeof window === 'undefined') return;
  localStorage.setItem('accessToken', token);
  try {
    const authStorage = localStorage.getItem('auth-storage');
    if (authStorage) {
      const parsed = JSON.parse(authStorage);
      if (parsed?.state) {
        parsed.state.accessToken = token;
        localStorage.setItem('auth-storage', JSON.stringify(parsed));
      }
    }
  } catch {}
};

export { getAuthToken, getRefreshToken, clearAuthTokens, updateAccessToken };
