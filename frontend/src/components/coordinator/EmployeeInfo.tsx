import React from "react";
import { Employee } from "../../types";

interface EmployeeInfoProps {
  employee: Employee;
}

export const EmployeeInfo: React.FC<EmployeeInfoProps> = ({ employee }) => {
  return (
    <div className="mb-4">
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
        <p></p>
      </div>
    </div>
  );
};
