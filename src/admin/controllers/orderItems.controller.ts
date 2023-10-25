import { Request, Response } from "express";
import prismaService from "../../prisma/prismaService";

export default new (class {
  async createOrderItem(
    req: Request,
    res: Response
  ): Promise<Response<any, Record<string, any>>> {
    const { orderId, productId, quantity, colorId } = req.body;

    try {
      const order: boolean = !!(await prismaService.order_items.findFirst({
        where: {
          orderId,
        },
      }));
      if (!order) {
        return res.status(404).json({
          message: "Failed",
          statusCode: 404,
          response: "There is no any order with such id.",
        });
      }

      const orderItem = !!(await prismaService.order_items.findFirst({
        where: {
          colorId,
          productId,
          orderId,
        },
      }));
      if (orderItem) {
        return res.status(409).json({
          messge: "Failed",
          statusCode: 409,
          response:
            "A product with such specification for this 'orderId' is in ordre queue.",
        });
      }
      const product: boolean = !!(await prismaService.products.findFirst({
        where: {
          productId,
        },
        select: {
          productId: true,
        },
      }));
      if (!product) {
        return res.status(404).json({
          message: "Failed",
          statusCode: 404,
          response: "There is no any product with such id.",
        });
      }

      const color: boolean = !!(await prismaService.colors.findFirst({
        where: {
          colorId,
        },
        select: { colorId: true },
      }));
      if (!color) {
        return res.status(404).json({
          message: "Failed",
          statusCode: 404,
          response: "There is no any color with such id.",
        });
      }

      const inventory: { quantity: number } | null =
        await prismaService.inventories.findFirst({
          where: {
            colorId,
            productId,
          },
        });

      if (!inventory) {
        return res.status(404).json({
          message: "Failed",
          statusCode: 404,
          response: "A product with such specification is not avialable.",
        });
      }
      if (inventory.quantity < quantity) {
        return res.status(400).json({
          message: "Failed",
          statusCode: 400,
          response: `There are ${inventory.quantity} products in stock.`,
        });
      }

      await prismaService.order_items.create({
        data: {
          orderId,
          productId,
          colorId,
          quantity,
        },
      });

      return res.status(201).json({
        message: "Success",
        statusCode: 201,
        response: "Desire order item was created successfully.",
      });
    } catch (error) {
      console.error(error);
      return res.status(500).json({
        message: "Success",
        statusCode: 500,
        response: "An error occurred while getting items of order.",
      });
    }
  }
})();
