import { Request, Response } from "express";
import prismaService from "../../prisma/prismaService";

export default new (class {
  async addToLikes(
    req: Request,
    res: Response
  ): Promise<Response<any, Record<string, any>>> {
    const { userId, productId } = req.body;
    try {
      const like: boolean = !!(await prismaService.likes.findFirst({
        where: {
          userId,
          productId,
        },
        select: {
          likeId: true,
        },
      }));
      if (like) {
        return res.status(409).json({
          message: "Failed",
          statusCode: 409,
          response: "There is already a liked item with such specification.",
        });
      }

      await prismaService.likes.create({
        data: {
          userId,
          productId,
        },
      });
      return res.status(201).json({
        message: "Success",
        statusCode: 201,
        response: "Desire product was added to likes successfuly.",
      });
    } catch (error) {
      console.error(error);
      return res.status(500).json({
        message: "Success",
        statusCode: 500,
        response:
          "An error occurred while creating adding product to likes list.",
      });
    }
  }
})();
