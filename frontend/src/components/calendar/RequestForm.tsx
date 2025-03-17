import React, { useState } from "react";
import { useAppDispatch } from "../../redux/store";
import { createRequest } from "../../redux/requests/operations";
import { useTranslation } from "react-i18next";

interface RequestFormProps {
  selectedDates: string[];
}

const RequestForm: React.FC<RequestFormProps> = ({ selectedDates }) => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const [type, setType] = useState<"vacation" | "day-off" | "work-day">(
    "vacation"
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedDates.length === 0) return alert(t("select_date_warning"));

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
    <div className="border p-4 rounded shadow-md bg-white">
      <h2 className="text-lg font-semibold mb-2">{t("create_request")}</h2>
      <form onSubmit={handleSubmit}>
        <label className="block mb-2">
          {t("request_type")}
          <select
            value={type}
            onChange={(e) =>
              setType(e.target.value as "vacation" | "day-off" | "work-day")
            }
            className="ml-2 border p-2 rounded w-full"
          >
            <option value="day-off">{t("day_off")}</option>
            <option value="work-day">{t("work_day")}</option>
            <option value="vacation">{t("vacation")}</option>
          </select>
        </label>
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded w-full mt-2"
        >
          {t("send")}
        </button>
      </form>
    </div>
  );
};

export default RequestForm;
