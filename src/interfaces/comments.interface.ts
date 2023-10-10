export interface CommentsTypes {
  commentId: string;
  comment: string;
  role: string;
  users: {
    userId: string;
    firstName: string;
    lastName: string;
    image: string;
  };
  createdAt: Date;
}
export interface RepliesTypes {
  commentId: string;
  comment: string;
  role: string;
  users: {
    userId: string;
    firstName: string;
    lastName: string;
    image: string;
  };
  replyId: string | null;
  createdAt: Date;
}
export interface CommentsAndRepliesTypes {
  commentId: string;
  comment: string;
  role: string;
  users: {
    userId: string;
    firstName: string;
    lastName: string;
    image: string;
  };
  createdAt: Date;
  replies: RepliesTypes[];
}
