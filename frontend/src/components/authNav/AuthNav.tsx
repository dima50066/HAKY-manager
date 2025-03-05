import React from "react";
import { Link } from "react-router-dom";

export const AuthNav: React.FC = () => {
  return (
    <div className="flex space-x-4 justify-between">
      <Link
        to="/login"
        className="px-4 py-2 text-sm sm:text-base font-medium text-white bg-[#1E88E5] hover:bg-[#1565C0] rounded-md shadow-md transition-all duration-300"
      >
        Login
      </Link>
      <Link
        to="/register"
        className="px-4 py-2 text-sm sm:text-base font-medium text-white bg-[#43A047] hover:bg-[#2E7D32] rounded-md shadow-md transition-all duration-300"
      >
        Register
      </Link>
    </div>
  );
};
