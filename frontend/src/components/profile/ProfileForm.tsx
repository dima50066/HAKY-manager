import React, { useState, ChangeEvent, FormEvent } from 'react';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../redux/store';
import { updateUserProfile } from '../../redux/profile/operations';
import { User } from '../../types';

interface ProfileFormProps {
  user: User;
}

const ProfileForm: React.FC<ProfileFormProps> = ({ user }) => {
  const [formData, setFormData] = useState({
    name: user.name || '',
    bio: user.bio || '',
    isStudent: user.isStudent || false,
    productivity: user.productivity || 100, // нове поле для продуктивності
    avatar: null as File | null,
  });

  const dispatch = useDispatch<AppDispatch>();

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target as HTMLInputElement;

    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value,
    });
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFormData({ ...formData, avatar: e.target.files[0] });
    }
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const updatedData = new FormData();
    updatedData.append('name', formData.name);
    updatedData.append('bio', formData.bio);
    updatedData.append('isStudent', String(formData.isStudent));
    updatedData.append('productivity', String(formData.productivity));
    if (formData.avatar) updatedData.append('avatar', formData.avatar);

    dispatch(updateUserProfile(updatedData));
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto p-6 bg-white shadow-lg rounded-lg space-y-4">
      <h2 className="text-2xl font-semibold text-center text-gray-700">Edit Profile</h2>
      
      <div className="space-y-2">
        <label htmlFor="name" className="text-sm font-medium text-gray-600">Name</label>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="Name"
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div className="space-y-2">
        <label htmlFor="bio" className="text-sm font-medium text-gray-600">Bio</label>
        <textarea
          id="bio"
          name="bio"
          value={formData.bio}
          onChange={handleChange}
          placeholder="Bio"
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div className="flex items-center space-x-2">
        <input
          type="checkbox"
          id="isStudent"
          name="isStudent"
          checked={formData.isStudent}
          onChange={handleChange}
          className="w-4 h-4 text-blue-500 border-gray-300 rounded focus:ring-blue-500"
        />
        <label htmlFor="isStudent" className="text-sm text-gray-600">Student</label>
      </div>

      <div className="space-y-2">
        <label htmlFor="productivity" className="text-sm font-medium text-gray-600">Productivity Level</label>
        <select
          id="productivity"
          name="productivity"
          value={formData.productivity}
          onChange={handleChange}
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value={100}>100%</option>
          <option value={115}>115%</option>
          <option value={125}>125%</option>
        </select>
      </div>

      <div className="space-y-2">
        <label htmlFor="avatar" className="text-sm font-medium text-gray-600">Avatar</label>
        <input
          type="file"
          id="avatar"
          name="avatar"
          onChange={handleFileChange}
          className="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:border-0 file:text-sm file:font-semibold file:bg-blue-100 file:text-blue-700 hover:file:bg-blue-200"
        />
      </div>

      <button
        type="submit"
        className="w-full py-2 text-white bg-blue-500 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
      >
        Save Changes
      </button>
    </form>
  );
};

export default ProfileForm;
