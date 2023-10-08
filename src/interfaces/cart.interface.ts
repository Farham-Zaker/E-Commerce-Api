export interface CartTypes {
  cartId: string;
  product: {
    productId: string;
    title: string;
    price: number;
    image: string | null;
    discountStatus: number;
    discountPercent: number | null;
    discountEndTime: Date | null;
    discountedPrice: number | null;
    category: {
      name: string;
    };
  };
  cartInventories: {
    colors: {
      name: string;
      hexCode: string;
    };
    quantity: number;
  }[];
}
