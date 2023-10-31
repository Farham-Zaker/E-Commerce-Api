import { Request, Response } from "express";
import prismaService from "../../prisma/prismaService";

export default new (class {
  async createComment(req: Request, res: Response): Promise<void> {
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
      console.error(error);
      res.status(500).json({
        message: "Error",
        statusCode: 500,
        response: "An error occurred while creating comment.",
      });
    }
  }
})();
