import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../hooks/axiosConfig";

export const fetchAllUsers = createAsyncThunk(
  "ranking/fetchAllUsers",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get("ranking/users");
      return response.data.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data || "Failed to fetch users");
    }
  }
);

export const fetchUserHistory = createAsyncThunk(
  "ranking/fetchUserHistory",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get("/ranking/me");
      return response.data.data;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data || "Failed to fetch user history"
      );
    }
  }
);

export const fetchDepartmentRanking = createAsyncThunk(
  "ranking/fetchDepartmentRanking",
  async (
    {
      departmentId,
      date,
      month,
      allTime,
    }: {
      departmentId: string;
      date?: string;
      month?: string;
      allTime?: boolean;
    },
    { rejectWithValue }
  ) => {
    try {
      const response = await axiosInstance.get("/ranking/department", {
        params: { departmentId, date, month, allTime },
      });
      return response.data.data;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data || "Failed to fetch department ranking"
      );
    }
  }
);

export const fetchDailyRanking = createAsyncThunk(
  "ranking/fetchDailyRanking",
  async (date: string, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get("/ranking/daily", {
        params: { date },
      });
      return response.data.data;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data || "Failed to fetch daily ranking"
      );
    }
  }
);
