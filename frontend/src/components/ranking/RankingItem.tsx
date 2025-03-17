import React from "react";
import Icon from "../../shared/icon/Icon";
import { useTranslation } from "react-i18next";

interface RankingItemProps {
  department: {
    departmentId: string;
    departmentName: string;
    unitsCompleted: number;
    position: number;
    date: string;
  };
  onSelectDepartment: (departmentId: string) => void;
  onSelectDate: (date: string, departmentId: string) => void;
}

const RankingItem: React.FC<RankingItemProps> = ({
  department,
  onSelectDepartment,
  onSelectDate,
}) => {
  const { t } = useTranslation();

  return (
    <div className="flex flex-col sm:flex-row justify-between items-center bg-gray-100 p-3 rounded-lg shadow-md hover:bg-gray-200 transition">
      <h4
        className="text-blue-600 font-medium cursor-pointer hover:underline"
        onClick={() => onSelectDepartment(department.departmentId)}
      >
        {department.departmentName}
      </h4>
      <p className="text-gray-700 flex items-center gap-1">
        {t("completed")}{" "}
        <span className="font-semibold text-gray-900 flex items-center gap-1">
          {department.unitsCompleted}
          <Icon id="box" className="w-5 h-5 text-gray-700" />
        </span>{" "}
        | {t("position")}{" "}
        <span
          className="text-red-500 font-semibold cursor-pointer hover:underline flex items-center gap-1"
          onClick={() => onSelectDate(department.date, department.departmentId)}
        >
          {department.position}
          <Icon id="star" className="w-5 h-5 text-yellow-500" />
        </span>
      </p>
    </div>
  );
};

export default RankingItem;
