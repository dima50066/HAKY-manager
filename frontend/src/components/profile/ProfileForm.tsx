import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateProfile } from "../../redux/profile/operations";
import { selectProfile } from "../../redux/profile/selectors";
import { AppDispatch } from "../../redux/store";
import type { ProfileForm } from "../../types";

const ProfileUpdateForm: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const profile = useSelector(selectProfile);

  const [form, setForm] = useState<ProfileForm>({
    avatar: null, // Для зберігання файлу
    isStudent: profile?.isStudent || false,
    productivity: profile?.productivity ?? 100,
    bio: profile?.bio || "",
    location: profile?.location || "Gorzow",
    birthDate: profile?.birthDate || "",
    livesIndependently: profile?.livesIndependently || false,
  });

  useEffect(() => {
    if (profile) {
      setForm({
        avatar: null,
        isStudent: profile.isStudent,
        productivity: profile.productivity ?? 100,
        bio: profile.bio || "",
        location: profile.location || "Gorzow",
        birthDate: profile.birthDate || "",
        livesIndependently: profile.livesIndependently,
      });
    }
  }, [profile]);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setForm((prevForm) => ({
      ...prevForm,
      [name]: value,
    }));
  };

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;
    setForm((prevForm) => ({
      ...prevForm,
      [name]: checked,
    }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      setForm((prevForm) => ({
        ...prevForm,
        avatar: files[0],
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const formData = new FormData();

    if (form.avatar instanceof File) {
      formData.append("avatar", form.avatar);
    }

    formData.append("isStudent", String(form.isStudent));
    formData.append("productivity", String(form.productivity));
    formData.append("bio", form.bio);
    formData.append("location", form.location);
    formData.append("birthDate", form.birthDate);
    formData.append("livesIndependently", String(form.livesIndependently));

    for (let [key, value] of formData.entries()) {
      console.log(`${key}: ${value}`);
    }

    try {
      const result = await dispatch(updateProfile(formData)).unwrap();
      console.log("Profile updated successfully!", result);
      alert("Profile updated successfully!");
    } catch (error) {
      console.error("Failed to update profile:", error);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md space-y-4"
    >
      <div>
        <label htmlFor="avatar" className="block font-medium text-gray-700">
          Avatar
        </label>
        <input
          type="file"
          accept="image/*"
          onChange={handleFileChange}
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
        <label htmlFor="isStudent" className="text-gray-700">
          Student
        </label>
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
        <label htmlFor="livesIndependently" className="text-gray-700">
          Lives Independently
        </label>
      </div>

      <div>
        <label
          htmlFor="productivity"
          className="block font-medium text-gray-700"
        >
          Productivity Level
        </label>
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
        <label htmlFor="bio" className="block font-medium text-gray-700">
          Bio
        </label>
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
        <label htmlFor="location" className="block font-medium text-gray-700">
          Location
        </label>
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
        <label htmlFor="birthDate" className="block font-medium text-gray-700">
          Birth Date
        </label>
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
