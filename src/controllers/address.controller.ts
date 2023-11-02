import { Request, Response, NextFunction } from "express";
import prismaService from "../prisma/prismaService";
import decodeToken from "../util/decodeToekn";
import {
  AddedUserAddressTypes,
  ReceivedUserAddressTypes,
  UpdatedUserAddressType,
} from "../interfaces/address.interface";

export default new (class {
  async addUserAddress(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
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
      next(error);
    }
  }
  async getUserAddresses(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
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
      next(error);
    }
  }
  async getAddressById(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
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
      next(error);
    }
  }
  async updateUserAddresses(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
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
      next(error);
    }
  }
  async deleteUserAddress(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const addressId: string = req.params.addressId;
      await prismaService.addreesses.delete({ where: { addressId } });
      res.status(200).json({
        message: "Deleted",
        statusCode: 201,
        response: `The address successfully deleted base on '${addressId}' id.`,
      });
    } catch (error) {
      next(error);
    }
  }
})();
