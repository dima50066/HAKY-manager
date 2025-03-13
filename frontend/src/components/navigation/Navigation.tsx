import React from "react";
import { Link, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectUserRole } from "../../redux/auth/selectors";

interface NavigationProps {
  closeMenu?: () => void;
}

const Navigation: React.FC<NavigationProps> = ({ closeMenu }) => {
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
            Productivity
          </Link>
        </li>
        <li>
          <Link
            to="/salary"
            className={getLinkClass("/salary")}
            onClick={closeMenu}
          >
            Salary
          </Link>
        </li>
        <li>
          <Link
            to="/calendar"
            className={getLinkClass("/calendar")}
            onClick={closeMenu}
          >
            Calendar
          </Link>
        </li>
        <li>
          <Link
            to="/ranking"
            className={getLinkClass("/ranking")}
            onClick={closeMenu}
          >
            Ranking
          </Link>
        </li>
        {role === "coordinator" && (
          <li>
            <Link
              to="/coordinator"
              className={getLinkClass("/coordinator")}
              onClick={closeMenu}
            >
              Coordinator
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
            Productivity
          </Link>
        </li>
        <li>
          <Link
            to="/salary"
            className={getLinkClass("/salary")}
            onClick={closeMenu}
          >
            Salary
          </Link>
        </li>
        <li>
          <Link
            to="/calendar"
            className={getLinkClass("/calendar")}
            onClick={closeMenu}
          >
            Calendar
          </Link>
        </li>
        <li>
          <Link
            to="/ranking"
            className={getLinkClass("/ranking")}
            onClick={closeMenu}
          >
            Ranking
          </Link>
        </li>
        {role === "coordinator" && (
          <li>
            <Link
              to="/coordinator"
              className={getLinkClass("/coordinator")}
              onClick={closeMenu}
            >
              Coordinator
            </Link>
          </li>
        )}
      </ul>
    </nav>
  );
};

export default Navigation;
