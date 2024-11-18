import React from 'react';
import Profile from '../../components/profile/Profile';
import ProfileUpdateForm from '../../components/profile/ProfileForm';

const ProfilePage: React.FC = () => (
  <div className="min-h-screen bg-gray-100 py-12">
    <div className="max-w-2xl mx-auto bg-white p-10 shadow-lg rounded-lg">
      <h1 className="text-3xl font-semibold text-center text-blue-600 mb-12">My Profile</h1>
      
      <div className="mb-12">
        <Profile />
      </div>
      
      <div className="border-t pt-10">
        <ProfileUpdateForm />
      </div>
    </div>
  </div>
);

export default ProfilePage;
