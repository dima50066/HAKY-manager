import React, { useState } from "react";
import { useAppDispatch } from "../../redux/store";
import { createRequest } from "../../redux/requests/operations";

interface RequestFormProps {
  selectedDates: string[];
}

const RequestForm: React.FC<RequestFormProps> = ({ selectedDates }) => {
  const dispatch = useAppDispatch();
  const [type, setType] = useState<"vacation" | "day-off" | "work-day">(
    "vacation"
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedDates.length === 0) return alert("Please select a date");

    const startDate = new Date(selectedDates[0]);
    startDate.setHours(0, 0, 0, 0);
    const utcStartDate = new Date(
      startDate.getTime() - startDate.getTimezoneOffset() * 60000
    );

    const endDate =
      selectedDates.length > 1
        ? new Date(selectedDates[1])
        : new Date(selectedDates[0]);
    endDate.setHours(23, 59, 59, 999);
    const utcEndDate = new Date(
      endDate.getTime() - endDate.getTimezoneOffset() * 60000
    );

    dispatch(
      createRequest({
        type,
        date: utcStartDate.toISOString(),
        endDate: utcEndDate.toISOString(),
      })
    );
  };

  return (
    <div className="border p-4 rounded shadow-md">
      <h2 className="text-lg font-semibold mb-2">Create Request</h2>
      <form onSubmit={handleSubmit}>
        <label className="block mb-2">
          Type of request:
          <select
            value={type}
            onChange={(e) =>
              setType(e.target.value as "vacation" | "day-off" | "work-day")
            }
            className="ml-2 border"
          >
            <option value="day-off">Day off</option>
            <option value="work-day">Work day</option>
            <option value="vacation">Vacation</option>
          </select>
        </label>
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Send
        </button>
      </form>
    </div>
  );
};

export default RequestForm;
