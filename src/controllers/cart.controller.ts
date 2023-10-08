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
  async getAllCarts(req: Request, res: Response): Promise<void> {
    const token = req.header("token") as string;
    const decodedToken: { userId: string } = decodeToken(token) as {
      userId: string;
    };
    try {
      const carts = (await prismaService.carts.findMany({
        where: {
          userId: decodedToken.userId,
        },
        orderBy: {
          createdAt: "asc",
        },
        select: {
          cartId: true,
          product: {
            select: {
              productId: true,
              title: true,
              price: true,
              image: true,
              discountStatus: true,
              discountPercent: true,
              dicountEndTime: true,
              discountedPrice: true,
              category: {
                select: {
                  name: true,
                },
              },
            },
          },
          cartInventories: {
            select: {
              colors: true,
              quantity: true,
            },
          },
        },
      })) as CartTypes[] | [];
      res.status(200).json({
        message: "Success",
        statusCode: 200,
        carts,
      });
    } catch (error) {
      res.status(500).json({
        message: "Error",
        statusCode: 500,
        response: "Internal Server Error.",
      });
      console.error(error);
    }
  }
  async getCartById(req: Request, res: Response): Promise<void> {
    const token = req.header("token") as string;
    const decodedToken: { userId: string } = decodeToken(token) as {
      userId: string;
    };
    const cartId: string = req.params.cartId;
    const cart: CartTypes | null = (await prismaService.carts.findFirst({
      where: {
        cartId,
        userId: decodedToken.userId,
      },
      orderBy: {
        createdAt: "asc",
      },
      select: {
        cartId: true,
        product: {
          select: {
            productId: true,
            title: true,
            price: true,
            image: true,
            discountStatus: true,
            discountPercent: true,
            dicountEndTime: true,
            discountedPrice: true,
            category: {
              select: {
                name: true,
              },
            },
          },
        },
        cartInventories: {
          select: {
            colors: {
              select: {
                name: true,
                hexCode: true,
              },
            },
            quantity: true,
          },
        },
      },
    })) as CartTypes | null;

    if (cart) {
      res.status(200).json({
        message: "Success",
        statusCode: 200,
        cart,
      });
    } else {
      res.status(404).json({
        message: "Failed",
        statusCode: 404,
        response: "The requested cart was not found.",
      });
    }
    try {
    } catch (error) {
      res.status(500).json({
        message: "Error",
        statusCode: 500,
        response: "Internal Server Error.",
      });
      console.error(error);
    }
  }
  async updateCarts(
    req: Request,
    res: Response
  ): Promise<Response<any, Record<string, any>>> {
    const { cartId, colorId, quantity } = req.body;
    const requestQuantity = Number(quantity)
    const token = req.header("token") as string;
    const decodedToken: { userId: string } = decodeToken(token) as {
      userId: string;
    };

    try {
      const productsInCart = await prismaService.carts_inventories.findFirst({
        where: {
          cartId,
          colorId,
          carts: {
            userId: decodedToken.userId,
          },
        },
        select: {
          quantity: true,
          carts: {
            select: {
              productId: true,
            },
          },
        },
      });

      const productId = productsInCart?.carts.productId;

      if (!productsInCart) {
        return res.status(404).json({
          message: "Not Found",
          statusCode: 404,
          response: "No product with this specification was found in carts.",
        });
      }

      const inventories = await prismaService.inventories.findFirst({
        where: {
          colorId,
          productId,
        },
        select: {
          quantity: true,
        },
      });

      if (!inventories) {
        return res.status(404).json({
          message: "Failed",
          statusCode: 404,
          response: "No product with this specification was found.",
        });
      }

      const productInventories: number = inventories?.quantity!;
      if (requestQuantity + productsInCart.quantity > productInventories) {
        return res.status(400).json({
          message: "Failed",
          statusCode: 400,
          response: "The available quantity is less than your desired product.",
        });
      }

      console.log(inventories.quantity + requestQuantity);
      console.log(productsInCart.quantity + requestQuantity < 0);
      if (
        inventories.quantity + requestQuantity < 0 ||
        productsInCart.quantity + requestQuantity < 0
      ) {
        return res.status(400).json({
          message: "Failed",
          statusCode: 400,
          response: `The quantity of product can not be negetive.Now the quantity of this product is ${productsInCart.quantity}`,
        });
      }
      await prismaService.carts_inventories.updateMany({
        data: {
          colorId,
          quantity: productsInCart.quantity + requestQuantity,
        },
        where: {
          cartId,
        },
      });
      console.log(productsInCart)
      if(productsInCart.quantity === 0){
      }
      return res.status(200).json({
        message: "Success",
        statusCode: 200,
        response: "Desire product successfully was updated.",
      });

    } catch (error) {
      res.status(500).json({
        message: "Error",
        statusCode: 500,
        response: "Internal Server Error.",
      });
      console.error(error);
    }
    return res.status(404).json({
      message: "Not Found",
      statusCode: 404,
      response: "No matching condition was met.",
    });
  }
  async deleteCartByIdreq(req: Request, res: Response): Promise<void> {
    const cartId: string = req.params.cartId;
    try {
      await prismaService.carts_inventories.deleteMany({
        where: {
          cartId,
        },
      }),
        await prismaService.carts.delete({
          where: {
            cartId,
          },
        }),
        res.status(200).json({
          message: "Success",
          statusCode: 200,
          response: "Desire cart was deleted successfully.",
        });
    } catch (error) {
      res.status(500).json({
        message: "Error",
        statusCode: 500,
        response: "Internal Server Error.",
      });
      console.error(error);
    }
  }
})();
