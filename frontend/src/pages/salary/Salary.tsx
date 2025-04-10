import React from "react";
import { useDispatch } from "react-redux";
import { useTranslation } from "react-i18next";
import { fetchMyProductivityRecords } from "../../redux/productivity/operations";
import RecalculateProductivityButton from "../../components/productivity/RecalculateProductivityButton";
import { AppDispatch } from "../../redux/store";
import SalaryList from "../../components/salary/SalaryList";
import { selectMySalaryHistoryError } from "../../redux/salary/selectors";
import { useSelector } from "react-redux";
import * as Popover from "@radix-ui/react-popover";
import Icon from "../../shared/icon/Icon";

const SalaryPage: React.FC = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch<AppDispatch>();
  const salaryError = useSelector(selectMySalaryHistoryError);

  const handleRecalculateSuccess = () => {
    dispatch(fetchMyProductivityRecords());
  };

  return (
    <div className="min-h-screen bg-gray-100 py-10 px-4">
      <div className="max-w-2xl mx-auto">
        <div className="flex items-center justify-center mb-8 relative">
          <h1 className="text-3xl font-bold text-gray-700 text-center">
            {t("salary_overview")}
          </h1>

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
                className="bg-white shadow-xl rounded-lg p-4 w-80 text-sm text-gray-700 border border-gray-200"
              >
                <p className="font-semibold">{t("salary_calculation")}</p>
                <ul className="list-disc pl-4 mt-2">
                  <li>{t("salary_rule_1")}</li>
                  <li>{t("salary_rule_2")}</li>
                  <li>{t("salary_rule_3")}</li>
                  <li>{t("salary_rule_4")}</li>
                </ul>
                <p className="mt-3 font-semibold">
                  {t("recalculate_info_title")}
                </p>
                <p className="mt-1">{t("recalculate_info_description")}</p>
                <Popover.Close className="absolute top-2 right-2 text-gray-500 hover:text-gray-700">
                  ✖
                </Popover.Close>
              </Popover.Content>
            </Popover.Portal>
          </Popover.Root>
        </div>

        {salaryError && (
          <p className="text-center text-red-500">
            {t("error")} {salaryError}
          </p>
        )}

        <div className="flex justify-center mb-4">
          <RecalculateProductivityButton onSuccess={handleRecalculateSuccess} />
        </div>

        <SalaryList />
      </div>
    </div>
  );
};

export default SalaryPage;
