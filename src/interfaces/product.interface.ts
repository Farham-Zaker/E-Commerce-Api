export interface ProductTypes {
  productId: string;
  title: string;
  price: number;
  image: string;
  discountStatus?: number | null;
  discountPercent?: number | null;
  discountEndTime?: Date | null;
  priceAfterDiscount?: number | null;
  createdAt: Date;
  categoryId: string;
  category: Category;
  inventories: InventoryTypes[];
}
interface Category {
  categoryId: string;
  name: string;
}

interface InventoryTypes {
  inventoryId: string;
  quantity: number;
  productId: string;
  colorId: string;
  colors: {
    colorId: string;
    name: string;
    hexCode: string;
  };
}
