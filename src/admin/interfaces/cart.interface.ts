export interface CartTypes {
  cartId: string;
  userId: string;
  productId: string;
  createdAt: Date;
  user?: UserTypes;
  product?: ProductTypes;
  cartInventories?: CartInventoryTypes[];
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
interface CartInventoryTypes {
  inventoryId: string;
  quantity: number;
  colorId: string;
  cartId: string;
}
