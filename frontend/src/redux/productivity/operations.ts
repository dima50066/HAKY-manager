import { createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from '../../hooks/axiosConfig';
import { IProductivityRecord } from '../../types';

export const fetchProductivityRecords = createAsyncThunk<IProductivityRecord[]>(
  'productivity/fetchProductivityRecords',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get('/productivity');
      return response.data.data;
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Оновлення операції додавання запису продуктивності з додаванням `productivityLevel`
export const addProductivityRecord = createAsyncThunk<IProductivityRecord, any>(
  'productivity/addProductivityRecord',
  async (data, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post('/productivity', data);
      return response.data.data;
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  }
);
