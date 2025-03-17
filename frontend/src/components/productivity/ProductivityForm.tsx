import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import { addMyProductivityRecord } from "../../redux/productivity/operations";
import { fetchDepartments } from "../../redux/departments/operations";
import { RootState, AppDispatch } from "../../redux/store";
import {
  selectSelectedDepartment,
  selectSelectedDate,
} from "../../redux/productivity/selectors";
import {
  setSelectedDepartment,
  setSelectedDate,
} from "../../redux/productivity/slice";

const ProductivityForm: React.FC = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch<AppDispatch>();
  const selectedDepartment = useSelector(selectSelectedDepartment);
  const selectedDate = useSelector(selectSelectedDate);

  const [departmentId, setDepartmentId] = useState(selectedDepartment);
  const [date, setDate] = useState(selectedDate);
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

  useEffect(() => {
    setDepartmentId(selectedDepartment);
    setDate(selectedDate);
  }, [selectedDepartment, selectedDate]);

  const handleDepartmentChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    setDepartmentId(value);
    dispatch(setSelectedDepartment(value));
  };

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setDate(value);
    dispatch(setSelectedDate(value));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!user) return;

    const department = departments.find((dept) => dept._id === departmentId);
    if (!department) {
      alert(t("department_not_found"));
      return;
    }

    const parsedUnits = parseFloat(unitsCompleted);
    if (isNaN(parsedUnits) || parsedUnits <= 0) {
      alert(t("invalid_units"));
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

    setUnitsCompleted("");
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-md mx-auto p-6 bg-white shadow-md rounded-lg space-y-4"
    >
      <div>
        <label className="block text-gray-700 font-medium mb-2">
          {t("department")}:
        </label>
        <select
          value={departmentId}
          onChange={handleDepartmentChange}
          required
          className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-blue-500"
        >
          <option value="">{t("select_department")}</option>
          {loadingDepartments ? (
            <option disabled>{t("loading_departments")}</option>
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
        <label className="block text-gray-700 font-medium mb-2">
          {t("date")}:
        </label>
        <input
          type="date"
          value={date}
          onChange={handleDateChange}
          required
          className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-blue-500"
        />
      </div>
      <div>
        <label className="block text-gray-700 font-medium mb-2">
          {t("units_completed")}:
        </label>
        <input
          type="text"
          inputMode="decimal"
          pattern="^\d*\.?\d{0,3}$"
          placeholder={t("enter_units")}
          value={unitsCompleted}
          onChange={(e) => setUnitsCompleted(e.target.value)}
          required
          className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-blue-500"
        />
      </div>
      <button
        type="submit"
        className="w-full p-2 bg-blue-600 text-white font-semibold rounded hover:bg-blue-500 focus:outline-none focus:ring focus:ring-blue-300"
      >
        {t("add_productivity_record")}
      </button>
    </form>
  );
};

export default ProductivityForm;
