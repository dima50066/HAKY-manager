import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../../redux/auth/operations";
import { AppDispatch } from "../../redux/store";
import {
  selectAuthLoading,
  selectIsAuthenticated,
} from "../../redux/auth/selectors";
import { getProfile } from "../../redux/profile/operations";
import { selectProfile } from "../../redux/profile/selectors";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import Icon from "../../shared/icon/Icon";
import ResetPasswordButton from "./ResetPasswordButton";

interface LoginFormProps {
  onClose: () => void;
}

const LoginForm: React.FC<LoginFormProps> = ({ onClose }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const dispatch = useDispatch<AppDispatch>();
  const isLoading = useSelector(selectAuthLoading);
  const isAuthenticated = useSelector(selectIsAuthenticated);
  const profile = useSelector(selectProfile);
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated && !profile) {
      dispatch(getProfile());
    }
  }, [isAuthenticated, dispatch, profile, navigate]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const result = await dispatch(loginUser({ email, password }));

      if (loginUser.fulfilled.match(result)) {
        toast.success("Login successful!");
      } else {
        toast.error(
          "Login failed: " + ((result.payload as string) || "Unknown error")
        );
      }
    } catch (err: any) {
      toast.error(err.message || "Login failed");
    }
  };

  return (
    <form onSubmit={handleLogin} className="space-y-4">
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email"
        required
        autoComplete="email"
        className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-blue-500"
      />
      <div className="relative flex items-center">
        <input
          type={showPassword ? "text" : "password"}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          required
          autoComplete="current-password"
          className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-blue-500 pr-10"
        />
        <button
          type="button"
          onClick={() => setShowPassword((prev) => !prev)}
          className="absolute inset-y-0 right-3 flex items-center"
        >
          <Icon id={showPassword ? "eyeOff" : "eye"} width="22" height="22" />
        </button>
      </div>

      <button
        type="submit"
        className="w-full p-2 bg-blue-600 text-white rounded hover:bg-blue-500 disabled:opacity-50"
        disabled={isLoading}
      >
        {isLoading ? "Logging in..." : "Login"}
      </button>

      <div className="flex justify-center mt-2">
        <ResetPasswordButton onClose={onClose} />
      </div>
    </form>
  );
};

export default LoginForm;
