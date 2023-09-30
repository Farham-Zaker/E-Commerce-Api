export interface UpdateInfoRouteUserInputTypes {
  userId: string;
  newData: NewData;
}
interface NewData {
  firsName: string;
  lastName: string;
  phone: string;
  email: string;
}
export interface SetPasswordRouteUpdatedUserTypes {
  userId: string;
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
  image: string;
  createdAt: Date;
}
export interface UserAuthInfoTypes {
  authId: string;
  token: string | null;
  password: string | null;
  isAdmin: number;
  userId: string;
}