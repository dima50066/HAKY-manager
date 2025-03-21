import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import {
  selectProfile,
  selectProfileLoading,
} from "../../redux/profile/selectors";
import { selectUser } from "../../redux/auth/selectors";
import { useNavigate } from "react-router-dom";
import ProfileInfoCard from "./ProfileInfoCard";
import { User } from "../../types";
import Icon from "../../shared/icon/Icon";
import Loader from "../../shared/loader/Loader";
import { useTranslation } from "react-i18next";

interface ProfileProps {
  onEdit: () => void;
}

const Profile: React.FC<ProfileProps> = ({ onEdit }) => {
  const { t } = useTranslation();
  const profile = useSelector(selectProfile);
  const loading = useSelector(selectProfileLoading);
  const currentUser = useSelector(selectUser) as User | null;
  const navigate = useNavigate();

  const [showLoader, setShowLoader] = useState(true);

  useEffect(() => {
    const timeout = setTimeout(() => setShowLoader(false), 2000);
    return () => clearTimeout(timeout);
  }, [loading, profile]);

  if (showLoader || loading) {
    return <Loader />;
  }

  if (!profile)
    return (
      <div className="text-center text-gray-500">
        <p>{t("no_profile_data")}</p>
        <button
          className="mt-4 p-2 bg-blue-600 text-white rounded hover:bg-blue-500"
          onClick={() => navigate("/profile/create")}
        >
          {t("create_profile")}
        </button>
      </div>
    );

  return (
    <div className="bg-white shadow-md rounded-lg p-6 w-full h-full flex flex-col justify-between">
      <div>
        <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
          <div className="flex flex-col items-center md:items-start w-full md:w-1/3">
            <div className="w-32 h-32 rounded-full border-4 border-white shadow-md overflow-hidden bg-gray-200">
              <img
                className="object-cover w-full h-full"
                src={profile.avatar}
                alt="Avatar"
              />
            </div>
            <h1 className="text-2xl font-semibold text-blue-600 mt-4">
              {currentUser?.name || "Profile"}
            </h1>
            <p className="text-gray-500">
              {profile.isStudent ? t("student") : t("not_student")}
            </p>
            <p className="text-gray-700 font-semibold mt-2">
              {t("productivity")}: {profile.productivity || "Not provided"}%
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full md:w-2/3">
            <ProfileInfoCard
              label={t("location")}
              value={profile.location || t("not_provided")}
            />
            <ProfileInfoCard
              label={t("birth_date")}
              value={
                profile.birthDate
                  ? new Date(profile.birthDate).toLocaleDateString()
                  : t("not_provided")
              }
            />
            <ProfileInfoCard
              label={t("living_arrangement")}
              value={
                profile.livesIndependently
                  ? t("lives_independently")
                  : t("company_provided_housing")
              }
            />
            <ProfileInfoCard
              label={t("company_transport")}
              value={
                profile.usesCompanyTransport
                  ? t("uses_company_transport")
                  : t("does_not_use_company_transport")
              }
            />
            <ProfileInfoCard
              label={t("address")}
              value={profile.address || t("not_provided")}
            />
            <ProfileInfoCard
              label={t("emergency_contact")}
              value={profile.emergencyContactNumber || t("not_provided")}
            />
            <ProfileInfoCard
              label={t("pesel_number")}
              value={profile.peselNumber || t("not_provided")}
            />
          </div>
        </div>
      </div>

      <button
        className="mt-4 w-full bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition flex items-center justify-center gap-2"
        onClick={onEdit}
      >
        <Icon id="edit" className="w-5 h-5 text-white" />
        {t("edit_profile")}
      </button>
    </div>
  );
};

export default Profile;
