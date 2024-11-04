import { createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance, { setAuthHeader, clearAuthHeader, axiosWithToken } from '../../hooks/axiosConfig';
import { RootState } from '../store';

export const registerUser = createAsyncThunk('auth/register', async (userData: { email: string; password: string; }) => {
    const response = await axiosInstance.post('/auth/register', userData);
    const { token } = response.data.data;
    setAuthHeader(token);
    return response.data.data;
});

export const loginUser = createAsyncThunk('auth/login', async (userData: { email: string; password: string; }) => {
    const response = await axiosInstance.post('/auth/login', userData, { withCredentials: true });
    const { token } = response.data.data;
    setAuthHeader(token);
    return response.data.data;
});

export const logOut = createAsyncThunk('auth/logout', async () => {
    await axiosInstance.post('/auth/logout');
    clearAuthHeader();
});

export const refreshUser = createAsyncThunk('auth/refresh', async (_, thunkAPI) => {
    const persistedToken = (thunkAPI.getState() as RootState).auth.token;
    if (!persistedToken) return thunkAPI.rejectWithValue('Unable to fetch user');

    try {
        const axios = axiosWithToken(persistedToken);
        const response = await axios.post('/auth/refresh', {}, { withCredentials: true });
        const { accessToken } = response.data.data;

        // Оновлюємо токен в заголовках для наступних запитів
        setAuthHeader(accessToken);

        return response.data.data;
    } catch (error: any) {
        clearAuthHeader();
        return thunkAPI.rejectWithValue(error.response?.data.message || error.message);
    }
});

export const requestResetToken = createAsyncThunk(
  'auth/requestResetToken',
  async (email: string, thunkAPI) => {
    try {
      const response = await axiosInstance.post('/auth/send-reset-email', { email });
      return response.data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.response?.data.message || 'Failed to send reset email');
    }
  }
);
