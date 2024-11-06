import React from 'react';
import { useSelector } from 'react-redux';
import { selectProductivityRecords } from '../../redux/productivity/selectors';
import { ProductivityRecord } from '../../types';

const ProductivityList: React.FC = () => {
  const records = useSelector(selectProductivityRecords);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('uk-UA', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  return (
    <div className="max-w-2xl mx-auto p-4 bg-white shadow-md rounded">
      <h2 className="text-2xl font-bold mb-4">Productivity Records</h2>
      {records.map((record: ProductivityRecord) => (
        <div key={record._id} className="mb-4 p-4 border rounded">
          <p>Department: {record.departmentId.name}</p>
          <p>Date: {formatDate(record.date)}</p>
          <p>Units Completed: {record.unitsCompleted}</p>
          <p>Productivity: {record.productivity}%</p>
          <p>Total Earnings: {record.totalEarnings} ZLT</p>
        </div>
      ))}
    </div>
  );
};

export default ProductivityList;
