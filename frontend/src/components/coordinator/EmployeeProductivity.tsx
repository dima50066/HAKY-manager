import React, { useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProductivityById } from "../../redux/productivity/operations";
import { selectProductivityById } from "../../redux/productivity/selectors";
import { AppDispatch } from "../../redux/store";
import { ProductivityRecord } from "../../types";

interface EmployeeProductivityProps {
  userId: string;
}

export const EmployeeProductivity: React.FC<EmployeeProductivityProps> = ({
  userId,
}) => {
  const dispatch = useDispatch<AppDispatch>();
  const productivityRecords = useSelector(selectProductivityById(userId));

  useEffect(() => {
    if (userId) {
      dispatch(fetchProductivityById({ userId }));
    }
  }, [dispatch, userId]);

  const groupedProductivity = useMemo(() => {
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

    productivityRecords.forEach((record: ProductivityRecord) => {
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
      <h3 className="text-xl font-semibold">Productivity Records</h3>

      {Object.entries(groupedProductivity).length > 0 ? (
        Object.entries(groupedProductivity).map(([month, departments]) => (
          <div key={month} className="mt-4">
            <h4 className="text-lg font-bold text-blue-600">
              {new Date(`${month}-01`).toLocaleDateString("en-US", {
                month: "long",
                year: "numeric",
              })}
            </h4>
            <ul className="list-disc pl-5">
              {Object.entries(departments).map(([departmentId, stats]) => (
                <li key={departmentId} className="mt-2">
                  <strong>{stats.departmentName}:</strong>{" "}
                  <div className="ml-4">
                    <p>Total Units Completed: {stats.totalUnits}</p>
                    <p>Average Productivity Level: {stats.avgProductivity}</p>
                    <p>Total Earnings: ${stats.totalEarnings}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        ))
      ) : (
        <p>No productivity records</p>
      )}
    </div>
  );
};
