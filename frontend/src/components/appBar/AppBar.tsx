import React from 'react';
import { useSelector } from 'react-redux';
import Navigation from '../../components/navigation/Navigation';
import UserMenu from '../../components/userMenu/UserMenu';
import { AuthNav } from '../authNav/AuthNav';
import { selectToken } from '../../redux/auth/selectors';

const AppBar: React.FC = () => {
  const token = useSelector(selectToken);
  const isAuthenticated = Boolean(token);

  return (
    <header className="flex items-center justify-between p-4 bg-blue-900 text-white">
      <Navigation />
      {isAuthenticated ? <UserMenu /> : <AuthNav />}
    </header>
  );
};

export default AppBar;