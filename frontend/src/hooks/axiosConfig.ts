
import axios from "axios";
import { store } from "../redux/store";
import { refreshUser, logOut } from "../redux/auth/operations";

// Set base API URL depending on environment
const API_URL =
  process.env.NODE_ENV === "production"
    ? "https://haky-manager.onrender.com"
    : "http://localhost:5000";

const axiosInstance = axios.create({
  baseURL: API_URL,
});

// Sets the Authorization header for future requests
export const setAuthHeader = (token: string) => {
  axiosInstance.defaults.headers.common["Authorization"] = `Bearer ${token}`;
};

// Clears the Authorization header
export const clearAuthHeader = () => {
  delete axiosInstance.defaults.headers.common["Authorization"];
};

// Returns an axios instance with Authorization header set (if token is provided)
export const axiosWithToken = (token?: string) => {
  if (token) {
    axiosInstance.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  }
  return axiosInstance;
};

let isRefreshing = false;
let refreshPromise: Promise<void> | null = null;

// Axios response interceptor to handle token refresh logic on 401 errors
axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (
      error.response?.status === 401 &&
      error.response?.data?.message === "Access token expired" &&
      !originalRequest._retry
    ) {
      originalRequest._retry = true;

      if (!isRefreshing) {
        isRefreshing = true;
        refreshPromise = store.dispatch(refreshUser()) as Promise<any>;

        try {
          await refreshPromise;
          isRefreshing = false;
          refreshPromise = null;

          const newToken = store.getState().auth.token;
          if (newToken) {
            setAuthHeader(newToken);
            originalRequest.headers["Authorization"] = `Bearer ${newToken}`;
            return axiosInstance(originalRequest);
          }
        } catch (refreshError) {
          isRefreshing = false;
          refreshPromise = null;
          store.dispatch(logOut());
          return Promise.reject(refreshError);
        }
      } else {
        await refreshPromise;
        const newToken = store.getState().auth.token;
        if (newToken) {
          setAuthHeader(newToken);
          originalRequest.headers["Authorization"] = `Bearer ${newToken}`;
          return axiosInstance(originalRequest);
        }
      }
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;