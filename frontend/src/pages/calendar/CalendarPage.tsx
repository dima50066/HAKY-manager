import React, { useState, useEffect } from "react";
import CalendarView from "../../components/calendar/CalendarView";
import RequestForm from "../../components/calendar/RequestForm";
import RequestList from "../../components/calendar/RequestList";
import { useAppDispatch } from "../../redux/store";
import { fetchRequests } from "../../redux/requests/operations";
import { fetchAllUsers } from "../../redux/ranking/operations";
import * as Popover from "@radix-ui/react-popover";
import Icon from "../../shared/icon/Icon";

const CalendarPage: React.FC = () => {
  const dispatch = useAppDispatch();
  const [selectedDates, setSelectedDates] = useState<string[]>([]);

  useEffect(() => {
    dispatch(fetchRequests());
    dispatch(fetchAllUsers());
  }, [dispatch]);

  return (
    <div className="p-4">
      <div className="flex items-center justify-center mb-4 relative">
        <h1 className="text-2xl font-bold text-center">Calendar</h1>

        <Popover.Root>
          <Popover.Trigger asChild>
            <button className="ml-2 p-2 rounded-full bg-gray-200 hover:bg-gray-300 transition-all">
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
              className="bg-white shadow-xl rounded-lg p-4 w-80 text-sm text-gray-700 border border-gray-200 z-50 "
            >
              <p className="font-semibold">On this page, you can:</p>
              <ul className="list-disc pl-4 mt-2">
                <li>Manage your work schedule by submitting requests.</li>
                <li>
                  Available request types: <strong>Work day</strong>,{" "}
                  <strong>Day off</strong>, <strong>Vacation</strong>.
                </li>
                <li>
                  <strong>Work day</strong> and <strong>Day off</strong>{" "}
                  requests are visible to all users. Others can agree to swap
                  shifts with you.
                </li>
                <li>
                  <strong>Vacation</strong> requests are visible only to you and
                  coordinators, who can approve or reject them.
                </li>
              </ul>

              <p className="font-semibold mt-4">Managing the calendar:</p>
              <ul className="list-disc pl-4 mt-2">
                <li>
                  To select a single day, <strong>click and hold in it</strong>.
                </li>
                <li>
                  To select multiple days,{" "}
                  <strong>
                    click and hold on the first day, drag to the last day, and
                    release
                  </strong>
                  .
                </li>
                <li>
                  After selecting the dates, choose the appropriate request type
                  in the form below the calendar and submit it.
                </li>
              </ul>

              <Popover.Close className="absolute top-2 right-2 text-gray-500 hover:text-gray-700">
                ✖
              </Popover.Close>
            </Popover.Content>
          </Popover.Portal>
        </Popover.Root>
      </div>

      <div className="flex flex-col gap-4 lg:flex-row lg:gap-6">
        <div className="w-full lg:w-2/3">
          <CalendarView
            selectedDates={selectedDates}
            setSelectedDates={setSelectedDates}
          />
        </div>
        <div className="w-full lg:w-1/3">
          <RequestForm selectedDates={selectedDates} />
        </div>
      </div>

      <div className="mt-4">
        <RequestList />
      </div>
    </div>
  );
};

export default CalendarPage;
