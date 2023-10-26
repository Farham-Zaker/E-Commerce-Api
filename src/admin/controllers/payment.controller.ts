import { Request, Response } from "express";
import prismaService from "../../prisma/prismaService";

export default new (class {
  async createPayment(
    req: Request,
    res: Response
  ): Promise<Response<any, Record<string, any>>> {
    const { authorityId, status, amount, orderId } = req.body;

    try {
      const payment: boolean = !!(await prismaService.payments.findFirst({
        where: {
          orderId,
        },
      }));
      if (!payment) {
        return res.status(409).json({
          message: "Failed",
          statusCode: 409,
          response: "There is already a payment invoice with such orderId.",
        });
      }
      await prismaService.payments.create({
        data: {
          authorityId,
          status,
          amount,
          orderId,
        },
      });
      return res.status(201).json({
        message: "Success",
        statusCode: 201,
        response: "Desire payment invoice was added successfully.",
      });
    } catch (error) {
      console.error(error);
      return res.status(500).json({
        message: "Success",
        statusCode: 500,
        response: "An error occurred while creating payment invoice.",
      });
    }
  }

 
})();
