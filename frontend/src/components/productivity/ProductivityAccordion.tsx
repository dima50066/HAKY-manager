import React, { useState } from "react";
import { ProductivityRecord } from "../../types";
import ProductivityItem from "./ProductivityItem";

interface Props {
  date: string;
  recordsByDepartment: Record<string, ProductivityRecord[]>;
  onEdit: (record: ProductivityRecord) => void;
  onDelete: (id: string) => void;
}

const ProductivityAccordion: React.FC<Props> = ({
  date,
  recordsByDepartment,
  onEdit,
  onDelete,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [openDepartments, setOpenDepartments] = useState<
    Record<string, boolean>
  >({});

  const totalUnits = Object.values(recordsByDepartment)
    .flat()
    .reduce((sum, record) => sum + record.unitsCompleted, 0);
  const totalEarnings = Object.values(recordsByDepartment)
    .flat()
    .reduce((sum, record) => sum + record.totalEarnings, 0)
    .toFixed(2);

  const calculateDepartmentEarnings = (records: ProductivityRecord[]) => {
    return records
      .reduce((sum, record) => sum + record.totalEarnings, 0)
      .toFixed(2);
  };

  const toggleDepartment = (department: string) => {
    setOpenDepartments((prev) => ({
      ...prev,
      [department]: !prev[department],
    }));
  };

  return (
    <div className="border border-gray-300 rounded-lg overflow-hidden mb-2">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full bg-gray-200 px-4 py-2 flex justify-between items-center text-left text-gray-800 font-semibold"
      >
        <span>
          📅 {date} — {totalUnits} units, 💰 ${totalEarnings}
        </span>
        <span>{isOpen ? "▲" : "▼"}</span>
      </button>

      {isOpen && (
        <div className="bg-white px-4 py-2">
          {Object.entries(recordsByDepartment).map(([department, records]) => (
            <div key={department} className="border-b py-2">
              <button
                onClick={() => toggleDepartment(department)}
                className="w-full text-left text-gray-700 font-medium flex justify-between"
              >
                🏢 {department} ({records.length} records) — 💰 $
                {calculateDepartmentEarnings(records)}
                <span>{openDepartments[department] ? "▲" : "▼"}</span>
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
          ))}
        </div>
      )}
    </div>
  );
};

export default ProductivityAccordion;
