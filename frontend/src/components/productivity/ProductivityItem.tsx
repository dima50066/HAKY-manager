import React from "react";
import { ProductivityRecord } from "../../types";

interface Props {
  record: ProductivityRecord;
  onEdit: (record: ProductivityRecord) => void;
  onDelete: (id: string) => void;
}

const ProductivityItem: React.FC<Props> = ({ record, onEdit, onDelete }) => {
  return (
    <li className="p-4 border-b border-gray-200 flex justify-between items-center">
      <div>
        <h3 className="text-lg font-semibold text-gray-700">
          🏢 {record.departmentName}
        </h3>
        <p className="text-gray-600">📦 {record.unitsCompleted} units</p>
        <p className="text-gray-600">💰 ${record.totalEarnings.toFixed(2)}</p>
      </div>
      <div className="flex space-x-2">
        <button
          onClick={() => onEdit(record)}
          className="px-3 py-1 bg-yellow-500 text-white text-sm rounded hover:bg-yellow-600"
        >
          Edit
        </button>
        <button
          onClick={() => onDelete(record._id)}
          className="px-3 py-1 bg-red-500 text-white text-sm rounded hover:bg-red-600"
        >
          Delete
        </button>
      </div>
    </li>
  );
};

export default ProductivityItem;
