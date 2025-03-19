import React, { useEffect, Suspense, lazy } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { AppDispatch } from "./redux/store";
import { refreshUser } from "./redux/auth/operations";
import {
  selectIsAuthenticated,
  selectAuthLoading,
} from "./redux/auth/selectors";
import { selectProfile } from "./redux/profile/selectors";
import { getProfile } from "./redux/profile/operations";
import Loader from "./shared/loader/Loader";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const HomePage = lazy(() => import("./pages/home/Home"));
const SendReset = lazy(() => import("./components/auth/SendReset"));
const ResetPasswordPage = lazy(
  () => import("./pages/resetpwd/ResetPasswordPage")
);
const ProfilePage = lazy(() => import("./pages/profile/ProfilePage"));
const CreateProfile = lazy(() => import("./components/profile/createProfile"));
const Productivity = lazy(
  () => import("./pages/productivity/ProductivityPage")
);
const Salary = lazy(() => import("./pages/salary/Salary"));
const CoordinatorPage = lazy(
  () => import("./pages/coordinator/CoordinatorPage")
);
const EmployeeDetails = lazy(
  () => import("./components/coordinator/EmployeeDetails")
);
const RankingPage = lazy(() => import("./pages/ranking/RankingPage"));
const CalendarPage = lazy(() => import("./pages/calendar/CalendarPage"));

const PrivateRoute = lazy(() => import("./components/routers/PrivateRoute"));
const CoordinatorRoute = lazy(
  () => import("./components/routers/CoordinatorRoute")
);

const AppBar = lazy(() => import("./components/appBar/AppBar"));

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
      <Suspense fallback={<Loader />}>
        <AppBar />
      </Suspense>

      <ToastContainer />

      <Suspense fallback={<Loader />}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/send-reset" element={<SendReset />} />
          <Route path="/reset-password" element={<ResetPasswordPage />} />
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
      </Suspense>
    </Router>
  );
};

export default App;
