import { Department } from '../db/models/department';

export const getDepartmentsService = async () => {
  try {
    // Повертаємо тільки необхідні поля: `name` та `_id`
    const departments = await Department.find({}, 'name _id');
    return departments;
  } catch (error) {
    console.error("Error in getDepartmentsService:", error);
    throw new Error("Error fetching departments");
  }
};
