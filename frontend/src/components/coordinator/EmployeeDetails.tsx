import React, { useEffect, useState } from "react";
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
import { selectSalaryHistoryById } from "../../redux/salary/selectors";
import { fetchSalaryHistoryById } from "../../redux/salary/operations";
import { selectProductivityById } from "../../redux/productivity/selectors";
import { fetchProductivityById } from "../../redux/productivity/operations";
import { selectDocumentsById } from "../../redux/documents/selectors";
import { fetchDocumentsById } from "../../redux/documents/operations";
import EditEmployee from "./EditEmployee";
import EditEmployeeSalary from "./EditEmployeeSalary";
import { Button, Card, CardContent, Typography } from "@mui/material";
import { Salary } from "../../types";

const EmployeeDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const profileId = id ?? "";

  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const employee = useSelector(selectEmployeeById(profileId!));
  const isLoading = useSelector(selectEmployeeByIdLoading);

  const userId = employee?.user._id || "";

  const salaryHistory = useSelector(selectSalaryHistoryById(userId));
  const productivityRecords = useSelector(selectProductivityById(userId));
  const documents = useSelector(selectDocumentsById(profileId));

  const [isEditing, setIsEditing] = useState(false);

  const [editingSalary, setEditingSalary] = useState<null | Salary>(null);

  useEffect(() => {
    if (profileId) {
      dispatch(fetchEmployeeById(profileId));
    }
  }, [dispatch, profileId]);

  useEffect(() => {
    if (userId) {
      dispatch(fetchSalaryHistoryById(userId));
      dispatch(fetchProductivityById({ userId }));
      dispatch(fetchDocumentsById(profileId));
    }
  }, [dispatch, userId, profileId]);

  const handleDelete = async () => {
    if (window.confirm("Are you sure you want to delete this employee?")) {
      await dispatch(deleteEmployee(profileId!));
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
      <div className="flex items-center space-x-4">
        <img
          src={employee.avatar || "/default-avatar.png"}
          alt="Avatar"
          className="w-24 h-24 rounded-full border"
        />
        <div>
          <h2 className="text-2xl font-bold">{employee.user.name}</h2>
          <p className="text-gray-500">{employee.location || "No location"}</p>
        </div>
      </div>

      <div className="mt-4 space-y-2">
        <h3 className="text-xl font-semibold">Personal Information</h3>
        <p>
          <strong>Bio:</strong> {employee.bio || "No bio available"}
        </p>
        <p>
          <strong>Birth Date:</strong>{" "}
          {employee.birthDate
            ? new Date(employee.birthDate).toLocaleDateString()
            : "Not provided"}
        </p>
        <p>
          <strong>Address:</strong> {employee.address || "Not provided"}
        </p>
        <p>
          <strong>Emergency Contact:</strong>{" "}
          {employee.emergencyContactNumber || "Not provided"}
        </p>
        <p>
          <strong>PESEL Number:</strong>{" "}
          {employee.peselNumber || "Not provided"}
        </p>
        <p>
          <strong>Lives Independently:</strong>{" "}
          {employee.livesIndependently ? "Yes" : "No"}
        </p>
        <p>
          <strong>Student Status:</strong> {employee.isStudent ? "Yes" : "No"}
        </p>
        <p>
          <strong>Productivity Level:</strong> {employee.productivity}
        </p>
      </div>

      <div className="mt-4">
        <h3 className="text-xl font-semibold">Productivity Records</h3>
        <ul>
          {productivityRecords.length > 0 ? (
            productivityRecords.map((record) => (
              <li key={record._id}>
                {record.date}: {record.unitsCompleted} units
              </li>
            ))
          ) : (
            <p>No productivity records</p>
          )}
        </ul>
      </div>

      <div className="mt-4">
        <h3 className="text-xl font-semibold">Salary History</h3>
        {salaryHistory.length > 0 ? (
          salaryHistory.map((salary) => (
            <Card key={salary._id} variant="outlined" className="mb-2">
              <CardContent>
                <Typography variant="body1">
                  <strong>Period:</strong> {salary.period}
                </Typography>
                <Typography variant="body1">
                  <strong>Total Earnings:</strong> ${salary.totalEarnings}
                </Typography>
                <Typography variant="body1">
                  <strong>Hours Worked:</strong> {salary.hoursWorked}
                </Typography>
                <Button
                  variant="outlined"
                  color="primary"
                  onClick={() => setEditingSalary(salary)}
                >
                  Edit
                </Button>
              </CardContent>
            </Card>
          ))
        ) : (
          <p>No salary history</p>
        )}
      </div>

      <div className="mt-4">
        <h3 className="text-xl font-semibold">Documents</h3>
        <ul>
          {documents.length > 0 ? (
            documents.map((doc) => (
              <li key={doc.name}>
                <a
                  href={doc.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-500"
                >
                  {doc.name}
                </a>
              </li>
            ))
          ) : (
            <p>No documents uploaded</p>
          )}
        </ul>
      </div>

      <div className="mt-6 flex space-x-4">
        <div>
          {isEditing ? (
            <EditEmployee
              profileId={profileId}
              onClose={() => setIsEditing(false)}
            />
          ) : (
            <button
              onClick={() => setIsEditing(true)}
              className="px-4 py-2 text-white bg-blue-500 rounded hover:bg-blue-600"
            >
              Edit
            </button>
          )}
        </div>
        <button
          onClick={handleDelete}
          className="px-4 py-2 text-white bg-red-500 rounded hover:bg-red-600"
        >
          Delete Employee
        </button>
      </div>
      {editingSalary && (
        <EditEmployeeSalary
          userId={profileId}
          salary={editingSalary}
          onClose={() => setEditingSalary(null)}
        />
      )}
    </div>
  );
};

export default EmployeeDetails;
