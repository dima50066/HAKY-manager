import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import ResetPassword from "./components/auth/SendReset";
import AppBar from "./components/appBar/AppBar";
import HomePage from "./pages/home/Home";
import { AppDispatch } from "./redux/store";
import { refreshUser } from "./redux/auth/operations";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ProfilePage from "./pages/profile/ProfilePage";
import PrivateRoute from "./components/routers/PrivateRoute";
import CreateProfile from "./components/profile/createProfile";
import Productivity from "./pages/productivity/ProductivityPage";
import Salary from "./pages/salary/Salary";
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
import CalendarPage from "./pages/calendar/CalendarPage";
import Loader from "./shared/loader/Loader";

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
    return <Loader />;
  }

  return (
    <Router>
      <AppBar />
      <ToastContainer />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/send-reset" element={<ResetPassword />} />
        <Route
          path="/profile"
          element={<PrivateRoute component={<ProfilePage />} />}
        />
        <Route
          path="/profile/create"
          element={<PrivateRoute component={<CreateProfile />} />}
        />
        <Route
          path="/productivity"
          element={<PrivateRoute component={<Productivity />} />}
        />
        <Route
          path="/salary"
          element={<PrivateRoute component={<Salary />} />}
        />
        <Route
          path="/coordinator"
          element={<CoordinatorRoute component={<CoordinatorPage />} />}
        />
        <Route
          path="/coordinator/employees/:id"
          element={<CoordinatorRoute component={<EmployeeDetails />} />}
        />
        <Route
          path="/ranking"
          element={<PrivateRoute component={<RankingPage />} />}
        />
        <Route
          path="/calendar"
          element={<PrivateRoute component={<CalendarPage />} />}
        />
      </Routes>
    </Router>
  );
};

export default App;
