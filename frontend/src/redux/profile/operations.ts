import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance, { setAuthHeader } from "../../hooks/axiosConfig";

export const createProfile = createAsyncThunk(
  "profile/createProfile",
  async (profileData: FormData | any, { getState }) => {
    const token = (getState() as any).auth.token;
    setAuthHeader(token);

    const headers =
      profileData instanceof FormData
        ? {}
        : { "Content-Type": "application/json" };

    const response = await axiosInstance.post("/profile/create", profileData, {
      headers,
    });
    return response.data.data;
  }
);

export const getProfile = createAsyncThunk(
  "profile/getProfile",
  async (_, { getState }) => {
    const token = (getState() as any).auth.token;
    setAuthHeader(token);

    const response = await axiosInstance.get("/profile");
    return response.data.data;
  }
);

export const updateProfile = createAsyncThunk(
  "profile/updateProfile",
  async (profileData: FormData | any, { getState }) => {
    const token = (getState() as any).auth.token;
    setAuthHeader(token);

    const response = await axiosInstance.put("/profile/update", profileData);
    return response.data.data;
  }
);
