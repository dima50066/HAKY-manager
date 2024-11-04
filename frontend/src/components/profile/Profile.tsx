import React from 'react';
import { User } from '../../types';

interface ProfileProps {
  user: User;
}

const Profile: React.FC<ProfileProps> = ({ user }) => {
  return (
    <div className="max-w-md mx-auto bg-white shadow-md rounded-lg overflow-hidden">
      <div className="flex items-center p-6 bg-gray-100">
        <img
          src={user.avatar || '/placeholder-avatar.png'}
          alt="User Avatar"
          className="w-24 h-24 rounded-full object-cover mr-4"
        />
        <div>
          <h2 className="text-2xl font-bold text-gray-800">{user.name}</h2>
          <p className="text-gray-500">{user.isStudent ? 'Student' : 'Not a Student'}</p>
        </div>
      </div>

      <article className="p-6">
        <h3 className="text-lg font-semibold text-gray-700">Bio</h3>
        <p className="text-gray-600 mt-2">{user.bio || 'No bio available'}</p>
      </article>

      <article className="p-6 bg-gray-100">
        <h3 className="text-lg font-semibold text-gray-700">Email</h3>
        <p className="text-gray-600 mt-2">{user.email}</p>
      </article>

      <article className="p-6">
        <h3 className="text-lg font-semibold text-gray-700">Productivity</h3>
        <p className="text-gray-600 mt-2">{user.productivity || 'No productivity information available'}</p>
      </article>
    </div>
  );
};

export default Profile;
