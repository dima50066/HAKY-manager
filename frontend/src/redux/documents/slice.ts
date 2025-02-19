import { createSlice } from "@reduxjs/toolkit";
import {
  fetchMyDocuments,
  fetchDocumentsById,
  uploadMyDocument,
  uploadDocumentById,
  deleteMyDocument,
  deleteDocumentById,
} from "./operations";
import { Document } from "../../types";

interface DocumentsState {
  myDocuments: Document[];
  documentsById: Record<string, Document[]>;
  loading: {
    myDocuments: boolean;
    documentsById: Record<string, boolean>;
    upload: boolean;
    delete: boolean;
  };
  error: {
    myDocuments: string | null;
    documentsById: Record<string, string | null>;
    upload: string | null;
    delete: string | null;
  };
}

const initialState: DocumentsState = {
  myDocuments: [],
  documentsById: {},
  loading: {
    myDocuments: false,
    documentsById: {},
    upload: false,
    delete: false,
  },
  error: {
    myDocuments: null,
    documentsById: {},
    upload: null,
    delete: null,
  },
};

const documentsSlice = createSlice({
  name: "documents",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchMyDocuments.pending, (state) => {
        state.loading.myDocuments = true;
        state.error.myDocuments = null;
      })
      .addCase(fetchMyDocuments.fulfilled, (state, action) => {
        state.loading.myDocuments = false;
        state.myDocuments = action.payload;
      })
      .addCase(fetchMyDocuments.rejected, (state, action) => {
        state.loading.myDocuments = false;
        state.error.myDocuments =
          action.error.message || "Error fetching documents";
      })

      .addCase(fetchDocumentsById.pending, (state, action) => {
        const profileId = action.meta.arg;
        state.loading.documentsById[profileId] = true;
        state.error.documentsById[profileId] = null;
      })
      .addCase(fetchDocumentsById.fulfilled, (state, action) => {
        const profileId = action.meta.arg;
        state.loading.documentsById[profileId] = false;
        state.documentsById[profileId] = action.payload;
      })
      .addCase(fetchDocumentsById.rejected, (state, action) => {
        const profileId = action.meta.arg;
        state.loading.documentsById[profileId] = false;
        state.error.documentsById[profileId] =
          action.error.message || "Error fetching documents";
      })

      .addCase(uploadMyDocument.pending, (state) => {
        state.loading.upload = true;
        state.error.upload = null;
      })
      .addCase(uploadMyDocument.fulfilled, (state, action) => {
        state.loading.upload = false;
        state.myDocuments.push(action.payload);
      })
      .addCase(uploadMyDocument.rejected, (state, action) => {
        state.loading.upload = false;
        state.error.upload = action.error.message || "Error uploading document";
      })

      .addCase(uploadDocumentById.pending, (state) => {
        state.loading.upload = true;
        state.error.upload = null;
      })
      .addCase(uploadDocumentById.fulfilled, (state, action) => {
        state.loading.upload = false;
        const profileId = action.meta.arg.profileId;
        if (!state.documentsById[profileId]) {
          state.documentsById[profileId] = [];
        }
        state.documentsById[profileId].push(action.payload);
      })
      .addCase(uploadDocumentById.rejected, (state, action) => {
        state.loading.upload = false;
        state.error.upload = action.error.message || "Error uploading document";
      })

      .addCase(deleteMyDocument.pending, (state) => {
        state.loading.delete = true;
        state.error.delete = null;
      })
      .addCase(deleteMyDocument.fulfilled, (state, action) => {
        state.loading.delete = false;
        state.myDocuments = state.myDocuments.filter(
          (doc) => doc.name !== action.payload
        );
      })
      .addCase(deleteMyDocument.rejected, (state, action) => {
        state.loading.delete = false;
        state.error.delete = action.error.message || "Error deleting document";
      })

      .addCase(deleteDocumentById.pending, (state) => {
        state.loading.delete = true;
        state.error.delete = null;
      })
      .addCase(deleteDocumentById.fulfilled, (state, action) => {
        state.loading.delete = false;
        const profileId = action.meta.arg.profileId;
        if (state.documentsById[profileId]) {
          state.documentsById[profileId] = state.documentsById[
            profileId
          ].filter((doc) => doc.name !== action.payload);
        }
      })
      .addCase(deleteDocumentById.rejected, (state, action) => {
        state.loading.delete = false;
        state.error.delete = action.error.message || "Error deleting document";
      });
  },
});

export default documentsSlice.reducer;
