import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addOrUpdateCalendarEntry } from "../../redux/calendar/operations";
import { AppDispatch } from "../../redux/store";

interface CalendarFormModalProps {
  date: string;
  onClose: () => void;
}

const CalendarFormModal: React.FC<CalendarFormModalProps> = ({
  date: calendarDate,
  onClose: closeModal,
}) => {
  const [isWorkdayState, setIsWorkdayState] = useState<boolean>(true);
  const dispatch = useDispatch<AppDispatch>();

  const handleSubmitForm = async () => {
    await dispatch(addOrUpdateCalendarEntry(calendarDate, isWorkdayState));
    closeModal();
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50 z-50">
      <div className="bg-white rounded-lg shadow-lg p-6 max-w-md w-full">
        <h2 className="text-xl font-bold mb-4">Edit Day</h2>
        <p className="mb-4">
          Date: {new Date(calendarDate).toLocaleDateString()}
        </p>
        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-2">
            Status:
          </label>
          <div className="flex gap-4">
            <label className="flex items-center">
              <input
                type="radio"
                name="status"
                checked={isWorkdayState}
                onChange={() => setIsWorkdayState(true)}
                className="mr-2"
              />
              Workday
            </label>
            <label className="flex items-center">
              <input
                type="radio"
                name="status"
                checked={!isWorkdayState}
                onChange={() => setIsWorkdayState(false)}
                className="mr-2"
              />
              Off Day
            </label>
          </div>
        </div>
        <div className="flex justify-end gap-4">
          <button
            onClick={handleSubmitForm}
            className="px-4 py-2 bg-blue-600 text-white font-medium rounded hover:bg-blue-500"
          >
            Save
          </button>
          <button
            onClick={closeModal}
            className="px-4 py-2 bg-gray-300 text-gray-700 font-medium rounded hover:bg-gray-400"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default CalendarFormModal;
