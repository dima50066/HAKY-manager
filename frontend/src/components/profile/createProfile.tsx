import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { createProfile } from '../../redux/profile/operations';
import { AppDispatch } from '../../redux/store';
import { useNavigate } from 'react-router-dom';

interface ProfileForm {
  avatar: File | null;
  isStudent: boolean;
  productivity: number;
  bio: string;
  location: string;
  birthDate: string;
}

const CreateProfile: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const [form, setForm] = useState<ProfileForm>({
    avatar: null,
    isStudent: false,
    productivity: 100,
    bio: '',
    location: 'Gorzow',
    birthDate: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setForm((prevForm) => ({
      ...prevForm,
      [name]: value,
    }));
  };

  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target;
    setForm((prevForm) => ({
      ...prevForm,
      [name]: value,
    }));
  };

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm((prevForm) => ({ ...prevForm, isStudent: e.target.checked }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      setForm((prevForm) => ({ ...prevForm, avatar: files[0] }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const formData = new FormData();
    if (form.avatar) formData.append('avatar', form.avatar);
    formData.append('isStudent', String(form.isStudent));
    formData.append('productivity', String(form.productivity));
    formData.append('bio', form.bio);
    formData.append('location', form.location);
    formData.append('birthDate', form.birthDate);

    try {
      await dispatch(createProfile(formData)).unwrap();
      navigate('/');
    } catch (error) {
      console.error('Failed to create profile:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <input
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-blue-500"
      />
      <label className="flex items-center space-x-2">
        <input
          type="checkbox"
          name="isStudent"
          checked={form.isStudent}
          onChange={handleCheckboxChange}
          className="form-checkbox text-blue-600"
        />
        <span>Student</span>
      </label>
      <select
        name="productivity"
        value={form.productivity}
        onChange={handleSelectChange}
        className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-blue-500"
      >
        <option value={100}>100%</option>
        <option value={115}>115%</option>
        <option value={125}>125%</option>
      </select>
      <textarea
        name="bio"
        placeholder="Bio"
        maxLength={500}
        value={form.bio}
        onChange={handleChange}
        className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-blue-500"
      />
      <select
        name="location"
        value={form.location}
        onChange={handleSelectChange}
        className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-blue-500"
      >
        <option value="Gorzow">Gorzow</option>
        <option value="Gdansk">Gdansk</option>
      </select>
      <input
        type="date"
        name="birthDate"
        value={form.birthDate}
        onChange={handleChange}
        className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-blue-500"
      />
      <button type="submit" className="w-full p-2 bg-blue-600 text-white rounded hover:bg-blue-500">
        Create Profile
      </button>
    </form>
  );
};

export default CreateProfile;
