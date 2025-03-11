import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateUserSalary } from "../../redux/salary/operations";
import {
  selectMySalaryHistoryLoading,
  selectMySalaryHistoryError,
  selectMySalaryHistory,
} from "../../redux/salary/selectors";
import { selectUser } from "../../redux/auth/selectors";
import { AppDispatch } from "../../redux/store";
import Icon from "../../shared/icon/Icon";

interface SalaryFormProps {
  recordId: string;
}

const SalaryForm: React.FC<SalaryFormProps> = ({ recordId }) => {
  const dispatch = useDispatch<AppDispatch>();
  const loading = useSelector(selectMySalaryHistoryLoading);
  const error = useSelector(selectMySalaryHistoryError);
  const user = useSelector(selectUser);
  const salaryHistory = useSelector(selectMySalaryHistory);

  const record = salaryHistory.find((item) => item._id === recordId);

  const [hoursWorked, setHoursWorked] = useState<number>(
    record?.hoursWorked || 0
  );

  useEffect(() => {
    if (record) {
      setHoursWorked(record.hoursWorked);
    }
  }, [record]);

  const handleUpdateSalary = () => {
    dispatch(
      updateUserSalary({
        userId: user?._id || "",
        recordId,
        additionalHours: hoursWorked,
      })
    );
  };

  const decreaseHours = () => {
    setHoursWorked((prev) => Math.max(0, prev - 1));
  };

  const increaseHours = () => {
    setHoursWorked((prev) => prev + 1);
  };

  return (
    <div className="max-w-lg mx-auto bg-white shadow-lg rounded-xl p-6 mt-4">
      <h2 className="text-xl font-semibold text-gray-700 text-center mb-4">
        Update Worked Hours
      </h2>

      <div className="mb-4 flex items-center justify-center gap-4">
        <button
          onClick={decreaseHours}
          className="bg-gray-200 hover:bg-gray-300 p-2 rounded-full transition-all"
        >
          <Icon
            id="minus"
            width={24}
            height={24}
            className="text-gray-600 stroke-black"
          />
        </button>

        <input
          type="number"
          placeholder="Enter hours worked"
          value={hoursWorked}
          onChange={(e) => setHoursWorked(Number(e.target.value))}
          className="w-20 border border-gray-300 rounded-md p-2 text-center text-gray-700 no-spinner"
        />

        <button
          onClick={increaseHours}
          className="bg-gray-200 hover:bg-gray-300 p-2 rounded-full transition-all"
        >
          <Icon
            id="plus"
            width={24}
            height={24}
            className="text-gray-600 stroke-black"
          />
        </button>
      </div>

      <button
        onClick={handleUpdateSalary}
        disabled={loading}
        className="w-full bg-blue-500 text-white font-semibold rounded-lg p-2 hover:bg-blue-600 disabled:bg-gray-400 transition-all duration-200"
      >
        {loading ? "Updating..." : "Update Salary"}
      </button>

      {error && <p className="text-center text-red-500 mt-4">Error: {error}</p>}
    </div>
  );
};

export default SalaryForm;
