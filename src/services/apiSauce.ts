import { create, ApisauceInstance } from "apisauce";
import {
  getAuthToken,
  getRefreshToken,
  clearAuthTokens,
  updateAccessToken,
} from "./session.service";
import axios from "axios";
import { ALLINONE } from "../config/environment";

// Create apiClient instance
const apiClient: ApisauceInstance = create({
  baseURL: ALLINONE.API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 30000,
});

// Request Transform to attach token
apiClient.addRequestTransform((request) => {
  const token = getAuthToken();
  if (token && request.headers) {
    request.headers["Authorization"] = `Bearer ${token}`;
  }
});

// Use the underlying axios instance for the refresh token interceptor
// because apisauce transforms don't easily support retrying the original request
apiClient.axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const refreshToken = getRefreshToken();
        if (refreshToken) {
          const refreshRes = await axios.post(
            `${ALLINONE.API_BASE_URL}/auth/refresh-token`,
            {
              refreshToken,
            }
          );

          const { accessToken } = refreshRes.data;
          updateAccessToken(accessToken);

          originalRequest.headers["Authorization"] = `Bearer ${accessToken}`;
          return apiClient.axiosInstance(originalRequest);
        }
      } catch {
        clearAuthTokens();
        if (typeof window !== "undefined") {
          window.location.href = "/login";
        }
      }
    }
    return Promise.reject(error);
  }
);

export default apiClient;
