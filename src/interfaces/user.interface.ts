export interface RegistrationUserInputInt {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  password: string;
}
export interface RegistrationUserDataInt {
  userId: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  image: string;
}
export interface RegistrationSuccessResponseInt {
  message: string;
  statusCode: number;
  response: string;
  data: RegistrationUserDataInt;
}
