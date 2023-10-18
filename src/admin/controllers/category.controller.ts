import { Request, Response } from "express";
import prismaService from "../../prisma/prismaService";
import { CategoryTypes } from "../interfaces/category.interface";

export default new (class {
  async createProduct(
    req: Request,
    res: Response
  ): Promise<Response<any, Record<string, any>>> {
    const { name } = req.body;
    try {
      const category: { name: string } | null =
        await prismaService.categories.findFirst({
          where: {
            name,
          },
          select: {
            name: true,
          },
        });
      if (category) {
        return res.status(409).json({
          message: "Failed",
          statusCode: 409,
          response: "There is an category with such name.",
        });
      }

      await prismaService.categories.create({
        data: {
          name,
        },
      });
      return res.status(201).json({
        message: "Success",
        statusCode: 201,
        response: `'${name}' category was created successfully.`,
      });
    } catch (error) {
      console.error(error);
      return res.status(500).json({
        message: "Error",
        statusCode: 500,
        response: "Internal Server Error",
      });
    }
  }
  async getAllCategories(
    req: Request,
    res: Response
  ): Promise<Response<any, Record<string, any>>> {
    try {
      const allCategories: CategoryTypes[] =
        await prismaService.categories.findMany({
          orderBy: {
            name: "asc",
          },
        });
      return res.status(200).json({
        message: "Success",
        statusCode: 200,
        categories: allCategories,
      });
    } catch (error) {
      console.error(error);
      return res.status(500).json({
        message: "Error",
        statusCode: 500,
        response: "Internal Server Error",
      });
    }
  }
})();
