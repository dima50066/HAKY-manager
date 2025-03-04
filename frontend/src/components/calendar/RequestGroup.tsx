import React from "react";
import RequestItem from "./RequestItem";

const RequestGroup: React.FC<{
  title: string;
  requests: any[];
  isCoordinator?: boolean;
}> = ({ title, requests, isCoordinator = false }) => {
  if (requests.length === 0) return null;

  return (
    <>
      <h2 className="text-lg font-semibold mt-4 mb-2">{title}</h2>
      <ul>
        {requests.map((req) => (
          <RequestItem
            key={req._id}
            request={req}
            isCoordinator={isCoordinator}
          />
        ))}
      </ul>
    </>
  );
};

export default RequestGroup;
