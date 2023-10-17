import { Request, Response } from "express";
import prismaService from "../../prisma/prismaService";
import { ProductTypes } from "../interfaces/product.interface";
import discountCalculator from "../middlewares/product/discountCalculator";

export default new (class {
  async createProduct(
    req: Request,
    res: Response
  ): Promise<Response<any, Record<string, any>>> {
    const {
      title,
      price,
      discountStatus,
      discountPercent,
      discountEndTime,
      categoryId,
    } = req.body;

    const isProductAvialable = !!(await prismaService.products.findFirst({
      where: {
        title,
      },
      select: {
        productId: true,
      },
    }));
    if (isProductAvialable) {
      return res.status(409).json({
        message: "Failed",
        statusCode: 406,
        response: "There is a product with such specification.",
      });
    }
    try {
      const product: ProductTypes = await prismaService.products.create({
        data: {
          title,
          price,
          discountStatus: discountStatus ? 1 : 0,
          discountPercent,
          discountEndTime,
          finalPrice: discountStatus
            ? discountCalculator(price, discountPercent)
            : price,
          categoryId,
        },
      });
      return res.status(201).json({
        message: "Success",
        statusCode: 201,
        response: "The product successfully was created.",
        product,
      });
    } catch (error) {
      console.error(error);
      return res.status(500).json({
        message: "Error",
        statusCode: 500,
        response:
          "Internal Server Error.The reason of this error can be becuase of 'categoryId' that you sent in body of request.Make sure that is true.",
      });
    }
  }
})();
