import { Request, Response } from "express";
import prismaService from "../prisma/prismaService";
import { ProductTypes } from "./../interfaces/product.interface";

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
})();
