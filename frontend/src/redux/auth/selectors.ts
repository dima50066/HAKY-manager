import { RootState } from "../store";

export const selectUser = (state: RootState) => state.auth.user;
export const selectToken = (state: RootState) => state.auth.token;
export const selectIsAuthenticated = (state: RootState) =>
  state.auth.isAuthenticated;
export const selectAuthLoading = (state: RootState) => state.auth.isLoading;
export const selectAuthError = (state: RootState) => state.auth.error;
export const selectUserRole = (state: RootState) => state.auth.user?.role;
export const selectUserLoading = (state: RootState) => state.auth.userLoading;

export const selectResetPasswordLoading = (state: RootState) =>
  state.auth.resetPasswordLoading;
export const selectResetPasswordError = (state: RootState) =>
  state.auth.resetPasswordError;
export const selectResetPasswordSuccess = (state: RootState) =>
  state.auth.resetPasswordSuccess;
