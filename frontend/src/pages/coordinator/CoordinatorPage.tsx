import React from "react";
import { useTranslation } from "react-i18next";
import EmployeesList from "../../components/coordinator/EmployeesList";
import * as Popover from "@radix-ui/react-popover";
import Icon from "../../shared/icon/Icon";

const CoordinatorPage: React.FC = () => {
  const { t } = useTranslation();

  return (
    <div className="p-4">
      <div className="flex items-center justify-center mb-4 relative">
        <h1 className="text-2xl font-bold text-center">
          {t("coordinator_dashboard")}
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
              <p className="font-semibold">{t("coordinator_abilities")}</p>
              <ul className="list-disc pl-4 mt-2">
                <li>{t("view_user_info")}</li>
                <li>{t("monitor_productivity")}</li>
                <li>{t("review_salary_history")}</li>
                <li>{t("manage_documents")}</li>
              </ul>
              <Popover.Close className="absolute top-2 right-2 text-gray-500 hover:text-gray-700">
                ✖
              </Popover.Close>
            </Popover.Content>
          </Popover.Portal>
        </Popover.Root>
      </div>

      <EmployeesList />
    </div>
  );
};

export default CoordinatorPage;
