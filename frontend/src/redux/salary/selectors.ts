import { RootState } from "../store";
import { Salary } from "../../types";

export const selectMySalaryHistory = (state: RootState): Salary[] =>
  state.salary.mySalaryHistory;

export const selectLatestMySalary = (state: RootState): Salary | null =>
  state.salary.mySalaryHistory.length > 0
    ? state.salary.mySalaryHistory[state.salary.mySalaryHistory.length - 1]
    : null;

export const selectMySalaryHistoryLoading = (state: RootState): boolean =>
  state.salary.loading.mySalaryHistory;

export const selectMySalaryHistoryError = (state: RootState): string | null =>
  state.salary.error.mySalaryHistory;

export const selectSalaryHistoryById =
  (profileId: string) =>
  (state: RootState): Salary[] =>
    state.salary.salaryHistoryById[profileId] || [];

export const selectSalaryHistoryByIdLoading =
  (profileId: string) =>
  (state: RootState): boolean =>
    state.salary.loading.salaryHistoryById[profileId] || false;

export const selectSalaryHistoryByIdError =
  (profileId: string) =>
  (state: RootState): string | null =>
    state.salary.error.salaryHistoryById[profileId] || null;

export const selectSalaryRecord = (state: RootState): Salary | null =>
  state.salary.salaryRecord;

export const selectUpdateSalaryLoading = (state: RootState): boolean =>
  state.salary.loading.update;
export const selectUpdateSalaryError = (state: RootState): string | null =>
  state.salary.error.update;

export const selectCalculateSalaryLoading = (state: RootState): boolean =>
  state.salary.loading.calculate;
export const selectCalculateSalaryError = (state: RootState): string | null =>
  state.salary.error.calculate;
