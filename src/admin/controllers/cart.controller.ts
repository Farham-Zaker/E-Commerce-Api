import { Request, Response } from "express";
import prismaService from "../../prisma/prismaService";
import { Prisma } from "@prisma/client";
import { CartTypes } from "../interfaces/cart.interface";

export default new (class {
  async createCart(
    req: Request,
    res: Response
  ): Promise<Response<any, Record<string, any>>> {
    const { userId, productId, quantity, colorId } = req.body;

    try {
      const product: { quantity: number } | null =
        await prismaService.inventories.findFirst({
          where: {
            productId,
            colorId,
          },
          select: {
            quantity: true,
          },
        });
      if (!product) {
        return res.status(404).json({
          message: "Failed",
          statusCode: 404,
          response: "There is no any product with such productId and colorId.",
        });
      }
      const cart: { cartId: string } | null =
        await prismaService.carts.findFirst({
          where: {
            userId,
            productId,
          },
          select: {
            cartId: true,
          },
        });
      const cartInventories: { quantity: number } | null =
        await prismaService.carts_inventories.findFirst({
          where: {
            colorId,
            cartId: cart?.cartId,
          },
          select: {
            quantity: true,
          },
        });

      if (!cart || !cartInventories) {
        return res.status(400).json({
          message: "Failed",
          statusCode: 400,
          response: "There is no any product with such specification in cart.",
        });
      }

      if (product?.quantity < cartInventories?.quantity + quantity) {
        const orderableQuantity = product?.quantity - cartInventories?.quantity;
        return res.status(400).json({
          message: "Failed",
          statusCode: 400,
          response: `The requested volume is invalid. You can just order ${orderableQuantity} of this product.`,
        });
      }

      const productQuantity: number = product?.quantity!;
      if (!product || productQuantity === 0) {
        return res.status(404).json({
          message: "Not Found",
          statusCode: 404,
          response: "The requested product is not available or not exist.",
        });
      }
      if (cart) {
        await prismaService.carts_inventories.create({
          data: {
            quantity,
            colorId,
            cartId: cart.cartId,
          },
        });
      } else {
        await prismaService.carts.create({
          data: {
            userId,
            productId,
            cartInventories: {
              create: {
                colorId,
                quantity,
              },
            },
          },
        });
      }

      return res.status(200).json({
        message: "Success",
        statusCode: 200,
        response: "Desire product was added to cart of user with such id.",
      });
    } catch (error) {
      console.error(error);
      return res.status(500).json({
        message: "Error",
        statusCode: 500,
        response: "An error occurred while adding product to cart.",
      });
    }
  }
  async getCarts(req: Request, res: Response): Promise<void> {
    const { userId, productId, user, product, cartInventories, take, skip } =
      req.query;

    let include: Prisma.cartsInclude = {};
    if (user === "true") {
      include = { user: true };
    }
    if (product === "true") {
      include = { ...include, product: true };
    }
    if (cartInventories === "true") {
      include = { ...include, cartInventories: true };
    }
    let where: Prisma.cartsWhereInput = {};
    if (user === "true") {
      where = { ...where, userId: userId as string | undefined };
    }
    if (product === "true") {
      where = { ...where, productId: productId as string | undefined };
    }

    try {
      const carts: CartTypes[] = await prismaService.carts.findMany({
        where,
        include,
        take: Number(take) || 99999999999,
        skip: Number(skip) || 0,
      });
      res.status(200).json({
        message: "Success",
        statusCode: 200,
        carts,
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({
        message: "Error",
        statusCode: 500,
        response: "An error occurred while gettinf product of carts.",
      });
    }
  }
  async getCartById(
    req: Request,
    res: Response
  ): Promise<Response<any, Record<string, any>>> {
    const cartId: string = req.params.cartId;

    try {
      const cart: CartTypes | null = await prismaService.carts.findFirst({
        where: {
          cartId,
        },
        include: {
          user: true,
          product: true,
          cartInventories: true,
        },
      });
      if (!cart) {
        return res.status(404).json({
          message: "Failed",
          statusCode: 404,
          response: "There is no any cart with such id.",
        });
      }

      return res.status(200).json({
        message: "Success",
        statusCode: 200,
        cart,
      });
    } catch (error) {
      console.error(error);
      return res.status(500).json({
        message: "Error",
        statusCode: 500,
        response: "An error occurred while getting product of this cart.",
      });
    }
  }
})();
