import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { setCredentials } from './redux/auth/slice';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LoginPage from './pages/login/Login';
import RegisterPage from './pages/register/Register';
import ResetPassword from './components/auth/SendReset';
// import AppBar from './components/appBar/AppBar';
import HomePage from './pages/home/Home';
// import ChangePasswordPage from './pages/change-password/ChangePasswordPage';
// import NotFound from './pages/not-found/NotFound';
import { AppDispatch } from './redux/store';
import PrivateRoute from './components/routers/PrivateRoute';
import RestrictedRoute from './components/routers/RestrictedRoute';
import { refreshUser } from './redux/auth/operations';
import { ToastContainer } from 'react-toastify';
// import Footer from './components/footer/Footer';
import LoadingSpinner from './components/loader/LoadingSpinner';
import 'react-toastify/dist/ReactToastify.css';

const App: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const [isRefreshingUser, setIsRefreshingUser] = useState(true);

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem('user') || 'null');
    const storedToken = localStorage.getItem('token');

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

      if (result.meta.requestStatus === 'fulfilled') {
        const { accessToken } = result.payload;
        localStorage.setItem('token', accessToken);
      } else {
        localStorage.removeItem('user');
        localStorage.removeItem('token');
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
      {/* <AppBar /> */}
      <ToastContainer />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route
          path="/login"
          element={<RestrictedRoute component={<LoginPage />} redirectTo="/" />}
        />
        <Route
          path="/register"
          element={<RestrictedRoute component={<RegisterPage />} redirectTo="/" />}
        />
        <Route path="/send-reset" element={<ResetPassword />} />
        {/* <Route path="/reset-password" element={<ChangePasswordPage />} /> */}
        {/* <Route path="*" element={<NotFound />} /> */}
      </Routes>
      {/* <Footer /> */}
    </Router>
  );
};

export default App;