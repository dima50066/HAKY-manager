import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useAppDispatch, useAppSelector } from "../../redux/store";
import { registerUser } from "../../redux/auth/operations";
import { selectAuthLoading, selectAuthError } from "../../redux/auth/selectors";

const RegisterForm: React.FC = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
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
      navigate("/login");
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
      <label className="block">
        <span className="text-gray-700">Password:</span>
        <input
          type="password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          required
          className="mt-1 block w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-blue-500"
        />
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
    </form>
  );
};

export default RegisterForm;
