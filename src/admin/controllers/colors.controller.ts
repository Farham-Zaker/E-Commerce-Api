import { Request, Response, NextFunction } from "express";
import prismaService from "../../prisma/prismaService";
import { ColorsTypes } from "../interfaces/colors.interface";

export default new (class {
  async createColor(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response<any, Record<string, any>> | void> {
    const { name, hexCode } = req.body;

    try {
      const color: ColorsTypes | null = await prismaService.colors.findFirst({
        where: {
          name,
        },
      });
      if (color) {
        return res.status(409).json({
          message: "Failed",
          statusCode: 409,
          response: "There is color with such name.",
        });
      }

      await prismaService.colors.create({
        data: {
          name,
          hexCode,
        },
      });
      return res.status(201).json({
        message: "Success",
        statusCode: 201,
        response: "Desire color was created successfully.",
      });
    } catch (error) {
      next(error);
    }
  }
  async getAllColors(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const allColors: ColorsTypes[] = await prismaService.colors.findMany();
      res.status(200).json({
        message: "Success",
        statusCode: 200,
        colors: allColors,
      });
    } catch (error) {
      next(error);
    }
  }
  async getColorById(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response<any, Record<string, any>> | void> {
    const colorId: string = req.params.colorId;

    try {
      const color: ColorsTypes | null = await prismaService.colors.findFirst({
        where: {
          colorId,
        },
      });

      if (!color) {
        return res.status(404).json({
          message: "Failed",
          statusCode: 404,
          response:
            "There is not any product with such id that you sent in params.",
        });
      }
      return res.status(200).json({
        message: "Success",
        statusCode: 200,
        color,
      });
    } catch (error) {
      next(error);
    }
  }
  async updateColor(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    const { colorId, name, hexCode } = req.body;

    try {
      await prismaService.colors.update({
        data: {
          name,
          hexCode,
        },
        where: {
          colorId,
        },
      });
      res.status(200).json({
        message: "Success",
        statusCode: 200,
        response: "Desire product was updated successfully.",
      });
    } catch (error) {
      next(error);
    }
  }
  async deleteColor(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    const colorId = req.params.colorId;
    try {
      await prismaService.colors.delete({
        where: {
          colorId,
        },
      });
      res.status(200).json({
        message: "Success",
        statusCode: 200,
        response: "Desire color was deleted successfully.",
      });
    } catch (error) {
      next(error);
    }
  }
})();
