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
    product: {
      title: string;
      image?: {
        imageId: string;
        imageUrl: string;
        productId: string;
        createdAt: Date;
      }[];
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
    product: {
      productId: string;
      title: string;
      images?: {
        imageId: string;
        imageUrl: string;
        productId: string;
        createdAt: Date;
      }[];
      discountStatus: number | null;
      discountPercent: number | null;
      discountEndTime: Date | null;
      price: number;
      finalPrice: number;
    };
  }[];
}
