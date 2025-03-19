import React from "react";
import { useNavigate } from "react-router-dom";

interface ResetPasswordButtonProps {
  onClose: () => void;
}

const ResetPasswordButton: React.FC<ResetPasswordButtonProps> = ({
  onClose,
}) => {
  const navigate = useNavigate();

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    onClose(); // Закриваємо модалку
    navigate("/send-reset"); // Перенаправляємо користувача
  };

  return (
    <button
      onClick={handleClick}
      type="button"
      className="w-full bg-gray-200 text-gray-800 px-4 py-2 rounded-md hover:bg-gray-300 transition"
    >
      Forgot Password?
    </button>
  );
};

export default ResetPasswordButton;
