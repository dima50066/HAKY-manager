import React from "react";
import { ProductivityRecord } from "../../types";
import Icon from "../../shared/icon/Icon";

interface Props {
  record: ProductivityRecord;
  onEdit: (record: ProductivityRecord) => void;
  onDelete: (id: string) => void;
}

const ProductivityItem: React.FC<Props> = ({ record, onEdit, onDelete }) => {
  return (
    <li className="p-4 border-b border-gray-200 flex flex-col items-start">
      <h3 className="text-lg font-semibold text-gray-700">
        {record.departmentName}
      </h3>

      <p className="text-gray-600 flex items-center gap-2">
        <Icon id="box" width={14} height={14} className="fill-gray-700" />
        {record.unitsCompleted}
        <Icon id="coin" width={14} height={14} className="fill-gray-700" />
        {record.totalEarnings.toFixed(2)}
      </p>

      <div className="flex space-x-2 mt-2">
        <button
          onClick={() => onEdit(record)}
          className="px-3 py-1 bg-yellow-500 text-white text-sm rounded hover:bg-yellow-600 flex items-center gap-1"
        >
          <Icon id="edit" width={14} height={14} className="fill-white" />
          Edit
        </button>
        <button
          onClick={() => onDelete(record._id)}
          className="px-3 py-1 bg-red-500 text-white text-sm rounded hover:bg-red-600 flex items-center gap-1"
        >
          <Icon id="trash" width={14} height={14} className="fill-white" />
          Delete
        </button>
      </div>
    </li>
  );
};

export default ProductivityItem;
