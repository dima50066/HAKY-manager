import React from "react";
import { Link, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectUserRole } from "../../redux/auth/selectors";

const Navigation: React.FC = () => {
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
          <Link to="/productivity" className={getLinkClass("/productivity")}>
            Productivity
          </Link>
        </li>
        <li>
          <Link to="/salary" className={getLinkClass("/salary")}>
            Salary
          </Link>
        </li>
        <li>
          <Link to="/calendar" className={getLinkClass("/calendar")}>
            Calendar
          </Link>
        </li>
        <li>
          <Link to="/ranking" className={getLinkClass("/ranking")}>
            Ranking
          </Link>
        </li>
        {role === "coordinator" && (
          <li>
            <Link to="/coordinator" className={getLinkClass("/coordinator")}>
              Coordinator
            </Link>
          </li>
        )}
      </ul>

      <ul className="lg:hidden flex flex-col items-center text-lg font-medium space-y-4 max-h-60 overflow-y-auto pr-5">
        <li>
          <Link
            to="/productivity"
            className={`${getLinkClass(
              "/productivity"
            )} block w-full text-center py-2`}
          >
            Productivity
          </Link>
        </li>
        <li>
          <Link
            to="/salary"
            className={`${getLinkClass(
              "/salary"
            )} block w-full text-center py-2`}
          >
            Salary
          </Link>
        </li>
        <li>
          <Link
            to="/calendar"
            className={`${getLinkClass(
              "/calendar"
            )} block w-full text-center py-2`}
          >
            Calendar
          </Link>
        </li>
        <li>
          <Link
            to="/ranking"
            className={`${getLinkClass(
              "/ranking"
            )} block w-full text-center py-2`}
          >
            Ranking
          </Link>
        </li>
        {role === "coordinator" && (
          <li>
            <Link
              to="/coordinator"
              className={`${getLinkClass(
                "/coordinator"
              )} block w-full text-center py-2`}
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
