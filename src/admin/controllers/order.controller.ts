import { Request, Response } from "express";
import prismaService from "../../prisma/prismaService";

export default new (class {
  async createOrder(
    req: Request,
    res: Response
  ): Promise<Response<any, Record<string, any>>> {
    const { userId, totalPrice, status } = req.body;
    try {
      const isUserAvialable: boolean = !!(await prismaService.users.findFirst({
        where: {
          userId,
        },
        select: {
          userId: true,
        },
      }));
      if (!isUserAvialable) {
        return res.status(404).json({
          message: "Failed",
          statusCode: 404,
          response: "There is no any user with such id.",
        });
      }
      await prismaService.orders.create({
        data: {
          userId,
          totalPrice,
          status,
        },
      });
      return res.status(201).json({
        message: "Success",
        status: 201,
        response: "Desire product was created successfully.",
      });
    } catch (error) {
      console.error(error);
      return res.status(500).json({
        message: "Success",
        statusCode: 500,
        response: "An error occurred while creating order.",
      });
    }
  }
})();
