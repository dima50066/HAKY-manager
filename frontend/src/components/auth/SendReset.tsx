import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { requestResetToken } from '../../redux/auth/operations';
import { RootState } from '../../redux/store';
import { toast } from 'react-toastify';
import { AppDispatch } from '../../redux/store';

const ResetPassword: React.FC = () => {
  const [email, setEmail] = useState<string>('');
  const dispatch = useDispatch<AppDispatch>();
  const loading = useSelector((state: RootState) => state.auth.loading);

  const handleResetPasswordSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const resultAction = await dispatch(requestResetToken(email.trim()));
    if (requestResetToken.fulfilled.match(resultAction)) {
      toast.success('A reset password email has been sent.');
    } else {
      toast.error(resultAction.payload as string);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-md">
        <h2 className="text-2xl font-bold text-center mb-6">Reset Password</h2>
        <form onSubmit={handleResetPasswordSubmit} className="space-y-4">
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-blue-500"
          />
          <button
            type="submit"
            disabled={loading}
            className={`w-full p-2 rounded ${loading ? 'bg-gray-400' : 'bg-blue-600 text-white hover:bg-blue-500'}`}
          >
            {loading ? 'Sending...' : 'Send Reset Email'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ResetPassword;