import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../../redux/store";
import { fetchUserHistory } from "../../redux/ranking/operations";
import {
  selectVisibleHistory,
  selectUserHistoryLoading,
} from "../../redux/ranking/selectors";
import { loadMoreHistory } from "../../redux/ranking/slice";
import RankingList from "../../components/ranking/RankingList";
import DepartmentRanking from "../../components/ranking/DepartmentRanking";
import DailyRanking from "../../components/ranking/DailyRanking";
import Modal from "../../shared/modal/Modal";
import * as Popover from "@radix-ui/react-popover";
import Icon from "../../shared/icon/Icon";

const RankingPage: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const visibleHistory = useSelector(selectVisibleHistory);
  const loading = useSelector(selectUserHistoryLoading);

  const [selectedDepartment, setSelectedDepartment] = useState<string | null>(
    null
  );
  const [selectedDateForDepartment, setSelectedDateForDepartment] = useState<{
    date: string;
    departmentId: string;
  } | null>(null);

  useEffect(() => {
    dispatch(fetchUserHistory());
  }, [dispatch]);

  return (
    <div className="p-5 bg-white rounded-lg shadow-md w-full">
      <div className="flex items-center justify-center mb-4 relative">
        <h1 className="text-xl font-bold text-gray-800">My Ranking</h1>

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
                  View your rating for each recorded shift you have worked.
                </li>
                <li>
                  Check the rating for a specific department based on a selected
                  day, the current month, or all-time data.
                </li>
                <li>
                  See your daily rating and your ranking within the department
                  where you worked.
                </li>
              </ul>
              <Popover.Close className="absolute top-2 right-2 text-gray-500 hover:text-gray-700">
                ✖
              </Popover.Close>
            </Popover.Content>
          </Popover.Portal>
        </Popover.Root>
      </div>

      <RankingList
        history={visibleHistory}
        onSelectDepartment={setSelectedDepartment}
        onSelectDate={(date, departmentId) =>
          setSelectedDateForDepartment({ date, departmentId })
        }
        loading={loading}
      />

      <button
        className="mt-4 w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition"
        onClick={() => dispatch(loadMoreHistory())}
      >
        Load More
      </button>

      <Modal
        isOpen={!!selectedDepartment}
        onClose={() => setSelectedDepartment(null)}
      >
        {selectedDepartment && (
          <DepartmentRanking
            departmentId={selectedDepartment}
            onClose={() => setSelectedDepartment(null)}
          />
        )}
      </Modal>

      <Modal
        isOpen={!!selectedDateForDepartment}
        onClose={() => setSelectedDateForDepartment(null)}
      >
        {selectedDateForDepartment && (
          <DailyRanking
            date={selectedDateForDepartment.date}
            departmentId={selectedDateForDepartment.departmentId}
            onClose={() => setSelectedDateForDepartment(null)}
          />
        )}
      </Modal>
    </div>
  );
};

export default RankingPage;
