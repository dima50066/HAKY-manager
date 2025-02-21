import React, { useState } from "react";
import EditEmployee from "./EditEmployee";

interface EmployeeActionsProps {
  profileId: string;
  onDelete: () => void;
}

export const EmployeeActions: React.FC<EmployeeActionsProps> = ({
  profileId,
  onDelete,
}) => {
  const [isEditing, setIsEditing] = useState(false);

  return (
    <div className="mt-6 flex space-x-4">
      {isEditing ? (
        <EditEmployee
          profileId={profileId}
          onClose={() => setIsEditing(false)}
        />
      ) : (
        <button
          onClick={() => setIsEditing(true)}
          className="px-4 py-2 text-white bg-blue-500 rounded hover:bg-blue-600"
        >
          Edit
        </button>
      )}
      <button
        onClick={onDelete}
        className="px-4 py-2 text-white bg-red-500 rounded hover:bg-red-600"
      >
        Delete Employee
      </button>
    </div>
  );
};
