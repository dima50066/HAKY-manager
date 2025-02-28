import React from "react";
import RankingItem from "./RankingItem";

interface Department {
  departmentId: string;
  departmentName: string;
  unitsCompleted: number;
  position: number;
}

interface DayHistory {
  date: string;
  departments: Department[];
}

interface RankingListProps {
  history: DayHistory[];
  onSelectDepartment: (departmentId: string) => void;
  onSelectDate: (date: string) => void;
}

const RankingList: React.FC<RankingListProps> = ({
  history,
  onSelectDepartment,
  onSelectDate,
}) => {
  return (
    <div className="w-full max-w-4xl mx-auto p-4">
      {history.map((day) => (
        <div key={day.date} className="bg-white shadow-lg rounded-xl p-4 mb-4">
          <h3 className="text-lg font-semibold text-gray-800 border-b pb-2 mb-2">
            {new Date(day.date).toLocaleDateString()}
          </h3>
          <div className="space-y-2">
            {day.departments.map((dept: Department) => (
              <RankingItem
                key={dept.departmentId}
                department={dept}
                onSelectDepartment={onSelectDepartment}
                onSelectDate={onSelectDate}
              />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default RankingList;
