import { Request, Response, NextFunction } from "express";
import prismaService from "../../prisma/prismaService";
import { Prisma } from "@prisma/client";
import { CommentAndReplyTypes } from "../interfaces/comments.interface";

export default new (class {
  async createComment(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    const { comment, role, replyId, userId, productId } = req.body;

    try {
      await prismaService.comments.create({
        data: {
          comment,
          role,
          replyId: replyId || null,
          userId,
          productId,
        },
      });
      res.status(201).json({
        message: "Success",
        statusCode: 201,
        response: "A comment with such specification was created successfuly.",
      });
    } catch (error) {
      next(error);
    }
  }
  async getComments(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response<any, Record<string, any>> | void> {
    const { role, user, product, reply, searchTerm } = req.query;
    let where: Prisma.commentsWhereInput = {};
    if (role) {
      where = { role: (role as string) || undefined };
    }
    if (searchTerm) {
      const contain: { contains: string } = {
        contains: searchTerm as string,
      };
      where = {
        ...where,
        OR: [
          { commentId: contain },
          { comment: contain },
          { replyId: contain },
          { userId: contain },
          { productId: contain },
          { comment: contain },
        ],
      };
    }
    let include: Prisma.commentsInclude = {};
    if (user === "true") {
      include = { user: true };
    }
    if (product === "true") {
      include = { ...include, product: true };
    }
    try {
      const comments: CommentAndReplyTypes[] =
        await prismaService.comments.findMany({
          where,
          include,
        });
      if (reply === "true") {
        const filteredComment: any = comments.map((comment) => {
          const replies: Promise<CommentAndReplyTypes[] | void> =
            prismaService.comments
              .findMany({
                where: {
                  replyId: comment.commentId,
                },
              })
              .then((replies) => {
                return replies;
              })
              .catch((err) => {
                next(err);
              });

          return { ...comment, replies };
        });

        return res.status(200).json({
          message: "Success",
          statusCode: 200,
          searchTarget: role,
          comments: filteredComment,
        });
      }
      return res.status(200).json({
        message: "Success",
        statusCode: 200,
        searchTarget: role ? role : "comments and replies",
        comments,
      });
    } catch (error) {
      next(error);
    }
  }
  async getCommentById(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response<any, Record<string, any>> | void> {
    const commentId: string = req.params.commentId;
    const { user, product, reply } = req.query;

    let include: Prisma.commentsInclude = {};
    if (user === "true") {
      include = { user: true };
    }
    if (product === "true") {
      include = { ...include, product: true };
    }

    try {
      const comment: CommentAndReplyTypes | null =
        await prismaService.comments.findFirst({
          where: {
            commentId,
          },
          include,
        });

      if (reply === "true" && comment?.role === "reply") {
        return res.status(422).json({
          message: "Failed",
          statusCode: 422,
          respone:
            "The 'reply' field can be set to 'true' only if the comment is not a reply of another comment.",
        });
      }

      if (reply === "true") {
        const replies: CommentAndReplyTypes[] =
          await prismaService.comments.findMany({
            where: {
              replyId: comment?.commentId,
            },
          });

        return res.status(200).json({
          message: "Success",
          statusCode: 200,
          comments: {
            ...comment,
            replies,
          },
        });
      }

      return res.status(200).json({
        message: "Success",
        statusCode: 200,
        comment,
      });
    } catch (error) {
      next(error);
    }
  }
  async updateComments(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    const { commentId, comment, role, replyId, userId, productId } = req.body;

    try {
      await prismaService.comments.update({
        data: {
          comment,
          role,
          replyId,
          userId,
          productId,
        },
        where: {
          commentId,
        },
      });

      res.status(200).json({
        message: "Success",
        statusCode: 200,
        response: "Desire comment was updated successfuly",
      });
    } catch (error) {
      next(error);
    }
  }
  async deleteComment(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    const commentId: string = req.params.commentId;

    try {
      await prismaService.comments.deleteMany({
        where: {
          replyId: commentId,
        },
      });
      await prismaService.comments.delete({
        where: {
          commentId,
        },
      });
      res.status(200).json({
        message: "Success",
        statusCode: 200,
        response: "Desire comment was deleted successfuly",
      });
    } catch (error) {
      next(error);
    }
  }
})();
