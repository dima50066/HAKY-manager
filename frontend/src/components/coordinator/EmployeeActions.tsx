import React, { useState } from "react";
import EditEmployee from "./EditEmployee";
import Modal from "../../shared/modal/Modal";
import Icon from "../../shared/icon/Icon";
import { useTranslation } from "react-i18next";

interface EmployeeActionsProps {
  profileId: string;
  onDelete: () => void;
}

export const EmployeeActions: React.FC<EmployeeActionsProps> = ({
  profileId,
  onDelete,
}) => {
  const { t } = useTranslation();
  const [isEditing, setIsEditing] = useState(false);

  return (
    <div className="mt-6 flex space-x-4">
      <button
        onClick={() => setIsEditing(true)}
        className="px-4 py-2 text-white bg-blue-500 rounded hover:bg-blue-600 flex items-center"
      >
        <Icon id="edit" width={16} height={16} className="mr-2" />
        {t("edit")}
      </button>
      <button
        onClick={onDelete}
        className="px-4 py-2 text-white bg-red-500 rounded hover:bg-red-600 flex items-center"
      >
        <Icon id="trash" width={16} height={16} className="mr-2" />
        {t("delete_employee")}
      </button>

      <Modal
        isOpen={isEditing}
        classNameWrapper="pt-20 sm:pt-14"
        btnClassName="top-1 right-4 sm:top-4 sm:right-4"
        onClose={() => setIsEditing(false)}
      >
        <EditEmployee
          profileId={profileId}
          onClose={() => setIsEditing(false)}
        />
      </Modal>
    </div>
  );
};
