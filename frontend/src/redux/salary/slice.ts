import { createSlice } from "@reduxjs/toolkit";
import { Salary } from "../../types";
import {
  fetchSalaryHistoryById,
  fetchMySalaryHistory,
  updateSalaryById,
  calculateUserSalary,
  updateUserSalary,
} from "./operations";

interface SalaryState {
  mySalaryHistory: Salary[];
  salaryHistoryById: Record<string, Salary[]>;
  salaryRecord: Salary | null;
  loading: {
    mySalaryHistory: boolean;
    salaryHistoryById: Record<string, boolean>;
    update: boolean;
    calculate: boolean;
  };
  error: {
    mySalaryHistory: string | null;
    salaryHistoryById: Record<string, string | null>;
    update: string | null;
    calculate: string | null;
  };
}

const initialState: SalaryState = {
  mySalaryHistory: [],
  salaryHistoryById: {},
  salaryRecord: null,
  loading: {
    mySalaryHistory: false,
    salaryHistoryById: {},
    update: false,
    calculate: false,
  },
  error: {
    mySalaryHistory: null,
    salaryHistoryById: {},
    update: null,
    calculate: null,
  },
};

const salarySlice = createSlice({
  name: "salary",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchMySalaryHistory.pending, (state) => {
        state.loading.mySalaryHistory = true;
        state.error.mySalaryHistory = null;
      })
      .addCase(fetchMySalaryHistory.fulfilled, (state, action) => {
        state.loading.mySalaryHistory = false;
        state.mySalaryHistory = action.payload;
      })
      .addCase(fetchMySalaryHistory.rejected, (state, action) => {
        state.loading.mySalaryHistory = false;
        state.error.mySalaryHistory = action.payload as string;
      })

      .addCase(fetchSalaryHistoryById.pending, (state, action) => {
        const profileId = action.meta.arg;
        state.loading.salaryHistoryById[profileId] = true;
        state.error.salaryHistoryById[profileId] = null;
      })
      .addCase(fetchSalaryHistoryById.fulfilled, (state, action) => {
        const profileId = action.meta.arg;
        state.loading.salaryHistoryById[profileId] = false;
        state.salaryHistoryById[profileId] = action.payload;
      })
      .addCase(fetchSalaryHistoryById.rejected, (state, action) => {
        const profileId = action.meta.arg;
        state.loading.salaryHistoryById[profileId] = false;
        state.error.salaryHistoryById[profileId] = action.payload as string;
      })

      .addCase(updateSalaryById.pending, (state) => {
        state.loading.update = true;
        state.error.update = null;
      })
      .addCase(updateSalaryById.fulfilled, (state, action) => {
        state.loading.update = false;
        const profileId = action.meta.arg.profileId;
        if (state.salaryHistoryById[profileId]) {
          state.salaryHistoryById[profileId] = state.salaryHistoryById[
            profileId
          ].map((s) => (s._id === action.payload._id ? action.payload : s));
        }
      })
      .addCase(updateSalaryById.rejected, (state, action) => {
        state.loading.update = false;
        state.error.update = action.payload as string;
      })

      .addCase(updateUserSalary.pending, (state) => {
        state.loading.update = true;
        state.error.update = null;
      })
      .addCase(updateUserSalary.fulfilled, (state, action) => {
        state.loading.update = false;
        state.mySalaryHistory = state.mySalaryHistory.map((record) =>
          record._id === action.payload._id ? action.payload : record
        );
      })
      .addCase(updateUserSalary.rejected, (state, action) => {
        state.loading.update = false;
        state.error.update = action.payload as string;
      })

      .addCase(calculateUserSalary.pending, (state) => {
        state.loading.calculate = true;
        state.error.calculate = null;
      })
      .addCase(calculateUserSalary.fulfilled, (state, action) => {
        state.loading.calculate = false;
        state.salaryRecord = action.payload;
      })
      .addCase(calculateUserSalary.rejected, (state, action) => {
        state.loading.calculate = false;
        state.error.calculate = action.payload as string;
      });
  },
});

export default salarySlice.reducer;
