import React, { useState, useMemo } from "react";
import { useTranslation } from "react-i18next";
import { ProductivityRecord } from "../../types";
import Icon from "../../shared/icon/Icon";

interface Props {
  records: ProductivityRecord[];
}

const ProductivitySummary: React.FC<Props> = ({ records }) => {
  const { t } = useTranslation();
  const [filter, setFilter] = useState<"all" | "current" | "selected">("all");
  const [selectedMonth, setSelectedMonth] = useState<string>("");

  const availableMonths = useMemo(() => {
    const months = new Set<string>();
    records.forEach((record) => {
      const date = new Date(record.date);
      const monthKey = `${date.getFullYear()}-${date.getMonth() + 1}`;
      const monthNames = [
        "january",
        "february",
        "march",
        "april",
        "may",
        "june",
        "july",
        "august",
        "september",
        "october",
        "november",
        "december",
      ];
      const monthName =
        t(`months.${monthNames[date.getMonth()]}`) + " " + date.getFullYear();
      months.add(
        JSON.stringify({
          key: monthKey,
          name: monthName,
          year: date.getFullYear(),
          month: date.getMonth(),
        })
      );
    });

    return Array.from(months)
      .map((month) => JSON.parse(month))
      .sort((a, b) => {
        if (a.year !== b.year) {
          return b.year - a.year;
        }
        return b.month - a.month;
      });
  }, [records, t]);

  const getFilteredRecords = () => {
    if (filter === "current") {
      const currentMonth = new Date().getMonth();
      const currentYear = new Date().getFullYear();
      return records.filter((record) => {
        const recordDate = new Date(record.date);
        return (
          recordDate.getMonth() === currentMonth &&
          recordDate.getFullYear() === currentYear
        );
      });
    } else if (filter === "selected" && selectedMonth) {
      const [year, month] = selectedMonth.split("-").map(Number);
      return records.filter((record) => {
        const recordDate = new Date(record.date);
        return (
          recordDate.getMonth() === month - 1 &&
          recordDate.getFullYear() === year
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
        <div className="flex flex-col items-center gap-2 mt-2">
          <select
            value={filter}
            onChange={(e) => {
              setFilter(e.target.value as "all" | "current" | "selected");
              if (e.target.value !== "selected") {
                setSelectedMonth("");
              }
            }}
            className="border border-gray-300 rounded px-2 py-1 text-sm"
          >
            <option value="all">{t("productivity_all_time")}</option>
            <option value="current">{t("productivity_current_month")}</option>
            <option value="selected">{t("productivity_select_month")}</option>
          </select>

          {filter === "selected" && (
            <select
              value={selectedMonth}
              onChange={(e) => setSelectedMonth(e.target.value)}
              className="border border-gray-300 rounded px-2 py-1 text-sm"
            >
              <option value="">{t("productivity_select_month")}</option>
              {availableMonths.map((month) => (
                <option key={month.key} value={month.key}>
                  {month.name}
                </option>
              ))}
            </select>
          )}
        </div>
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
              {Number.isInteger(stats.units)
                ? stats.units
                : stats.units.toFixed(2)}
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
