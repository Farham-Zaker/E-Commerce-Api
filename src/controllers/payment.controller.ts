import { Request, Response } from "express";
import prismaService from "../prisma/prismaService";
import decodeToken from "../util/decodeToekn";
import axios from "axios";
import {
  UserCartTypes,
  InventoryDatasToUpdateTypes,
  OrderItemsTypes,
  PaymentTypes,
} from "../interfaces/payment.interface";
import config from "../config/config";

export default new (class accountController {
  async pay(
    req: Request,
    res: Response
  ): Promise<Response<any, Record<string, any>> | void> {
    const token = req.header("token") as string;
    const decodedToken: { userId: string } = decodeToken(token) as {
      userId: string;
    };

    try {
      const userCart: UserCartTypes[] | [] = await prismaService.carts.findMany(
        {
          where: {
            userId: decodedToken.userId,
          },
          select: {
            cartId: true,
            product: {
              select: {
                productId: true,
                finalPrice: true,
                price: true,
                inventories: true,
              },
            },
            cartInventories: {
              select: {
                inventoryId: true,
                colorId: true,
                quantity: true,
              },
            },
          },
        }
      );

      if (userCart.length === 0) {
        return res.status(404).json({
          message: "Failed",
          statusCode: 404,
          response: "There is no any product in cart.",
        });
      }

      let sortedUserCart: UserCartTypes[] = userCart.map((cart) => {
        let totlaQuantities: number = 0;
        cart.cartInventories.map((inventory) => {
          totlaQuantities += inventory.quantity;
        });
        return {
          cartId: cart.cartId,
          product: cart.product,
          cartInventories: cart.cartInventories,
          totlaQuantities,
          totalPrice: (cart.product.finalPrice as number) * totlaQuantities,
        };
      });

      let totalPrice: number = 0;
      sortedUserCart.map((e) => {
        totalPrice += e.totalPrice as number;
      });

      let params = {
        merchant_id: config.merchant_id,
        amount: totalPrice,
        callback_url: config.gateway_callback + `?token=${token}`,
        description: "Test buy",
      };
      const response = await axios.post(
        "https://api.zarinpal.com/pg/v4/payment/request.json",
        params
      );

      if (response.data.data.code === 100) {
        res.redirect(
          `https://www.zarinpal.com/pg/StartPay/${response.data.data.authority}`
        );
      } else {
        return res.status(502).json({
          message: "Field",
          statusCode: 502,
          response:
            "An issue has occurred while processing your request. Please try again later. If the problem persists, please contact our support team.",
        });
      }
    } catch (error) {
      console.error(error);
      return res.status(500).json({
        message: "Error",
        statusCode: 500,
        response: "Internal Server Error",
      });
    }
  }
  async payCallback(
    req: Request,
    res: Response
  ): Promise<Response<any, Record<string, any>> | void> {
    const status = req.query.status as string;
    const authorityId = req.query.Authority as string;
    const token = req.query.token as string;
    const decodedToken: { userId: string } = decodeToken(token) as {
      userId: string;
    };

    try {
      if (!authorityId && status !== "NOK") {
        return res.status(400).json({
          message: "Failed",
          statusCode: 400,
          response:
            "Payment operation failed. Please check your payment details and try again.",
        });
      }
      const userCart: UserCartTypes[] = await prismaService.carts.findMany({
        where: {
          userId: decodedToken.userId,
        },
        select: {
          cartId: true,
          product: {
            select: {
              productId: true,
              finalPrice: true,
              price: true,
              inventories: {
                select: {
                  inventoryId: true,
                  quantity: true,
                },
              },
            },
          },
          cartInventories: {
            select: {
              inventoryId: true,
              colorId: true,
              quantity: true,
            },
          },
        },
      });
      const inventoryDatasToUpdate: InventoryDatasToUpdateTypes[] =
        userCart.flatMap((cart: UserCartTypes) => {
          const [inventoryId] = cart.product.inventories.flatMap(
            (inv) => inv.inventoryId
          );
          const [decrementAmount] = cart.cartInventories.flatMap(
            (cart) => cart.quantity
          );
          return { inventoryId, decrementAmount };
        });

      for (const inventoryData of inventoryDatasToUpdate) {
        await prismaService.inventories.updateMany({
          where: {
            inventoryId: inventoryData.inventoryId,
          },
          data: {
            quantity: {
              decrement: inventoryData.decrementAmount,
            },
          },
        });
      }

      const sortedUserCart: UserCartTypes[] = userCart.map((cart) => {
        let totlaQuantities: number = 0;
        cart.cartInventories.map((inventory) => {
          totlaQuantities += inventory.quantity;
        });
        return {
          cartId: cart.cartId,
          product: cart.product,
          cartInventories: cart.cartInventories,
          totlaQuantities,
          totalPrice: (cart.product.finalPrice as number) * totlaQuantities,
        };
      });

      let totalPrice: number = 0;
      sortedUserCart.map((e) => {
        totalPrice += e.totalPrice as number;
      });

      const orderItems: OrderItemsTypes[] = userCart.flatMap((cart) => {
        return cart.cartInventories.flatMap((inv) => {
          return {
            productId: cart.product.productId,
            quantity: inv.quantity,
            colorId: inv.colorId,
          };
        });
      });

      await prismaService.orders.create({
        data: {
          status: "Pending",
          totalPrice,
          userId: decodedToken.userId,
          orderItems: {
            createMany: {
              data: orderItems,
            },
          },
          payment: {
            create: {
              amount: totalPrice,
              authorityId: authorityId,
              status: "Success",
            },
          },
        },
      });

      await prismaService.carts_inventories.deleteMany({
        where: {
          carts: {
            userId: decodedToken.userId,
          },
        },
      });

      await prismaService.carts.deleteMany({
        where: {
          userId: decodedToken.userId,
        },
      });

      res.status(201).json({
        message: "Seccuss",
        statusCode: 201,
        response:
          "Payment has been successfully copleted and your order is being procedded.",
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
  async getAllPeyments(
    req: Request,
    res: Response
  ): Promise<Response<any, Record<string, any>> | void> {
    const token = req.header("token") as string;
    const decodedToken: { userId: string } = decodeToken(token) as {
      userId: string;
    };

    try {
      const userPayments: PaymentTypes[] =
        await prismaService.payments.findMany({
          where: {
            orders: {
              userId: decodedToken.userId,
            },
          },
        });
      res.status(200).json({
        message: "Success",
        statusCode: 200,
        payments: userPayments,
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
