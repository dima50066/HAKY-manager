import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  updateUserSalary,
  calculateUserSalary,
  fetchMySalaryHistory,
} from "../../redux/salary/operations";
import { selectMySalaryHistory } from "../../redux/salary/selectors";
import { selectUser } from "../../redux/auth/selectors";
import { AppDispatch } from "../../redux/store";
import Icon from "../../shared/icon/Icon";
import * as Popover from "@radix-ui/react-popover";

interface SalaryFormProps {
  recordId: string;
}

const SalaryForm: React.FC<SalaryFormProps> = ({ recordId }) => {
  const dispatch = useDispatch<AppDispatch>();
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

  const handleUpdateSalary = async () => {
    await dispatch(
      updateUserSalary({
        userId: user?._id || "",
        recordId,
        additionalHours: hoursWorked,
      })
    ).unwrap();

    await dispatch(calculateUserSalary({ userId: user?._id || "" })).unwrap();
    dispatch(fetchMySalaryHistory());
  };

  return (
    <div className="max-w-lg mx-auto bg-white shadow-lg rounded-xl p-6 mt-4">
      <div className="flex items-center justify-center gap-2 relative">
        <h2 className="text-xl font-semibold text-gray-700 text-center">
          Update Worked Hours
        </h2>

        {/* Popover для пояснення введення годин */}
        <Popover.Root>
          <Popover.Trigger asChild>
            <button className="p-2 rounded-full bg-gray-200 hover:bg-gray-300 transition-all">
              <Icon
                id="info"
                width={20}
                height={20}
                className="text-gray-600"
              />
            </button>
          </Popover.Trigger>
          <Popover.Portal>
            <Popover.Content
              side="bottom"
              align="center"
              className="bg-white shadow-xl rounded-lg p-4 w-72 text-sm text-gray-700 border border-gray-200"
            >
              <p className="font-semibold">How to enter worked hours:</p>
              <ul className="list-disc pl-4 mt-2">
                <li>
                  Enter the **total hours worked** (previous + new hours).
                </li>
                <li>
                  This helps track your work history and salary calculations.
                </li>
                <li>
                  If you live independently, your salary may depend on logged
                  hours.
                </li>
                <li>Ensure accuracy for proper payroll calculation.</li>
              </ul>
              <Popover.Close className="absolute top-2 right-2 text-gray-500 hover:text-gray-700">
                ✖
              </Popover.Close>
            </Popover.Content>
          </Popover.Portal>
        </Popover.Root>
      </div>

      <div className="mb-4 flex items-center justify-center gap-4 mt-4">
        <button
          onClick={() => setHoursWorked((prev) => Math.max(0, prev - 1))}
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
          onClick={() => setHoursWorked((prev) => prev + 1)}
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
        className="w-full bg-blue-500 text-white font-semibold rounded-lg p-2 hover:bg-blue-600 disabled:bg-gray-400 transition-all duration-200"
      >
        Update Salary
      </button>
    </div>
  );
};

export default SalaryForm;
