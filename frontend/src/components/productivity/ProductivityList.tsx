import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchProductivityRecords,
  deleteProductivityRecord,
} from "../../redux/productivity/operations";
import { selectProductivityRecords } from "../../redux/productivity/selectors";
import { AppDispatch } from "../../redux/store";
import ProductivityUpdateForm from "./ProductivityUpdateForm";
import { ProductivityRecord } from "../../types";

const ProductivityList: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const records = useSelector(selectProductivityRecords);
  const [editingRecord, setEditingRecord] = useState<ProductivityRecord | null>(
    null
  );

  useEffect(() => {
    dispatch(fetchProductivityRecords());
  }, [dispatch]);

  const handleDelete = (id: string) => {
    dispatch(deleteProductivityRecord(id));
  };

  const handleEdit = (record: ProductivityRecord) => {
    setEditingRecord(record);
  };

  const closeUpdateForm = () => {
    setEditingRecord(null);
  };

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white shadow-md rounded-lg mt-6">
      <h2 className="text-2xl font-semibold text-gray-800 mb-4">
        Productivity Records
      </h2>
      <ul className="space-y-4">
        {records.map((record) => (
          <li
            key={record._id}
            className="p-4 border border-gray-200 rounded-lg bg-gray-50"
          >
            <div className="flex justify-between items-center mb-2">
              <h3 className="text-lg font-semibold text-gray-700">
                Department: {record.departmentName || "Unknown Department"}
              </h3>
              <div className="flex space-x-2">
                <button
                  onClick={() => handleEdit(record)}
                  className="px-3 py-1 bg-yellow-500 text-white text-sm rounded hover:bg-yellow-600 focus:outline-none focus:ring focus:ring-yellow-300"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(record._id)}
                  className="px-3 py-1 bg-red-500 text-white text-sm rounded hover:bg-red-600 focus:outline-none focus:ring focus:ring-red-300"
                >
                  Delete
                </button>
              </div>
            </div>
            <p className="text-gray-600">
              <span className="font-semibold">Date:</span>{" "}
              {new Date(record.date).toLocaleDateString()}
            </p>
            <p className="text-gray-600">
              <span className="font-semibold">Units Completed:</span>{" "}
              {record.unitsCompleted}
            </p>
            <p className="text-gray-600">
              <span className="font-semibold">Earnings:</span> $
              {record.totalEarnings.toFixed(2)}
            </p>
          </li>
        ))}
      </ul>

      {editingRecord && (
        <div className="mt-6">
          <ProductivityUpdateForm
            record={editingRecord}
            onClose={closeUpdateForm}
          />
        </div>
      )}
    </div>
  );
};

export default ProductivityList;
