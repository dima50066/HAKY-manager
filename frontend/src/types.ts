export interface User {
  _id: string;
  name: string;
  bio: string;
  isStudent: boolean;
  avatar?: string;
  productivity: number;
  email: string;
}


export interface IProductivityRecord {
  _id: string;
  userId: string;
  departmentId:{
    _id: string;
    name: string;};
  date: string;
  unitsCompleted: number;
  nominalTime: number;
  productivity: number;
  appliedRate: number;
  totalEarnings: number;
}
