import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../hooks/axiosConfig";

export const fetchEmployees = createAsyncThunk(
  "employees/fetchAll",
  async () => {
    const response = await axiosInstance.get("/coordinator/employees");
    return response.data.data;
  }
);

export const fetchEmployeeById = createAsyncThunk(
  "employees/fetchById",
  async (profileId: string) => {
    const response = await axiosInstance.get(
      `/coordinator/employees/${profileId}`
    );
    return response.data.data;
  }
);

export const updateEmployee = createAsyncThunk(
  "employees/update",
  async ({ profileId, updates }: { profileId: string; updates: any }) => {
    const response = await axiosInstance.put(
      `/coordinator/employees/${profileId}`,
      updates
    );
    return response.data.data;
  }
);

export const deleteEmployee = createAsyncThunk(
  "employees/delete",
  async (profileId: string) => {
    await axiosInstance.delete(`/coordinator/employees/${profileId}`);
    return profileId;
  }
);
