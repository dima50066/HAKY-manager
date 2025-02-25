import React, { useState } from "react";
import { ProductivityRecord } from "../../types";
import ProductivityItem from "./ProductivityItem";

interface Props {
  date: string;
  records: ProductivityRecord[];
  onEdit: (record: ProductivityRecord) => void;
  onDelete: (id: string) => void;
}

const ProductivityAccordion: React.FC<Props> = ({
  date,
  records,
  onEdit,
  onDelete,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const totalUnits = records.reduce(
    (sum, record) => sum + record.unitsCompleted,
    0
  );
  const totalEarnings = records
    .reduce((sum, record) => sum + record.totalEarnings, 0)
    .toFixed(2);

  return (
    <div className="border border-gray-300 rounded-lg overflow-hidden mb-2">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full bg-gray-200 px-4 py-2 flex justify-between items-center text-left text-gray-800 font-semibold"
      >
        <span>
          📅 {date} — {totalUnits} units, ${totalEarnings}
        </span>
        <span>{isOpen ? "▲" : "▼"}</span>
      </button>
      {isOpen && (
        <ul className="bg-white px-4 py-2">
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
};

export default ProductivityAccordion;
