import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import { recalculateMyProductivityRecords } from "../../redux/productivity/operations";
import {
  selectRecalculateProductivityLoading,
  selectRecalculateProductivityError,
  selectRecalculateProductivityResult,
} from "../../redux/productivity/selectors";
import { AppDispatch } from "../../redux/store";

interface RecalculateProductivityButtonProps {
  onSuccess?: () => void;
}

const RecalculateProductivityButton: React.FC<
  RecalculateProductivityButtonProps
> = ({ onSuccess }) => {
  const { t } = useTranslation();
  const dispatch = useDispatch<AppDispatch>();
  const isLoading = useSelector(selectRecalculateProductivityLoading);
  const error = useSelector(selectRecalculateProductivityError);
  const result = useSelector(selectRecalculateProductivityResult);

  const [selectedMonth, setSelectedMonth] = useState<string>("");
  const [showMonthPicker, setShowMonthPicker] = useState(false);

  useEffect(() => {
    if (result && !isLoading) {
      setShowMonthPicker(false);
      if (onSuccess) {
        onSuccess();
      }
    }
  }, [result, isLoading, onSuccess]);

  const handleRecalculate = () => {
    if (!selectedMonth) {
      return;
    }

    const [year, month] = selectedMonth.split("-");
    const startDate = `${year}-${month}-01`;
    const lastDay = new Date(parseInt(year), parseInt(month), 0).getDate();
    const endDate = `${year}-${month}-${lastDay}`;
    dispatch(recalculateMyProductivityRecords({ startDate, endDate }));
  };

  const currentDate = new Date();
  const currentYear = currentDate.getFullYear();
  const currentMonth = currentDate.getMonth() + 1;
  const defaultMonthValue = `${currentYear}-${currentMonth
    .toString()
    .padStart(2, "0")}`;

  return (
    <div className="relative">
      <button
        onClick={() => setShowMonthPicker(!showMonthPicker)}
        className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-md transition-colors"
        disabled={isLoading}
      >
        {isLoading ? t("recalculating") : t("recalculate_productivity")}
      </button>

      {showMonthPicker && (
        <div className="absolute right-0 mt-2 p-4 bg-white rounded-lg shadow-lg z-10 w-80">
          <h3 className="text-lg font-medium mb-3">{t("select_month")}</h3>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              {t("month")}
            </label>
            <input
              type="month"
              value={selectedMonth || defaultMonthValue}
              onChange={(e) => setSelectedMonth(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-md"
            />
          </div>

          <div className="flex justify-end space-x-2">
            <button
              onClick={() => setShowMonthPicker(false)}
              className="px-3 py-1 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
            >
              {t("cancel")}
            </button>
            <button
              onClick={handleRecalculate}
              className="px-3 py-1 bg-blue-600 text-white rounded-md hover:bg-blue-700"
              disabled={isLoading || !selectedMonth}
            >
              {isLoading ? t("recalculating") : t("recalculate")}
            </button>
          </div>

          {error && <div className="mt-2 text-red-500 text-sm">{error}</div>}
        </div>
      )}
    </div>
  );
};

export default RecalculateProductivityButton;
