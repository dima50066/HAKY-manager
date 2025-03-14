import React from "react";
import { useSelector } from "react-redux";
import SalaryList from "../../components/salary/SalaryList";
import { selectMySalaryHistoryError } from "../../redux/salary/selectors";
import * as Popover from "@radix-ui/react-popover";
import Icon from "../../shared/icon/Icon";

const SalaryPage: React.FC = () => {
  const error = useSelector(selectMySalaryHistoryError);

  return (
    <div className="min-h-screen bg-gray-100 py-10 px-4">
      <div className="max-w-2xl mx-auto">
        <div className="flex items-center justify-center mb-8 relative">
          <h1 className="text-3xl font-bold text-gray-700 text-center">
            Your Salary Overview
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
                className="bg-white shadow-xl rounded-lg p-4 w-72 text-sm text-gray-700 border border-gray-200"
              >
                <p className="font-semibold">Salary Calculation:</p>
                <ul className="list-disc pl-4 mt-2">
                  <li>Based on profile data.</li>
                  <li>Calculated from each completed order.</li>
                  <li>
                    Includes logged working hours if living independently and
                    use of company transport.
                  </li>
                  <li>Approximate and may not match the final amount.</li>
                </ul>
                <Popover.Close className="absolute top-2 right-2 text-gray-500 hover:text-gray-700">
                  ✖
                </Popover.Close>
              </Popover.Content>
            </Popover.Portal>
          </Popover.Root>
        </div>

        {error && <p className="text-center text-red-500">Error: {error}</p>}

        <SalaryList />
      </div>
    </div>
  );
};

export default SalaryPage;
