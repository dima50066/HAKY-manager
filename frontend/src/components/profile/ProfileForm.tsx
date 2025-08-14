import React, { useState } from "react";
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
    contactNumber: profile?.contactNumber || "",
    peselNumber: profile?.peselNumber || "",
    language: profile?.language || "",
  });

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = e.target;
    setForm((prevForm) => ({
      ...prevForm,
      [name]: name === "productivity" ? Number(value) : value,
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
    if (form.contactNumber) {
      formData.append("contactNumber", form.contactNumber);
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
      className="
        mx-auto w-full p-6 bg-white rounded-lg space-y-4 transition-all duration-300
       md:max-w-2xl lg:max-w-3xl
      "
    >
      <div className="grid gap-4 grid-cols-1 md:grid-cols-4 lg:grid-cols-4">
        <div>
          <label htmlFor="avatar" className="block font-medium text-gray-700">
            {t("avatar")}
          </label>
          <input
            id="avatar"
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-blue-500"
          />
        </div>

        <div>
          <label
            htmlFor="birthDate"
            className="block font-medium text-gray-700"
          >
            {t("birth_date")}
          </label>
          <input
            id="birthDate"
            name="birthDate"
            type="date"
            value={form.birthDate}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-blue-500"
          />
        </div>

        <div className="md:col-span-2">
          <label htmlFor="address" className="block font-medium text-gray-700">
            {t("address")}
          </label>
          <textarea
            id="address"
            name="address"
            value={form.address}
            onChange={handleChange}
            rows={3}
            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-blue-500"
          />
        </div>

        <div>
          <label
            htmlFor="emergencyContactNumber"
            className="block font-medium text-gray-700"
          >
            {t("emergency_contact")}
          </label>
          <input
            id="emergencyContactNumber"
            name="emergencyContactNumber"
            type="tel"
            inputMode="tel"
            pattern="^[0-9+\\s()-]{7,}$"
            value={form.emergencyContactNumber}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-blue-500"
          />
        </div>

        <div>
          <label
            htmlFor="contactNumber"
            className="block font-medium text-gray-700"
          >
            {t("contact_number")}
          </label>
          <input
            id="contactNumber"
            name="contactNumber"
            type="tel"
            inputMode="tel"
            pattern="^[0-9+\\s()-]{7,}$"
            value={form.contactNumber}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-blue-500"
          />
        </div>

        <div>
          <label
            htmlFor="peselNumber"
            className="block font-medium text-gray-700"
          >
            {t("pesel_number")}
          </label>
          <input
            id="peselNumber"
            name="peselNumber"
            type="text"
            inputMode="numeric"
            pattern="^\\d{11}$"
            maxLength={11}
            value={form.peselNumber}
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
