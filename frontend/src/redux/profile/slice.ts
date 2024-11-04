import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { fetchUserProfile, updateUserProfile } from './operations';
import { IUser } from '../../types';

interface ProfileState {
  user: IUser | null;
  loading: boolean;
  error: string | null;

}

const initialState: ProfileState = {
  user: null,
  loading: false,
  error: null,
};

const profileSlice = createSlice({
  name: 'profile',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserProfile.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUserProfile.fulfilled, (state, action: PayloadAction<IUser>) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(fetchUserProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to load user profile';
      })
      .addCase(updateUserProfile.fulfilled, (state, action: PayloadAction<IUser>) => {
        state.user = action.payload;
      });
  },
});

export default profileSlice.reducer;
