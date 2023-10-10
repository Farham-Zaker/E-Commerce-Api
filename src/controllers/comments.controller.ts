import { Request, Response } from "express";
import prismaService from "../prisma/prismaService";
import decodeToken from "../middlewares/decodeToekn";

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
})();
