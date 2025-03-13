import React from "react";
import RankingItem from "./RankingItem";
import { DepartmentCard } from "../../types";
import Loader from "../../shared/loader/Loader";
import useLoader from "../../hooks/useLoader";

interface DayHistory {
  date: string;
  departments: DepartmentCard[];
}

interface RankingListProps {
  history: DayHistory[];
  onSelectDepartment: (departmentId: string) => void;
  onSelectDate: (date: string, departmentId: string) => void;
  loading: boolean;
}

const RankingList: React.FC<RankingListProps> = ({
  history,
  onSelectDepartment,
  onSelectDate,
  loading,
}) => {
  const showLoader = useLoader(loading);

  if (showLoader) {
    return <Loader />;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {history.map((day) => (
        <div key={day.date} className="bg-white shadow-lg rounded-xl p-4 mb-4">
          <h3 className="text-lg font-semibold text-gray-800 border-b pb-2 mb-2">
            {new Date(day.date).toLocaleDateString()}
          </h3>
          <div className="space-y-2">
            {day.departments.map((dept: DepartmentCard) => (
              <RankingItem
                key={dept.departmentId}
                department={{ ...dept, date: day.date }}
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
