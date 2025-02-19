import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  fetchEmployees,
  fetchEmployeeById,
  updateEmployee,
  deleteEmployee,
} from "./operations";
import { Employee } from "../../types";

interface CoordinatorState {
  employees: Employee[];
  selectedEmployee: Employee | null;
  loading: {
    fetchAll: boolean;
    fetchById: boolean;
    update: boolean;
    delete: boolean;
  };
  error: {
    fetchAll: string | null;
    fetchById: string | null;
    update: string | null;
    delete: string | null;
  };
}

const initialState: CoordinatorState = {
  employees: [],
  selectedEmployee: null,
  loading: {
    fetchAll: false,
    fetchById: false,
    update: false,
    delete: false,
  },
  error: {
    fetchAll: null,
    fetchById: null,
    update: null,
    delete: null,
  },
};

const coordinatorSlice = createSlice({
  name: "employees",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchEmployees.pending, (state) => {
        state.loading.fetchAll = true;
        state.error.fetchAll = null;
      })
      .addCase(
        fetchEmployees.fulfilled,
        (state, action: PayloadAction<Employee[]>) => {
          state.loading.fetchAll = false;
          state.employees = action.payload;
        }
      )
      .addCase(fetchEmployees.rejected, (state, action) => {
        state.loading.fetchAll = false;
        state.error.fetchAll =
          action.error.message || "Failed to fetch employees";
      })

      .addCase(fetchEmployeeById.pending, (state) => {
        state.loading.fetchById = true;
        state.error.fetchById = null;
      })
      .addCase(
        fetchEmployeeById.fulfilled,
        (state, action: PayloadAction<Employee>) => {
          state.loading.fetchById = false;
          state.selectedEmployee = action.payload;
        }
      )
      .addCase(fetchEmployeeById.rejected, (state, action) => {
        state.loading.fetchById = false;
        state.error.fetchById =
          action.error.message || "Failed to fetch employee";
      })

      .addCase(updateEmployee.pending, (state) => {
        state.loading.update = true;
        state.error.update = null;
      })
      .addCase(
        updateEmployee.fulfilled,
        (state, action: PayloadAction<Employee>) => {
          state.loading.update = false;
          state.selectedEmployee = action.payload;
          state.employees = state.employees.map((emp) =>
            emp._id === action.payload._id ? action.payload : emp
          );
        }
      )
      .addCase(updateEmployee.rejected, (state, action) => {
        state.loading.update = false;
        state.error.update =
          action.error.message || "Failed to update employee";
      })

      .addCase(deleteEmployee.pending, (state) => {
        state.loading.delete = true;
        state.error.delete = null;
      })
      .addCase(
        deleteEmployee.fulfilled,
        (state, action: PayloadAction<string>) => {
          state.loading.delete = false;
          state.employees = state.employees.filter(
            (emp) => emp._id !== action.payload
          );
          if (state.selectedEmployee?._id === action.payload) {
            state.selectedEmployee = null;
          }
        }
      )
      .addCase(deleteEmployee.rejected, (state, action) => {
        state.loading.delete = false;
        state.error.delete =
          action.error.message || "Failed to delete employee";
      });
  },
});

export default coordinatorSlice.reducer;
