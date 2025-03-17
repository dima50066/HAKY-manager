import React from "react";
import { useTranslation } from "react-i18next";

interface ProfileInfoCardProps {
  label: string;
  value: string | number | null;
}

const ProfileInfoCard: React.FC<ProfileInfoCardProps> = ({ label, value }) => {
  const { t } = useTranslation();

  return (
    <div className="bg-gray-50 shadow-sm border border-gray-200 rounded-lg p-4">
      <p className="text-gray-700 font-semibold">{label}</p>
      <p className="text-gray-500 mt-1">{value || t("not_provided")}</p>
    </div>
  );
};

export default ProfileInfoCard;
