export interface DepartmentData {
  _id: string;
  name: string;
  baseRate: number;
  baseRateStudent: number;
  rate115: number;
  rate115Student: number;
  rate125: number;
  rate125Student: number;
  description?: string;
}

export interface User {
  _id: string;
  name: string;
  email: string;
  role: string;
}

export interface ProductivityData {
  departmentId: Department | string;
  department: { name: string };
  date: string;
  unitsCompleted: number;
}

export interface Department extends DepartmentData {
  _id: string;
  name: string;
}

export interface ProductivityRecord extends ProductivityData {
  _id: string;
  departmentId: Department | string;
  departmentName: string;
  userId: User | null;
  productivityLevel: number;
  totalEarnings: number;
  isStudent: boolean;
}

export interface Profile {
  user: string;
  avatar?: string;
  isStudent: boolean;
  bio?: string;
  productivity?: number;
  location?: string;
  birthDate?: string;
  livesIndependently: boolean;
  address?: string;
  emergencyContactNumber?: string;
  peselNumber?: string;
}

export interface Salary {
  _id: string;
  userId: string;
  totalEarnings: number;
  hoursWorked: number;
  period: string;
}

export interface ProfileForm {
  avatar: File | string | null;
  isStudent: boolean;
  productivity: number;
  bio: string;
  location: string;
  birthDate: string;
  livesIndependently: boolean;
  user?: string;
  address?: string;
  emergencyContactNumber?: string;
  peselNumber?: string;
}

export interface Document {
  name: string;
  url: string;
  type: "pdf" | "image" | "other";
  uploadedAt: string;
}

export interface Employee {
  _id: string;
  user: User;
  avatar?: string;
  isStudent: boolean;
  productivity: number;
  bio?: string;
  location?: string;
  birthDate?: string;
  livesIndependently: boolean;
  documents: Document[];
  address?: string;
  emergencyContactNumber?: string;
  peselNumber?: string;
  createdAt: string;
  updatedAt: string;
}
