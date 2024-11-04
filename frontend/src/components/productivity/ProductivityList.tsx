import React from 'react';
import { useSelector } from 'react-redux';
import { selectProductivityRecords } from '../../redux/productivity/selectors';
import { IProductivityRecord } from '../../types';

const ProductivityList: React.FC = () => {
  const records = useSelector(selectProductivityRecords);

  return (
    <div className="max-w-2xl mx-auto p-4 bg-white shadow-md rounded">
      <h2 className="text-2xl font-bold mb-4">Productivity Records</h2>
      {records.map((record: IProductivityRecord) => (
        <div key={record.id} className="mb-4 p-4 border rounded">
          <p>User ID: {record.userId}</p>
          <p>Department ID: {record.departmentId}</p>
          <p>Date: {record.date}</p>
          <p>Units Completed: {record.unitsCompleted}</p>
          <p>Productivity: {record.productivity}%</p>
          <p>Total Earnings: ${record.totalEarnings}</p>
        </div>
      ))}
    </div>
  );
};

export default ProductivityList;
