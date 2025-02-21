import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addMyProductivityRecord } from "../../redux/productivity/operations";
import { fetchDepartments } from "../../redux/departments/operations";
import { RootState, AppDispatch } from "../../redux/store";

const ProductivityForm: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const [departmentId, setDepartmentId] = useState("");
  const [date, setDate] = useState("");
  const [unitsCompleted, setUnitsCompleted] = useState<string>("");

  const user = useSelector((state: RootState) => state.auth.user);
  const departments = useSelector(
    (state: RootState) => state.departments.departments
  );
  const loadingDepartments = useSelector(
    (state: RootState) => state.departments.loading
  );

  useEffect(() => {
    dispatch(fetchDepartments());
  }, [dispatch]);

  const handleUnitsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value;

    value = value.replace(/[^0-9.]/g, "");

    const dotCount = (value.match(/\./g) || []).length;
    if (dotCount > 1) {
      return;
    }

    if (value.includes(".")) {
      const [integerPart, decimalPart] = value.split(".");
      if (decimalPart.length > 3) {
        value = `${integerPart}.${decimalPart.slice(0, 3)}`;
      }
    }

    setUnitsCompleted(value);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!user) return;

    const department = departments.find((dept) => dept._id === departmentId);
    if (!department) {
      alert("Department not found");
      return;
    }

    const parsedUnits = parseFloat(unitsCompleted);
    if (isNaN(parsedUnits) || parsedUnits <= 0) {
      alert("Please enter a valid number for units completed.");
      return;
    }

    dispatch(
      addMyProductivityRecord({
        department: {
          id: department._id,
          name: department.name,
        },
        date,
        unitsCompleted: parsedUnits,
      })
    );

    setDepartmentId("");
    setDate("");
    setUnitsCompleted("");
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-md mx-auto p-6 bg-white shadow-md rounded-lg space-y-4"
    >
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
          required
          className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-blue-500"
        />
      </div>
      <div>
        <label className="block text-gray-700 font-medium mb-2">
          Units Completed:
        </label>
        <input
          type="text"
          inputMode="decimal"
          pattern="^\d*\.?\d{0,3}$"
          placeholder="Enter units (e.g. 3002.505)"
          value={unitsCompleted}
          onChange={handleUnitsChange}
          required
          className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-blue-500"
        />
      </div>
      <button
        type="submit"
        className="w-full p-2 bg-blue-600 text-white font-semibold rounded hover:bg-blue-500 focus:outline-none focus:ring focus:ring-blue-300"
      >
        Add Productivity Record
      </button>
    </form>
  );
};

export default ProductivityForm;
