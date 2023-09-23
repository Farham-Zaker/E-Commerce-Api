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
export interface SetPasswordRouteRequestBodyTypes {
  newPassword: string;
  confirmPassword: string;
}
export interface UserAuthInfoTypes {
  authId: string;
  token: string;
  password: string;
  isAdmin: number;
  userId: string;
}