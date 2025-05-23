import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateProfile } from "../../redux/profile/operations";
import { selectProfile } from "../../redux/profile/selectors";
import { AppDispatch } from "../../redux/store";
import type { ProfileForm } from "../../types";
import { useTranslation } from "react-i18next";

interface ProfileUpdateFormProps {
  onClose: () => void;
}

const ProfileUpdateForm: React.FC<ProfileUpdateFormProps> = ({ onClose }) => {
  const { t } = useTranslation();
  const dispatch = useDispatch<AppDispatch>();
  const profile = useSelector(selectProfile);

  const [form, setForm] = useState<ProfileForm>({
    avatar: null,
    isStudent: profile?.isStudent || false,
    productivity: profile?.productivity ?? 100,
    location: profile?.location || "",
    birthDate: profile?.birthDate || "",
    livesIndependently: profile?.livesIndependently || false,
    usesCompanyTransport: profile?.usesCompanyTransport || false,
    address: profile?.address || "",
    emergencyContactNumber: profile?.emergencyContactNumber || "",
    peselNumber: profile?.peselNumber || "",
    language: profile?.language || "",
  });

  const [screenWidth, setScreenWidth] = useState(window.innerWidth);
  const [columns, setColumns] = useState(1);

  useEffect(() => {
    const handleResize = () => setScreenWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if (screenWidth >= 768) {
      setColumns(2);
    } else {
      setColumns(1);
    }
  }, [screenWidth]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
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

    if (form.location) {
      formData.append("location", form.location);
    }

    if (form.birthDate) {
      formData.append("birthDate", form.birthDate);
    }

    formData.append("livesIndependently", String(form.livesIndependently));
    formData.append("usesCompanyTransport", String(form.usesCompanyTransport));

    if (form.address) {
      formData.append("address", form.address);
    }

    if (form.emergencyContactNumber) {
      formData.append("emergencyContactNumber", form.emergencyContactNumber);
    }

    if (form.peselNumber) {
      formData.append("peselNumber", form.peselNumber);
    }

    try {
      await dispatch(updateProfile(formData)).unwrap();
      alert(t("profile_updated_success"));
      onClose();
    } catch (error) {
      console.error(t("profile_update_failed"), error);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className={`mx-auto p-6 bg-white rounded-lg space-y-4 transition-all duration-300 ${
        columns === 1 ? "max-w-md" : columns === 2 ? "max-w-3xl" : "max-w-5xl"
      }`}
    >
      <div
        className={`grid gap-4 ${
          columns === 1 ? "grid-cols-1" : "grid-cols-2"
        }`}
      >
        <div>
          <label htmlFor="avatar" className="block font-medium text-gray-700">
            {t("avatar")}
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
            {t("is_student")}
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
          <label htmlFor="livesIndependently" className="block text-gray-700">
            {t("lives_independently")}
          </label>
        </div>
        <div className="flex items-center space-x-2">
          <input
            type="checkbox"
            name="usesCompanyTransport"
            id="usesCompanyTransport"
            checked={form.usesCompanyTransport}
            onChange={handleCheckboxChange}
            className="form-checkbox text-blue-600"
          />
          <label htmlFor="usesCompanyTransport" className="block text-gray-700">
            {t("uses_company_transport")}
          </label>
        </div>

        <div>
          <label
            htmlFor="productivity"
            className="block font-medium text-gray-700"
          >
            {t("productivity_level")}
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
          <label htmlFor="location" className="block font-medium text-gray-700">
            {t("location")}
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
      </div>

      <button
        type="submit"
        className="w-full p-2 bg-blue-600 text-white rounded hover:bg-blue-500 focus:outline-none focus:ring focus:ring-blue-300"
      >
        {t("update_profile")}
      </button>
    </form>
  );
};

export default ProfileUpdateForm;
