export interface User {
    _id: string;
    name: string;
    email: string;
    subscription: string;
}

export interface IUser {
  id: string;
  name: string;
  bio: string;
  isStudent: boolean;
  avatar?: string;
}


export interface IProductivityRecord {
  id: string;
  userId: string;
  departmentId: string;
  date: string;
  unitsCompleted: number;
  nominalTime: number;
  productivity: number;
  appliedRate: number;
  totalEarnings: number;
}
