import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser } from '../../redux/auth/operations';
import { AppDispatch } from '../../redux/store';
import { useNavigate } from 'react-router-dom';
import { selectIsLoggedIn, selectError } from '../../redux/auth/selectors';
import { toast } from 'react-toastify';

const LoginForm: React.FC = () => {
  const [emailInput, setEmailInput] = useState('');
  const [passwordInput, setPasswordInput] = useState('');

  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const errorFromRedux = useSelector(selectError);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const resultAction = await dispatch(loginUser({ email: emailInput, password: passwordInput }));
      if (loginUser.fulfilled.match(resultAction)) {
        toast.success('Login successful!');
        navigate('/contacts');
      } else {
        toast.error('Login failed: ' + (resultAction.payload as string || 'Unknown error'));
      }
    } catch (err: any) {
      toast.error(err.message || 'Login failed');
    }
  };

  useEffect(() => {
    if (isLoggedIn) {
      navigate('/contacts');
    }
  }, [isLoggedIn, navigate]);


  useEffect(() => {
    if (errorFromRedux) {
      toast.error(errorFromRedux);
    }
  }, [errorFromRedux]);

  return (
    <form onSubmit={handleLogin} className="space-y-4">
      <input
        type="email"
        value={emailInput}
        onChange={(e) => setEmailInput(e.target.value)}
        placeholder="Email"
        required
        autoComplete='email'
        className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-blue-500"
      />
      <input
        type="password"
        value={passwordInput}
        onChange={(e) => setPasswordInput(e.target.value)}
        placeholder="Password"
        required
        autoComplete='current-password'
        className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-blue-500"
      />
      <button type="submit" className="w-full p-2 bg-blue-600 text-white rounded hover:bg-blue-500">
        Login
      </button>
    </form>
  );
};

export default LoginForm;