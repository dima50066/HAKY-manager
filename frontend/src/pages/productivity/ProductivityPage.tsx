import React from "react";
import ProductivityForm from "../../components/productivity/ProductivityForm";
import ProductivityList from "../../components/productivity/ProductivityList";
import * as Popover from "@radix-ui/react-popover";
import Icon from "../../shared/icon/Icon";

const Productivity: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto p-6 bg-gray-100 min-h-screen">
      <div className="flex items-center justify-center mb-8 relative">
        <h1 className="text-3xl font-bold text-gray-800 text-center">
          Productivity Management
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
              <p className="font-semibold">On this page, you can:</p>
              <ul className="list-disc pl-4 mt-2 space-y-1">
                <li>
                  Record each of your orders to calculate estimated salary and
                  ranking among workers.
                </li>
                <li>View your statistics for all time or the current month.</li>
                <li>
                  Review daily statistics, edit, or delete recorded orders.
                </li>
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
