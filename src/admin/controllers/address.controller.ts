import { Request, Response } from "express";
import prismaService from "../../prisma/prismaService";

export default new (class {
  async createAddress(req: Request, res: Response): Promise<void> {
    const { country, state, city, zone, apartmentUnite, postalCode, userId } =
      req.body;

    try {
      await prismaService.addreesses.create({
        data: {
          country,
          state,
          city,
          zone,
          apartmentUnite,
          postalCode,
          userId,
        },
      });
      res.status(201).json({
        message: "Success",
        statusCode: 201,
        response:
          "The address was created with such specification successfully.",
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({
        message: "Error",
        statusCode: 500,
        response: "An error occurred while creating address.",
      });
    }
  }
})();
