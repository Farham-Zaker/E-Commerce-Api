import { Request, Response, NextFunction } from "express";
import prismaService from "../../prisma/prismaService";
import { PaymentTypes } from "../interfaces/payments.interface";

export default new (class {
  async createPayment(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response<any, Record<string, any>> | void> {
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
      next(error);
    }
  }
  async getAllPaynent(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const payments: PaymentTypes[] = await prismaService.payments.findMany({
        include: {
          order: true,
        },
      });
      res.status(200).json({
        message: "Success",
        statusCode: 200,
        payments,
      });
    } catch (error) {
      next(error);
    }
  }
  async getPaymentById(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response<any, Record<string, any>> | void> {
    const paymentId = req.params.paymentId;
    try {
      const payment: PaymentTypes | null =
        await prismaService.payments.findFirst({
          where: { paymentId },
          include: {
            order: true,
          },
        });

      if (!payment) {
        return res.status(404).json({
          message: "Failed",
          statusCode: 404,
          response: "There is no any product with such id.",
        });
      }
      return res.status(201).json({
        message: "Success",
        statusCode: 201,
        payment,
      });
    } catch (error) {
      next(error);
    }
  }
  async updatePayment(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    const { paymentId, authorityId, amount, status, orderId } = req.body;

    try {
      await prismaService.payments.update({
        data: { authorityId, amount, status, orderId },
        where: { paymentId },
      });
      res.status(200).json({
        message: "Success",
        statusCode: 200,
        response: "Desire payment invoice was updated successfully,",
      });
    } catch (error) {
      next(error);
    }
  }
  async deletePayment(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    const paymentId = req.params.paymentId;
    try {
      await prismaService.payments.delete({
        where: {
          paymentId,
        },
      });
      res.status(200).json({
        message: "Success",
        statusCode: 200,
        response: "Desire payment invoice was deleted successfully.",
      });
    } catch (error) {
      next(error);
    }
  }
})();
