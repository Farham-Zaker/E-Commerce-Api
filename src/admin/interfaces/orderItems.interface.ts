export interface GetAllItemsRouteOrderItemTypes {
  orderItemId: string;
  orderId: string;
  productId: string;
  quantity: number;
  colorId: string;
  color?: ColorTypes;
  product?: ProductTypes;
  order?: OrderType;
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
interface ColorTypes {
  colorId: string;
  name: string;
  hexCode: string;
}
interface OrderType {
  orderId: string;
  userId: string;
  totalPrice: number;
  status: string;
  createdAt: Date;
}
