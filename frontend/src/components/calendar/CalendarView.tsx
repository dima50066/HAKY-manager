import React from "react";
import { useSelector } from "react-redux";
import { selectCalendarEntries } from "../../redux/calendar/selectors";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import "./CalendarView.css";
import "moment/locale/uk";

moment.updateLocale("uk", {
  week: {
    dow: 1,
    doy: 4,
  },
});

const localizer = momentLocalizer(moment);

const CalendarView: React.FC<{ onDayClick: (date: Date) => void }> = ({
  onDayClick,
}) => {
  const calendarEntries = useSelector(selectCalendarEntries);

  const handleSlotSelect = ({ start }: { start: Date }) => {
    onDayClick(start);
  };

  const getDayStyle = (date: Date) => {
    const today = new Date();
    const isToday =
      today.getDate() === date.getDate() &&
      today.getMonth() === date.getMonth() &&
      today.getFullYear() === date.getFullYear();

    const entry = calendarEntries.find((entry) => {
      const entryDate = new Date(entry.date);
      return (
        entryDate.getDate() === date.getDate() &&
        entryDate.getMonth() === date.getMonth() &&
        entryDate.getFullYear() === date.getFullYear()
      );
    });

    if (isToday && entry) {
      return {
        className: entry.isWorkday ? "today-workday" : "today-holiday",
      };
    } else if (entry) {
      return {
        className: entry.isWorkday ? "workday" : "holiday",
      };
    }

    if (isToday) {
      return { className: "today-neutral" };
    }

    return {};
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-xl">
      <Calendar
        localizer={localizer}
        events={[]} // Відсутні події
        startAccessor="start"
        endAccessor="end"
        selectable
        onSelectSlot={handleSlotSelect}
        style={{ height: "600px" }}
        views={["month"]}
        dayPropGetter={getDayStyle}
        className="custom-calendar"
      />
    </div>
  );
};

export default CalendarView;
