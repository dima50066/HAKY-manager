import { RootState } from "../store";
import { Profile } from "../../types";

export const selectProfile = (state: RootState): Profile | null =>
  state.profile.profile;
export const selectProfileLoading = (state: RootState) => state.profile.loading;
export const selectProfileError = (state: RootState) => state.profile.error;
export const selectLanguage = (state: RootState) =>
  state.profile.profile?.language || "en";
