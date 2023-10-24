import { Request, Response } from "express";
import prismaService from "../../prisma/prismaService";
import { Prisma } from "@prisma/client";
import {
  GetOrdersRouteOrdersTypes,
} from "../interfaces/order.inteface";

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
  async getOrders(
    req: Request,
    res: Response
  ): Promise<Response<any, Record<string, any>>> {
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
      console.error(error);
      return res.status(500).json({
        message: "Error",
        statusCode: 500,
        response: "Internal Server Error",
      });
    }
  }
})();
