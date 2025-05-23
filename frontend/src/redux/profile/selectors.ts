import { RootState } from "../store";
import { Profile } from "../../types";

export const selectProfile = (state: RootState): Profile | null =>
  state.profile.profile;
export const selectProfileLoading = (state: RootState): boolean =>
  state.profile.loading;
export const selectProfileError = (
  state: RootState
): { status: number; message: string } | null => state.profile.error;
export const selectLanguage = (state: RootState): string =>
  state.profile.profile?.language || "en";
