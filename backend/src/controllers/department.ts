import { Request, Response } from 'express';
import { getDepartmentsService } from '../services/department';

export const getAllDepartments = async (req: Request, res: Response) => {
  try {
    const departments = await getDepartmentsService();
    res.status(200).json(departments);
  } catch (error) {
    console.error("Error in getAllDepartments controller:", error);
    res.status(500).json({ message: "Error fetching departments" });
  }
};
