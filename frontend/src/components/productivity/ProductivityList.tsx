import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
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
import Modal from "../../shared/modal/Modal";
import { ProductivityRecord } from "../../types";

export const groupByDateAndDepartment = (records: ProductivityRecord[]) => {
  return records.reduce((acc, record) => {
    const date = new Date(record.date).toLocaleDateString();
    if (!acc[date]) {
      acc[date] = {};
    }
    if (!acc[date][record.departmentName]) {
      acc[date][record.departmentName] = [];
    }
    acc[date][record.departmentName].push(record);
    return acc;
  }, {} as Record<string, Record<string, ProductivityRecord[]>>);
};

const ProductivityList: React.FC = () => {
  const { t } = useTranslation();
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

  const groupedRecords = groupByDateAndDepartment(records);

  const sortedDates = Object.keys(groupedRecords).sort((a, b) => {
    const dateA = new Date(a.split(".").reverse().join("-"));
    const dateB = new Date(b.split(".").reverse().join("-"));
    return dateB.getTime() - dateA.getTime();
  });

  return (
    <div className="bg-white shadow-md rounded-lg">
      {loading && <p className="text-gray-600">{t("loading_records")}</p>}
      {error && <p className="text-red-500">{error}</p>}

      {!loading && records.length === 0 && (
        <p className="text-gray-500">{t("no_records_found")}</p>
      )}

      {sortedDates.map((date) => (
        <ProductivityAccordion
          key={date}
          date={date}
          recordsByDepartment={groupedRecords[date]}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      ))}
      <ProductivitySummary records={records} />

      {editingRecord && (
        <Modal isOpen={!!editingRecord} onClose={() => setEditingRecord(null)}>
          <ProductivityUpdateForm
            record={editingRecord}
            onClose={() => setEditingRecord(null)}
          />
        </Modal>
      )}
    </div>
  );
};

export default ProductivityList;
