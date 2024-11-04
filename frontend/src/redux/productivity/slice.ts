import { createSlice } from '@reduxjs/toolkit';
import { fetchProductivityRecords, addProductivityRecord } from './operations';
import { IProductivityRecord } from '../../types';

interface ProductivityState {
  records: IProductivityRecord[];
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
      .addCase(addProductivityRecord.fulfilled, (state, action) => {
        state.records.push(action.payload);
      });
  },
});

export default productivitySlice.reducer;
