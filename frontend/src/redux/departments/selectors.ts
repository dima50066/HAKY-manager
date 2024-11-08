import { RootState } from '../store';
import { DepartmentData } from '../../types';

export const selectDepartments = (state: RootState): DepartmentData[] => state.departments.departments;

export const selectDepartmentsLoading = (state: RootState): boolean => state.departments.loading;
