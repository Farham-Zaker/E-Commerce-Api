export interface CancelOrderRouteOrderTypes {
  orderId: string;
  createdAt: Date;
  orderItems: OrderIthemTypes[];
}
interface OrderIthemTypes {
  orderItemId: string;
  orderId: string;
  productId: string;
  quantity: number;
  colorId: string;
}
export interface GetAllOrdersRouteOrdesTypes {
  orderId: string;
  totalPrice: number;
  status: string;
  createdAt: Date;
  orderItems: {
    products: {
      title: string;
      image: string | null;
    };
  }[];
}
