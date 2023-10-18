import { Request, Response } from "express";
import prismaService from "../../prisma/prismaService";
import { ColorsTypes } from "../interfaces/color.interface";

export default new (class {
  async createColor(
    req: Request,
    res: Response
  ): Promise<Response<any, Record<string, any>>> {
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
      console.error(error);
      return res.status(500).json({
        message: "Error",
        statusCode: 500,
        response: "Internal Server Error.",
      });
    }
  }
  async getAllColors(req: Request, res: Response): Promise<void> {
    try {
      const allColors: ColorsTypes[] = await prismaService.colors.findMany();
      res.status(200).json({
        message: "Success",
        statusCode: 200,
        colors: allColors,
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({
        message: "Error",
        statusCode: 500,
        response: "Internal Server Error.",
      });
    }
  }
})();
