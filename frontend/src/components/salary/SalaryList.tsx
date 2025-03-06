import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchMySalaryHistory,
  calculateUserSalary,
} from "../../redux/salary/operations";
import {
  selectMySalaryHistory,
  selectMySalaryHistoryLoading,
  selectMySalaryHistoryError,
} from "../../redux/salary/selectors";
import { AppDispatch } from "../../redux/store";
import SalaryForm from "./SalaryForm";
import Icon from "../../shared/icon/Icon";

const formatPeriod = (period: string) => {
  const [year, month] = period.split("-");
  const date = new Date(Number(year), Number(month) - 1);
  return date.toLocaleString("en-US", { month: "long", year: "numeric" });
};

const SalaryList: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const salaryHistory = useSelector(selectMySalaryHistory);
  const loading = useSelector(selectMySalaryHistoryLoading);
  const error = useSelector(selectMySalaryHistoryError);
  const [selectedRecordId, setSelectedRecordId] = useState<string | null>(null);

  useEffect(() => {
    dispatch(calculateUserSalary({ userId: "" }));
    dispatch(fetchMySalaryHistory());
  }, [dispatch]);

  if (loading) {
    return (
      <p className="text-center text-gray-500">Loading salary history...</p>
    );
  }

  if (error) {
    return <p className="text-center text-red-500">Error: {error}</p>;
  }

  return (
    <div className="max-w-lg mx-auto bg-white shadow-lg rounded-xl mt-8 p-6 transition-all duration-300 ease-in-out hover:shadow-xl">
      {salaryHistory.length > 0 ? (
        <ul className="divide-y divide-gray-200 mt-4">
          {salaryHistory.map((record) => (
            <li
              key={record._id}
              className="py-6 px-4 bg-gradient-to-r from-gray-100 to-gray-200 shadow-md hover:shadow-lg rounded-lg transition-all duration-300"
            >
              <p className="text-lg font-bold text-gray-800">
                {formatPeriod(record.period)}
              </p>

              <div className="flex items-center gap-2 text-gray-600">
                <Icon
                  id="coin"
                  width={20}
                  height={20}
                  className="text-gray-600"
                />
                <span>
                  Total Earnings: {record.totalEarnings.toFixed(2)} PLN
                </span>
              </div>

              <div className="flex items-center gap-2 text-gray-600">
                <Icon
                  id="clock"
                  width={20}
                  height={20}
                  className="text-gray-600"
                />
                <span>Hours Worked: {record.hoursWorked}</span>
              </div>

              <button
                onClick={() =>
                  setSelectedRecordId(
                    selectedRecordId === record._id ? null : record._id
                  )
                }
                className={`mt-3 font-semibold rounded-lg px-5 py-2 transition-all duration-200 transform hover:scale-105 active:scale-95 ${
                  selectedRecordId === record._id
                    ? "bg-gray-500 text-white hover:bg-gray-600"
                    : "bg-blue-500 text-white hover:bg-blue-600"
                }`}
              >
                {selectedRecordId === record._id ? "Close" : "Update"}
              </button>

              {selectedRecordId === record._id && (
                <SalaryForm recordId={record._id} />
              )}
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-center text-gray-500 mt-4">
          No salary history available.
        </p>
      )}
    </div>
  );
};

export default SalaryList;
