export interface PaymentTypes {
  paymentId: string;
  authorityId: string;
  amount: number;
  status: string;
  orderId: string;
  createdAt: Date;
  order: OrderTypes;
}
interface OrderTypes {
  orderId: string;
  userId: string;
  totalPrice: number;
  status: string;
  createdAt: Date;
}
