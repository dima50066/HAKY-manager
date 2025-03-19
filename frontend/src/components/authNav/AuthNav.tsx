import React, { useState } from "react";
import Modal from "../../shared/modal/Modal";
import LoginForm from "../auth/LoginForm";
import RegisterForm from "../auth/RegisterForm";

export const AuthNav: React.FC = () => {
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isRegisterOpen, setIsRegisterOpen] = useState(false);

  return (
    <div className="flex space-x-4 justify-between">
      <button
        onClick={() => setIsLoginOpen(true)}
        className="px-4 py-2 text-sm sm:text-base font-medium text-white bg-[#1E88E5] hover:bg-[#1565C0] rounded-md shadow-md transition-all duration-300"
      >
        Login
      </button>
      <button
        onClick={() => setIsRegisterOpen(true)}
        className="px-4 py-2 text-sm sm:text-base font-medium text-white bg-[#43A047] hover:bg-[#2E7D32] rounded-md shadow-md transition-all duration-300"
      >
        Register
      </button>

      <Modal
        isOpen={isLoginOpen}
        classNameWrapper="pt-20 sm:pt-14 lg:pt-2"
        btnClassName="top-1 right-4 sm:top-4 sm:right-4"
        onClose={() => setIsLoginOpen(false)}
      >
        <h2 className="text-xl font-semibold text-gray-800 text-center mb-4">
          Login
        </h2>
        <LoginForm onClose={() => setIsLoginOpen(false)} />{" "}
      </Modal>

      <Modal
        isOpen={isRegisterOpen}
        classNameWrapper="pt-20 sm:pt-14 lg:pt-2"
        btnClassName="top-1 right-4 sm:top-1 sm:right-4"
        onClose={() => setIsRegisterOpen(false)}
      >
        <h2 className="text-xl font-semibold text-gray-800 text-center mb-4">
          Register
        </h2>
        <RegisterForm onClose={() => setIsRegisterOpen(false)} />{" "}
      </Modal>
    </div>
  );
};
