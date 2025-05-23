import React from "react";
import { Employee as EmployeeType } from "../../types";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

interface EmployeeCardProps {
  employee: EmployeeType;
}

const EmployeeCard: React.FC<EmployeeCardProps> = ({ employee }) => {
  const { t } = useTranslation();

  return (
    <div className="border rounded-lg p-4 shadow-lg bg-white">
      <div className="flex items-center space-x-4">
        <img
          src={employee.avatar || "/default-avatar.png"}
          alt="Avatar"
          className="w-16 h-16 rounded-full border object-cover"
        />
        <div>
          <h3 className="text-lg font-semibold">{employee.user.name}</h3>
          <p className="text-sm text-gray-500">
            {employee.location || t("location_not_set")}
          </p>
        </div>
      </div>

      <Link
        to={`/coordinator/employees/${employee._id}`}
        className="block mt-2 text-blue-500 hover:underline"
      >
        {t("view_details")}
      </Link>
    </div>
  );
};

export default EmployeeCard;
