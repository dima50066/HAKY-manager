import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from '../../redux/store';
import { addProductivityRecord } from '../../redux/productivity/operations';
import { selectUser } from '../../redux/auth/selectors';
import axios from 'axios';
import { User } from '../../types';

interface Department {
  _id: string;
  name: string;
}

const ProductivityForm: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const currentUser = useSelector(selectUser) as User | null;
  const [departments, setDepartments] = useState<Department[]>([]);
  const [formData, setFormData] = useState({
    departmentId: '',
    isStudent: currentUser?.isStudent || false,
    date: '',
    unitsCompleted: 0,
    productivityLevel: 100, 
  });

  useEffect(() => {
    const fetchDepartments = async () => {
      try {
        const response = await axios.get('/departments');
        setDepartments(response.data);
      } catch (error) {
        console.error('Error fetching departments:', error);
      }
    };
    fetchDepartments();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const dataToSubmit = {
      ...formData,
      userId: currentUser?._id,
      isStudent: currentUser?.isStudent || false,
    };

    dispatch(addProductivityRecord(dataToSubmit));
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto p-4 bg-white shadow-md rounded">
      <h2 className="text-2xl font-bold mb-4">Add Productivity Record</h2>

      <select name="departmentId" value={formData.departmentId} onChange={handleChange} className="w-full p-2 mb-4 border rounded">
        <option value="">Select Department</option>
        {departments.map((dept) => (
          <option key={dept._id} value={dept._id}>
            {dept.name}
          </option>
        ))}
      </select>

      <select name="productivityLevel" value={formData.productivityLevel} onChange={handleChange} className="w-full p-2 mb-4 border rounded">
        <option value={100}>100%</option>
        <option value={115}>115%</option>
        <option value={125}>125%</option>
      </select>

      <input type="date" name="date" value={formData.date} onChange={handleChange} className="w-full p-2 mb-4 border rounded" />
      <input type="number" name="unitsCompleted" value={formData.unitsCompleted} onChange={handleChange} placeholder="Units Completed" className="w-full p-2 mb-4 border rounded" />

      {/* Поле isStudent */}
      <input type="text" value={formData.isStudent ? 'Student' : 'Non-student'} disabled className="w-full p-2 mb-4 border rounded" />

      <button type="submit" className="w-full p-2 bg-blue-500 text-white rounded hover:bg-blue-600">
        Add Record
      </button>
    </form>
  );
};

export default ProductivityForm;
