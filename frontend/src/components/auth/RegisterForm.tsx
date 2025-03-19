import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useAppDispatch, useAppSelector } from "../../redux/store";
import { registerUser } from "../../redux/auth/operations";
import { selectAuthLoading, selectAuthError } from "../../redux/auth/selectors";
import Icon from "../../shared/icon/Icon";
import ResetPasswordButton from "./ResetPasswordButton";

interface RegisterFormProps {
  onClose: () => void;
}

const RegisterForm: React.FC<RegisterFormProps> = ({ onClose }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const isLoading = useAppSelector(selectAuthLoading);
  const error = useAppSelector(selectAuthError);

  const handleRegister = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const resultAction = await dispatch(
      registerUser({ name, email, password })
    );

    if (registerUser.fulfilled.match(resultAction)) {
      toast.success("Registration successful!");
      navigate("/");
    } else {
      const errorMessage =
        typeof resultAction.payload === "string"
          ? resultAction.payload
          : "Registration failed";
      toast.error(errorMessage);
    }
  };

  return (
    <form onSubmit={handleRegister} className="space-y-4">
      <label className="block">
        <span className="text-gray-700">Name:</span>
        <input
          type="text"
          value={name}
          onChange={(event) => setName(event.target.value)}
          required
          className="mt-1 block w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-blue-500"
        />
      </label>
      <label className="block">
        <span className="text-gray-700">Email:</span>
        <input
          type="email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          required
          className="mt-1 block w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-blue-500"
        />
      </label>
      <label className="block relative">
        <span className="text-gray-700">Password:</span>
        <div className="relative flex items-center mt-1">
          <input
            type={showPassword ? "text" : "password"}
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            required
            className="block w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-blue-500 pr-10"
          />
          <button
            type="button"
            onClick={() => setShowPassword((prev) => !prev)}
            className="absolute inset-y-0 right-3 flex items-center"
          >
            <Icon id={showPassword ? "eyeOff" : "eye"} width="22" height="22" />
          </button>
        </div>
      </label>

      <button
        type="submit"
        disabled={isLoading}
        className={`w-full p-2 text-white rounded ${
          isLoading
            ? "bg-gray-400 cursor-not-allowed"
            : "bg-blue-600 hover:bg-blue-500"
        }`}
      >
        {isLoading ? "Registering..." : "Register"}
      </button>
      {error && <p className="text-red-500 text-center mt-2">{error}</p>}

      <div className="flex justify-center mt-2">
        <ResetPasswordButton onClose={onClose} />{" "}
      </div>
    </form>
  );
};

export default RegisterForm;
