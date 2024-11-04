import { createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from '../../hooks/axiosConfig';
import { IUser } from '../../types';

export const fetchUserProfile = createAsyncThunk<IUser>(
  'profile/fetchUserProfile',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get('/profile');
      return response.data.data;
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const updateUserProfile = createAsyncThunk<IUser, FormData>(
  'profile/updateUserProfile',
  async (profileData, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.patch('/profile', profileData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      return response.data.data;
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  }
);
