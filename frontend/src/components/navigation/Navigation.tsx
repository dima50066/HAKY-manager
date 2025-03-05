import React from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectUserRole } from "../../redux/auth/selectors";

const Navigation: React.FC = () => {
  const role = useSelector(selectUserRole);

  return (
    <nav className="w-full flex justify-center ">
      <ul className="hidden lg:flex items-center justify-center space-x-6 text-lg font-medium gap-4">
        <li>
          <Link
            to="/productivity"
            className="text-gray-300 hover:text-white transition duration-200"
          >
            Productivity
          </Link>
        </li>
        <li>
          <Link
            to="/salary"
            className="text-gray-300 hover:text-white transition duration-200"
          >
            Salary
          </Link>
        </li>
        <li>
          <Link
            to="/calendar"
            className="text-gray-300 hover:text-white transition duration-200"
          >
            Calendar
          </Link>
        </li>
        <li>
          <Link
            to="/ranking"
            className="text-gray-300 hover:text-white transition duration-200"
          >
            Ranking
          </Link>
        </li>
        {role === "coordinator" && (
          <li>
            <Link
              to="/coordinator"
              className="text-gray-300 hover:text-white transition duration-200"
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
            className="block w-full text-center text-gray-300 hover:text-white transition duration-200 py-2"
          >
            Productivity
          </Link>
        </li>
        <li>
          <Link
            to="/salary"
            className="block w-full text-center text-gray-300 hover:text-white transition duration-200 py-2"
          >
            Salary
          </Link>
        </li>
        <li>
          <Link
            to="/calendar"
            className="block w-full text-center text-gray-300 hover:text-white transition duration-200 py-2"
          >
            Calendar
          </Link>
        </li>
        <li>
          <Link
            to="/ranking"
            className="block w-full text-center text-gray-300 hover:text-white transition duration-200 py-2"
          >
            Ranking
          </Link>
        </li>
        {role === "coordinator" && (
          <li>
            <Link
              to="/coordinator"
              className="block w-full text-center text-gray-300 hover:text-white transition duration-200 py-2"
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
