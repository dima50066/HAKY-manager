import { createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from '../../hooks/axiosConfig';

export const fetchDepartments = createAsyncThunk(
  'departments/fetchAll',
  async () => {
    const response = await axiosInstance.get('/departments');
    return response.data;
  }
);
