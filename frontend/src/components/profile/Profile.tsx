import React from 'react';
import { useSelector } from 'react-redux';
import { selectProfile, selectProfileLoading } from '../../redux/profile/selectors';
import LoadingSpinner from '../loader/LoadingSpinner';

const Profile: React.FC = () => {
  const profile = useSelector(selectProfile);
  const loading = useSelector(selectProfileLoading);

  if (loading) return <LoadingSpinner loading={loading} />;

  if (!profile) return <p className="text-center text-gray-500">No profile data available.</p>;

  return (
    <div className="max-w-md mx-auto bg-white shadow-md rounded-lg overflow-hidden mt-8">
      <div className="px-6 py-6">
        <div className="flex justify-center relative">
          <div className="w-32 h-32 rounded-full border-4 border-white shadow-md overflow-hidden bg-gray-200">
            <img
              className="object-cover w-full h-full"
              src={profile.avatar}
              alt="Avatar"
            />
          </div>
        </div>
        <div className="text-center mt-8">
          <p className="text-gray-700 text-lg font-semibold">
            {profile.isStudent ? 'Student' : 'Not a Student'}
          </p>
        </div>
        <div className="text-center mt-2">
          <p className="text-gray-500">Productivity: {profile.productivity}%</p>
        </div>
        <div className="text-center mt-4">
          <p className="text-gray-700 font-semibold">Bio</p>
          <p className="text-gray-500 mt-1">{profile.bio || 'No bio provided'}</p>
        </div>
        <div className="text-center mt-4">
          <p className="text-gray-700 font-semibold">Location</p>
          <p className="text-gray-500 mt-1">{profile.location || 'No location provided'}</p>
        </div>
        <div className="text-center mt-4">
          <p className="text-gray-700 font-semibold">Birth Date</p>
          <p className="text-gray-500 mt-1">
            {profile.birthDate ? new Date(profile.birthDate).toLocaleDateString() : 'Not provided'}
          </p>
        </div>
        <div className="text-center mt-4">
          <p className="text-gray-700 font-semibold">Living Arrangement</p>
          <p className="text-gray-500 mt-1">
            {profile.livesIndependently ? 'Lives Independently' : 'Company-Provided Housing'}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Profile;
