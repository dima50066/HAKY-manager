import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { loginUser, logOut, refreshUser, registerUser } from "./operations";
import { User } from "../../types";

export interface AuthState {
  user: User | null;
  token: string | null;
  isLoading: boolean;
  error: string | null;
  isAuthenticated: boolean;
  userLoading: boolean;
}

const initialState: AuthState = {
  user: null,
  token: null,
  isLoading: false,
  error: null,
  isAuthenticated: false,
  userLoading: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    clearAuthState: (state) => {
      state.user = null;
      state.token = null;
      state.isAuthenticated = false;
      state.isLoading = false;
      state.error = null;
      localStorage.removeItem("token");
      localStorage.removeItem("user");
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload;
        state.isAuthenticated = true;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || "Registration failed";
      })

      // Login
      .addCase(loginUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
        state.userLoading = true;
      })
      .addCase(
        loginUser.fulfilled,
        (state, action: PayloadAction<{ accessToken: string; user: User }>) => {
          state.isLoading = false;
          state.user = action.payload.user;
          state.token = action.payload.accessToken;
          state.isAuthenticated = true;
          localStorage.setItem("token", action.payload.accessToken);
          localStorage.setItem("user", JSON.stringify(action.payload.user));
          state.userLoading = false;
        }
      )
      .addCase(loginUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || "Login failed";
        state.userLoading = false;
      })

      // Logout
      .addCase(logOut.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(logOut.fulfilled, (state) => {
        state.isLoading = false;
        state.user = null;
        state.token = null;
        state.isAuthenticated = false;
        state.error = null;
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        localStorage.removeItem("persist:root");
      })
      .addCase(logOut.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || "Logout failed";
      })

      // Refresh Token
      .addCase(refreshUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
        state.userLoading = true;
      })
      .addCase(
        refreshUser.fulfilled,
        (
          state,
          action: PayloadAction<{ accessToken: string; user: User | null }>
        ) => {
          state.isLoading = false;
          state.token = action.payload.accessToken;
          state.user = action.payload.user;
          state.isAuthenticated = true;
          localStorage.setItem("token", action.payload.accessToken);
          state.userLoading = false;
        }
      )

      .addCase(refreshUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || "Token refresh failed";
        state.isAuthenticated = false;
        state.user = null;
        state.token = null;
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        state.userLoading = false;
      });
  },
});

export const { clearAuthState } = authSlice.actions;
export default authSlice.reducer;
