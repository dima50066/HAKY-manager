import { createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from '../../hooks/axiosConfig';
import { RootState } from '../store';
import { ProductivityData } from '../../types';
import { selectProfile } from '../profile/selectors';

export const fetchProductivityRecords = createAsyncThunk(
  'productivity/fetchAll',
  async () => {
    const response = await axiosInstance.get('/productivity');
    return response.data.data;
  }
);

export const addProductivityRecord = createAsyncThunk(
  'productivity/add',
  async (recordData: Partial<ProductivityData>, { getState, rejectWithValue }) => {
    const state = getState() as RootState;
    const profile = selectProfile(state);

    if (!profile) {
      return rejectWithValue('User profile is not available');
    }

    const { user: userId, isStudent, productivity } = profile;
    const completeData = { ...recordData, userId, isStudent, productivityLevel: productivity };

    const response = await axiosInstance.post('/productivity', completeData);
    return response.data.data;
  }
);

export const updateProductivityRecord = createAsyncThunk(
  'productivity/update',
  async ({ id, data }: { id: string; data: Partial<ProductivityData> }, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.put(`/productivity/${id}`, data);
      return response.data.data;
    } catch (error) {
      return rejectWithValue('Failed to update record');
    }
  }
);

export const deleteProductivityRecord = createAsyncThunk(
  'productivity/delete',
  async (id: string, { getState, rejectWithValue }) => {
    const state = getState() as RootState;
    const profile = selectProfile(state);

    if (!profile) {
      return rejectWithValue('User profile is not available');
    }

    await axiosInstance.delete(`/productivity/${id}`);
    return id;
  }
);
