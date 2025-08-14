import React from "react";
import { useTranslation } from "react-i18next";
import { Employee } from "../../types";
import Icon from "../../shared/icon/Icon";

interface EmployeeInfoProps {
  employee: Employee;
}

export const EmployeeInfo: React.FC<EmployeeInfoProps> = ({ employee }) => {
  const { t } = useTranslation();

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
              {employee.location || t("no_location")}
            </p>
          </div>
        </div>
      </div>

      <div className="mt-6 bg-white shadow-md rounded-lg p-6">
        <h3 className="text-xl font-semibold mb-4">
          {t("personal_information")}
        </h3>
        <div className="space-y-3">
          <p>
            <strong>{t("birth_date")}:</strong>{" "}
            {employee.birthDate
              ? new Date(employee.birthDate).toLocaleDateString()
              : t("not_provided")}
          </p>

          <div className="flex items-center justify-between">
            <p>
              <strong>{t("address")}:</strong>{" "}
              {employee.address || t("not_provided")}
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
              <strong>{t("emergency_contact")}:</strong>{" "}
              {employee.emergencyContactNumber || t("not_provided")}
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
              <strong>{t("contact_number")}:</strong>{" "}
              {employee.contactNumber || t("not_provided")}
            </p>
            {employee.contactNumber && (
              <div className="flex space-x-2">
                <button
                  className="p-2 hover:bg-gray-200 rounded"
                  onClick={() => copyToClipboard(employee.contactNumber || "")}
                >
                  <Icon id="copy" width={16} height={16} />
                </button>
                <a
                  href={`tel:${employee.contactNumber}`}
                  className="p-2 hover:bg-gray-200 rounded"
                >
                  <Icon id="phone" width={16} height={16} />
                </a>
              </div>
            )}
          </div>
          <div className="flex items-center justify-between">
            <p>
              <strong>{t("pesel_number")}:</strong>{" "}
              {employee.peselNumber || t("not_provided")}
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
            <strong>{t("lives_independently")}:</strong>{" "}
            {employee.livesIndependently ? t("yes") : t("no")}
          </p>
          <p>
            <strong>{t("uses_company_transport")}:</strong>{" "}
            {employee.usesCompanyTransport ? t("yes") : t("no")}
          </p>
          <p>
            <strong>{t("student_status")}:</strong>{" "}
            {employee.isStudent ? t("yes") : t("no")}
          </p>
        </div>
      </div>
    </div>
  );
};
