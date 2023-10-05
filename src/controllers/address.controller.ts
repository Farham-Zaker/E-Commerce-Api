import { Request, Response } from "express";
import prismaService from "../prisma/prismaService";
import decodeToken from "../middlewares/decodeToekn";
import {
  AddedUserAddressTypes,
  ReceivedUserAddressTypes,
} from "../interfaces/address.interface";

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
  async getUserAddresses(req: Request, res: Response): Promise<void> {
    const query = req.query;

    let filterOptions: { [key: string]: boolean } = {};

    for (let key in query) {
      if (query[key] === "true") {
        filterOptions[key] = true;
      } else {
        filterOptions[key] = false;
      }
    }

    if (Object.keys(filterOptions).length === 0) {
      filterOptions = {
        addressId: true,
        country: true,
        state: true,
        city: true,
        zone: true,
        apartmentUnite: true,
        userId: true,
        createdAt: true,
      };
    }

    try {
      const token: string = req.header("token") as string;
      const decodedToken: { userId: string } = decodeToken(token) as {
        userId: string;
      };

      const userAdresses: ReceivedUserAddressTypes[] | [] =
        await prismaService.addreesses.findMany({
          where: { userId: decodedToken.userId },
          select: filterOptions,
        });
      res.send({ message: "ok", statusCode: 200, userAdresses });
    } catch (error) {
      console.error(error);
      res.status(500).send("Internal Server Error");
    }
  }
})();
