import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateProfile } from '../../redux/profile/operations';
import { selectProfile } from '../../redux/profile/selectors';
import { AppDispatch } from '../../redux/store';
import type { ProfileForm } from '../../types';

const ProfileUpdateForm: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const profile = useSelector(selectProfile);

  const [form, setForm] = useState<ProfileForm>({
    avatar: profile?.avatar || '',
    isStudent: profile?.isStudent || false,
    productivity: profile?.productivity ?? 100, 
    bio: profile?.bio || '',
    location: profile?.location || 'Gorzow',
    birthDate: profile?.birthDate || '',
    livesIndependently: profile?.livesIndependently || false,
  });

  useEffect(() => {
    if (profile) {
      setForm({
        avatar: profile.avatar || '',
        isStudent: profile.isStudent,
        productivity: profile.productivity ?? 100, 
        bio: profile.bio || '',
        location: profile.location || 'Gorzow',
        birthDate: profile.birthDate || '',
        livesIndependently: profile.livesIndependently,
      });
    }
  }, [profile]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;
    setForm({ ...form, [name]: checked });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const updatedData: Partial<ProfileForm> = { ...form };
    if (!updatedData.avatar) delete updatedData.avatar;

    dispatch(updateProfile(updatedData as ProfileForm));
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md space-y-4">
      <div>
        <label htmlFor="avatar" className="block font-medium text-gray-700">Avatar URL</label>
        <input
          type="url"
          name="avatar"
          id="avatar"
          placeholder="https://example.com/avatar.jpg"
          value={typeof form.avatar === 'string' ? form.avatar : ''}
          onChange={handleChange}
          className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-blue-500"
        />
      </div>

      <div className="flex items-center space-x-2">
        <input
          type="checkbox"
          name="isStudent"
          id="isStudent"
          checked={form.isStudent}
          onChange={handleCheckboxChange}
          className="form-checkbox text-blue-600"
        />
        <label htmlFor="isStudent" className="text-gray-700">Student</label>
      </div>

      <div className="flex items-center space-x-2">
        <input
          type="checkbox"
          name="livesIndependently"
          id="livesIndependently"
          checked={form.livesIndependently}
          onChange={handleCheckboxChange}
          className="form-checkbox text-blue-600"
        />
        <label htmlFor="livesIndependently" className="text-gray-700">Lives Independently</label>
      </div>

      <div>
        <label htmlFor="productivity" className="block font-medium text-gray-700">Productivity Level</label>
        <select
          name="productivity"
          id="productivity"
          value={form.productivity}
          onChange={handleChange}
          className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-blue-500"
        >
          <option value={100}>100%</option>
          <option value={115}>115%</option>
          <option value={125}>125%</option>
        </select>
      </div>

      <div>
        <label htmlFor="bio" className="block font-medium text-gray-700">Bio</label>
        <textarea
          name="bio"
          id="bio"
          placeholder="Tell us about yourself"
          maxLength={500}
          value={form.bio}
          onChange={handleChange}
          className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-blue-500"
        />
      </div>

      <div>
        <label htmlFor="location" className="block font-medium text-gray-700">Location</label>
        <select
          name="location"
          id="location"
          value={form.location}
          onChange={handleChange}
          className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-blue-500"
        >
          <option value="Gorzow">Gorzow</option>
          <option value="Gdansk">Gdansk</option>
        </select>
      </div>

      <div>
        <label htmlFor="birthDate" className="block font-medium text-gray-700">Birth Date</label>
        <input
          type="date"
          name="birthDate"
          id="birthDate"
          value={form.birthDate}
          onChange={handleChange}
          className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-blue-500"
        />
      </div>

      <button
        type="submit"
        className="w-full p-2 bg-blue-600 text-white rounded hover:bg-blue-500 focus:outline-none focus:ring focus:ring-blue-300"
      >
        Update Profile
      </button>
    </form>
  );
};

export default ProfileUpdateForm;
