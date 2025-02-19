import { RootState } from "../store";

export const selectMyDocuments = (state: RootState) =>
  state.documents.myDocuments;
export const selectMyDocumentsLoading = (state: RootState) =>
  state.documents.loading.myDocuments;
export const selectMyDocumentsError = (state: RootState) =>
  state.documents.error.myDocuments;

export const selectDocumentsById = (profileId: string) => (state: RootState) =>
  state.documents.documentsById[profileId] || [];

export const selectDocumentsByIdLoading =
  (profileId: string) => (state: RootState) =>
    state.documents.loading.documentsById[profileId] || false;

export const selectDocumentsByIdError =
  (profileId: string) => (state: RootState) =>
    state.documents.error.documentsById[profileId] || null;
