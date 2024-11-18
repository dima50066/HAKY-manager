import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import CalendarView from "../../components/calendar/CalendarView";
import CalendarFormModal from "../../components/calendar/CalendarFormModal";
import { AppDispatch } from "../../redux/store";
import { fetchCalendarEntries } from "../../redux/calendar/operations";
import { selectCalendarLoading } from "../../redux/calendar/selectors";
import LoadingSpinner from "../../components/loader/LoadingSpinner";

const CalendarPage = () => {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const dispatch = useDispatch<AppDispatch>();
  const isLoading = useSelector(selectCalendarLoading);

  useEffect(() => {
    dispatch(fetchCalendarEntries());
  }, [dispatch]);

  const handleDayClick = (date: Date) => {
    setSelectedDate(date);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedDate(null);
  };

  return (
    <div className="mt-6 px-4">
      <h1 className="text-2xl font-bold text-center mb-6">Календар</h1>

      {isLoading ? (
        <LoadingSpinner loading={isLoading} size={50} color="#3498db" />
      ) : (
        <>
          <CalendarView onDayClick={handleDayClick} />
          {isModalOpen && selectedDate && (
            <CalendarFormModal
              date={selectedDate.toISOString()}
              onClose={closeModal}
            />
          )}
        </>
      )}
    </div>
  );
};

export default CalendarPage;
