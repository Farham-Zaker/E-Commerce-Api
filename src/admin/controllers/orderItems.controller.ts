import { Request, Response } from "express";
import prismaService from "../../prisma/prismaService";
import {
  GetAllItemsRouteOrderItemTypes,
  GetItemByIdRouteOrderItemTypes,
} from "../interfaces/orderItems.interface";

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
  async getOrderItems(req: Request, res: Response): Promise<void> {
    const { color, product, order, take, skip } = req.query;

    let filterOptions: any = {};

    if (color === "true") {
      filterOptions = { ...filterOptions, color: true };
    }
    if (product === "true") {
      filterOptions = { ...filterOptions, product: true };
    }
    if (order === "true") {
      filterOptions = { ...filterOptions, order: true };
    }
    try {
      const orderItems: GetAllItemsRouteOrderItemTypes[] =
        await prismaService.order_items.findMany({
          take: Number(take) || 99999999999,
          skip: Number(skip) || 0,
          include: filterOptions,
        });
      res.status(200).json({
        message: "Success",
        statusCode: 200,
        orderItems,
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({
        message: "Error",
        statusCode: 500,
        response: "Internal Server Error",
      });
    }
  }
  async getOrderItemById(req: Request, res: Response): Promise<void> {
    const orderItemId: string = req.params.orderItemId;
    try {
      const orderItem: GetItemByIdRouteOrderItemTypes | null =
        await prismaService.order_items.findFirst({
          where: {
            orderItemId,
          },
          include: {
            product: true,
            color: true,
            order: true,
          },
        });
      res.status(200).json({
        message: "Success",
        statusCode: 200,
        orderItem,
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({
        message: "Success",
        statusCode: 500,
        response: "An error occurred while getting items of order.",
      });
    }
  }

  async updateOrderItem(req: Request, res: Response): Promise<void> {
    const { orderItemId, orderId, productId, quantity, colorId } = req.body;

    try {
      await prismaService.order_items.update({
        data: {
          orderId,
          productId,
          quantity,
          colorId,
        },
        where: {
          orderItemId,
        },
      });
      res.status(200).json({
        message: "Success",
        statusCode: 200,
        response: "Desire ithem was updated successfully.",
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({
        message: "Success",
        statusCode: 500,
        response: "An error occurred while updating items of order.",
      });
    }
  }
  async deleteOrderItem(req: Request, res: Response): Promise<void> {
    const orderItemId: string = req.params.orderItemId;

    try {
      await prismaService.order_items.delete({
        where: {
          orderItemId,
        },
      });
      res.status(200).json({
        message: "Success",
        statusCode: 200,
        response: "Desire item of order was deleted successfully.",
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({
        message: "Success",
        statusCode: 500,
        response: "An error occurred while updating items of order.",
      });
    }
  }
})();
