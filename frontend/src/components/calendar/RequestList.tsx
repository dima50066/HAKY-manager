import React from "react";
import { useAppSelector } from "../../redux/store";
import RequestGroup from "./RequestGroup";
import { selectUserRole, selectUser } from "../../redux/auth/selectors";
import { useTranslation } from "react-i18next";

const RequestList: React.FC = () => {
  const { t } = useTranslation();
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

  const rejectedRequestsForUser = requests.filter(
    (req) =>
      req.userId &&
      req.status === "declined" &&
      (typeof req.userId === "object" ? req.userId._id : req.userId) ===
        currentUser?._id
  );

  const rejectedRequestsForCoordinator =
    userRole === "coordinator"
      ? requests.filter((req) => req.status === "declined")
      : [];

  return (
    <div className="mt-6">
      <RequestGroup title={t("your_requests")} requests={userRequests} />
      <RequestGroup
        title={t("vacation_requests")}
        requests={vacationRequests}
        isCoordinator={userRole === "coordinator"}
      />
      <RequestGroup
        title={t("pending_work_requests")}
        requests={pendingWorkRequests}
        isCoordinator={userRole === "coordinator"}
      />
      <RequestGroup
        title={t("confirmed_requests")}
        requests={confirmedRequests}
      />

      {rejectedRequestsForUser.length > 0 && (
        <RequestGroup
          title={t("rejected_requests_your")}
          requests={rejectedRequestsForUser}
        />
      )}

      {rejectedRequestsForCoordinator.length > 0 && (
        <RequestGroup
          title={t("rejected_requests_all")}
          requests={rejectedRequestsForCoordinator}
          isCoordinator
        />
      )}
    </div>
  );
};

export default RequestList;
