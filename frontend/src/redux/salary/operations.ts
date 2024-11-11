import { createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from '../../hooks/axiosConfig';
import { Salary } from '../../types';

export const calculateUserSalary = createAsyncThunk(
  'salary/calculateUserSalary',
  async ({ userId }: { userId: string }, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post(`/salary/calculate`, { userId });
      return response.data.data as Salary;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Error calculating salary');
    }
  }
);

export const fetchSalaryHistory = createAsyncThunk(
  'salary/fetchSalaryHistory',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get(`/salary/history`);
      return response.data.data as Salary[];
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Error fetching salary history');
    }
  }
);

export const updateUserSalary = createAsyncThunk(
  'salary/updateUserSalary',
  async ({ userId, recordId, additionalHours }: { userId: string; recordId: string; additionalHours: number }, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.put(`/salary/update`, { userId, recordId, additionalHours });
      return response.data.data as Salary;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Error updating salary record');
    }
  }
);
