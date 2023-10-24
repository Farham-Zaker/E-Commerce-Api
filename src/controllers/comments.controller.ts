import { Request, Response } from "express";
import prismaService from "../prisma/prismaService";
import decodeToken from "../util/decodeToekn";
import {
  CommentsAndRepliesTypes,
  CommentsTypes,
  RepliesTypes,
} from "../interfaces/comments.interface";

export default new (class {
  async addToComment(
    req: Request,
    res: Response
  ): Promise<Response<any, Record<string, any>> | void> {
    const token = req.header("token") as string;
    const decodedToken: { userId: string } = decodeToken(token) as {
      userId: string;
    };
    const { comment, productId, replyId } = req.body;

    try {
      const isProductAvialable: boolean =
        !!(await prismaService.products.findFirst({
          where: {
            productId,
          },
          select: {
            productId: true,
          },
        }));
      if (!isProductAvialable) {
        res.status(404).json({
          message: "Failed",
          statusCode: 404,
          response: "There is no any product with this id.",
        });
      }

      if (replyId) {
        const isCommentAvialable: boolean =
          !!(await prismaService.comments.findFirst({
            where: {
              commentId: replyId,
            },
            select: {
              commentId: true,
            },
          }));
        if (!isCommentAvialable) {
          return res.status(401).json({
            message: "Failed",
            statusCode: 404,
            response: "The 'replyId' is not match with any 'commentId'",
          });
        }

        const userComment: boolean = !!(await prismaService.comments.findFirst({
          where: {
            commentId: replyId,
            userId: decodedToken.userId,
          },
          select: {
            commentId: true,
          },
        }));
        if (userComment) {
          return res.status(400).json({
            message: "Failed",
            statusCode: 400,
            response: "You can not reply your comment.",
          });
        }
      }

      await prismaService.comments.create({
        data: {
          comment,
          role: replyId ? "reply" : "comment",
          productId,
          userId: decodedToken.userId,
          replyId: replyId ? replyId : null,
        },
      });
      res.status(201).json({
        message: "Success",
        statusCode: 201,
        response: "You comment successfully was added.",
      });
    } catch (error) {
      console.error(error);
      return res.status(500).json({
        message: "Error",
        statusCode: 500,
        response: "Internal Server Error",
      });
    }
  }
  async getCommentByProductId(
    req: Request,
    res: Response
  ): Promise<Response<any, Record<string, any>> | void> {
    const productId = req.params.productId;

    try {
      const isProductAvialable: boolean =
        !!(await prismaService.products.findFirst({
          where: {
            productId,
          },
        }));
      if (!isProductAvialable) {
        return res.status(404).json({
          message: "Field",
          statusCode: 404,
          response: "There is no any product with this id.",
        });
      }

      const allComments: CommentsTypes[] | [] =
        await prismaService.comments.findMany({
          where: {
            productId,
            role: "comment",
          },
          orderBy: {
            createdAt: "asc",
          },
          select: {
            commentId: true,
            comment: true,
            role: true,
            users: {
              select: {
                userId: true,
                firstName: true,
                lastName: true,
                image: true,
              },
            },
            createdAt: true,
          },
        });

      const allReplies: RepliesTypes[] | [] =
        await prismaService.comments.findMany({
          where: {
            productId,
            role: "reply",
          },
          orderBy: {
            createdAt: "desc",
          },
          select: {
            commentId: true,
            comment: true,
            role: true,
            users: {
              select: {
                userId: true,
                firstName: true,
                lastName: true,
                image: true,
              },
            },
            replyId: true,
            createdAt: true,
          },
        });

      const comments: CommentsAndRepliesTypes[] = [];
      allComments.map((c) => {
        const filteredReplies = allReplies.filter((reply) => {
          if (reply.replyId === c.commentId) {
            return reply;
          }
          return null;
        });
        comments.push({
          commentId: c.commentId,
          comment: c.comment,
          role: c.role,
          users: c.users,
          createdAt: c.createdAt,
          replies: filteredReplies,
        });
      });

      res.status(200).json({ message: "Success", statusCode: 200, comments });
    } catch (error) {
      console.error(error),
        res.status(500).json({
          message: "Error",
          statusCode: 500,
          response: "Internal Server Error",
        });
    }
  }
  async updateComment(
    req: Request,
    res: Response
  ): Promise<Response<any, Record<string, any>> | void> {
    const token = req.header("token") as string;
    const decodedToken: { userId: string } = decodeToken(token) as {
      userId: string;
    };

    const { commentId, comment } = req.body;

    try {
      const isCommentAvialable: boolean =
        !!(await prismaService.comments.findFirst({
          where: {
            commentId,
            userId: decodedToken.userId,
          },
        }));

      if (!isCommentAvialable) {
        return res.status(404).json({
          message: "Field",
          statusCode: 404,
          response: "There is no any comment with this id.",
        });
      }

      await prismaService.comments.updateMany({
        data: {
          comment,
          userId: decodedToken.userId,
        },
        where: {
          commentId,
        },
      });
      res.status(200).json({
        message: "Success",
        statusCode: 200,
        response: "Desire comment successfully was added.",
      });
    } catch (error) {
      console.error(error);
      return res.status(500).json({
        message: "Error",
        statusCode: 500,
        response: "Internal Server Error",
      });
    }
  }
  async deleteComment(
    req: Request,
    res: Response
  ): Promise<Response<any, Record<string, any>> | void> {
    const token = req.header("token") as string;
    const decodedToken: { userId: string } = decodeToken(token) as {
      userId: string;
    };

    const commentId = req.params.commentId;

    try {
      const isCommentAvialable = !!(await prismaService.comments.findFirst({
        where: {
          commentId,
        },
      }));
      if (!isCommentAvialable) {
        return res.status(404).json({
          message: "Field",
          statusCode: 404,
          response: "There is no any comment with this id.",
        });
      }

      await prismaService.comments.deleteMany({
        where: {
          commentId,
          userId: decodedToken.userId,
        },
      });
      return res.status(200).json({
        message: "Success",
        statusCode: 200,
        response: "Desire product was deleted successfully.",
      });
    } catch (error) {
      console.error(error);
      return res.status(500).json({
        message: "Error",
        statusCode: 500,
        response: "Internal Server Error",
      });
    }
  }
})();
