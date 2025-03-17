import React from "react";
import { useTranslation } from "react-i18next";
import ProductivityForm from "../../components/productivity/ProductivityForm";
import ProductivityList from "../../components/productivity/ProductivityList";
import * as Popover from "@radix-ui/react-popover";
import Icon from "../../shared/icon/Icon";

const Productivity: React.FC = () => {
  const { t } = useTranslation();

  return (
    <div className="max-w-4xl mx-auto p-6 bg-gray-100 min-h-screen">
      <div className="flex items-center justify-center mb-8 relative">
        <h1 className="text-3xl font-bold text-gray-800 text-center">
          {t("productivity_management")}
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
              <p className="font-semibold">{t("productivity_info_title")}</p>
              <ul className="list-disc pl-4 mt-2 space-y-1">
                <li>{t("productivity_info_list_1")}</li>
                <li>{t("productivity_info_list_2")}</li>
                <li>{t("productivity_info_list_3")}</li>
              </ul>
              <Popover.Close className="absolute top-2 right-2 text-gray-500 hover:text-gray-700">
                ✖
              </Popover.Close>
            </Popover.Content>
          </Popover.Portal>
        </Popover.Root>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <ProductivityForm />
        <ProductivityList />
      </div>
    </div>
  );
};

export default Productivity;
