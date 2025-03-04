import React from "react";
import { useAppDispatch, useAppSelector } from "../../redux/store";
import {
  confirmRequest,
  declineRequest,
} from "../../redux/requests/operations";
import { selectUserRole } from "../../redux/auth/selectors";

interface RequestActionsProps {
  requestId: string;
  requestType: "vacation" | "day-off" | "work-day";
}

const RequestActions: React.FC<RequestActionsProps> = ({
  requestId,
  requestType,
}) => {
  const dispatch = useAppDispatch();
  const userRole = useAppSelector(selectUserRole);

  return (
    <div className="flex gap-2">
      {(requestType === "day-off" ||
        requestType === "work-day" ||
        requestType === "vacation") && (
        <button
          onClick={() => dispatch(confirmRequest(requestId))}
          className="bg-green-500 text-white px-2 py-1 rounded"
        >
          Approve
        </button>
      )}

      {userRole === "coordinator" && (
        <button
          onClick={() => dispatch(declineRequest(requestId))}
          className="bg-red-500 text-white px-2 py-1 rounded"
        >
          Decline
        </button>
      )}
    </div>
  );
};

export default RequestActions;
