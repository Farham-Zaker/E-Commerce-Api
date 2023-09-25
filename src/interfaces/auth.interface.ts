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
export interface GoogleAuthSuccessResponseTypes {
  message: string;
  statusCode: number;
  response: string;
  token: string;
}
export interface AuthValidationResponseTypes {
  message: string;
  statusCode: number;
  response: AuthValidationErrorTypes[];
}
interface AuthValidationErrorTypes {
  field: string;
  error: string;
}
