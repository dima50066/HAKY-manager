import React, { useState } from "react";
import { ProductivityRecord } from "../../types";

interface Props {
  records: ProductivityRecord[];
}

const ProductivitySummary: React.FC<Props> = ({ records }) => {
  const [filter, setFilter] = useState<"all" | "month">("all");

  const getFilteredRecords = () => {
    if (filter === "month") {
      const currentMonth = new Date().getMonth();
      const currentYear = new Date().getFullYear();
      return records.filter((record) => {
        const recordDate = new Date(record.date);
        return (
          recordDate.getMonth() === currentMonth &&
          recordDate.getFullYear() === currentYear
        );
      });
    }
    return records;
  };

  const filteredRecords = getFilteredRecords();

  const departmentStats = filteredRecords.reduce((acc, record) => {
    if (!acc[record.departmentName]) {
      acc[record.departmentName] = { units: 0, earnings: 0 };
    }
    acc[record.departmentName].units += record.unitsCompleted;
    acc[record.departmentName].earnings += record.totalEarnings;
    return acc;
  }, {} as Record<string, { units: number; earnings: number }>);

  return (
    <div className="p-4 bg-gray-100 rounded-lg shadow-md mb-4">
      <div className="flex justify-between items-center mb-2">
        <h3 className="text-lg font-semibold text-gray-800">
          📊 Summary of statistics
        </h3>
        <select
          value={filter}
          onChange={(e) => setFilter(e.target.value as "all" | "month")}
          className="border border-gray-300 rounded px-2 py-1"
        >
          <option value="all">All Time</option>
          <option value="month">This Month</option>
        </select>
      </div>

      <ul>
        {Object.entries(departmentStats).map(([department, stats]) => (
          <li key={department} className="text-gray-700">
            🏢 {department}: {stats.units} units, 💰 $
            {stats.earnings.toFixed(2)}
          </li>
        ))}
      </ul>

      {filteredRecords.length === 0 && (
        <p className="text-gray-500 mt-2">No records found for this period.</p>
      )}
    </div>
  );
};

export default ProductivitySummary;
