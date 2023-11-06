export interface CommentAndReplyTypes {
  commentId: string;
  comment: string;
  role: string;
  replyId: string | null;
  userId: string;
  productId: string;
  createdAt: Date;
  user?: UserTypes;
  product?: ProductTypes;
}
interface UserTypes {
  userId: string;
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
  image: string | null;
  createdAt: Date;
}
interface ProductTypes {
  productId: string;
  title: string;
  price: number;
  discountStatus: number;
  discountPercent: number | null;
  discountEndTime: Date | null;
  finalPrice: number;
  createdAt: Date;
  categoryId: string;
}
