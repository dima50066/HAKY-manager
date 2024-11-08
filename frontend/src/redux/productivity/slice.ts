import { createSlice } from '@reduxjs/toolkit';
import { fetchProductivityRecords, addProductivityRecord, updateProductivityRecord, deleteProductivityRecord } from './operations';
import { ProductivityRecord } from '../../types';

interface ProductivityState {
  records: ProductivityRecord[];
  loading: boolean;
  error: string | null;
}

const initialState: ProductivityState = {
  records: [],
  loading: false,
  error: null,
};

const productivitySlice = createSlice({
  name: 'productivity',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProductivityRecords.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchProductivityRecords.fulfilled, (state, action) => {
        state.loading = false;
        state.records = action.payload;
      })
      .addCase(fetchProductivityRecords.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch records';
      })
      .addCase(addProductivityRecord.fulfilled, (state, action) => {
        state.records.push(action.payload);
      })
      .addCase(updateProductivityRecord.fulfilled, (state, action) => {
        const index = state.records.findIndex(record => record._id === action.payload._id);
        if (index !== -1) state.records[index] = action.payload;
      })
      .addCase(deleteProductivityRecord.fulfilled, (state, action) => {
        state.records = state.records.filter(record => record._id !== action.payload);
      });
  }
});

export default productivitySlice.reducer;
