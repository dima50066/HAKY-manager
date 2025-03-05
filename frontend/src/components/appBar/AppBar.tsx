import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Navigation from "../../components/navigation/Navigation";
import UserMenu from "../../components/userMenu/UserMenu";
import { AuthNav } from "../authNav/AuthNav";
import { selectIsAuthenticated } from "../../redux/auth/selectors";
import logo from "../../shared/img/logo.png";
import Icon from "../../shared/icon/Icon";

const AppBar: React.FC = () => {
  const isAuthenticated = useSelector(selectIsAuthenticated);
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen((prev) => !prev);
  };

  return (
    <header className="flex items-center justify-between p-4 bg-[#141726] text-white shadow-md">
      <div className="flex items-center">
        <Link to="/">
          <img src={logo} alt="Logo" className="h-14 sm:h-20 cursor-pointer" />
        </Link>
      </div>

      <button
        className="lg:hidden flex items-center px-3 py-2 text-white bg-[#151728] rounded-lg hover:bg-[#131526] focus:outline-none focus:ring-2 focus:ring-[#151727]"
        onClick={toggleMenu}
      >
        <Icon
          id={isOpen ? "menu-close" : "menu-open"}
          width="24"
          height="24"
          className="text-white"
        />
      </button>

      <nav className="hidden lg:flex flex-1 justify-center">
        <Navigation />
      </nav>

      <div className="hidden lg:flex items-center">
        {isAuthenticated ? <UserMenu /> : <AuthNav />}
      </div>

      {isOpen && (
        <div className="absolute top-16 left-0 w-full bg-[#141726] p-4 shadow-md lg:hidden rounded-lg">
          <Navigation />
          <div className="mt-4">
            {isAuthenticated ? <UserMenu /> : <AuthNav />}
          </div>
        </div>
      )}
    </header>
  );
};

export default AppBar;
