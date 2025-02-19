import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import Navigation from "../../components/navigation/Navigation";
import UserMenu from "../../components/userMenu/UserMenu";
import { AuthNav } from "../authNav/AuthNav";
import { selectProfile } from "../../redux/profile/selectors";
import { useNavigate } from "react-router-dom";
import { selectIsAuthenticated } from "../../redux/auth/selectors";

const AppBar: React.FC = () => {
  const isAuthenticated = useSelector(selectIsAuthenticated);
  const profile = useSelector(selectProfile);
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated && profile === null && !profile === undefined) {
      navigate("/profile/create");
    }
  }, [profile, isAuthenticated, navigate]);

  return (
    <header className="flex items-center justify-between p-4 bg-blue-900 text-white">
      <Navigation />
      {isAuthenticated ? <UserMenu /> : <AuthNav />}
    </header>
  );
};

export default AppBar;
