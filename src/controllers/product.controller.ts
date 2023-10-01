import { Request, Response } from "express";
import prismaService from "../prisma/prismaService";
import { ProductTypes } from "./../interfaces/product.interface";
import {
  getFilterProductOption,
  getOrderProductOption,
} from "../middlewares/getFilterAndSortOption";

export default new (class {
  async getAllProduct(req: Request, res: Response): Promise<void> {
    try {
      const allProducts: ProductTypes[] = await prismaService.products.findMany(
        {
          select: {
            productId: true,
            title: true,
            price: true,
            image: true,
            discountStatus: true,
            discountedPrice: true,
            dicountEndTime: true,
            discountPercent: true,
            inventories: {
              select: {
                quantity: true,
                colors: {
                  select: {
                    name: true,
                    hexCode: true,
                  },
                },
              },
            },
          },
        }
      );

      res
        .status(200)
        .json({ message: "ok", statusCode: 200, products: allProducts });
    } catch (error) {
      throw new Error(error as string);
    }
  }
  async getProductByIdRoute(req: Request, res: Response): Promise<void> {
    const productId: string = req.params.productId;
    try {
      const product: ProductTypes | null =
        await prismaService.products.findFirst({
          select: {
            productId: true,
            title: true,
            price: true,
            image: true,
            category: true,
            discountStatus: true,
            discountedPrice: true,
            dicountEndTime: true,
            discountPercent: true,
            inventories: {
              select: {
                quantity: true,
                colors: {
                  select: {
                    name: true,
                    hexCode: true,
                  },
                },
              },
            },
            createdAt: true,
          },
          where: { productId },
        });

      if (product)
        res.status(200).json({
          message: "ok",
          statusCodde: 200,
          product,
        });
      else
        res.status(404).json({
          message: "Not found",
          statusCode: 404,
          response: "Product with this id not found.",
        });
    } catch (error) {
      throw new Error(error as string);
    }
  }
  async getByFilterRoute(req: Request, res: Response): Promise<void> {
    const { take, skip } = req.body;
    try {
      const filterConditions = getFilterProductOption(req.body);
      const orderCondition = getOrderProductOption(req.body);

      const products: ProductTypes[] | [] =
        await prismaService.products.findMany({
          where: filterConditions,
          take: Number(take),
          skip: Number(skip),
          select: {
            productId: true,
            title: true,
            price: true,
            image: true,
            discountStatus: true,
            discountedPrice: true,
            dicountEndTime: true,
            discountPercent: true,
            inventories: {
              select: {
                quantity: true,
                colors: {
                  select: {
                    name: true,
                    hexCode: true,
                  },
                },
              },
            },
          },
          orderBy: orderCondition,
        });

      res.status(200).json({
        message: "ok",
        statusCode: 200,
        products,
      });
    } catch (error) {
      throw new Error(error as string);
    }
  }

  async searchProductRoute(req: Request, res: Response): Promise<void> {
    const searchTerm: string = req.query.searchTerm as string;
    const take: number = Number(req.query.take);

    try {
      const products: ProductTypes[] | [] =
        await prismaService.products.findMany({
          take,
          where: {
            title: {
              contains: searchTerm,
            },
          },
          select: {
            productId: true,
            title: true,
            price: true,
            image: true,
          },
          orderBy: { createdAt: "desc" },
        });
      const categories = await prismaService.categories.findMany({
        where: {
          name: {
            contains: searchTerm,
          },
        },
      });
      res.send({ message: "ok", statusCode: 200, products, categories });
    } catch (error) {
      throw new Error(error as string);
    }
  }
})();
