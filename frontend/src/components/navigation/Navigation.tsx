import React from "react";
import { Link, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectUserRole } from "../../redux/auth/selectors";
import { useTranslation } from "react-i18next";

interface NavigationProps {
  closeMenu?: () => void;
}

const Navigation: React.FC<NavigationProps> = ({ closeMenu }) => {
  const { t } = useTranslation();
  const role = useSelector(selectUserRole);
  const location = useLocation();
  const getLinkClass = (path: string) =>
    location.pathname === path
      ? "text-white border-b-2 border-white"
      : "text-gray-300 hover:text-white transition duration-200";

  return (
    <nav className="w-full flex justify-center">
      <ul className="hidden lg:flex items-center justify-center space-x-6 text-lg font-medium gap-4">
        <li>
          <Link
            to="/productivity"
            className={getLinkClass("/productivity")}
            onClick={closeMenu}
          >
            {t("productivity")}
          </Link>
        </li>
        <li>
          <Link
            to="/salary"
            className={getLinkClass("/salary")}
            onClick={closeMenu}
          >
            {t("salary")}
          </Link>
        </li>
        <li>
          <Link
            to="/calendar"
            className={getLinkClass("/calendar")}
            onClick={closeMenu}
          >
            {t("calendar")}
          </Link>
        </li>
        <li>
          <Link
            to="/ranking"
            className={getLinkClass("/ranking")}
            onClick={closeMenu}
          >
            {t("ranking")}
          </Link>
        </li>
        {role === "coordinator" && (
          <li>
            <Link
              to="/coordinator"
              className={getLinkClass("/coordinator")}
              onClick={closeMenu}
            >
              {t("coordinator")}
            </Link>
          </li>
        )}
      </ul>

      <ul className="lg:hidden flex flex-col items-center text-lg font-medium space-y-4 max-h-60 overflow-y-auto pr-5">
        <li>
          <Link
            to="/productivity"
            className={getLinkClass("/productivity")}
            onClick={closeMenu}
          >
            {t("productivity")}
          </Link>
        </li>
        <li>
          <Link
            to="/salary"
            className={getLinkClass("/salary")}
            onClick={closeMenu}
          >
            {t("salary")}
          </Link>
        </li>
        <li>
          <Link
            to="/calendar"
            className={getLinkClass("/calendar")}
            onClick={closeMenu}
          >
            {t("calendar")}
          </Link>
        </li>
        <li>
          <Link
            to="/ranking"
            className={getLinkClass("/ranking")}
            onClick={closeMenu}
          >
            {t("ranking")}
          </Link>
        </li>
        {role === "coordinator" && (
          <li>
            <Link
              to="/coordinator"
              className={getLinkClass("/coordinator")}
              onClick={closeMenu}
            >
              {t("coordinator")}
            </Link>
          </li>
        )}
      </ul>
    </nav>
  );
};

export default Navigation;
