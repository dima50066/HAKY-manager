import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import SalaryList from '../../components/salary/SalaryList';
import { calculateUserSalary, fetchSalaryHistory } from '../../redux/salary/operations';
import { selectSalaryLoading, selectSalaryError } from '../../redux/salary/selectors';
import { AppDispatch } from '../../redux/store';

const SalaryPage: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const loading = useSelector(selectSalaryLoading);
  const error = useSelector(selectSalaryError);

  useEffect(() => {
    dispatch(calculateUserSalary({ userId: 'Ваш_User_ID' }));
    dispatch(fetchSalaryHistory());
  }, [dispatch]);

  return (
    <div className="min-h-screen bg-gray-100 py-10 px-4">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-700 text-center mb-8">Salary Management</h1>

        {loading && <p className="text-center text-gray-500">Loading salary data...</p>}
        {error && <p className="text-center text-red-500">Error: {error}</p>}
        
        <SalaryList />
      </div>
    </div>
  );
};

export default SalaryPage;
