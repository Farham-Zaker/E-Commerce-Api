export interface RegistrationBodyRequestTypes {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  password: string;
}
export interface UserDataTypes {
  userId: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  image: string | null;
  createdAt: Date;
}
export interface RegistrationSuccessResponseTypes {
  message: string;
  statusCode: number;
  response: string;
  data: UserDataTypes;
}
export interface RegistrationّFailedResponseTypes {
  message: string;
  statusCode: number;
  response: string;
}
