import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchMyProductivityRecords,
  deleteMyProductivityRecord,
} from "../../redux/productivity/operations";
import {
  selectMyProductivityRecords,
  selectMyProductivityLoading,
  selectMyProductivityError,
} from "../../redux/productivity/selectors";
import { AppDispatch } from "../../redux/store";
import ProductivityUpdateForm from "./ProductivityUpdateForm";
import ProductivityAccordion from "./ProductivityAccordion";
import ProductivitySummary from "./ProductivitySummary";
import { ProductivityRecord } from "../../types";

export const groupByDate = (records: ProductivityRecord[]) => {
  return records.reduce((acc, record) => {
    const date = new Date(record.date).toLocaleDateString();
    if (!acc[date]) {
      acc[date] = [];
    }
    acc[date].push(record);
    return acc;
  }, {} as Record<string, ProductivityRecord[]>);
};

const ProductivityList: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const records = useSelector(selectMyProductivityRecords);
  const loading = useSelector(selectMyProductivityLoading);
  const error = useSelector(selectMyProductivityError);
  const [editingRecord, setEditingRecord] = useState<ProductivityRecord | null>(
    null
  );

  useEffect(() => {
    dispatch(fetchMyProductivityRecords());
  }, [dispatch]);

  const handleDelete = (id: string) => {
    dispatch(deleteMyProductivityRecord(id));
  };

  const handleEdit = (record: ProductivityRecord) => {
    setEditingRecord(record);
  };

  const groupedRecords = groupByDate(records);

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white shadow-md rounded-lg mt-6">
      <h2 className="text-2xl font-semibold text-gray-800 mb-4">
        My Productivity Records
      </h2>

      {loading && <p className="text-gray-600">Loading records...</p>}
      {error && <p className="text-red-500">{error}</p>}

      {!loading && records.length === 0 && (
        <p className="text-gray-500">No records found.</p>
      )}

      <ProductivitySummary records={records} />

      {Object.entries(groupedRecords).map(([date, records]) => (
        <ProductivityAccordion
          key={date}
          date={date}
          records={records}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      ))}

      {editingRecord && (
        <ProductivityUpdateForm
          record={editingRecord}
          onClose={() => setEditingRecord(null)}
        />
      )}
    </div>
  );
};

export default ProductivityList;
