import React, { useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import { AppDispatch } from "../../redux/store";
import {
  fetchEmployeeById,
  deleteEmployee,
} from "../../redux/coordinator/operations";
import {
  selectEmployeeById,
  selectEmployeeByIdLoading,
} from "../../redux/coordinator/selectors";
import { EmployeeInfo } from "./EmployeeInfo";
import { EmployeeProductivity } from "./EmployeeProductivity";
import { EmployeeSalary } from "./EmployeeSalary";
import { EmployeeDocuments } from "./EmployeeDocuments";
import { EmployeeActions } from "./EmployeeActions";

const EmployeeDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const profileId = id ?? "";
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const employee = useSelector(selectEmployeeById(profileId));
  const isLoading = useSelector(selectEmployeeByIdLoading);

  const userId = useMemo(() => employee?.user._id || "", [employee]);

  useEffect(() => {
    if (profileId) {
      dispatch(fetchEmployeeById(profileId));
    }
  }, [dispatch, profileId]);

  const handleDelete = async () => {
    if (window.confirm("Are you sure you want to delete this employee?")) {
      await dispatch(deleteEmployee(profileId));
      navigate("/coordinator");
    }
  };

  if (isLoading)
    return (
      <p className="text-center text-blue-500">Loading employee data...</p>
    );
  if (!employee)
    return <p className="text-center text-red-500">Employee not found.</p>;

  return (
    <div className="p-4 max-w-2xl mx-auto bg-white shadow-md rounded-lg">
      <EmployeeInfo employee={employee} />
      <EmployeeProductivity userId={userId} />
      <EmployeeSalary userId={userId} />
      <EmployeeDocuments profileId={profileId} />
      <EmployeeActions profileId={profileId} onDelete={handleDelete} />
    </div>
  );
};

export default EmployeeDetails;
