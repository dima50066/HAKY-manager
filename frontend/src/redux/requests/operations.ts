import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance, { setAuthHeader } from "../../hooks/axiosConfig";
import { RequestEntry } from "../../types";
import { RootState } from "../store";

export const fetchRequests = createAsyncThunk<
  RequestEntry[],
  void,
  { rejectValue: string }
>("requests/fetchRequests", async (_, { getState, rejectWithValue }) => {
  const token = (getState() as RootState).auth.token;
  if (!token) return rejectWithValue("No auth token available");

  setAuthHeader(token);

  try {
    const response = await axiosInstance.get("/calendar/requests");
    return response.data.data;
  } catch (error: any) {
    return rejectWithValue(
      error.response?.data?.message || "Failed to fetch requests"
    );
  }
});

export const createRequest = createAsyncThunk<
  RequestEntry,
  { type: "vacation" | "day-off" | "work-day"; date: string; endDate?: string },
  { rejectValue: string }
>(
  "requests/createRequest",
  async (requestData, { getState, rejectWithValue }) => {
    try {
      const response = await axiosInstance.post(
        "/calendar/request",
        requestData
      );
      return response.data.data;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to create request"
      );
    }
  }
);

export const respondToRequest = createAsyncThunk<
  RequestEntry,
  string,
  { rejectValue: string }
>(
  "requests/respondToRequest",
  async (requestId, { getState, rejectWithValue }) => {
    const token = (getState() as RootState).auth.token;
    if (!token) return rejectWithValue("No auth token available");

    setAuthHeader(token);

    try {
      const response = await axiosInstance.post(
        `/calendar/respond/${requestId}`
      );
      return response.data.data;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to respond to request"
      );
    }
  }
);

export const confirmRequest = createAsyncThunk<
  RequestEntry,
  string,
  { rejectValue: string }
>(
  "requests/confirmRequest",
  async (requestId, { getState, rejectWithValue }) => {
    const token = (getState() as RootState).auth.token;
    if (!token) return rejectWithValue("No auth token available");

    setAuthHeader(token);
    try {
      const response = await axiosInstance.post(
        `/calendar/confirm/${requestId}`
      );
      return response.data.data;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to confirm request"
      );
    }
  }
);

export const declineRequest = createAsyncThunk<
  RequestEntry,
  string,
  { rejectValue: string }
>(
  "requests/declineRequest",
  async (requestId, { getState, rejectWithValue }) => {
    const token = (getState() as RootState).auth.token;
    if (!token) return rejectWithValue("No auth token available");

    setAuthHeader(token);

    try {
      const response = await axiosInstance.post(
        `/calendar/decline/${requestId}`
      );
      return response.data.data;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to decline request"
      );
    }
  }
);
