import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Navigation from "../../components/navigation/Navigation";
import UserMenu from "../../components/userMenu/UserMenu";
import { AuthNav } from "../authNav/AuthNav";
import { selectIsAuthenticated } from "../../redux/auth/selectors";
import logo from "../../shared/img/logo.png";
import Icon from "../../shared/icon/Icon";
import LanguageSelector from "../navigation/LanguageSelector";

const AppBar: React.FC = () => {
  const isAuthenticated = useSelector(selectIsAuthenticated);
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen((prev) => !prev);
  const closeMenu = () => setIsOpen(false);

  return (
    <header className="flex items-center justify-between p-4 bg-[#141726] text-white shadow-md">
      <div className="flex items-center">
        <Link to="/" onClick={closeMenu}>
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

      <div className="hidden lg:flex items-center mx-4">
        <LanguageSelector />
      </div>

      <div className="hidden lg:flex items-center">
        {isAuthenticated ? <UserMenu /> : <AuthNav />}
      </div>

      {isOpen && (
        <div className="z-50 absolute top-16 left-0 w-full bg-[#141726] p-4 shadow-md lg:hidden rounded-lg">
          <Navigation closeMenu={closeMenu} />

          {/* Додаємо LanguageSelector між Navigation і UserMenu/AuthNav */}
          <div className="mt-4 flex justify-center">
            <LanguageSelector />
          </div>

          <div className="mt-4">
            {isAuthenticated ? <UserMenu closeMenu={closeMenu} /> : <AuthNav />}
          </div>
        </div>
      )}
    </header>
  );
};

export default AppBar;
