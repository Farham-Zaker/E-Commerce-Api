import { Request, Response } from "express";
import prismaService from "../../prisma/prismaService";

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
})();
