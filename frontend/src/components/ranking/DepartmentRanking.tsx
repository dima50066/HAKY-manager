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

interface DepartmentRankingProps {
  departmentId: string;
  onClose: () => void;
}

const DepartmentRanking: React.FC<DepartmentRankingProps> = ({
  departmentId,
  onClose,
}) => {
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

  if (loading) return <p className="text-center text-gray-600">Loading...</p>;

  return (
    <div className="p-5 bg-white rounded-lg shadow-md w-full max-w-lg relative">
      {/* Close Button */}
      <button
        onClick={onClose}
        className="absolute top-2 right-2 px-3 py-1 text-white bg-red-500 rounded hover:bg-red-600 transition"
      >
        Close
      </button>

      <h2 className="text-lg font-bold text-gray-800 border-b pb-2 mb-4">
        Department Ranking
      </h2>

      {/* Period Selector */}
      <div className="flex gap-3 mb-4">
        <button
          className={`px-4 py-2 rounded-lg ${
            selectedPeriod === "day"
              ? "bg-blue-500 text-white"
              : "bg-gray-200 text-gray-800"
          }`}
          onClick={() => setSelectedPeriod("day")}
        >
          Day
        </button>
        <button
          className={`px-4 py-2 rounded-lg ${
            selectedPeriod === "month"
              ? "bg-blue-500 text-white"
              : "bg-gray-200 text-gray-800"
          }`}
          onClick={() => setSelectedPeriod("month")}
        >
          Month
        </button>
        <button
          className={`px-4 py-2 rounded-lg ${
            selectedPeriod === "all"
              ? "bg-blue-500 text-white"
              : "bg-gray-200 text-gray-800"
          }`}
          onClick={() => setSelectedPeriod("all")}
        >
          All Time
        </button>
      </div>

      {/* Date Picker for Day Selection */}
      {selectedPeriod === "day" && (
        <input
          type="date"
          value={selectedDate}
          onChange={(e) => setSelectedDate(e.target.value)}
          className="mb-4 p-2 border rounded-lg w-full"
        />
      )}

      {/* Ranking List */}
      <ul className="space-y-2">
        {ranking.length > 0 ? (
          ranking.map((user, index) => {
            const foundUser = users.find((usr) => usr._id === user._id);
            const userName = foundUser ? foundUser.name : "Unknown User";

            return (
              <li
                key={user._id}
                className="bg-gray-100 p-2 rounded-md shadow-sm flex justify-between"
              >
                <span className="font-semibold">
                  {index + 1}. {userName}
                </span>
                <span className="text-gray-700">{user.totalUnits} units</span>
              </li>
            );
          })
        ) : (
          <p className="text-center text-gray-600">No data available</p>
        )}
      </ul>
    </div>
  );
};

export default DepartmentRanking;
