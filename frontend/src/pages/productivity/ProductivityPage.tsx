import React from 'react';
import ProductivityForm from '../../components/productivity/ProductivityForm';
import ProductivityList from '../../components/productivity/ProductivityList';

const Productivity: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto p-6 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold text-center text-gray-800 mb-8">Productivity Management</h1>
      <ProductivityForm />
      <ProductivityList />
    </div>
  );
};

export default Productivity;
