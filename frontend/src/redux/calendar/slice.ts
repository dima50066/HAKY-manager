import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface CalendarEntry {
  date: string;
  isWorkday: boolean;
}

interface CalendarState {
  entries: CalendarEntry[];
  loading: boolean;
  error: string | null;
}

const initialState: CalendarState = {
  entries: [],
  loading: false,
  error: null,
};

const calendarSlice = createSlice({
  name: "calendar",
  initialState,
  reducers: {
    fetchEntriesStart(state) {
      state.loading = true;
      state.error = null;
    },
    fetchEntriesSuccess(state, action: PayloadAction<CalendarEntry[]>) {
      state.loading = false;
      state.entries = action.payload;
    },
    fetchEntriesFailure(state, action: PayloadAction<string>) {
      state.loading = false;
      state.error = action.payload;
    },
    addOrUpdateEntry(state, action: PayloadAction<CalendarEntry>) {
      const index = state.entries.findIndex(
        (entry) => entry.date === action.payload.date
      );
      if (index >= 0) {
        state.entries[index] = action.payload;
      } else {
        state.entries.push(action.payload);
      }
    },
    deleteEntry(state, action: PayloadAction<string>) {
      state.entries = state.entries.filter(
        (entry) => entry.date !== action.payload
      );
    },
  },
});

export const {
  fetchEntriesStart,
  fetchEntriesSuccess,
  fetchEntriesFailure,
  addOrUpdateEntry,
  deleteEntry,
} = calendarSlice.actions;

export default calendarSlice.reducer;
