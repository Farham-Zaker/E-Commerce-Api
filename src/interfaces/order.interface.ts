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
