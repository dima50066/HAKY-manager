import React from "react";
import { ProductivityRecord } from "../../types";

interface Props {
  records: ProductivityRecord[];
}

const ProductivitySummary: React.FC<Props> = ({ records }) => {
  const departmentStats = records.reduce((acc, record) => {
    if (!acc[record.departmentName]) {
      acc[record.departmentName] = { units: 0, earnings: 0 };
    }
    acc[record.departmentName].units += record.unitsCompleted;
    acc[record.departmentName].earnings += record.totalEarnings;
    return acc;
  }, {} as Record<string, { units: number; earnings: number }>);

  return (
    <div className="p-4 bg-gray-100 rounded-lg shadow-md mb-4">
      <h3 className="text-lg font-semibold text-gray-800">
        📊 Sumary of statistics
      </h3>
      <ul>
        {Object.entries(departmentStats).map(([department, stats]) => (
          <li key={department} className="text-gray-700">
            🏢 {department}: {stats.units} units, 💰 $
            {stats.earnings.toFixed(2)}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ProductivitySummary;
