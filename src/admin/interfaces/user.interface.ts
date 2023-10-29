export interface UserTypes {
  userId: string;
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
  image: string;
  createdAt: Date;
  auth: AuthTypes | null;
}
interface AuthTypes {
  authId: string;
  token: string | null;
  password: string | null;
  isAdmin: number;
  userId: string;
}
