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
      const allProducts: ProductTypes[] =
        (await prismaService.products.findMany({
          include: {
            category: true,
            inventories: { include: { colors: true } },
          },
        })) as ProductTypes[];

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
        (await prismaService.products.findFirst({
          include: {
            category: true,
            inventories: { include: { colors: true } },
          },
          where: { productId },
        })) as ProductTypes;

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

      const products: ProductTypes[] = (await prismaService.products.findMany({
        where: filterConditions,
        take: Number(take),
        skip: Number(skip),
        include: {
          category: true,
          inventories: { include: { colors: true } },
        },
        orderBy: orderCondition,
      })) as ProductTypes[];

      res.status(200).json({
        message: "ok",
        statusCode: 200,
        products,
      });
    } catch (error) {
      throw new Error(error as string);
    }
  }
})();