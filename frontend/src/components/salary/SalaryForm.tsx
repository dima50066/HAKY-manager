import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateUserSalary } from "../../redux/salary/operations";
import {
  selectMySalaryHistoryLoading,
  selectMySalaryHistoryError,
} from "../../redux/salary/selectors";
import { selectUser } from "../../redux/auth/selectors";
import { AppDispatch } from "../../redux/store";

interface SalaryFormProps {
  recordId: string;
}

const SalaryForm: React.FC<SalaryFormProps> = ({ recordId }) => {
  const dispatch = useDispatch<AppDispatch>();
  const loading = useSelector(selectMySalaryHistoryLoading);
  const error = useSelector(selectMySalaryHistoryError);
  const user = useSelector(selectUser);

  const [hoursWorked, setHoursWorked] = useState<number>(0);

  const handleUpdateSalary = () => {
    dispatch(
      updateUserSalary({
        userId: user?._id || "",
        recordId,
        additionalHours: hoursWorked,
      })
    );
  };

  return (
    <div className="max-w-lg mx-auto bg-white shadow-md rounded-lg p-6 mt-4">
      <h2 className="text-xl font-semibold text-gray-700 text-center mb-4">
        Update Worked Hours
      </h2>

      <div className="mb-4">
        <label className="block text-gray-600 font-medium mb-2">
          Enter New Hours Worked
        </label>
        <input
          type="number"
          placeholder="Enter hours worked"
          value={hoursWorked}
          onChange={(e) => setHoursWorked(Number(e.target.value))}
          className="w-full border border-gray-300 rounded-md p-2 text-gray-700"
        />
      </div>

      <button
        onClick={handleUpdateSalary}
        disabled={loading}
        className="w-full bg-blue-500 text-white font-semibold rounded-md p-2 hover:bg-blue-600 disabled:bg-gray-400"
      >
        Update Salary
      </button>

      {loading && (
        <p className="text-center text-gray-500 mt-4">Updating salary...</p>
      )}
      {error && <p className="text-center text-red-500 mt-4">Error: {error}</p>}
    </div>
  );
};

export default SalaryForm;
