import { RootState } from "../store";

export const selectMyProductivityRecords = (state: RootState) =>
  state.productivity.myRecords;
export const selectMyProductivityLoading = (state: RootState) =>
  state.productivity.loading.myRecords;
export const selectMyProductivityError = (state: RootState) =>
  state.productivity.error.myRecords;

export const selectProductivityById =
  (profileId: string) => (state: RootState) =>
    state.productivity.recordsById[profileId] || [];

export const selectProductivityByIdLoading =
  (profileId: string) => (state: RootState) =>
    state.productivity.loading.recordsById[profileId] || false;

export const selectProductivityByIdError =
  (profileId: string) => (state: RootState) =>
    state.productivity.error.recordsById[profileId] || null;

export const selectAddProductivityLoading = (state: RootState) =>
  state.productivity.loading.add;
export const selectAddProductivityError = (state: RootState) =>
  state.productivity.error.add;

export const selectUpdateProductivityLoading = (state: RootState) =>
  state.productivity.loading.update;
export const selectUpdateProductivityError = (state: RootState) =>
  state.productivity.error.update;

export const selectDeleteProductivityLoading = (state: RootState) =>
  state.productivity.loading.delete;
export const selectDeleteProductivityError = (state: RootState) =>
  state.productivity.error.delete;
