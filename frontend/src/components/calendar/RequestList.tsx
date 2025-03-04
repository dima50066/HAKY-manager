import React from "react";
import { useAppSelector } from "../../redux/store";
import RequestGroup from "./RequestGroup";
import { selectUserRole, selectUser } from "../../redux/auth/selectors";

const RequestList: React.FC = () => {
  const requests = useAppSelector((state) => state.requests.requests);
  const currentUser = useAppSelector(selectUser);
  const userRole = useAppSelector(selectUserRole);

  const pendingWorkRequests = requests.filter(
    (req) =>
      req.userId &&
      (req.type === "day-off" || req.type === "work-day") &&
      req.status === "pending"
  );

  const confirmedRequests = requests.filter(
    (req) =>
      req.userId &&
      req.status === "confirmed" &&
      ((typeof req.userId === "object" ? req.userId._id : req.userId) ===
        currentUser?._id ||
        (typeof req.approvedBy === "object"
          ? req.approvedBy._id
          : req.approvedBy) === currentUser?._id ||
        userRole === "coordinator")
  );

  const userRequests = requests.filter(
    (req) =>
      req.userId &&
      (typeof req.userId === "object" ? req.userId._id : req.userId) ===
        currentUser?._id &&
      (req.type === "day-off" || req.type === "work-day") &&
      req.status === "pending"
  );

  const vacationRequests = requests.filter(
    (req) =>
      req.userId &&
      req.type === "vacation" &&
      ((typeof req.userId === "object" ? req.userId._id : req.userId) ===
        currentUser?._id ||
        userRole === "coordinator")
  );

  return (
    <div className="mt-6">
      <RequestGroup title="Your Requests" requests={userRequests} />
      <RequestGroup
        title="Vacation Requests"
        requests={vacationRequests}
        isCoordinator={userRole === "coordinator"}
      />
      <RequestGroup
        title="Pending Work Requests"
        requests={pendingWorkRequests}
        isCoordinator={userRole === "coordinator"}
      />
      <RequestGroup title="Confirmed Requests" requests={confirmedRequests} />
    </div>
  );
};

export default RequestList;
