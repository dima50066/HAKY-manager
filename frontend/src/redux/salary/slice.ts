import { createSlice } from '@reduxjs/toolkit';
import { Salary } from '../../types';
import { calculateUserSalary, fetchSalaryHistory, updateUserSalary } from './operations';

interface SalaryState {
  salaryRecord: Salary | null;
  salaryHistory: Salary[];
  loading: boolean;
  error: string | null;
}

const initialState: SalaryState = {
  salaryRecord: null,
  salaryHistory: [],
  loading: false,
  error: null,
};

const salarySlice = createSlice({
  name: 'salary',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(calculateUserSalary.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(calculateUserSalary.fulfilled, (state, action) => {
        state.salaryRecord = action.payload;
        state.loading = false;
      })
      .addCase(calculateUserSalary.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(fetchSalaryHistory.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchSalaryHistory.fulfilled, (state, action) => {
        state.salaryHistory = action.payload;
        state.loading = false;
      })
      .addCase(fetchSalaryHistory.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(updateUserSalary.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateUserSalary.fulfilled, (state, action) => {
        state.salaryHistory = state.salaryHistory.map((record) =>
          record._id === action.payload._id ? action.payload : record
        );
        state.loading = false;
      })
      .addCase(updateUserSalary.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default salarySlice.reducer;
