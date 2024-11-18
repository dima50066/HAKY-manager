import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { setCredentials } from "./redux/auth/slice";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import LoginPage from "./pages/login/Login";
import RegisterPage from "./pages/register/Register";
import ResetPassword from "./components/auth/SendReset";
import AppBar from "./components/appBar/AppBar";
import HomePage from "./pages/home/Home";
import { AppDispatch } from "./redux/store";
import RestrictedRoute from "./components/routers/RestrictedRoute";
import { refreshUser } from "./redux/auth/operations";
import { ToastContainer } from "react-toastify";
import LoadingSpinner from "./components/loader/LoadingSpinner";
import "react-toastify/dist/ReactToastify.css";
import ProfilePage from "./pages/profile/ProfilePage";
import PrivateRoute from "./components/routers/PrivateRoute";
import CreateProfile from "./components/profile/createProfile";
import { getProfile } from "./redux/profile/operations";
import Productivity from "./pages/productivity/ProductivityPage";
import Salary from "./pages/salary/Salary";
import Calendar from "./pages/calendar/CalendarPage";

const App: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const [isRefreshingUser, setIsRefreshingUser] = useState(true);

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user") || "null");
    const storedToken = localStorage.getItem("token");

    if (storedUser && storedToken) {
      dispatch(setCredentials({ user: storedUser, accessToken: storedToken }));
      refreshUserData();
    } else {
      setIsRefreshingUser(false);
    }
  }, [dispatch]);

  const refreshUserData = async () => {
    try {
      const result = await dispatch(refreshUser());

      if (result.meta.requestStatus === "fulfilled") {
        const { accessToken } = result.payload;
        localStorage.setItem("token", accessToken);

        await dispatch(getProfile());
      } else {
        localStorage.removeItem("user");
        localStorage.removeItem("token");
      }
    } finally {
      setIsRefreshingUser(false);
    }
  };

  if (isRefreshingUser) {
    return <LoadingSpinner loading={true} size={60} color="#3498db" />;
  }

  return (
    <Router>
      <AppBar />
      <ToastContainer />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route
          path="/login"
          element={<RestrictedRoute component={<LoginPage />} redirectTo="/" />}
        />
        <Route
          path="/register"
          element={
            <RestrictedRoute component={<RegisterPage />} redirectTo="/" />
          }
        />
        <Route path="/send-reset" element={<ResetPassword />} />
        <Route
          path="/profile"
          element={
            <PrivateRoute component={<ProfilePage />} redirectTo="/login" />
          }
        />
        <Route
          path="/profile/create"
          element={
            <PrivateRoute component={<CreateProfile />} redirectTo="/login" />
          }
        />
        <Route
          path="/productivity"
          element={
            <PrivateRoute component={<Productivity />} redirectTo="/login" />
          }
        />
        <Route
          path="/salary"
          element={<PrivateRoute component={<Salary />} redirectTo="/login" />}
        />
        <Route
          path="/calendar"
          element={
            <PrivateRoute component={<Calendar />} redirectTo="/login" />
          }
        />
      </Routes>
    </Router>
  );
};

export default App;
