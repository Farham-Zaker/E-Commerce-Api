export interface ProductsInLikesTypes {
  id: string;
  product:
    | {
        productId: string;
        title: string;
        price: number;
        images?: {
          imageId: string;
          imageUrl: string;
          productId: string;
          createdAt: Date;
        }[];
        discountStatus: number | null;
        discountPercent: number | null;
        dicountEndTime: Date | null;
        discountedPrice: number | null;
        category: {
          name: string;
        };
        inventories: {
          colors: {
            colorId: string;
            name: string;
            hexCode: string;
          };
          quantity: number;
        };
      }[]
    | [];
}
