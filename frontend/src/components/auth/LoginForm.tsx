import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../../redux/auth/operations";
import { AppDispatch } from "../../redux/store";
import { selectAuthLoading, selectAuthError } from "../../redux/auth/selectors";
import { toast } from "react-toastify";
import { getProfile } from "../../redux/profile/operations";

const LoginForm: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [hasLoggedIn] = useState(false);

  const dispatch = useDispatch<AppDispatch>();
  const isLoading = useSelector(selectAuthLoading);
  const authError = useSelector(selectAuthError);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const result = await dispatch(loginUser({ email, password }));

      if (loginUser.fulfilled.match(result)) {
        toast.success("Login successful!");

        await dispatch(getProfile());
      } else {
        toast.error(
          "Login failed: " + ((result.payload as string) || "Unknown error")
        );
      }
    } catch (err: any) {
      toast.error(err.message || "Login failed");
    }
  };

  useEffect(() => {
    if (hasLoggedIn && authError) {
      toast.error("Login failed: " + authError);
    }
  }, [authError, hasLoggedIn]);

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
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
        required
        autoComplete="current-password"
        className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-blue-500"
      />
      <button
        type="submit"
        className="w-full p-2 bg-blue-600 text-white rounded hover:bg-blue-500 disabled:opacity-50"
        disabled={isLoading}
      >
        {isLoading ? "Logging in..." : "Login"}
      </button>
    </form>
  );
};

export default LoginForm;
