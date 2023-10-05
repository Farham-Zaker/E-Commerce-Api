export interface AddedUserAddressTypes {
  addressId: string;
  country: string;
  state: string;
  city: string;
  zone?: string | null;
  apartmentUnite?: number | null;
  postalCode: string;
  userId: string;
  createdAt: Date;
}
export interface ReceivedUserAddressTypes {
  addressId?: string;
  country?: string;
  state?: string;
  city?: string;
  zone?: string | null;
  apartmentUnite?: number | null;
  userId?: string;
  createdAt?: Date;
}
