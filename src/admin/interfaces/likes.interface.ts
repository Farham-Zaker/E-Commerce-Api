export interface LikeTypes {
    likeId: string;
  userId: string;
  user?: UserTypes;
  productId: string;
  product?: ProductTypes;
  createdAt: Date;
}
interface UserTypes {
  userId: string;
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
  image: string | null;
  createdAt: Date;
}
interface ProductTypes {
  productId: string;
  title: string;
  price: number;
  discountStatus: number;
  discountPercent: number | null;
  discountEndTime: Date | null;
  finalPrice: number;
  createdAt: Date;
  categoryId: string;
}
