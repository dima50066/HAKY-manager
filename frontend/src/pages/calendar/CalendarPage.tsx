import React, { useState, useEffect } from "react";
import CalendarView from "../../components/calendar/CalendarView";
import RequestForm from "../../components/calendar/RequestForm";
import RequestList from "../../components/calendar/RequestList";
import { useAppDispatch } from "../../redux/store";
import { fetchRequests } from "../../redux/requests/operations";
import { fetchAllUsers } from "../../redux/ranking/operations";
import * as Popover from "@radix-ui/react-popover";
import Icon from "../../shared/icon/Icon";
import { useTranslation } from "react-i18next";

const CalendarPage: React.FC = () => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const [selectedDates, setSelectedDates] = useState<string[]>([]);

  useEffect(() => {
    dispatch(fetchRequests());
    dispatch(fetchAllUsers());
  }, [dispatch]);

  return (
    <div className="p-4">
      <div className="flex items-center justify-center mb-4 relative">
        <h1 className="text-2xl font-bold text-center">{t("calendar")}</h1>

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
              <p className="font-semibold">{t("calendar_info")}</p>
              <ul className="list-disc pl-4 mt-2">
                <li>{t("manage_schedule")}</li>
                <li>
                  {t("available_requests")} <strong>{t("work_day")}</strong>,{" "}
                  <strong>{t("day_off")}</strong>,{" "}
                  <strong>{t("vacation")}</strong>.
                </li>
                <li>{t("work_day_info")}</li>
                <li>{t("vacation_info")}</li>
              </ul>

              <p className="font-semibold mt-4">{t("managing_calendar")}</p>
              <ul className="list-disc pl-4 mt-2">
                <li>{t("single_day")}</li>
                <li>{t("multiple_days")}</li>
                <li>{t("submit_request")}</li>
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
