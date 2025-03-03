import React from "react";

interface RankingItemProps {
  department: {
    departmentId: string;
    departmentName: string;
    unitsCompleted: number;
    position: number;
    date: string;
  };
  onSelectDepartment: (departmentId: string) => void;
  onSelectDate: (date: string) => void;
}

const RankingItem: React.FC<RankingItemProps> = ({
  department,
  onSelectDepartment,
  onSelectDate,
}) => {
  return (
    <div className="flex flex-col sm:flex-row justify-between items-center bg-gray-100 p-3 rounded-lg shadow-md hover:bg-gray-200 transition">
      <h4
        className="text-blue-600 font-medium cursor-pointer hover:underline"
        onClick={() => onSelectDepartment(department.departmentId)}
      >
        {department.departmentName}
      </h4>
      <p className="text-gray-700">
        Completed:{" "}
        <span className="font-semibold text-gray-900">
          {department.unitsCompleted}
        </span>{" "}
        units | Position:{" "}
        <span
          className="text-red-500 font-semibold cursor-pointer hover:underline"
          onClick={() => onSelectDate(department.date)}
        >
          {department.position}
        </span>
      </p>
    </div>
  );
};

export default RankingItem;
