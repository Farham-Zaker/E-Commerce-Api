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
export interface AccountRouteFaileResponseType {
  message: string;
  statusCode: number;
  response: string;
}
export interface UpdateInfoRouteSuccessResponseTyepe {
  message: string;
  statusCode: number;
  response: string;
  user: User;
}
interface User {
  userId: string;
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
  image: string;
  createdAt: Date;
}
