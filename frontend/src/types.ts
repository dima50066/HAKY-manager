export interface User {
    id: string;
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
