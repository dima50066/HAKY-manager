import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../../redux/store";
import {
  fetchDailyRanking,
  fetchAllUsers,
} from "../../redux/ranking/operations";
import {
  selectDailyRanking,
  selectDailyRankingLoading,
  selectAllUsers,
} from "../../redux/ranking/selectors";

interface DailyRankingProps {
  date: string;
  onClose: () => void;
}

const DailyRanking: React.FC<DailyRankingProps> = ({ date, onClose }) => {
  const dispatch = useDispatch<AppDispatch>();
  const ranking = useSelector(selectDailyRanking);
  const loading = useSelector(selectDailyRankingLoading);
  const users = useSelector(selectAllUsers);

  useEffect(() => {
    if (date) {
      dispatch(fetchDailyRanking(date));
      dispatch(fetchAllUsers());
    }
  }, [dispatch, date]);

  if (loading) return <p className="text-center text-gray-600">Loading...</p>;

  return (
    <div className="p-5 bg-white rounded-lg shadow-md w-full max-w-lg relative">
      <button
        onClick={onClose}
        className="absolute top-2 right-2 px-3 py-1 text-white bg-red-500 rounded hover:bg-red-600 transition"
      >
        Close
      </button>

      <h2 className="text-lg font-bold text-gray-800 border-b pb-2 mb-4">
        Daily Ranking - {new Date(date).toLocaleDateString()}
      </h2>

      <ul className="space-y-2">
        {ranking.length > 0 ? (
          ranking.map((user, index) => {
            const foundUser = users.find((usr) => usr._id === user._id);
            const userName = foundUser ? foundUser.name : "Unknown User";

            return (
              <li
                key={user._id}
                className="bg-gray-100 p-2 rounded-md shadow-sm flex justify-between"
              >
                <span className="font-semibold">
                  {index + 1}. {userName}
                </span>
                <span className="text-gray-700">{user.totalUnits} units</span>
              </li>
            );
          })
        ) : (
          <p className="text-center text-gray-600">No data available</p>
        )}
      </ul>
    </div>
  );
};

export default DailyRanking;
