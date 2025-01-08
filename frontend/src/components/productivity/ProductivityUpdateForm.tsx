import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateProductivityRecord } from "../../redux/productivity/operations";
import { fetchDepartments } from "../../redux/departments/operations";
import { AppDispatch, RootState } from "../../redux/store";
import { ProductivityRecord } from "../../types";

interface ProductivityUpdateFormProps {
  record: ProductivityRecord;
  onClose: () => void;
}

const ProductivityUpdateForm: React.FC<ProductivityUpdateFormProps> = ({
  record,
  onClose,
}) => {
  const dispatch = useDispatch<AppDispatch>();
  const [department, setDepartment] = useState({
    id: record.departmentId as string,
    name: record.department?.name || "",
  });
  const [date, setDate] = useState(record.date);
  const [unitsCompleted, setUnitsCompleted] = useState(record.unitsCompleted);

  const departments = useSelector(
    (state: RootState) => state.departments.departments
  );
  const loadingDepartments = useSelector(
    (state: RootState) => state.departments.loading
  );

  useEffect(() => {
    dispatch(fetchDepartments());
  }, [dispatch]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    dispatch(
      updateProductivityRecord({
        id: record._id,
        data: {
          department: {
            id: department.id,
            name: department.name.trim() || record.department?.name || "",
          },
          date,
          unitsCompleted,
        },
      })
    );

    onClose();
  };

  const handleDepartmentChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedDepartment = departments.find(
      (dept) => dept._id === e.target.value
    );
    if (selectedDepartment) {
      setDepartment({
        id: selectedDepartment._id,
        name: selectedDepartment.name,
      });
    }
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
          value={department.id}
          onChange={handleDepartmentChange}
          required
          className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-blue-500"
        >
          <option value="">Select a department</option>
          {loadingDepartments ? (
            <option disabled>Loading departments...</option>
          ) : (
            departments.map((department) => (
              <option key={department._id} value={department._id}>
                {department.name} - {department.description}
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
        <input
          type="number"
          value={unitsCompleted}
          onChange={(e) => setUnitsCompleted(+e.target.value)}
          required
          className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-blue-500"
        />
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
