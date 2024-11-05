import { Department } from '../db/models/department';

export const getDepartmentsService = async () => {
  try {
    const departments = await Department.find({}, 'name _id');
    return departments;
  } catch (error) {
    console.error("Error in getDepartmentsService:", error);
    throw new Error("Error fetching departments");
  }
};
