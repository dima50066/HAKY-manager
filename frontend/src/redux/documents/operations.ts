import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance, { setAuthHeader } from "../../hooks/axiosConfig";
import { Document } from "../../types";

export const fetchMyDocuments = createAsyncThunk(
  "documents/fetchDocuments",
  async (_, { getState }) => {
    const token = (getState() as any).auth.token;
    setAuthHeader(token);

    const response = await axiosInstance.get("/profile/documents");
    return response.data.data;
  }
);

export const fetchDocumentsById = createAsyncThunk<Document[], string>(
  "documents/fetchById",
  async (profileId) => {
    const response = await axiosInstance.get(
      `/coordinator/employees/${profileId}/documents`
    );
    return response.data.data;
  }
);

export const uploadMyDocument = createAsyncThunk(
  "documents/uploadDocument",
  async (formData: FormData, { getState }) => {
    const token = (getState() as any).auth.token;
    setAuthHeader(token);

    const response = await axiosInstance.post(
      "/profile/documents/upload",
      formData
    );
    return response.data.data;
  }
);

export const uploadDocumentById = createAsyncThunk<
  Document,
  { profileId: string; file: FormData }
>("documents/uploadById", async ({ profileId, file }) => {
  const response = await axiosInstance.post(
    `/coordinator/employees/${profileId}/documents`,
    file,
    {
      headers: { "Content-Type": "multipart/form-data" },
    }
  );
  return response.data.data;
});

export const deleteMyDocument = createAsyncThunk(
  "documents/deleteDocument",
  async (documentName: string, { getState }) => {
    const token = (getState() as any).auth.token;
    setAuthHeader(token);

    await axiosInstance.delete("/profile/documents", {
      data: { documentName },
    });
    return documentName;
  }
);

export const deleteDocumentById = createAsyncThunk<
  string,
  { profileId: string; documentName: string }
>("documents/deleteById", async ({ profileId, documentName }) => {
  await axiosInstance.delete(`/coordinator/employees/${profileId}/documents`, {
    data: { documentName },
  });
  return documentName;
});

export const getDocumentPreview = createAsyncThunk(
  "documents/getDocumentPreview",
  async (documentName: string, { getState }) => {
    const token = (getState() as any).auth.token;
    setAuthHeader(token);

    const response = await axiosInstance.get(
      `/profile/documents/preview/${documentName}`
    );
    return response.data.data.previewLink;
  }
);

export const getDocumentPreviewById = createAsyncThunk<
  string,
  { profileId: string; documentName: string }
>("documents/getDocumentPreviewById", async ({ profileId, documentName }) => {
  const response = await axiosInstance.get(
    `/coordinator/employees/${profileId}/documents/preview/${documentName}`
  );
  return response.data.data.previewLink;
});
