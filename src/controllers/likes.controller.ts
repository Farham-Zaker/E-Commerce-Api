import { Request, Response, NextFunction } from "express";
import prismaService from "./../prisma/prismaService";
import decodeToken from "../util/decodeToekn";
import { ProductsInLikesTypes } from "../interfaces/likes.interface";

export default new (class Controller {
  async addToLikes(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response<any, Record<string, any>> | void> {
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

      const userLike: { likeId: string } | null =
        await prismaService.likes.findFirst({
          where: {
            userId: decodedToken.userId,
            productId,
          },
          select: {
            likeId: true,
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
      next(error);
    }
  }
  async getAllLikes(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    const token = req.header("token") as string;
    const decodedToken: { userId: string } = decodeToken(token) as {
      userId: string;
    };

    try {
      const userLikes: ProductsInLikesTypes[] =
        await prismaService.likes.findMany({
          where: {
            userId: decodedToken.userId,
          },
          orderBy: {
            createdAt: "asc",
          },
          select: {
            likeId: true,
            product: {
              select: {
                productId: true,
                title: true,
                price: true,
                images: true,
                finalPrice: true,
                inventories: true,
              },
            },
          },
        });
      res.status(200).json({ message: "Success", statusCode: 200, userLikes });
    } catch (error) {
      next(error);
    }
  }
  async deleteFromCarts(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response<any, Record<string, any>> | void> {
    const productId = req.params.productId;
    try {
      const product: { likeId: string } | null =
        await prismaService.likes.findFirst({
          where: {
            productId,
          },
          select: {
            likeId: true,
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
      next(error);
    }
  }
})();
