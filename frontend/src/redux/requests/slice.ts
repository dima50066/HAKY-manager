import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  fetchRequests,
  createRequest,
  respondToRequest,
  confirmRequest,
  declineRequest,
} from "./operations";
import { RequestEntry } from "../../types";

interface RequestsState {
  requests: RequestEntry[];
  loading: {
    fetch: boolean;
    create: boolean;
    respond: boolean;
    confirm: boolean;
    decline: boolean;
  };
  error: {
    fetch: string | null;
    create: string | null;
    respond: string | null;
    confirm: string | null;
    decline: string | null;
  };
}

const initialState: RequestsState = {
  requests: [],
  loading: {
    fetch: false,
    create: false,
    respond: false,
    confirm: false,
    decline: false,
  },
  error: {
    fetch: null,
    create: null,
    respond: null,
    confirm: null,
    decline: null,
  },
};

const requestsSlice = createSlice({
  name: "requests",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchRequests.pending, (state) => {
        state.loading.fetch = true;
        state.error.fetch = null;
      })
      .addCase(
        fetchRequests.fulfilled,
        (state, action: PayloadAction<RequestEntry[]>) => {
          state.loading.fetch = false;
          state.requests = action.payload;
        }
      )
      .addCase(fetchRequests.rejected, (state, action) => {
        state.loading.fetch = false;
        state.error.fetch = action.error.message || "Failed to fetch requests";
      })

      .addCase(createRequest.pending, (state) => {
        state.loading.create = true;
        state.error.create = null;
      })
      .addCase(
        createRequest.fulfilled,
        (state, action: PayloadAction<RequestEntry>) => {
          state.loading.create = false;
          state.requests.push(action.payload);
        }
      )
      .addCase(createRequest.rejected, (state, action) => {
        state.loading.create = false;
        state.error.create = action.error.message || "Failed to create request";
      })

      .addCase(respondToRequest.pending, (state) => {
        state.loading.respond = true;
        state.error.respond = null;
      })
      .addCase(
        respondToRequest.fulfilled,
        (state, action: PayloadAction<RequestEntry>) => {
          state.loading.respond = false;
          const index = state.requests.findIndex(
            (req) => req._id === action.payload._id
          );
          if (index !== -1) state.requests[index] = action.payload;
        }
      )
      .addCase(respondToRequest.rejected, (state, action) => {
        state.loading.respond = false;
        state.error.respond =
          action.error.message || "Failed to respond to request";
      })

      .addCase(confirmRequest.pending, (state) => {
        state.loading.confirm = true;
        state.error.confirm = null;
      })
      .addCase(
        confirmRequest.fulfilled,
        (state, action: PayloadAction<RequestEntry>) => {
          state.loading.confirm = false;
          const index = state.requests.findIndex(
            (req) => req._id === action.payload._id
          );
          if (index !== -1) state.requests[index] = action.payload;
        }
      )
      .addCase(confirmRequest.rejected, (state, action) => {
        state.loading.confirm = false;
        state.error.confirm =
          action.error.message || "Failed to confirm request";
      })

      .addCase(declineRequest.pending, (state) => {
        state.loading.decline = true;
        state.error.decline = null;
      })
      .addCase(
        declineRequest.fulfilled,
        (state, action: PayloadAction<RequestEntry>) => {
          state.loading.decline = false;
          const index = state.requests.findIndex(
            (req) => req._id === action.payload._id
          );
          if (index !== -1) state.requests[index] = action.payload;
        }
      )
      .addCase(declineRequest.rejected, (state, action) => {
        state.loading.decline = false;
        state.error.decline =
          action.error.message || "Failed to decline request";
      });
  },
});

export default requestsSlice.reducer;
