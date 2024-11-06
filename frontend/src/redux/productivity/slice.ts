import { createSlice } from '@reduxjs/toolkit';
import { fetchProductivityRecords, addProductivityRecord } from './operations';
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
        state.error = action.error.message || 'Error fetching records';
      })
      .addCase(addProductivityRecord.pending, (state) => {
        state.loading = true;
      })
      .addCase(addProductivityRecord.fulfilled, (state, action) => {
        state.loading = false;
        state.records.push(action.payload);
      })
      .addCase(addProductivityRecord.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Error adding productivity record';
      });
  },
});

export default productivitySlice.reducer;
