import { RootState } from '../store';

export const selectProductivityRecords = (state: RootState) => state.productivity.records;
export const selectProductivityLoading = (state: RootState) => state.productivity.loading;
export const selectProductivityError = (state: RootState) => state.productivity.error;
