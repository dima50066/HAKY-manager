import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
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
import Productivity from "./pages/productivity/ProductivityPage";
import Salary from "./pages/salary/Salary";
import Calendar from "./pages/calendar/CalendarPage";
import {
  selectIsAuthenticated,
  selectAuthLoading,
} from "./redux/auth/selectors";
import { selectProfile } from "./redux/profile/selectors";
import { getProfile } from "./redux/profile/operations";
import CoordinatorPage from "./pages/coordinator/CoordinatorPage";
import CoordinatorRoute from "./components/routers/CoordinatorRoute";
import EmployeeDetails from "./components/coordinator/EmployeeDetails";
import RankingPage from "./pages/ranking/RankingPage";

const App: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const isAuthenticated = useSelector(selectIsAuthenticated);
  const isLoading = useSelector(selectAuthLoading);
  const profile = useSelector(selectProfile);

  useEffect(() => {
    dispatch(refreshUser());
  }, [dispatch]);

  useEffect(() => {
    if (isAuthenticated && profile === null) {
      dispatch(getProfile());
    }
  }, [dispatch, isAuthenticated, profile]);

  if (isLoading || (isAuthenticated && profile === undefined)) {
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
        <Route
          path="/coordinator"
          element={
            <CoordinatorRoute component={<CoordinatorPage />} redirectTo="/" />
          }
        />
        <Route
          path="/coordinator/employees/:id"
          element={
            <CoordinatorRoute component={<EmployeeDetails />} redirectTo="/" />
          }
        />

        {/* Додав маршрут для сторінки рейтингу */}
        <Route
          path="/ranking"
          element={
            <PrivateRoute component={<RankingPage />} redirectTo="/login" />
          }
        />
      </Routes>
    </Router>
  );
};

export default App;
