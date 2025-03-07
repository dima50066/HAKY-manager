import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../../redux/store";
import { fetchUserHistory } from "../../redux/ranking/operations";
import { selectVisibleHistory } from "../../redux/ranking/selectors";
import { loadMoreHistory } from "../../redux/ranking/slice";
import RankingList from "../../components/ranking/RankingList";
import DepartmentRanking from "../../components/ranking/DepartmentRanking";
import DailyRanking from "../../components/ranking/DailyRanking";
import Modal from "../../shared/modal/Modal";

const RankingPage: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const visibleHistory = useSelector(selectVisibleHistory);

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
      <h1 className="text-xl font-bold text-gray-800 mb-4">My Ranking</h1>

      <RankingList
        history={visibleHistory}
        onSelectDepartment={setSelectedDepartment}
        onSelectDate={(date, departmentId) =>
          setSelectedDateForDepartment({ date, departmentId })
        }
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
