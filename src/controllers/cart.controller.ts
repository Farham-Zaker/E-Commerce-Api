import { Request, Response } from "express";
import prismaService from "../prisma/prismaService";
import decodeToken from "../middlewares/decodeToekn";
import { CartTypes } from "../interfaces/cart.interface";

export default new (class {
  async addToCarts(
    req: Request,
    res: Response
  ): Promise<Response<any, Record<string, any>>> {
    const { productId, colorId, quantity } = req.body;
    const requestQuantity = Number(quantity);

    const token = req.header("token") as string;
    const decodedToken: { userId: string } = decodeToken(token) as {
      userId: string;
    };

    try {
      const products: { quantity: number } | null =
        await prismaService.inventories.findFirst({
          where: {
            productId,
            colorId,
          },
          select: {
            quantity: true,
          },
        });

      const productsInCarts = await prismaService.carts_inventories.findFirst({
        where: {
          colorId,
          carts: {
            productId,
          },
        },
      });

      const productQuantity: number = products?.quantity!;
      if (!products || productQuantity === 0) {
        return res.status(404).json({
          message: "Not Found",
          statusCode: 404,
          response: "The requested product is not available or not exist.",
        });
      }

      if (productsInCarts) {
        if (productQuantity < requestQuantity + productsInCarts?.quantity) {
          console.log(productQuantity);
          return res.status(400).json({
            message: "bad",
            statusCode: 400,
            response: "The requested volume is invalid.",
          });
        }
      }

      const userCart = await prismaService.carts.findFirst({
        where: {
          productId,
          userId: decodedToken.userId,
        },
      });

      const response = {
        message: "Added",
        statusCode: 201,
        response: "Operation completed successfully.",
      };
      if (!userCart && !productsInCarts) {
        await prismaService.carts.create({
          data: {
            userId: decodedToken.userId,
            productId,
            cartInventories: {
              create: {
                quantity,
                colorId,
              },
            },
          },
        });
        return res.status(201).json(response);
      }
      if (userCart && !productsInCarts) {
        await prismaService.carts_inventories.create({
          data: {
            cartId: userCart.cartId,
            colorId,
            quantity: requestQuantity,
          },
        });
        return res.status(201).json(response);
      }
      if (userCart && productsInCarts) {
        await prismaService.carts_inventories.updateMany({
          where: {
            cartId: userCart.cartId,
          },
          data: {
            quantity: productsInCarts.quantity + requestQuantity,
          },
        });
        return res.status(201).json(response);
      }
    } catch (error) {
      console.error(error);
      return res.status(500).json({
        message: "Error",
        statusCode: 500,
        response:
          "Internal Server Error.Check data in body of request.It is possible that 'productId' or 'colorId' is incorrect.",
      });
    }
    return res.status(404).json({
      message: "Not Found",
      statusCode: 404,
      response: "No matching condition was met.",
    }) as Response<any, Record<string, any>>;
  }
})();
