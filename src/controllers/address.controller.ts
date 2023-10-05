import { Request, Response } from "express";
import prismaService from "../prisma/prismaService";
import decodeToken from "../middlewares/decodeToekn";
import {
  AddedUserAddressTypes,
  ReceivedUserAddressTypes,
  UpdatedUserAddressType,
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
  async getAddressById(req: Request, res: Response): Promise<void> {
    try {
      const addressId: string = req.params.addressId;
      const address: ReceivedUserAddressTypes | null =
        await prismaService.addreesses.findFirst({
          where: {
            addressId,
          },
        });
      if (address) {
        res.status(200).json({ message: "ok", statusCode: 200, address });
      } else {
        res.status(404).json({
          message: "Not Found",
          statusCode: 404,
          response: "The requested address was not found.",
        });
      }
    } catch (error) {
      console.error(error);
      res.status(500).send("Internal Server Error");
    }
  }
  async updateUserAddresses(req: Request, res: Response): Promise<void> {
    try {
      const { addressId, newAddress } = req.body;
      const updatedAddress: UpdatedUserAddressType =
        await prismaService.addreesses.update({
          data: newAddress,
          where: {
            addressId,
          },
        });
      res.status(200).json({
        message: "Updated",
        statusCode: 200,
        response: "The user 's address was successfully updated.",
        updatedAddress,
      });
    } catch (error) {
      res.status(404).json({
        message: "Error",
        statusCode: 404,
        response:
          "Check data that you send in body of request.Probaby addressId is incorrect.",
      });
      console.error(error);
    }
  }
})();
