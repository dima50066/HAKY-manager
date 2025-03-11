import React, { useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProductivityById } from "../../redux/productivity/operations";
import { selectProductivityById } from "../../redux/productivity/selectors";
import { AppDispatch } from "../../redux/store";
import { ProductivityRecord } from "../../types";
import Icon from "../../shared/icon/Icon";

interface EmployeeProductivityProps {
  userId: string;
}

export const EmployeeProductivity: React.FC<EmployeeProductivityProps> = ({
  userId,
}) => {
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    if (userId) {
      dispatch(fetchProductivityById({ userId }));
    }
  }, [dispatch, userId]);

  const productivityRecords = useSelector(selectProductivityById(userId));

  const groupedProductivity = useMemo(() => {
    const records = productivityRecords || [];
    const grouped: Record<
      string,
      Record<
        string,
        {
          totalUnits: number;
          totalEarnings: number;
          avgProductivity: number;
          departmentName: string;
        }
      >
    > = {};

    records.forEach((record: ProductivityRecord) => {
      const monthKey = new Date(record.date).toISOString().slice(0, 7);
      const departmentKey =
        typeof record.departmentId === "object"
          ? record.departmentId._id
          : record.departmentId;
      const departmentName =
        typeof record.departmentId === "object"
          ? record.departmentId.name
          : "Unknown Department";

      if (!grouped[monthKey]) {
        grouped[monthKey] = {};
      }

      if (!grouped[monthKey][departmentKey]) {
        grouped[monthKey][departmentKey] = {
          totalUnits: 0,
          totalEarnings: 0,
          avgProductivity: record.productivityLevel,
          departmentName,
        };
      }

      grouped[monthKey][departmentKey].totalUnits += record.unitsCompleted;
      grouped[monthKey][departmentKey].totalEarnings += record.totalEarnings;
    });

    Object.values(grouped).forEach((departments) => {
      Object.values(departments).forEach((stats) => {
        stats.totalEarnings = parseFloat(stats.totalEarnings.toFixed(2));
      });
    });

    return grouped;
  }, [productivityRecords]);

  return (
    <div className="mt-4">
      <h3 className="text-xl font-semibold">
        {Object.entries(groupedProductivity).length > 0
          ? "Productivity Records"
          : "No Productivity Data Available"}
      </h3>

      {Object.entries(groupedProductivity).map(([month, departments]) => (
        <div key={month} className="mt-4 bg-white shadow-md rounded-lg p-6">
          <h4 className="text-lg font-bold text-blue-600">
            {new Date(`${month}-01`).toLocaleDateString("en-US", {
              month: "long",
              year: "numeric",
            })}
          </h4>
          <ul className="list-disc pl-5 mt-2">
            {Object.entries(departments).map(([departmentId, stats]) => (
              <li key={departmentId} className="mt-2">
                <strong>{stats.departmentName}:</strong>
                <div className="ml-4">
                  <p className="flex items-center">
                    Total Units Completed: {stats.totalUnits}
                    <Icon id="box" width={16} height={16} className="ml-2" />
                  </p>
                  <p className="flex items-center">
                    Average Productivity Level: {stats.avgProductivity}
                    <Icon id="level" width={16} height={16} className="ml-2" />
                  </p>
                  <p className="flex items-center">
                    Total Earnings: {stats.totalEarnings} ZLT
                    <Icon id="coin" width={16} height={16} className="ml-2" />
                  </p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
};
