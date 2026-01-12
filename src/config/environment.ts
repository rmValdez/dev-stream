export const DEV_STREAM = {
  BASE_URL: process.env.BASE_URL_LOCAL || "http://localhost:3000",
  API_BASE_URL_LOCAL:
    process.env.API_BASE_URL_LOCAL || "http://localhost:3003/api/v1",
  SOCKET_URL: process.env.API_SOCKET_URL || "http://localhost:3003",
};
