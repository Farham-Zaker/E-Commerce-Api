import { Request, Response } from "express";
import prismaService from "../../prisma/prismaService";

export default new (class {
  async createInventory(
    req: Request,
    res: Response
  ): Promise<Response<any, Record<string, any>>> {
    const { productId, colorId, quantity } = req.body;

    try {
      const color: boolean = !!(await prismaService.colors.findFirst({
        where: {
          colorId,
        },
        select: {
          colorId: true,
        },
      }));
      if (!color) {
        return res.status(404).json({
          message: "Fieled",
          statusCode: 404,
          response: "There is no any color with such id.",
        });
      }

      const product: boolean = !!(await prismaService.products.findFirst({
        where: {
          productId,
        },
      }));
      if (!product) {
        return res.status(404).json({
          message: "Fieled",
          statusCode: 404,
          response: "There is no any product with such id.",
        });
      }

      const inventory = !!(await prismaService.inventories.findFirst({
        where: {
          productId,
          colorId,
        },
        select: {
          inventoryId: true,
        },
      }));
      if (inventory) {
        return res.status(409).json({
          message: "Failed",
          statusCode: 409,
          response: "Currently, there is a inventory with such specification.",
        });
      }

      await prismaService.inventories.create({
        data: {
          productId,
          colorId,
          quantity,
        },
      });
      return res.status(201).json({
        message: "Success",
        statusCode: 201,
        response: "Desire inventory was created successfully.",
      });
    } catch (error) {
      console.error(error);
      return res.status(500).json({
        message: "Error",
        statusCode: 500,
        response:
          "Internal Server Error.The reason of this error can be becuase of 'imageId' that you sent in body.Make sure it is correct.",
      });
    }
  }
})();
