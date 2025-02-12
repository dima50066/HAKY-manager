import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance, { setAuthHeader } from "../../hooks/axiosConfig";

export const fetchDocuments = createAsyncThunk(
  "documents/fetchDocuments",
  async (_, { getState }) => {
    const token = (getState() as any).auth.token;
    setAuthHeader(token);

    const response = await axiosInstance.get("/profile/documents");
    return response.data.data;
  }
);

export const uploadDocument = createAsyncThunk(
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

export const deleteDocument = createAsyncThunk(
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
