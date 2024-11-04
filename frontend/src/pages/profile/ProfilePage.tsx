import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUserProfile } from '../../redux/profile/operations';
import { selectUserProfile } from '../../redux/profile/selectors';
import ProfileForm from '../../components/profile/ProfileForm';
import Profile from '../../components/profile/Profile';
import { AppDispatch } from '../../redux/store';
import { useNavigate } from 'react-router-dom';

const ProfilePage: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const user = useSelector(selectUserProfile);
  const [isEditing, setIsEditing] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(fetchUserProfile());
  }, [dispatch]);

  const toggleEditing = () => {
    setIsEditing((prev) => !prev);
  };

  const handleResetPassword = () => {
    navigate('/send-reset');
  };

  return (
    <div className="min-h-screen flex flex-col items-center bg-gray-100 py-8 space-y-8">
      <h1 className="text-4xl font-bold text-gray-700">User Profile</h1>
      {user ? (
        <>
          <Profile user={user} />
          <div className="flex space-x-4 mt-4">
            <button
              onClick={toggleEditing}
              className="px-4 py-2 bg-blue-500 text-white font-semibold rounded hover:bg-blue-600 transition duration-300"
            >
              {isEditing ? 'Cancel' : 'Edit Profile'}
            </button>
            <button
              onClick={handleResetPassword}
              className="px-4 py-2 bg-red-500 text-white font-semibold rounded hover:bg-red-600 transition duration-300"
            >
              Reset Password
            </button>
          </div>
          {isEditing && <ProfileForm user={user} />}
        </>
      ) : (
        <p className="text-center text-gray-600">Loading...</p>
      )}
    </div>
  );
};

export default ProfilePage;
