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
  discountStatus?: number | null;
  finalPrice: number | null;
  discountPercent?: number | null;
  discountEndTime?: Date | null;
  createdAt?: Date;
  category?: {
    categoryId: string;
    name: string;
  };
  inventories?:
    | {
        quantity: number;
        colors: {
          colorId?: string | null;
          name: string;
          hexCode: string;
        };
      }[];
}
export interface FilterProductRquestBodyTypes {
  colorIds?: string[];
  minPrice?: number;
  maxPrice?: number;
  categoryIds?: string[];
  extence?: boolean;
  hasDiscount?: boolean;
  orderBy: string;
  take: number;
  skip: number;
}
export interface SearchedProductTypes {
  productId: string;
  title: string;
  price: number;
  image?: {
    imageId: string;
    imageUrl: string;
    productId: string;
    createdAt: Date;
  }[];
}
