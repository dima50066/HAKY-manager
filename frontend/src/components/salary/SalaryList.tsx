import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchSalaryHistory } from '../../redux/salary/operations';
import { selectSalaryHistory, selectSalaryLoading, selectSalaryError } from '../../redux/salary/selectors';
import { AppDispatch } from '../../redux/store';
import SalaryForm from './SalaryForm';

const SalaryList: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const salaryHistory = useSelector(selectSalaryHistory);
  const loading = useSelector(selectSalaryLoading);
  const error = useSelector(selectSalaryError);
  const [selectedRecordId, setSelectedRecordId] = useState<string | null>(null);

  useEffect(() => {
    dispatch(fetchSalaryHistory());
  }, [dispatch]);

  if (loading) {
    return <p className="text-center text-gray-500">Loading salary history...</p>;
  }

  if (error) {
    return <p className="text-center text-red-500">Error: {error}</p>;
  }

  return (
    <div className="max-w-lg mx-auto bg-white shadow-md rounded-lg mt-8 p-6">
      <h2 className="text-xl font-semibold text-gray-700 text-center">Salary History</h2>
      {salaryHistory.length > 0 ? (
        <ul className="divide-y divide-gray-200 mt-4">
          {salaryHistory.map((record) => (
            <li key={record._id} className="py-4">
              <p className="text-gray-700 font-medium">Period: {record.period}</p>
              <p className="text-gray-500">Total Earnings: {record.totalEarnings} PLN</p>
              <p className="text-gray-500">Hours Worked: {record.hoursWorked}</p>
              <button
                onClick={() => setSelectedRecordId(record._id)}
                className="mt-2 bg-blue-500 text-white font-semibold rounded-md px-4 py-2 hover:bg-blue-600"
              >
                Update
              </button>
              {selectedRecordId === record._id && <SalaryForm recordId={record._id} />}
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-center text-gray-500 mt-4">No salary history available.</p>
      )}
    </div>
  );
};

export default SalaryList;
