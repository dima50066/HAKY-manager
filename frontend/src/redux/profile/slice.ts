import { createSlice } from "@reduxjs/toolkit";
import {
  createProfile,
  getProfile,
  updateProfile,
  updateLanguage,
} from "./operations";

interface ProfileState {
  profile: any;
  loading: boolean;
  error: { status: number; message: string } | null;
}

const initialState: ProfileState = {
  profile: null,
  loading: false,
  error: null,
};

const profileSlice = createSlice({
  name: "profile",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createProfile.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createProfile.fulfilled, (state, action) => {
        state.profile = action.payload;
        state.loading = false;
      })
      .addCase(createProfile.rejected, (state, action) => {
        state.error = {
          status: 500,
          message: action.error.message || "An error occurred",
        };
        state.loading = false;
      })
      .addCase(getProfile.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getProfile.fulfilled, (state, action) => {
        state.profile = action.payload;
        state.loading = false;
      })
      .addCase(getProfile.rejected, (state, action) => {
        if (action.payload && typeof action.payload === "object") {
          state.error = action.payload as { status: number; message: string };
        } else {
          state.error = { status: 500, message: "Could not retrieve profile" };
        }
        state.loading = false;
      })
      .addCase(updateProfile.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateProfile.fulfilled, (state, action) => {
        state.profile = action.payload;
        state.loading = false;
      })
      .addCase(updateProfile.rejected, (state, action) => {
        state.error = {
          status: 500,
          message: action.error.message || "An error occurred",
        };
        state.loading = false;
      })
      .addCase(updateLanguage.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateLanguage.fulfilled, (state, action) => {
        if (state.profile) {
          state.profile.language = action.payload.language;
        }
        state.loading = false;
      })
      .addCase(updateLanguage.rejected, (state, action) => {
        state.error = {
          status: 500,
          message: action.error.message || "An error occurred",
        };
        state.loading = false;
      });
  },
});

export default profileSlice.reducer;
