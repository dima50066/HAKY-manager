import { createSlice } from '@reduxjs/toolkit';
import { fetchDepartments } from './operations';
import { DepartmentData } from '../../types'; 

interface DepartmentsState {
  departments: DepartmentData[]; 
  loading: boolean;
}

const initialState: DepartmentsState = {
  departments: [],
  loading: false,
};

const departmentsSlice = createSlice({
  name: 'departments',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchDepartments.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchDepartments.fulfilled, (state, action) => {
        state.loading = false;
        state.departments = action.payload; 
      })
      .addCase(fetchDepartments.rejected, (state) => {
        state.loading = false;
      });
  },
});

export default departmentsSlice.reducer;
