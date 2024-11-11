import { RootState } from '../store';

export const selectSalaryRecord = (state: RootState) => state.salary.salaryRecord;
export const selectSalaryHistory = (state: RootState) => state.salary.salaryHistory;
export const selectSalaryLoading = (state: RootState) => state.salary.loading;
export const selectSalaryError = (state: RootState) => state.salary.error;
