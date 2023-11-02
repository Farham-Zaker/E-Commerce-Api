import { Request, Response, NextFunction } from "express";
import prismaService from "../../prisma/prismaService";
import { Prisma } from "@prisma/client";
import {
  GetOrdersRouteOrdersTypes,
  GetOrderByIdRouteOrderTypes,
  UpdateOrderRouteCartIventoryTypes,
  UpdateOrderRouteInventoryTypes,
  UpdateOrderRouteOrderIthemTypes,
  UpdateOrderRouteOrderTypes,
} from "../interfaces/order.inteface";

export default new (class {
  async createOrder(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response<any, Record<string, any>> | void> {
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
      next(error);
    }
  }
  async getOrders(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response<any, Record<string, any>> | void> {
    const {
      date,
      totalSale,
      orderItems,
      user,
      color,
      payment,
      take,
      skip,
      product,
      status,
    } = req.query;

    try {
      let filterCondition: any = {};

      if (orderItems == "true")
        filterCondition = { ...filterCondition, orderItems: true };

      if (user == "true") filterCondition = { ...filterCondition, user: true };

      if (color == "true" && orderItems == "true")
        filterCondition.orderItems = {
          ...filterCondition.orderItems,
          include: { color: true },
        };

      if (payment == "true")
        filterCondition = {
          ...filterCondition,
          payment: true,
        };

      if (product == "true")
        filterCondition = {
          ...filterCondition,
          orderItems: {
            include: {
              product: true,
            },
          },
        };

      let where: Prisma.ordersWhereInput | undefined;
      if (date) {
        where = {
          createdAt: {
            gte: new Date(date as string),
          },
          status: {
            equals: status as string,
          },
        };
      } else {
        where = undefined;
      }

      const orders: GetOrdersRouteOrdersTypes[] =
        await prismaService.orders.findMany({
          where,
          take: Number(take) || 999999999999999,
          skip: Number(skip) || 0,
          orderBy: {
            createdAt: "desc",
          },
          include: filterCondition,
        });

      let income: number | undefined;
      let quantities: number | undefined;

      if (totalSale == "true" && orderItems == "true") {
        for (const order of orders) {
          income = order.totalPrice;
          if (order.orderItems) {
            for (const orderItem of order.orderItems) {
              quantities = orderItem.quantity;
            }
          }
        }
      }
      return res.status(200).json({
        message: "Success",
        totalSale: totalSale == "true" ? { income, quantities } : undefined,
        statusCode: 200,
        orders,
      });
    } catch (error) {
      next(error);
    }
  }
  async getOrderById(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response<any, Record<string, any>> | void> {
    const orderId = req.params.orderId;

    try {
      const order: GetOrderByIdRouteOrderTypes | null =
        await prismaService.orders.findFirst({
          where: {
            orderId,
          },
          select: {
            orderId: true,
            totalPrice: true,
            status: true,
            createdAt: true,
            user: true,
            orderItems: {
              select: {
                orderItemId: true,
                product: true,
                quantity: true,
                color: true,
              },
            },
          },
        });
      if (!order) {
        return res.status(404).json({
          message: "Field",
          statusCode: 404,
          response: "There is no any order with such id.",
        });
      }
      return res.status(200).json({
        message: "Success",
        statusCode: 200,
        order,
      });
    } catch (error) {
      next(error);
    }
  }
  async updateOrder(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response<any, Record<string, any>> | void> {
    const { orderId, status, totalPrice } = req.body;
    try {
      if (status === "Canceled") {
        const order: UpdateOrderRouteOrderTypes | null =
          await prismaService.orders.findFirst({
            where: {
              orderId,
            },
            select: {
              orderItems: true,
              userId: true,
            },
          });

        if (!order) {
          return res.status(404).json({
            message: "Failed",
            statusCode: 404,
            response: "There is no any order with such orderId.",
          });
        }

        const userId: string = order?.userId!;
        const orderItems: UpdateOrderRouteOrderIthemTypes[] =
          order?.orderItems!;

        for (let orderItem of orderItems) {
          const inventory: UpdateOrderRouteInventoryTypes | null =
            await prismaService.inventories.findFirst({
              where: {
                productId: orderItem.productId,
                colorId: orderItem.colorId,
              },
              select: {
                inventoryId: true,
                quantity: true,
              },
            });

          if (inventory) {
            await prismaService.inventories.update({
              data: {
                quantity: orderItem.quantity + inventory.quantity,
              },
              where: {
                inventoryId: inventory.inventoryId,
              },
            });
          } else {
            await prismaService.inventories.create({
              data: {
                quantity: orderItem.quantity,
                colorId: orderItem.colorId,
                productId: orderItem.productId,
              },
            });
          }

          const cart: { cartId: string } | null =
            await prismaService.carts.findFirst({
              where: {
                productId: orderItem.productId,
              },
            });
          if (cart) {
            const cartInvenotory: UpdateOrderRouteCartIventoryTypes | null =
              await prismaService.carts_inventories.findFirst({
                where: {
                  colorId: orderItem.colorId,
                },
              });

            if (cartInvenotory) {
              await prismaService.carts_inventories.updateMany({
                data: {
                  quantity: cartInvenotory.quantity + orderItem.quantity,
                },
                where: {
                  cartId: cartInvenotory.cartId,
                  colorId: orderItem.colorId,
                },
              });
            } else {
              await prismaService.carts_inventories.create({
                data: {
                  cartId: cart.cartId,
                  quantity: orderItem.quantity,
                  colorId: orderItem.colorId,
                },
              });
            }
          } else {
            await prismaService.carts.create({
              data: {
                productId: orderItem.productId,
                userId,
                cartInventories: {
                  create: {
                    colorId: orderItem.colorId,
                    quantity: orderItem.quantity,
                  },
                },
              },
            });
          }
        }
        await prismaService.orders.update({
          data: {
            status: "Canceled",
            totalPrice,
          },
          where: {
            orderId,
          },
        });
        return res.status(200).json({
          message: "Success",
          statusCode: 200,
          response: "Desire order was canceled successfully.",
        });
      } else if (status === "Pending") {
        await prismaService.orders.update({
          data: {
            status: "Pending",
            totalPrice,
          },
          where: {
            orderId,
          },
        });
        return res.status(200).json({
          message: "Success",
          statusCode: 200,
          response:
            "Desire status of order was change to Pennding successfully.",
        });
      } else if (status === "Finished") {
        await prismaService.orders.update({
          data: {
            status: "Finished",
            totalPrice,
          },
          where: {
            orderId,
          },
        });
        return res.status(200).json({
          message: "Success",
          statusCode: 200,
          response: "Desire order was finished successfully.",
        });
      }
    } catch (error) {
      next(error);
    }
  }
  async deleteOrder(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    const orderId = req.params.orderId;
    try {
      await prismaService.orders.delete({
        where: {
          orderId,
        },
      });
      res.status(200).json({
        message: "Success",
        statusCode: 200,
        response: "Desire order was deleted successfully.",
      });
    } catch (error) {
      next(error);
    }
  }
})();
