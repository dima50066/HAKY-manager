import React, { useState } from "react";
import { Calendar, dateFnsLocalizer, Event } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { format, parse, startOfWeek, getDay } from "date-fns";
import { enUS } from "date-fns/locale";

const locales = { "en-US": enUS };
const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek: () => startOfWeek(new Date(), { weekStartsOn: 1 }),
  getDay,
  locales,
});

interface CalendarViewProps {
  selectedDates: string[];
  setSelectedDates: (dates: string[]) => void;
}

const CalendarView: React.FC<CalendarViewProps> = ({
  selectedDates,
  setSelectedDates,
}) => {
  const [events, setEvents] = useState<Event[]>([]);

  const handleSelectSlot = ({ start, end }: { start: Date; end: Date }) => {
    const formattedStart = new Date(start);
    formattedStart.setHours(0, 0, 0, 0);

    const correctedEnd = new Date(end);
    correctedEnd.setDate(correctedEnd.getDate() - 1);
    correctedEnd.setHours(23, 59, 59, 999);

    setSelectedDates([
      formattedStart.toISOString(),
      correctedEnd.toISOString(),
    ]);

    setEvents([
      {
        title: "Selected Dates",
        start: formattedStart,
        end: correctedEnd,
        allDay: true,
      },
    ]);
  };

  return (
    <div className="border p-4 rounded shadow-md">
      <h2 className="text-lg font-semibold mb-2">Calendar</h2>
      <Calendar
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        selectable
        style={{ height: 400 }}
        onSelectSlot={handleSelectSlot}
        views={["month"]}
      />
      <p className="mt-2">
        Selected Dates:{" "}
        {selectedDates.length > 0 ? selectedDates.join(", ") : "Not selected"}
      </p>
    </div>
  );
};

export default CalendarView;
