import { Request, Response } from "express";
import prismaService from "./../prisma/prismaService";

import hashPassword from "./../middlewares/hashPassword";
import {
  RegistrationUserInputInt,
  UserDataInt,
  RegistrationSuccessResponseInt,
  RegistrationّFailedResponseInt,
} from "./../interfaces/auth.interface";

import validator from "validator";
import generateToken from "../middlewares/generateToken";

export default new (class Controller {
  async registerRoute(req: Request, res: Response): Promise<void> {
    const {
      firstName,
      lastName,
      email,
      phone,
      password,
    }: RegistrationUserInputInt = req.body;

    try {
      const user = await prismaService.users.findFirst({
        where: {
          OR: [
            {
              email,
            },
            { phone },
          ],
        },
      });

      if (!user) {
        const hashedPassword: string = await hashPassword(password);

        const newUser: UserDataInt =
          await prismaService.users.create({
            data: {
              firstName: firstName,
              lastName: lastName,
              email: email,
              image: "",
              phone: phone,
              auth: {
                create: {
                  password: hashedPassword,
                  token: "",
                },
              },
            },
          });
        const response: RegistrationSuccessResponseInt = {
          message: "Created",
          statusCode: 201,
          response: "The account has been successfully created.",
          data: newUser,
        };
        res.status(201).json(response);
      } else {
        const response: RegistrationّFailedResponseInt = {
          message: "Conflict",
          statusCode: 409,
          response: "An account with similar information already exists.",
        };
        res.status(409).json(response);
      }
    } catch (error) {
      throw new Error("There is an error in registeration process." + error);
    }
  }
  async loginRoute(req: Request, res: Response): Promise<void> {
    const { phoneOrEmail, password } = req.body;
    
    let user;
    if (validator.isEmail(phoneOrEmail)) {
      user = await prismaService.users.findFirst({
        where: { email: phoneOrEmail },
      });
    } else {
      user = await prismaService.users.findFirst({
        where: { phone: phoneOrEmail },
      });
    }

    if(user){
      const token = generateToken(user.userId)
    } else {
      
    }
  }
})();
