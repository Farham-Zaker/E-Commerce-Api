export interface AddressTypes {
  addressId: string;
  country: string;
  state: string;
  city: string;
  zone: string | null;
  apartmentUnite: number | null;
  postalCode: string;
  userId: string;
  createdAt: Date;
  user?: UserTypes;
}
interface UserTypes {
  userId: string;
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
  image: string;
  createdAt: Date;
}
