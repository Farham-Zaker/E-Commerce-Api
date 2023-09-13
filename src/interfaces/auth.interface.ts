export interface RegistrationUserInputInt {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  password: string;
}
export interface UserDataInt {
  userId: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  image: string;
  createdAt: Date;
}
export interface RegistrationSuccessResponseInt {
  message: string;
  statusCode: number;
  response: string;
  data: UserDataInt;
}
export interface RegistrationّFailedResponseInt {
  message: string;
  statusCode: number;
  response: string;
}
