import React from 'react';
import { Link } from 'react-router-dom';

export const AuthNav: React.FC = () => {
  return (
    <div className="flex space-x-4">
      <Link
        to="/login"
        className="text-yellow-300 hover:text-yellow-100 focus:text-yellow-400 active:text-yellow-500 transition duration-200"
      >
        Login
      </Link>
      <Link
        to="/register"
        className="text-yellow-300 hover:text-yellow-100 focus:text-yellow-400 active:text-yellow-500 transition duration-200"
      >
        Register
      </Link>
    </div>
  );
};