import axios from "axios";
import { store } from "../redux/store";
import { refreshUser, logOut } from "../redux/auth/operations";

const API_URL =
  process.env.NODE_ENV === "production"
    ? "https://haky-manager.onrender.com"
    : "http://localhost:5000";

const axiosInstance = axios.create({
  baseURL: API_URL,
});

export const setAuthHeader = (token: string) => {
  axiosInstance.defaults.headers.common["Authorization"] = `Bearer ${token}`;
};

export const clearAuthHeader = () => {
  delete axiosInstance.defaults.headers.common["Authorization"];
};

export const axiosWithToken = (token?: string) => {
  if (token) {
    axiosInstance.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  }
  return axiosInstance;
};

const requestQueue: (() => Promise<void>)[] = [];
let isBackendAwake = true;

const checkBackendStatus = async () => {
  try {
    await axiosInstance.get("/");
    isBackendAwake = true;
    console.log("✅ Backend is awake. Processing queued requests...");
    while (requestQueue.length > 0) {
      const request = requestQueue.shift();
      if (request) await request();
    }
  } catch {
    isBackendAwake = false;
  }
};

axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      try {
        await store.dispatch(refreshUser());
        const newToken = store.getState().auth.token;
        if (newToken) {
          setAuthHeader(newToken);
          originalRequest.headers["Authorization"] = `Bearer ${newToken}`;
          return axiosInstance(originalRequest);
        }
      } catch (refreshError) {
        store.dispatch(logOut());
        return Promise.reject(refreshError);
      }
    }

    if (!isBackendAwake) {
      console.warn("⚠️ Backend is unavailable. Queuing request...");
      requestQueue.push(() => axiosInstance(originalRequest));
      checkBackendStatus();
      return new Promise(() => {});
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;
