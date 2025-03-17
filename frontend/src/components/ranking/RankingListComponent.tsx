import React from "react";
import Icon from "../../shared/icon/Icon";
import Loader from "../../shared/loader/Loader";
import useLoader from "../../hooks/useLoader";
import { useTranslation } from "react-i18next";

interface RankingListComponentProps {
  ranking: { _id: string; totalUnits: number }[];
  users: { _id: string; name: string }[];
  loading: boolean;
}

const RankingListComponent: React.FC<RankingListComponentProps> = ({
  ranking,
  users,
  loading,
}) => {
  const { t } = useTranslation();
  const showLoader = useLoader(loading);

  if (showLoader) return <Loader />;

  return (
    <ul className="space-y-2">
      {ranking.length > 0 ? (
        ranking.map((user, index) => {
          const foundUser = users.find((usr) => usr._id === user._id);
          const userName = foundUser ? foundUser.name : t("unknown_user");

          return (
            <li
              key={user._id}
              className="bg-gray-100 p-2 rounded-md shadow-sm flex justify-between items-center"
            >
              <span className="font-semibold">
                {index + 1}. {userName}
              </span>
              <span className="text-gray-700 flex items-center gap-1">
                {user.totalUnits}
                <Icon id="box" className="w-5 h-5 text-gray-700" />
              </span>
            </li>
          );
        })
      ) : (
        <p className="text-center text-gray-600">{t("no_data_available")}</p>
      )}
    </ul>
  );
};

export default RankingListComponent;
