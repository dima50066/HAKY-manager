import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../../redux/store";
import {
  fetchDepartmentRanking,
  fetchAllUsers,
} from "../../redux/ranking/operations";
import {
  selectDepartmentRanking,
  selectDepartmentRankingLoading,
  selectAllUsers,
} from "../../redux/ranking/selectors";
import RankingListComponent from "./RankingListComponent";
import { useTranslation } from "react-i18next";

interface DepartmentRankingProps {
  departmentId: string;
  onClose: () => void;
}

const DepartmentRanking: React.FC<DepartmentRankingProps> = ({
  departmentId,
}) => {
  const { t } = useTranslation();
  const dispatch = useDispatch<AppDispatch>();
  const ranking = useSelector(selectDepartmentRanking);
  const loading = useSelector(selectDepartmentRankingLoading);
  const users = useSelector(selectAllUsers);

  const [selectedPeriod, setSelectedPeriod] = useState<"day" | "month" | "all">(
    "month"
  );
  const [selectedDate, setSelectedDate] = useState(
    new Date().toISOString().slice(0, 10)
  );

  useEffect(() => {
    const params: {
      departmentId: string;
      date?: string;
      month?: string;
      allTime?: boolean;
    } = { departmentId };

    if (selectedPeriod === "day") {
      params.date = selectedDate;
    } else if (selectedPeriod === "month") {
      params.month = new Date().toISOString().slice(0, 7);
    } else if (selectedPeriod === "all") {
      params.allTime = true;
    }

    dispatch(fetchDepartmentRanking(params));
    dispatch(fetchAllUsers());
  }, [dispatch, departmentId, selectedPeriod, selectedDate]);

  return (
    <div className="p-5 bg-white rounded-lg w-full max-w-lg">
      <h2 className="text-lg font-bold text-gray-800 border-b pb-2 mb-4">
        {t("department_ranking")}
      </h2>

      <div className="flex gap-3 mb-4">
        <button
          className={`px-4 py-2 rounded-lg ${
            selectedPeriod === "day"
              ? "bg-blue-500 text-white"
              : "bg-gray-200 text-gray-800"
          }`}
          onClick={() => setSelectedPeriod("day")}
        >
          {t("day")}
        </button>
        <button
          className={`px-4 py-2 rounded-lg ${
            selectedPeriod === "month"
              ? "bg-blue-500 text-white"
              : "bg-gray-200 text-gray-800"
          }`}
          onClick={() => setSelectedPeriod("month")}
        >
          {t("month")}
        </button>
        <button
          className={`px-4 py-2 rounded-lg ${
            selectedPeriod === "all"
              ? "bg-blue-500 text-white"
              : "bg-gray-200 text-gray-800"
          }`}
          onClick={() => setSelectedPeriod("all")}
        >
          {t("all_time")}
        </button>
      </div>

      {selectedPeriod === "day" && (
        <input
          type="date"
          value={selectedDate}
          onChange={(e) => setSelectedDate(e.target.value)}
          className="mb-4 p-2 border rounded-lg w-full"
        />
      )}

      <RankingListComponent ranking={ranking} users={users} loading={loading} />
    </div>
  );
};

export default DepartmentRanking;
