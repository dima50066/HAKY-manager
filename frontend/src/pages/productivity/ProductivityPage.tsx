import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { fetchProductivityRecords } from '../../redux/productivity/operations';
import ProductivityForm from '../../components/productivity/ProductivityForm';
import ProductivityList from '../../components/productivity/ProductivityList';
import { AppDispatch } from '../../redux/store';

const ProductivityPage: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(fetchProductivityRecords());
  }, [dispatch]);

  return (
    <div className="min-h-screen bg-gray-100 py-8">
      <h1 className="text-4xl font-bold text-center mb-8">Productivity Management</h1>
      <ProductivityForm />
      <ProductivityList />
    </div>
  );
};

export default ProductivityPage;
