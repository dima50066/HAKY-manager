import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../../redux/store";
import {
  fetchDepartmentRanking,
  fetchAllUsers,
} from "../../redux/ranking/operations";
import {
  selectDepartmentRanking,
  selectDepartmentRankingLoading,
  selectAllUsers,
} from "../../redux/ranking/selectors";
import RankingListComponent from "./RankingListComponent";

interface DailyRankingProps {
  date: string;
  departmentId: string;
  onClose: () => void;
}

const DailyRanking: React.FC<DailyRankingProps> = ({ date, departmentId }) => {
  const dispatch = useDispatch<AppDispatch>();
  const ranking = useSelector(selectDepartmentRanking);
  const loading = useSelector(selectDepartmentRankingLoading);
  const users = useSelector(selectAllUsers);

  useEffect(() => {
    dispatch(fetchDepartmentRanking({ departmentId, date }));
    dispatch(fetchAllUsers());
  }, [dispatch, departmentId, date]);

  return (
    <div className="p-5 bg-white rounded-lg w-full max-w-lg">
      <h2 className="text-lg font-bold text-gray-800 border-b pb-2 mb-4">
        Ranking - {new Date(date).toLocaleDateString()}
      </h2>

      <RankingListComponent ranking={ranking} users={users} loading={loading} />
    </div>
  );
};

export default DailyRanking;
