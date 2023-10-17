export interface ProductTypes {
  productId: string;
  title: string;
  price: number;
  images?: {
    imageId: string;
    imageUrl: string;
    productId: string;
    createdAt: Date;
  }[];
  discountStatus: number;
  discountPercent: number | null;
  discountEndTime: Date | null;
  finalPrice: number;
  createdAt: Date;
  categoryId: string;
}
export interface ProductDiscountPercentTypes {
  discountPercent: number | null;
}
