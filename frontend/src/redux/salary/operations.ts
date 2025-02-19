import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../hooks/axiosConfig";
import { Salary } from "../../types";

export const fetchSalaryHistoryById = createAsyncThunk<Salary[], string>(
  "salary/fetchHistoryById",
  async (profileId, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get(
        `/coordinator/employees/${profileId}/salary`
      );
      return response.data.data;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || "Error fetching salary history"
      );
    }
  }
);

export const fetchMySalaryHistory = createAsyncThunk(
  "salary/fetchMySalaryHistory",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get(`/salary/history`);
      return response.data.data as Salary[];
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || "Error fetching salary history"
      );
    }
  }
);

export const updateSalaryById = createAsyncThunk<
  Salary,
  { profileId: string; salaryUpdate: Partial<Salary> }
>(
  "salary/updateById",
  async ({ profileId, salaryUpdate }, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.put(
        `/coordinator/employees/${profileId}/salary`,
        salaryUpdate
      );
      return response.data.data;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || "Error updating salary record"
      );
    }
  }
);

export const updateUserSalary = createAsyncThunk<
  Salary,
  { userId: string; recordId: string; additionalHours: number }
>(
  "salary/updateUserSalary",
  async ({ userId, recordId, additionalHours }, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.put(`/salary/update`, {
        userId,
        recordId,
        additionalHours,
      });
      return response.data.data;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || "Error updating salary record"
      );
    }
  }
);

export const calculateUserSalary = createAsyncThunk<Salary, { userId: string }>(
  "salary/calculateUserSalary",
  async ({ userId }, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post(`/salary/calculate`, {
        userId,
      });
      return response.data.data;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || "Error calculating salary"
      );
    }
  }
);
