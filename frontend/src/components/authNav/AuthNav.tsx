import React from "react";
import { Link } from "react-router-dom";

export const AuthNav: React.FC = () => {
  return (
    <div className="flex space-x-4 justify-between">
      <Link
        to="/login"
        className="px-4 py-2 rounded-md bg-[#151728] text-gray-300 hover:bg-[#131526] hover:text-white transition duration-200"
      >
        Login
      </Link>
      <Link
        to="/register"
        className="px-4 py-2 rounded-md bg-[#151728] text-gray-300 hover:bg-[#131526] hover:text-white transition duration-200"
      >
        Register
      </Link>
    </div>
  );
};
