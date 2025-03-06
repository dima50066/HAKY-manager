import React from "react";
import { useSelector } from "react-redux";
import SalaryList from "../../components/salary/SalaryList";

import {
  selectMySalaryHistoryLoading,
  selectMySalaryHistoryError,
} from "../../redux/salary/selectors";

const SalaryPage: React.FC = () => {
  const loading = useSelector(selectMySalaryHistoryLoading);
  const error = useSelector(selectMySalaryHistoryError);

  return (
    <div className="min-h-screen bg-gray-100 py-10 px-4">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-700 text-center mb-8">
          Your Salary Overview
        </h1>

        {loading && (
          <p className="text-center text-gray-500">Loading salary data...</p>
        )}
        {error && <p className="text-center text-red-500">Error: {error}</p>}

        <SalaryList />
      </div>
    </div>
  );
};

export default SalaryPage;
