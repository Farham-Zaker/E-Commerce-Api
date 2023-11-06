export interface CommentsTypes {
  commentId: string;
  comment: string;
  role: string;
  replyId?: string | null;
  user: UserTypes;
  createdAt: Date;
}
export interface RepliesTypes {
  commentId: string;
  comment: string;
  role: string;
  replyId?: string | null;
  user: UserTypes;
  createdAt: Date;
}
export interface CommentsAndRepliesTypes {
  commentId: string;
  comment: string;
  role: string;
  user: UserTypes;
  createdAt: Date;
  replies: RepliesTypes[];
}
interface UserTypes {
  userId: string;
  firstName: string;
  lastName: string;
  image: string;
}
