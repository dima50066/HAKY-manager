import { RootState } from "../store";

export const selectCalendarEntries = (state: RootState) =>
  state.calendar.entries;
export const selectCalendarLoading = (state: RootState) =>
  state.calendar.loading;
export const selectCalendarError = (state: RootState) => state.calendar.error;
