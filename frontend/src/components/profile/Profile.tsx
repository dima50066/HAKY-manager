import React from "react";
import { useSelector } from "react-redux";
import {
  selectProfile,
  selectProfileLoading,
} from "../../redux/profile/selectors";
import { selectUser } from "../../redux/auth/selectors";
import { useNavigate } from "react-router-dom";
import LoadingSpinner from "../loader/LoadingSpinner";
import ProfileInfoCard from "./ProfileInfoCard";
import { User } from "../../types";

interface ProfileProps {
  onEdit: () => void;
}

const Profile: React.FC<ProfileProps> = ({ onEdit }) => {
  const profile = useSelector(selectProfile);
  const loading = useSelector(selectProfileLoading);
  const currentUser = useSelector(selectUser) as User | null;
  const navigate = useNavigate();

  if (loading) return <LoadingSpinner loading={loading} />;

  if (!profile)
    return (
      <div className="text-center text-gray-500">
        <p>No profile data available.</p>
        <button
          className="mt-4 p-2 bg-blue-600 text-white rounded hover:bg-blue-500"
          onClick={() => navigate("/profile/create")}
        >
          Create Profile
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
              {profile.isStudent ? "Student" : "Not a Student"}
            </p>
            <p className="text-gray-700 font-semibold mt-2">
              Productivity: {profile.productivity || "Not provided"}%
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full md:w-2/3">
            <ProfileInfoCard
              label="Location"
              value={profile.location || "Not provided"}
            />
            <ProfileInfoCard
              label="Birth Date"
              value={
                profile.birthDate
                  ? new Date(profile.birthDate).toLocaleDateString()
                  : "Not provided"
              }
            />
            <ProfileInfoCard
              label="Living Arrangement"
              value={
                profile.livesIndependently
                  ? "Lives Independently"
                  : "Company-Provided Housing"
              }
            />
            <ProfileInfoCard
              label="Address"
              value={profile.address || "Not provided"}
            />
            <ProfileInfoCard
              label="Emergency Contact"
              value={profile.emergencyContactNumber || "Not provided"}
            />
            <ProfileInfoCard
              label="Pesel Number"
              value={profile.peselNumber || "Not provided"}
            />
          </div>
        </div>
      </div>

      <button
        className="mt-4 w-full bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition"
        onClick={onEdit}
      >
        Edit Profile
      </button>
    </div>
  );
};

export default Profile;
