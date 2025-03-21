import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { ProductivityRecord } from "../../types";
import ProductivityItem from "./ProductivityItem";
import Icon from "../../shared/icon/Icon";

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
  const { t } = useTranslation();
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

  const calculateDepartmentUnits = (records: ProductivityRecord[]) => {
    return records.reduce((sum, record) => sum + record.unitsCompleted, 0);
  };

  return (
    <div className="border border-gray-300 rounded-lg overflow-hidden mb-2">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full bg-gray-200 px-4 py-2 flex flex-col items-center text-gray-800 font-semibold"
      >
        <span className="flex items-center gap-2">
          <Icon id="day" width={16} height={16} className="fill-gray-700" />
          {date}
          <Icon id="box" width={16} height={16} className="fill-gray-700" />
          {totalUnits}
        </span>

        <span className="flex items-center gap-2 mt-1">
          <Icon id="coin" width={16} height={16} className="fill-gray-700" />
          {totalEarnings}
          <Icon
            id={isOpen ? "arrow-up" : "arrow-down"}
            width={16}
            height={16}
            className="fill-gray-700"
          />
        </span>
      </button>

      {isOpen && (
        <div className="bg-white px-4 py-2">
          {Object.entries(recordsByDepartment).map(([department, records]) => (
            <div key={department} className="border-b py-2">
              <button
                onClick={() => toggleDepartment(department)}
                className="w-full text-left text-gray-700 font-medium flex flex-col justify-between items-start"
              >
                <span className="w-full break-words">
                  {t("productivity_department")}: {department}
                </span>

                <span className="w-full flex justify-between items-center mt-1">
                  <span className="flex items-center gap-2">
                    <Icon
                      id="box"
                      width={14}
                      height={14}
                      className="fill-gray-700"
                    />
                    {calculateDepartmentUnits(records)}
                    <Icon
                      id="coin"
                      width={14}
                      height={14}
                      className="fill-gray-700"
                    />
                    {calculateDepartmentEarnings(records)}
                  </span>

                  <Icon
                    id={openDepartments[department] ? "arrow-up" : "arrow-down"}
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
          ))}
        </div>
      )}
    </div>
  );
};

export default ProductivityAccordion;
