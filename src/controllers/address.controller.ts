import { Request, Response } from "express";
import prismaService from "../prisma/prismaService";
import decodeToken from "../middlewares/decodeToekn";
import { AddedUserAddressTypes } from "../interfaces/address.interface";

export default new (class {
  async addUserAddress(req: Request, res: Response): Promise<void> {
    try {
      const { country, state, city, zone, apartmentUnite, postalCode } =
        req.body;
      const token: string = req.header("token")!;

      const decodedToken: { userId: string } = decodeToken(token)!;

      const addedUserAddress: AddedUserAddressTypes =
        await prismaService.addreesses.create({
          data: {
            userId: decodedToken.userId,
            country,
            state,
            city,
            zone,
            apartmentUnite,
            postalCode,
          },
        });
      res.status(201).json({
        meessage: "Created",
        statusCode: 201,
        newAddress: addedUserAddress,
      });
    } catch (error) {
      console.error(error);
      res.status(500).send("Internal Server Error");
    }
  }
})();
