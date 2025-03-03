import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance, {
  setAuthHeader,
  clearAuthHeader,
} from "../../hooks/axiosConfig";
import { RootState } from "../store";
import { User } from "../../types";

interface AuthResponse {
  accessToken: string;
  user: User;
}

export const registerUser = createAsyncThunk<
  User,
  { name: string; email: string; password: string }
>("auth/register", async (userData, { rejectWithValue }) => {
  try {
    const response = await axiosInstance.post("/auth/register", userData);
    return response.data.data;
  } catch (error: any) {
    return rejectWithValue(
      error.response?.data.message || "Registration failed"
    );
  }
});

export const loginUser = createAsyncThunk<
  AuthResponse,
  { email: string; password: string }
>("auth/login", async (userData, { rejectWithValue }) => {
  try {
    const response = await axiosInstance.post("/auth/login", userData, {
      withCredentials: true,
    });
    const { accessToken, user } = response.data.data;
    setAuthHeader(accessToken);
    return { accessToken, user };
  } catch (error: any) {
    return rejectWithValue(error.response?.data.message || "Login failed");
  }
});

export const logOut = createAsyncThunk(
  "auth/logout",
  async (_, { rejectWithValue }) => {
    try {
      await axiosInstance.post("/auth/logout");
      clearAuthHeader();
    } catch (error: any) {
      return rejectWithValue(error.response?.data.message || "Logout failed");
    }
  }
);

export const refreshUser = createAsyncThunk<
  { accessToken: string; user: User | null },
  void,
  { state: RootState }
>("auth/refresh", async (_, { getState, rejectWithValue }) => {
  const token = getState().auth.token;
  if (!token) return rejectWithValue("No token available");

  try {
    const response = await axiosInstance.post(
      "/auth/refresh",
      {},
      { withCredentials: true }
    );
    const { accessToken } = response.data.data;
    setAuthHeader(accessToken);

    const user = JSON.parse(localStorage.getItem("user") || "null");

    return { accessToken, user };
  } catch (error: any) {
    return rejectWithValue(
      error.response?.data.message || "Session refresh failed"
    );
  }
});

export const requestResetToken = createAsyncThunk(
  "auth/requestResetToken",
  async (email: string, thunkAPI) => {
    try {
      const response = await axiosInstance.post("/auth/send-reset-email", {
        email,
      });
      return response.data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(
        error.response?.data.message || "Failed to send reset email"
      );
    }
  }
);
