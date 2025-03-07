import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateMyProductivityRecord } from "../../redux/productivity/operations";
import { fetchDepartments } from "../../redux/departments/operations";
import { AppDispatch, RootState } from "../../redux/store";
import { ProductivityRecord, Department } from "../../types";
import Icon from "../../shared/icon/Icon";

interface ProductivityUpdateFormProps {
  record: ProductivityRecord;
  onClose: () => void;
}

const ProductivityUpdateForm: React.FC<ProductivityUpdateFormProps> = ({
  record,
  onClose,
}) => {
  const dispatch = useDispatch<AppDispatch>();
  const departments = useSelector(
    (state: RootState) => state.departments.departments
  );
  const loadingDepartments = useSelector(
    (state: RootState) => state.departments.loading
  );

  console.log("RECORD RECEIVED:", record);

  const getDepartmentId = (
    department: string | Department | undefined
  ): string => {
    if (!department) return "";
    return typeof department === "string" ? department : department._id;
  };

  const [departmentId, setDepartmentId] = useState<string>(
    getDepartmentId(record.departmentId)
  );
  const [date, setDate] = useState<string>(
    record.date ? new Date(record.date).toISOString().split("T")[0] : ""
  );
  const [unitsCompleted, setUnitsCompleted] = useState<number>(
    record.unitsCompleted
  );

  useEffect(() => {
    dispatch(fetchDepartments());
  }, [dispatch]);

  useEffect(() => {
    console.log("Updated Record:", record);
    console.log("Updated Date (Before Conversion):", record.date);

    setDepartmentId(getDepartmentId(record.departmentId));
    setDate(
      record.date ? new Date(record.date).toISOString().split("T")[0] : ""
    );
    setUnitsCompleted(record.unitsCompleted);

    console.log("Updated Date (After Conversion):", date);
    console.log("Updated DepartmentId:", departmentId);
  }, [record, date, departmentId]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Submitting Data:", { departmentId, date, unitsCompleted });

    dispatch(
      updateMyProductivityRecord({
        id: record._id,
        data: {
          departmentId,
          date,
          unitsCompleted,
        },
      })
    );

    onClose();
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-md mx-auto p-6 bg-white shadow-md rounded-lg space-y-4"
    >
      <h2 className="text-lg font-semibold text-gray-700">
        Update Productivity Record
      </h2>
      <div>
        <label className="block text-gray-700 font-medium mb-2">
          Department:
        </label>
        <select
          value={departmentId}
          onChange={(e) => setDepartmentId(e.target.value)}
          required
          className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-blue-500"
        >
          <option value="">Select a department</option>
          {loadingDepartments ? (
            <option disabled>Loading departments...</option>
          ) : (
            departments.map((dept) => (
              <option key={dept._id} value={dept._id}>
                {dept.name} - {dept.description}
              </option>
            ))
          )}
        </select>
      </div>
      <div>
        <label className="block text-gray-700 font-medium mb-2">Date:</label>
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-blue-500"
        />
      </div>
      <div>
        <label className="block text-gray-700 font-medium mb-2">
          Units Completed:
        </label>
        <div className="flex items-center space-x-2">
          <button
            type="button"
            onClick={() => setUnitsCompleted((prev) => Math.max(0, prev - 1))}
            className="p-2 bg-gray-200 rounded hover:bg-gray-300"
          >
            <Icon id="minus" width={16} height={16} className="stroke-black" />
          </button>
          <input
            type="number"
            value={unitsCompleted}
            onChange={(e) => setUnitsCompleted(+e.target.value)}
            required
            className="w-full no-spinner p-2 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-blue-500 text-center"
          />
          <button
            type="button"
            onClick={() => setUnitsCompleted((prev) => prev + 1)}
            className="p-2 bg-gray-200 rounded hover:bg-gray-300"
          >
            <Icon id="plus" width={16} height={16} className="stroke-black" />
          </button>
        </div>
      </div>
      <button
        type="submit"
        className="w-full p-2 bg-blue-600 text-white font-semibold rounded hover:bg-blue-500 focus:outline-none focus:ring focus:ring-blue-300"
      >
        Save Changes
      </button>
    </form>
  );
};

export default ProductivityUpdateForm;
