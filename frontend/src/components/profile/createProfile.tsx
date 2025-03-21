import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { createProfile } from "../../redux/profile/operations";
import { AppDispatch } from "../../redux/store";
import { useNavigate } from "react-router-dom";
import { ProfileForm } from "../../types";
import { useTranslation } from "react-i18next";
import * as Popover from "@radix-ui/react-popover";
import Icon from "../../shared/icon/Icon";

const CreateProfile: React.FC = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const [form, setForm] = useState<ProfileForm>({
    avatar: null,
    isStudent: false,
    productivity: 100,
    location: "Gorzow",
    birthDate: "",
    livesIndependently: false,
    usesCompanyTransport: false,
    language: "",
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
    formData.append("usesCompanyTransport", String(form.usesCompanyTransport));

    try {
      await dispatch(createProfile(formData)).unwrap();
      navigate("/");
    } catch (error) {
      console.error("Failed to create profile:", error);
    }
  };

  return (
    <div className="p-4 sm:p-6 bg-white shadow-md rounded-lg">
      <div className="flex items-center justify-center mb-4 relative">
        <h1 className="text-2xl font-bold text-center">
          {t("create_profile_title")}
        </h1>

        <Popover.Root>
          <Popover.Trigger asChild>
            <button className="ml-2 p-2 rounded-full bg-gray-200 hover:bg-gray-300 transition-all">
              <Icon
                id="info"
                width={20}
                height={20}
                className="text-gray-600"
              />
            </button>
          </Popover.Trigger>
          <Popover.Portal>
            <Popover.Content
              side="bottom"
              align="center"
              className="bg-white shadow-xl rounded-lg p-4 w-80 text-sm text-gray-700 border border-gray-200"
            >
              <p className="font-semibold">{t("profile_create")}</p>
              <Popover.Close className="absolute top-2 right-2 text-gray-500 hover:text-gray-700">
                ✖
              </Popover.Close>
            </Popover.Content>
          </Popover.Portal>
        </Popover.Root>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-2">
          <label className="block text-gray-700 font-medium">
            {t("upload_avatar")}
          </label>
          <input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-blue-500"
          />
        </div>

        <div className="flex flex-col space-y-2">
          <label className="flex items-center space-x-2">
            <input
              type="checkbox"
              name="isStudent"
              checked={form.isStudent}
              onChange={handleCheckboxChange}
              className="form-checkbox text-blue-600"
            />
            <span>{t("student")}</span>
          </label>
          <label className="flex items-center space-x-2">
            <input
              type="checkbox"
              name="livesIndependently"
              checked={form.livesIndependently}
              onChange={handleCheckboxChange}
              className="form-checkbox text-blue-600"
            />
            <span>{t("lives_independently")}</span>
          </label>
          <label className="flex items-center space-x-2">
            <input
              type="checkbox"
              name="usesCompanyTransport"
              checked={form.usesCompanyTransport}
              onChange={handleCheckboxChange}
              className="form-checkbox text-blue-600"
            />
            <span>{t("uses_company_transport")}</span>
          </label>
        </div>

        <div className="space-y-2">
          <label className="block text-gray-700 font-medium">
            {t("productivity")}
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
        </div>

        <div className="space-y-2">
          <label className="block text-gray-700 font-medium">
            {t("location")}
          </label>
          <select
            name="location"
            value={form.location}
            onChange={handleSelectChange}
            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-blue-500"
          >
            <option value="Gorzow">Gorzow</option>
            <option value="Gdansk">Gdansk</option>
            <option value="Krakow">Krakow</option>
          </select>
        </div>

        <div className="space-y-2">
          <label className="block text-gray-700 font-medium">
            {t("birth_date")}
          </label>
          <input
            type="date"
            name="birthDate"
            value={form.birthDate}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-blue-500"
          />
        </div>

        <button
          type="submit"
          className="w-full p-3 bg-blue-600 text-white rounded hover:bg-blue-500 transition"
        >
          {t("create_profile")}
        </button>
      </form>
    </div>
  );
};

export default CreateProfile;
