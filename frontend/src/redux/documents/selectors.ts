import { RootState } from "../store";

export const selectDocuments = (state: RootState) => state.documents.documents;
export const selectDocumentsLoading = (state: RootState) =>
  state.documents.loading;
export const selectDocumentsError = (state: RootState) => state.documents.error;
