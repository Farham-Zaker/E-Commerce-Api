export interface ProductTypes {
  productId: string;
  title: string;
  price: number;
  image: string | null;
  discountStatus: number;
  discountPercent: number | null;
  discountEndTime: Date | null;
  finalPrice: number;
  createdAt: Date;
  categoryId: string;
}