import React from "react";
import { Employee } from "../../types";
import Icon from "../../shared/icon/Icon";

interface EmployeeInfoProps {
  employee: Employee;
}

export const EmployeeInfo: React.FC<EmployeeInfoProps> = ({ employee }) => {
  const copyToClipboard = (text: string) => {
    if (text) {
      navigator.clipboard.writeText(text);
    }
  };

  return (
    <div className="mb-6">
      <div className="bg-white shadow-md rounded-lg p-6">
        <div className="flex items-center space-x-6">
          <img
            src={employee.avatar || "/default-avatar.png"}
            alt="Avatar"
            className="w-24 h-24 rounded-full border object-cover"
          />
          <div>
            <h2 className="text-2xl font-bold">{employee.user.name}</h2>
            <p className="text-gray-500">
              {employee.location || "No location"}
            </p>
          </div>
        </div>
      </div>

      <div className="mt-6 bg-white shadow-md rounded-lg p-6">
        <h3 className="text-xl font-semibold mb-4">Personal Information</h3>
        <div className="space-y-3">
          <p>
            <strong>Birth Date:</strong>{" "}
            {employee.birthDate
              ? new Date(employee.birthDate).toLocaleDateString()
              : "Not provided"}
          </p>

          <div className="flex items-center justify-between">
            <p>
              <strong>Address:</strong> {employee.address || "Not provided"}
            </p>
            {employee.address && (
              <button
                className="p-2 hover:bg-gray-200 rounded"
                onClick={() => copyToClipboard(employee.address || "")}
              >
                <Icon id="copy" width={16} height={16} />
              </button>
            )}
          </div>

          <div className="flex items-center justify-between">
            <p>
              <strong>Emergency Contact:</strong>{" "}
              {employee.emergencyContactNumber || "Not provided"}
            </p>
            {employee.emergencyContactNumber && (
              <div className="flex space-x-2">
                <button
                  className="p-2 hover:bg-gray-200 rounded"
                  onClick={() =>
                    copyToClipboard(employee.emergencyContactNumber || "")
                  }
                >
                  <Icon id="copy" width={16} height={16} />
                </button>
                <a
                  href={`tel:${employee.emergencyContactNumber}`}
                  className="p-2 hover:bg-gray-200 rounded"
                >
                  <Icon id="phone" width={16} height={16} />
                </a>
              </div>
            )}
          </div>

          <div className="flex items-center justify-between">
            <p>
              <strong>PESEL Number:</strong>{" "}
              {employee.peselNumber || "Not provided"}
            </p>
            {employee.peselNumber && (
              <button
                className="p-2 hover:bg-gray-200 rounded"
                onClick={() => copyToClipboard(employee.peselNumber || "")}
              >
                <Icon id="copy" width={16} height={16} />
              </button>
            )}
          </div>

          <p>
            <strong>Lives Independently:</strong>{" "}
            {employee.livesIndependently ? "Yes" : "No"}
          </p>
          <p>
            <strong>Uses Company Transport:</strong>{" "}
            {employee.usesCompanyTransport ? "Yes" : "No"}
          </p>
          <p>
            <strong>Student Status:</strong> {employee.isStudent ? "Yes" : "No"}
          </p>
        </div>
      </div>
    </div>
  );
};
