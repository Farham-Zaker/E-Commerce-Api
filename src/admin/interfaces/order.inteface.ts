export interface GetOrdersRouteOrdersTypes {
  orderId: string;
  userId: string;
  totalPrice: number;
  status: string;
  createdAt: Date;
  orderItems?: OrderIthem[];
  user?: UserTypes;
  payment?: PaymentTypes;
}
interface OrderIthem {
  orderItemId: string;
  orderId: string;
  productId: string;
  quantity: number;
  colorId: string;
  product: ProductTypes;
}
interface ProductTypes {
  productId: string;
  title: string;
  price: number;
  discountStatus: number;
  discountPercent: number;
  discountEndTime: Date;
  finalPrice: number;
  createdAt: string;
  categoryId: string;
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
interface PaymentTypes {
  paymentId: string;
  authorityId: string;
  amount: number;
  status: string;
  orderId: string;
  createdAt: string;
}
export interface GetOrderByIdRouteOrderTypes {
  orderId: string;
  totalPrice: number;
  status: string;
  createdAt: Date;
  user: UserTypes;
  orderItems: {
    orderItemId: string;
    product: {
      productId: string;
      title: string;
      price: number;
      discountStatus: number;
      discountPercent: number | null;
      discountEndTime: Date | null;
      finalPrice: number | null;
      createdAt: Date;
      categoryId: string;
    };
    quantity: number;
    color: {
      colorId: string;
      name: string;
      hexCode: string;
    };
  }[];
}
