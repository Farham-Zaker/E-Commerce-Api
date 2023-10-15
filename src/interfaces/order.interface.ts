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
export interface GetOrderByIdRouteOrdeTypes {
  orderId: string;
  totalPrice: number;
  status: string;
  createdAt: Date;
  orderItems: {
    color: {
      colorId: string;
      name: string;
      hexCode: string;
    };
    products: {
      productId: string;
      title: string;
      image: string | null;
      discountStatus: number | null;
      discountPercent: number | null;
      discountEndTime: Date | null;
      price: number;
      finalPrice: number;
    };
  }[];
}
