import { RootState } from "../store";

// === ALL ===
export const selectEmployees = (state: RootState) => state.employees.employees;
export const selectEmployeesLoading = (state: RootState) =>
  state.employees.loading.fetchAll;
export const selectEmployeesError = (state: RootState) =>
  state.employees.error.fetchAll;

// === ID ===
export const selectSelectedEmployee = (state: RootState) =>
  state.employees.selectedEmployee;
export const selectEmployeeById = (profileId: string) => (state: RootState) =>
  state.employees.employees.find((employee) => employee._id === profileId);

export const selectEmployeeByIdLoading = (state: RootState) =>
  state.employees.loading.fetchById;
export const selectEmployeeByIdError = (state: RootState) =>
  state.employees.error.fetchById;

// === UPDATE ===
export const selectUpdateEmployeeLoading = (state: RootState) =>
  state.employees.loading.update;
export const selectUpdateEmployeeError = (state: RootState) =>
  state.employees.error.update;

export const selectDeleteEmployeeLoading = (state: RootState) =>
  state.employees.loading.delete;
export const selectDeleteEmployeeError = (state: RootState) =>
  state.employees.error.delete;
