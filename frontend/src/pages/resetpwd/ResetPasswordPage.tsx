import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import { useSearchParams } from "react-router-dom";
import { AppDispatch, RootState } from "../../redux/store";
import { resetPassword } from "../../redux/auth/operations";

const ResetPasswordPage: React.FC = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch<AppDispatch>();
  const [newPassword, setNewPassword] = useState("");
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token") || "";

  const { resetPasswordLoading, resetPasswordError, resetPasswordSuccess } =
    useSelector((state: RootState) => state.auth);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!token) return;
    dispatch(resetPassword({ token, newPassword }));
  };

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gray-100">
      <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-md">
        <h1 className="text-3xl font-semibold text-center mb-4">
          {t("resetpwd_title")}
        </h1>
        <p className="text-gray-600 text-center mb-6">{t("resetpwd_desc")}</p>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-gray-700">{t("resetpwd_new")}</label>
            <input
              type="password"
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-300"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              required
            />
          </div>
          {resetPasswordError && (
            <p className="text-red-500">{resetPasswordError}</p>
          )}
          {resetPasswordSuccess && (
            <p className="text-green-500">{t("resetpwd_success")}</p>
          )}
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition"
            disabled={resetPasswordLoading || !token}
          >
            {resetPasswordLoading
              ? t("resetpwd_loading")
              : t("resetpwd_submit")}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ResetPasswordPage;
