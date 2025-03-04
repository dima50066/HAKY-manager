import { RootState } from "../store";

export const selectRequests = (state: RootState) => state.requests.requests;
export const selectLoading = (state: RootState) => state.requests.loading;
export const selectError = (state: RootState) => state.requests.error;
