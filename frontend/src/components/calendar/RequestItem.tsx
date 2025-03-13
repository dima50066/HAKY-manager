import React from "react";
import RequestActions from "./RequestActions";
import { useAppSelector } from "../../redux/store";
import { selectAllUsers } from "../../redux/ranking/selectors";
import { format, parseISO } from "date-fns";

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

  const formatDate = (dateString: string) => {
    return format(parseISO(dateString), "dd.MM.yyyy");
  };

  const isSingleDay = formatDate(request.date) === formatDate(request.endDate);

  const getDateText = () => {
    return isSingleDay
      ? formatDate(request.date)
      : `${formatDate(request.date)} - ${formatDate(request.endDate)}`;
  };

  const canManageRequest = request.status === "pending";

  const statusColors: Record<string, string> = {
    pending: "bg-yellow-100 border-yellow-400 hover:bg-yellow-200",
    confirmed: "bg-green-100 border-green-400 hover:bg-green-200",
    declined: "bg-red-100 border-red-400 hover:bg-red-200",
  };

  return (
    <li
      className={`border p-4 rounded-lg shadow-lg mb-4 flex items-center justify-between transition duration-300 ease-in-out ${
        statusColors[request.status] ||
        "bg-gray-100 border-gray-400 hover:bg-gray-200"
      }`}
    >
      <div className="flex flex-col">
        <span className="text-xl font-semibold text-gray-800 capitalize">
          {request.type}
        </span>
        <span className="text-sm text-gray-500">Date: {getDateText()}</span>
        <span className="text-sm text-gray-600">
          Requested by: <strong>{getUserName(request.userId)}</strong>
        </span>
        {request.status !== "pending" && request.approvedBy && (
          <span className="text-sm text-gray-600">
            {request.status === "confirmed" ? "Approved by" : "Declined by"}:{" "}
            <strong>{getUserName(request.approvedBy)}</strong>
          </span>
        )}
      </div>

      <div className="flex items-center space-x-2">
        {canManageRequest && (
          <RequestActions requestId={request._id} requestType={request.type} />
        )}
      </div>
    </li>
  );
};

export default RequestItem;
