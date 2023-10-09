import { Request, Response } from "express";
import prismaService from "./../prisma/prismaService";
import decodeToken from "../middlewares/decodeToekn";
import { ProductsInLikesTypes } from "../interfaces/likes.interface";

export default new (class Controller {
  async addToLikes(
    req: Request,
    res: Response
  ): Promise<Response<any, Record<string, any>>> {
    const productId: string = req.body.productId;
    const token = req.header("token") as string;
    const decodedToken: { userId: string } = decodeToken(token) as {
      userId: string;
    };

    try {
      const product: { productId: string } | null =
        await prismaService.products.findFirst({
          where: {
            productId,
          },
          select: {
            productId: true,
          },
        });
      if (!product) {
        return res.status(404).json({
          message: "Failed",
          statusCode: 404,
          response: "There is no product with this id.",
        });
      }

      const userLike: { id: string } | null =
        await prismaService.likes.findFirst({
          where: {
            userId: decodedToken.userId,
            productId,
          },
          select: {
            id: true,
          },
        });

      if (userLike) {
        return res.status(409).json({
          message: "Failed",
          statusCode: 409,
          response: "This product has already been added to your likes list.",
        });
      }

      await prismaService.likes.create({
        data: {
          productId,
          userId: decodedToken.userId,
        },
      });

      return res.status(201).json({
        message: "Success",
        statusCode: 201,
        response: "Desire product was added to likes successfully.",
      });
    } catch (error) {
      console.error(error);
      return res.status(500).json({
        message: "Error",
        statusCode: 500,
        response: "Internal Server Error.",
      });
    }
  }
  async getAllLikes(req: Request, res: Response): Promise<void> {
    const token = req.header("token") as string;
    const decodedToken: { userId: string } = decodeToken(token) as {
      userId: string;
    };

    try {
      const userLikes = (await prismaService.likes.findMany({
        where: {
          userId: decodedToken.userId,
        },
        orderBy: {
          createdAt: "asc",
        },
        select: {
          id: true,
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
              inventories: {
                select: {
                  colors: true,
                  quantity: true,
                },
              },
            },
          },
        },
      })) as ProductsInLikesTypes[] | [];
      res.status(200).json({ message: "Success", statusCode: 200, userLikes });
    } catch (error) {
      console.error(error);
      res.status(500).json({
        message: "Error",
        statusCode: 500,
        response: "Internal Server Error.",
      });
    }
  }
  async deleteFromCarts(
    req: Request,
    res: Response
  ): Promise<Response<any, Record<string, any>>> {
    const productId = req.params.productId;
    try {
      const product: { id: string } | null =
        await prismaService.likes.findFirst({
          where: {
            productId,
          },
          select: {
            id: true,
          },
        });

      if (!product) {
        return res.status(404).json({
          message: "Failed",
          statusCode: 404,
          response: "There is no any product with this id.",
        });
      }

      await prismaService.likes.deleteMany({
        where: {
          productId,
        },
      });
      return res.status(200).json({
        message: "Seccuss",
        statusCode: 200,
        response: "Desire product was deleted successfully from likes.",
      });
    } catch (error) {
      console.error(error);
      return res.status(500).json({
        message: "Error",
        statusCode: 500,
        response: "Internal Server Error.",
      });
    }
  }
})();
