import { create, ApisauceInstance } from "apisauce";
import {
  getRefreshToken,
  clearAuthTokens,
  updateAccessToken,
} from "./session.service";
import axios from "axios";
import { DEV_STREAM } from "../config/environment";

// Create apiClient instance
const apiClient: ApisauceInstance = create({
  baseURL: DEV_STREAM.API_BASE_URL_LOCAL,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
  timeout: 30000,
});

// Use the underlying axios instance for the refresh token interceptor
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
            `${DEV_STREAM.API_BASE_URL_LOCAL}/auth/refresh-token`,
            {
              refreshToken,
            },
            { withCredentials: true }
          );

          const { accessToken } = refreshRes.data;
          updateAccessToken(accessToken);

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
