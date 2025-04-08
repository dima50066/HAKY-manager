import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { ProductivityRecord } from "../../types";
import ProductivityItem from "./ProductivityItem";
import Icon from "../../shared/icon/Icon";

interface Props {
  records: ProductivityRecord[];
  onEdit: (record: ProductivityRecord) => void;
  onDelete: (id: string) => void;
}

const ProductivityAccordion: React.FC<Props> = ({
  records,
  onEdit,
  onDelete,
}) => {
  const { t } = useTranslation();
  const [openMonths, setOpenMonths] = useState<Record<string, boolean>>({});
  const [openDays, setOpenDays] = useState<Record<string, boolean>>({});
  const [openDepartments, setOpenDepartments] = useState<
    Record<string, boolean>
  >({});

  const recordsByMonth = records.reduce((acc, record) => {
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

    if (!acc[monthKey]) {
      acc[monthKey] = {
        name: monthName,
        records: [],
      };
    }

    acc[monthKey].records.push(record);
    return acc;
  }, {} as Record<string, { name: string; records: ProductivityRecord[] }>);

  const groupRecordsByDay = (monthRecords: ProductivityRecord[]) => {
    return monthRecords.reduce((acc, record) => {
      const date = new Date(record.date);
      const dayKey = date.toLocaleDateString();

      if (!acc[dayKey]) {
        acc[dayKey] = {};
      }

      if (!acc[dayKey][record.departmentName]) {
        acc[dayKey][record.departmentName] = [];
      }

      acc[dayKey][record.departmentName].push(record);
      return acc;
    }, {} as Record<string, Record<string, ProductivityRecord[]>>);
  };

  const toggleMonth = (monthKey: string) => {
    setOpenMonths((prev) => ({
      ...prev,
      [monthKey]: !prev[monthKey],
    }));
  };

  const toggleDay = (dayKey: string) => {
    setOpenDays((prev) => ({
      ...prev,
      [dayKey]: !prev[dayKey],
    }));
  };

  const toggleDepartment = (department: string) => {
    setOpenDepartments((prev) => ({
      ...prev,
      [department]: !prev[department],
    }));
  };

  const calculateTotalUnits = (records: ProductivityRecord[]) => {
    return records.reduce((sum, record) => sum + record.unitsCompleted, 0);
  };

  const calculateTotalEarnings = (records: ProductivityRecord[]) => {
    return records
      .reduce((sum, record) => sum + record.totalEarnings, 0)
      .toFixed(2);
  };

  const calculateMonthTotals = (monthRecords: ProductivityRecord[]) => {
    return {
      units: calculateTotalUnits(monthRecords),
      earnings: calculateTotalEarnings(monthRecords),
    };
  };

  const calculateDayTotals = (
    dayRecords: Record<string, ProductivityRecord[]>
  ) => {
    const allRecords = Object.values(dayRecords).flat();
    return {
      units: calculateTotalUnits(allRecords),
      earnings: calculateTotalEarnings(allRecords),
    };
  };

  const calculateDepartmentTotals = (records: ProductivityRecord[]) => {
    return {
      units: calculateTotalUnits(records),
      earnings: calculateTotalEarnings(records),
    };
  };

  return (
    <div className="space-y-2">
      {Object.entries(recordsByMonth).map(([monthKey, monthData]) => {
        const monthTotals = calculateMonthTotals(monthData.records);
        const recordsByDay = groupRecordsByDay(monthData.records);

        return (
          <div
            key={monthKey}
            className="border border-gray-300 rounded-lg overflow-hidden"
          >
            <button
              onClick={() => toggleMonth(monthKey)}
              className="w-full bg-gray-200 px-4 py-2 flex flex-col items-center text-gray-800 font-semibold"
            >
              <span className="flex items-center gap-2">
                <Icon
                  id="calendar"
                  width={16}
                  height={16}
                  className="fill-gray-700"
                />
                {monthData.name}
                <Icon
                  id="box"
                  width={16}
                  height={16}
                  className="fill-gray-700"
                />
                {monthTotals.units}
              </span>

              <span className="flex items-center gap-2 mt-1">
                <Icon
                  id="coin"
                  width={16}
                  height={16}
                  className="fill-gray-700"
                />
                {monthTotals.earnings}
                <Icon
                  id={openMonths[monthKey] ? "arrow-up" : "arrow-down"}
                  width={16}
                  height={16}
                  className="fill-gray-700"
                />
              </span>
            </button>

            {openMonths[monthKey] && (
              <div className="bg-white px-4 py-2">
                {Object.entries(recordsByDay).map(
                  ([dayKey, dayRecordsByDepartment]) => {
                    const dayTotals = calculateDayTotals(
                      dayRecordsByDepartment
                    );

                    return (
                      <div key={dayKey} className="border-b py-2">
                        <button
                          onClick={() => toggleDay(dayKey)}
                          className="w-full text-left text-gray-700 font-medium flex flex-col justify-between items-start"
                        >
                          <span className="w-full break-words flex items-center gap-2">
                            <Icon
                              id="day"
                              width={14}
                              height={14}
                              className="fill-gray-700"
                            />
                            {dayKey}
                          </span>

                          <span className="w-full flex justify-between items-center mt-1">
                            <span className="flex items-center gap-2">
                              <Icon
                                id="box"
                                width={14}
                                height={14}
                                className="fill-gray-700"
                              />
                              {dayTotals.units}
                              <Icon
                                id="coin"
                                width={14}
                                height={14}
                                className="fill-gray-700"
                              />
                              {dayTotals.earnings}
                            </span>

                            <Icon
                              id={openDays[dayKey] ? "arrow-up" : "arrow-down"}
                              width={14}
                              height={14}
                              className="fill-gray-700"
                            />
                          </span>
                        </button>

                        {openDays[dayKey] && (
                          <div className="ml-4 mt-2">
                            {Object.entries(dayRecordsByDepartment).map(
                              ([department, records]) => {
                                const deptTotals =
                                  calculateDepartmentTotals(records);

                                return (
                                  <div
                                    key={department}
                                    className="border-b py-2"
                                  >
                                    <button
                                      onClick={() =>
                                        toggleDepartment(department)
                                      }
                                      className="w-full text-left text-gray-700 font-medium flex flex-col justify-between items-start"
                                    >
                                      <span className="w-full break-words">
                                        {t("productivity_department")}:{" "}
                                        {department}
                                      </span>

                                      <span className="w-full flex justify-between items-center mt-1">
                                        <span className="flex items-center gap-2">
                                          <Icon
                                            id="box"
                                            width={14}
                                            height={14}
                                            className="fill-gray-700"
                                          />
                                          {deptTotals.units}
                                          <Icon
                                            id="coin"
                                            width={14}
                                            height={14}
                                            className="fill-gray-700"
                                          />
                                          {deptTotals.earnings}
                                        </span>

                                        <Icon
                                          id={
                                            openDepartments[department]
                                              ? "arrow-up"
                                              : "arrow-down"
                                          }
                                          width={14}
                                          height={14}
                                          className="fill-gray-700"
                                        />
                                      </span>
                                    </button>

                                    {openDepartments[department] && (
                                      <ul className="ml-4 mt-2">
                                        {records.map((record) => (
                                          <ProductivityItem
                                            key={record._id}
                                            record={record}
                                            onEdit={onEdit}
                                            onDelete={onDelete}
                                          />
                                        ))}
                                      </ul>
                                    )}
                                  </div>
                                );
                              }
                            )}
                          </div>
                        )}
                      </div>
                    );
                  }
                )}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default ProductivityAccordion;
