export interface RegistrationBodyRequestTypes {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  password: string;
}
export interface RegisterUserDataTypes {
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
  data: RegisterUserDataTypes;
}
export interface RegistrationّFailedResponseTypes {
  message: string;
  statusCode: number;
  response: string;
}
export interface LoginUserInputTypes {
  phoneOrEmail: string;
  password: string;
}
export interface LoginUserDataTypes {
  userId: string;
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
  image: string | null;
  createdAt: Date;
  auth?: LoginUserAuthInfoTypes | null;
}
interface LoginUserAuthInfoTypes {
  authId: string;
  token: string;
  password: string;
  isAdmin: number;
}
export interface LoginSuccessfulMessageTypes {
  message: string;
  statusCode: number;
  token: string;
}
export interface LoginFailedMessageMessageTypes {
  message: string;
  statusCode: number;
  response: string;
}
