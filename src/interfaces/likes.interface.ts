export interface ProductsInLikesTypes {
  likeId: string;
  product: ProductTypes;
}
interface ProductTypes {
  productId: string;
  title: string;
  price: number;
  finalPrice: number;
  images: imageTypes[];
  inventories: InventoryTypes[];
}
interface imageTypes {
  imageId: string;
  imageUrl: string;
  productId: string;
  createdAt: Date;
}
interface InventoryTypes {
  inventoryId: string;
  quantity: number;
  productId: string;
  colorId: string;
}
