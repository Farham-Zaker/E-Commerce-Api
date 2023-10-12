export interface UserCartTypes {
  cartId: string;
  product: {
    productId: string;
    price: number;
    finalPrice: number | null;
    inventories: {
      inventoryId: string;
      quantity: number;
    }[];
  };
  cartInventories: {
    inventoryId: string;
    quantity: number;
    colorId: string;
  }[];
  totlaQuantities?: number;
  totalPrice?: number;
}
