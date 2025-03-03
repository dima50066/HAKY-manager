import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { createProfile } from "../../redux/profile/operations";
import { AppDispatch } from "../../redux/store";
import { useNavigate } from "react-router-dom";
import { ProfileForm } from "../../types";

const CreateProfile: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const [form, setForm] = useState<ProfileForm>({
    avatar: null,
    isStudent: false,
    productivity: 100,
    location: "Gorzow",
    birthDate: "",
    livesIndependently: false,
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
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
    const { name, checked } = e.target;
    setForm((prevForm) => ({ ...prevForm, [name]: checked }));
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
    if (form.avatar instanceof File) formData.append("avatar", form.avatar);
    formData.append("isStudent", String(form.isStudent));
    formData.append("productivity", String(form.productivity));
    formData.append("location", form.location);
    formData.append("birthDate", form.birthDate);
    formData.append("livesIndependently", String(form.livesIndependently));

    try {
      await dispatch(createProfile(formData)).unwrap();
      navigate("/");
    } catch (error) {
      console.error("Failed to create profile:", error);
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
      <label className="flex items-center space-x-2">
        <input
          type="checkbox"
          name="livesIndependently"
          checked={form.livesIndependently}
          onChange={handleCheckboxChange}
          className="form-checkbox text-blue-600"
        />
        <span>Lives Independently</span>
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
      <button
        type="submit"
        className="w-full p-2 bg-blue-600 text-white rounded hover:bg-blue-500"
      >
        Create Profile
      </button>
    </form>
  );
};

export default CreateProfile;
