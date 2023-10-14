import { Request, Response } from "express";
import prismaService from "./../prisma/prismaService";
import decodeToken from "../middlewares/decodeToekn";
import {
  CancelOrderRouteOrderTypes,
  GetAllOrdersRouteOrdesTypes,
} from "../interfaces/order.interface";
export default new (class Controller {
  async cancelOrder(
    req: Request,
    res: Response
  ): Promise<Response<any, Record<string, any>>> {
    const { orderId } = req.body;
    const token = req.header("token") as string;
    const decodedToken: { userId: string } = decodeToken(token) as {
      userId: string;
    };
    try {
      const order: CancelOrderRouteOrderTypes | null =
        await prismaService.orders.findFirst({
          where: {
            orderId,
            userId: decodedToken.userId,
          },
          select: {
            orderId: true,
            createdAt: true,
            orderItems: true,
          },
        });
      if (!order) {
        return res.status(404).json({
          message: "Failed",
          statusCode: 404,
          response: "There is no any order with this id.",
        });
      }

      const orderDate: Date = new Date(order.createdAt);
      orderDate.setHours(0, 0, 0, 0);
      orderDate.setDate(orderDate.getDate() + 1);

      const now: Date = new Date(Date.now());
      if (now.getDay() - orderDate.getDay() >= 3) {
        res.status(400).json({
          message: "Failed",
          statusCode: 400,
          response:
            "You can not cancel your order. Because your order is pending and it has been delivered to the post office.",
        });
      }

      for (const orderItem of order.orderItems) {
        const inventory: { inventoryId: string } | null =
          await prismaService.inventories.findFirst({
            where: {
              productId: orderItem.productId,
              colorId: orderItem.colorId,
            },
            select: {
              inventoryId: true,
            },
          });

        if (inventory) {
          await prismaService.inventories.updateMany({
            data: {
              quantity: {
                increment: orderItem.quantity,
              },
            },
            where: {
              products: {
                inventories: {
                  every: {
                    colorId: orderItem.colorId,
                    productId: orderItem.productId,
                  },
                },
              },
            },
          });
        } else {
          await prismaService.inventories.create({
            data: {
              colorId: orderItem.colorId,
              quantity: orderItem.quantity,
              productId: orderItem.productId,
            },
          });
        }
      }

      await prismaService.orders.update({
        data: {
          status: "Canceled",
        },
        where: {
          orderId,
          userId: decodedToken.userId,
        },
      });

      return res.status(200).json({
        message: "Success",
        statusCode: 200,
        response: "Desire order successfully was canceled.",
      });
    } catch (error) {
      console.error(error);
      return res.status(500).json({
        message: "Error",
        statusCode: 500,
        response:
          "Internal Server Error.Check data in body of request.It is possible that 'productId' or 'colorId' is incorrect.",
      });
    }
  }
  async getAllOrders(req: Request, res: Response): Promise<void> {
    const token = req.header("token") as string;
    const decodedToken: { userId: string } = decodeToken(token) as {
      userId: string;
    };

    try {
      const userOrders: GetAllOrdersRouteOrdesTypes[] =
        await prismaService.orders.findMany({
          where: {
            userId: decodedToken.userId,
          },
          select: {
            orderId: true,
            totalPrice: true,
            status: true,
            createdAt: true,
            orderItems: {
              select: {
                products: {
                  select: {
                    title: true,
                    image: true,
                  },
                },
              },
            },
          },
        });
      res.status(200).json({
        message: "Success",
        statusCode: 200,
        orders: userOrders,
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({
        message: "Error",
        statusCode: 500,
        response:
          "Internal Server Error.Check data in body of request.It is possible that 'productId' or 'colorId' is incorrect.",
      });
    }
  }
})();
