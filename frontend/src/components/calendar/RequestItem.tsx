import React from "react";
import RequestActions from "./RequestActions";
import { useAppSelector } from "../../redux/store";
import { selectAllUsers } from "../../redux/ranking/selectors";

type UserRef = string | { _id: string; name: string };

const RequestItem: React.FC<{ request: any; isCoordinator?: boolean }> = ({
  request,
}) => {
  const allUsers = useAppSelector(selectAllUsers);

  const getUserName = (user: UserRef | undefined): string => {
    if (!user) return "Unknown User";
    if (typeof user === "string") {
      const foundUser = allUsers.find((u) => u._id === user);
      return foundUser ? foundUser.name : "Unknown User";
    }
    return user.name || "Unknown User";
  };

  const canManageRequest = request.status === "pending";

  return (
    <li className="border p-4 rounded-lg shadow-lg mb-4 flex items-center justify-between bg-white hover:bg-gray-100 transition duration-300 ease-in-out">
      <div className="flex flex-col">
        <span className="text-xl font-semibold text-gray-800">
          {request.type}
        </span>
        <span className="text-sm text-gray-500">
          {new Date(request.date).toLocaleDateString()}
        </span>
      </div>

      <div className="flex items-center space-x-2">
        <strong className="text-lg text-gray-700">
          by {getUserName(request.userId)}
        </strong>

        {canManageRequest && (
          <RequestActions requestId={request._id} requestType={request.type} />
        )}
      </div>
    </li>
  );
};

export default RequestItem;
