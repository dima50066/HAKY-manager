import React from "react";
import { useSelector } from "react-redux";
import { selectCalendarEntries } from "../../redux/calendar/selectors";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";

const localizer = momentLocalizer(moment);

const CalendarView: React.FC<{ onDayClick: (date: Date) => void }> = ({
  onDayClick,
}) => {
  const calendarEntries = useSelector(selectCalendarEntries);

  const events = calendarEntries.map((entry) => ({
    title: entry.isWorkday ? "Working Day" : "Off Day",
    start: new Date(entry.date),
    end: new Date(entry.date),
    isWorkday: entry.isWorkday,
  }));

  const handleSlotSelect = ({ start }: { start: Date }) => {
    onDayClick(start);
  };

  const getEventStyle = (event: any) => {
    const backgroundColor = event.isWorkday ? "#4caf50" : "#ff5722";
    return {
      style: {
        backgroundColor,
        color: "#fff",
        borderRadius: "50%",
        padding: "4px 8px",
        textAlign: "center" as React.CSSProperties["textAlign"],
        boxShadow: "0px 3px 6px rgba(0, 0, 0, 0.1)",
      },
    };
  };

  const getDayStyle = (date: Date) => {
    const entry = calendarEntries.find((entry) => {
      const entryDate = new Date(entry.date);
      return (
        entryDate.getDate() === date.getDate() &&
        entryDate.getMonth() === date.getMonth() &&
        entryDate.getFullYear() === date.getFullYear()
      );
    });

    if (entry) {
      return {
        style: {
          backgroundColor: entry.isWorkday ? "#d9fdd3" : "#fde8e8",
          border: entry.isWorkday ? "1px solid #4caf50" : "1px solid #ff5722",
          borderRadius: "4px",
        },
      };
    }

    return {};
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-xl">
      <Calendar
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        selectable
        onSelectSlot={handleSlotSelect}
        style={{ height: "600px" }}
        views={["month"]}
        eventPropGetter={getEventStyle}
        dayPropGetter={getDayStyle}
        className="custom-calendar"
      />
    </div>
  );
};

export default CalendarView;
