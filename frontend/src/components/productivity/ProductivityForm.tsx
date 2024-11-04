import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from '../../redux/store';
import { addProductivityRecord } from '../../redux/productivity/operations';
import { selectUser } from '../../redux/auth/selectors'; // Імпорт селектора поточного користувача
import { User } from '../../types';

const ProductivityForm: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const currentUser = useSelector(selectUser) as User | null;
  console.log('Current user:', currentUser); // Логування поточного користувача для перевірки

  const [formData, setFormData] = useState({
    userId: '',
    departmentId: '',
    date: '',
    unitsCompleted: 0,
  });

  // Використовуємо useEffect, щоб встановити userId, якщо currentUser доступний
  useEffect(() => {
    if (currentUser) {
      console.log('Setting userId in formData:', currentUser._id); // Логування для перевірки встановлення userId
      setFormData((prevData) => ({ ...prevData, userId: currentUser._id }));
    }
  }, [currentUser]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Створюємо копію formData, гарантуючи наявність userId з _id
    const dataToSubmit = {
      ...formData,
      userId: currentUser ? currentUser._id : '', // Перевіряємо, щоб userId був присутній
    };

    console.log('Data to submit:', dataToSubmit); // Логування даних для відправки, щоб перевірити наявність userId

    dispatch(addProductivityRecord(dataToSubmit));
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto p-4 bg-white shadow-md rounded">
      <h2 className="text-2xl font-bold mb-4">Add Productivity Record</h2>
      {/* Поле для userId видалене, оскільки тепер воно автоматично встановлюється */}
      <input
        type="text"
        name="departmentId"
        value={formData.departmentId}
        onChange={handleChange}
        placeholder="Department ID"
        className="w-full p-2 mb-4 border rounded"
      />
      <input
        type="date"
        name="date"
        value={formData.date}
        onChange={handleChange}
        className="w-full p-2 mb-4 border rounded"
      />
      <input
        type="number"
        name="unitsCompleted"
        value={formData.unitsCompleted}
        onChange={handleChange}
        placeholder="Units Completed"
        className="w-full p-2 mb-4 border rounded"
      />
      <button type="submit" className="w-full p-2 bg-blue-500 text-white rounded hover:bg-blue-600">
        Add Record
      </button>
    </form>
  );
};

export default ProductivityForm;
