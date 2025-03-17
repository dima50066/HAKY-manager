import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { ProductivityRecord } from "../../types";
import Icon from "../../shared/icon/Icon";

interface Props {
  records: ProductivityRecord[];
}

const ProductivitySummary: React.FC<Props> = ({ records }) => {
  const { t } = useTranslation();
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
    <div className="bg-gray-100 rounded-lg shadow-md mb-4 flex flex-col items-center py-5">
      <div className="w-full flex flex-col items-center mb-3">
        <h3 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
          <Icon id="summary" width={20} height={20} className="fill-gray-700" />
          {t("summary_of_statistics")}
        </h3>
        <select
          value={filter}
          onChange={(e) => setFilter(e.target.value as "all" | "month")}
          className="border border-gray-300 rounded px-2 py-1 text-sm mt-2"
        >
          <option value="all">{t("all_time")}</option>
          <option value="month">{t("this_month")}</option>
        </select>
      </div>

      <ul className="space-y-3 w-full flex flex-col items-center">
        {Object.entries(departmentStats).map(([department, stats]) => (
          <li
            key={department}
            className="bg-white p-4 rounded-lg shadow-md w-60 flex flex-col items-center text-gray-700 text-sm text-center"
          >
            <span className="font-medium">{department}</span>

            <div className="my-2 border-t border-gray-300 w-40"></div>

            <span className="flex items-center gap-2 text-lg">
              {stats.units}
              <Icon id="box" width={14} height={14} className="fill-gray-700" />
            </span>

            <div className="my-2 border-t border-gray-300 w-40"></div>

            <span className="flex items-center gap-2 text-lg font-semibold">
              {stats.earnings.toFixed(2)} ZLT
            </span>
          </li>
        ))}
      </ul>

      {filteredRecords.length === 0 && (
        <p className="text-gray-500 mt-2">{t("no_records_found")}</p>
      )}
    </div>
  );
};

export default ProductivitySummary;
