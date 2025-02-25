import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  fetchAllProductivityRecords,
  fetchProductivityById,
  addMyProductivityRecord,
  updateMyProductivityRecord,
  deleteMyProductivityRecord,
  fetchMyProductivityRecords,
} from "./operations";
import { ProductivityRecord } from "../../types";

interface ProductivityState {
  allRecords: ProductivityRecord[];
  myRecords: ProductivityRecord[];
  recordsById: Record<string, ProductivityRecord[]>;
  selectedDepartment: string;
  selectedDate: string;
  loading: {
    allRecords: boolean;
    myRecords: boolean;
    recordsById: Record<string, boolean>;
    add: boolean;
    update: boolean;
    delete: boolean;
  };
  error: {
    allRecords: string | null;
    myRecords: string | null;
    recordsById: Record<string, string | null>;
    add: string | null;
    update: string | null;
    delete: string | null;
  };
}

const initialState: ProductivityState = {
  allRecords: [],
  myRecords: [],
  recordsById: {},
  selectedDepartment: "",
  selectedDate: "",
  loading: {
    allRecords: false,
    myRecords: false,
    recordsById: {},
    add: false,
    update: false,
    delete: false,
  },
  error: {
    allRecords: null,
    myRecords: null,
    recordsById: {},
    add: null,
    update: null,
    delete: null,
  },
};

const productivitySlice = createSlice({
  name: "productivity",
  initialState,
  reducers: {
    setSelectedDepartment(state, action: PayloadAction<string>) {
      state.selectedDepartment = action.payload;
    },
    setSelectedDate(state, action: PayloadAction<string>) {
      state.selectedDate = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllProductivityRecords.pending, (state) => {
        state.loading.allRecords = true;
        state.error.allRecords = null;
      })
      .addCase(fetchAllProductivityRecords.fulfilled, (state, action) => {
        state.loading.allRecords = false;
        state.allRecords = action.payload;
      })
      .addCase(fetchAllProductivityRecords.rejected, (state, action) => {
        state.loading.allRecords = false;
        state.error.allRecords =
          action.error.message || "Error fetching records";
      })

      .addCase(fetchProductivityById.pending, (state, action) => {
        const userId = action.meta.arg.userId;
        state.loading.recordsById[userId] = true;
        state.error.recordsById[userId] = null;
      })
      .addCase(fetchProductivityById.fulfilled, (state, action) => {
        const userId = action.meta.arg.userId;
        state.loading.recordsById[userId] = false;
        state.recordsById[userId] = action.payload;
      })
      .addCase(fetchProductivityById.rejected, (state, action) => {
        const userId = action.meta.arg.userId;
        state.loading.recordsById[userId] = false;
        state.error.recordsById[userId] =
          action.error.message || "Error fetching records";
      })

      .addCase(addMyProductivityRecord.pending, (state) => {
        state.loading.add = true;
        state.error.add = null;
      })
      .addCase(addMyProductivityRecord.fulfilled, (state, action) => {
        state.loading.add = false;
        state.myRecords.push(action.payload);
      })
      .addCase(addMyProductivityRecord.rejected, (state, action) => {
        state.loading.add = false;
        state.error.add = action.error.message || "Error adding record";
      })

      .addCase(updateMyProductivityRecord.pending, (state) => {
        state.loading.update = true;
        state.error.update = null;
      })
      .addCase(updateMyProductivityRecord.fulfilled, (state, action) => {
        state.loading.update = false;
        const index = state.myRecords.findIndex(
          (record) => record._id === action.payload._id
        );
        if (index !== -1) state.myRecords[index] = action.payload;
      })
      .addCase(updateMyProductivityRecord.rejected, (state, action) => {
        state.loading.update = false;
        state.error.update = action.error.message || "Error updating record";
      })

      .addCase(deleteMyProductivityRecord.pending, (state) => {
        state.loading.delete = true;
        state.error.delete = null;
      })
      .addCase(deleteMyProductivityRecord.fulfilled, (state, action) => {
        state.loading.delete = false;
        state.myRecords = state.myRecords.filter(
          (record) => record._id !== action.payload
        );
      })
      .addCase(deleteMyProductivityRecord.rejected, (state, action) => {
        state.loading.delete = false;
        state.error.delete = action.error.message || "Error deleting record";
      });
    builder
      .addCase(fetchMyProductivityRecords.pending, (state) => {
        state.loading.myRecords = true;
        state.error.myRecords = null;
      })
      .addCase(fetchMyProductivityRecords.fulfilled, (state, action) => {
        state.loading.myRecords = false;
        state.myRecords = action.payload;
      })
      .addCase(fetchMyProductivityRecords.rejected, (state, action) => {
        state.loading.myRecords = false;
        state.error.myRecords =
          action.error.message || "Error fetching my records";
      });
  },
});

export const { setSelectedDepartment, setSelectedDate } =
  productivitySlice.actions;
export default productivitySlice.reducer;
