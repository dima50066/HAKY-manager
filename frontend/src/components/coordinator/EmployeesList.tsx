import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../../redux/store";
import { fetchEmployees } from "../../redux/coordinator/operations";
import {
  selectEmployees,
  selectEmployeesLoading,
  selectEmployeesError,
} from "../../redux/coordinator/selectors";
import EmployeeCard from "./EmployeeCard";

const EmployeesList: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const employees = useSelector(selectEmployees);
  const isLoading = useSelector(selectEmployeesLoading);
  const error = useSelector(selectEmployeesError);

  useEffect(() => {
    dispatch(fetchEmployees());
  }, [dispatch]);

  if (isLoading)
    return <p className="text-center text-blue-500">Loading employees...</p>;
  if (error) return <p className="text-center text-red-500">Error: {error}</p>;
  if (employees.length === 0)
    return <p className="text-center">No employees found.</p>;

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Employees</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {employees.map((employee) => (
          <EmployeeCard key={employee._id} employee={employee} />
        ))}
      </div>
    </div>
  );
};

export default EmployeesList;
