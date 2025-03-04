import React, { useState, useEffect } from "react";
import CalendarView from "../../components/calendar/CalendarView";
import RequestForm from "../../components/calendar/RequestForm";
import RequestList from "../../components/calendar/RequestList";
import { useAppDispatch } from "../../redux/store";
import { fetchRequests } from "../../redux/requests/operations";
import { fetchAllUsers } from "../../redux/ranking/operations";

const CalendarPage: React.FC = () => {
  const dispatch = useAppDispatch();
  const [selectedDates, setSelectedDates] = useState<string[]>([]);

  useEffect(() => {
    dispatch(fetchRequests());
    dispatch(fetchAllUsers());
  }, [dispatch]);

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Calendar</h1>
      <div className="flex gap-6">
        <CalendarView
          selectedDates={selectedDates}
          setSelectedDates={setSelectedDates}
        />
        <RequestForm selectedDates={selectedDates} />
      </div>
      <RequestList />
    </div>
  );
};

export default CalendarPage;
