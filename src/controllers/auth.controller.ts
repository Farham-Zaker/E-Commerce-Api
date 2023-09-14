import { Request, Response } from "express";
import prismaService from "./../prisma/prismaService";
import hashPassword from "./../middlewares/hashPassword";
import {
  RegistrationBodyRequestTypes,
  RegistrationSuccessResponseTypes,
  RegistrationّFailedResponseTypes,
  UserDataTypes,
  LoginUserInputTypes,
  LoginUserDataTypes,
  LoginSuccessfulMessageTypes,
  LoginFailedMessageMessageTypes,
} from "./../interfaces/auth.interface";

import userFinder from "../middlewares/userFinder";
import passwordValidator from "../middlewares/passwordValidator";
import generateToken from "../middlewares/generateToken";

export default new (class Controller {
  async registerRoute(req: Request, res: Response): Promise<void> {
    const {
      firstName,
      lastName,
      email,
      phone,
      password,
    }: RegistrationBodyRequestTypes = req.body;

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

        const newUser: UserDataTypes = await prismaService.users.create({
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
        const response: RegistrationSuccessResponseTypes = {
          message: "Created",
          statusCode: 201,
          response: "The account has been successfully created.",
          data: newUser,
        };
        res.status(201).json(response);
      } else {
        const response: RegistrationّFailedResponseTypes = {
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
    const { phoneOrEmail, password }: LoginUserInputTypes = req.body;

    try {
      const user: LoginUserDataTypes | null = await userFinder(phoneOrEmail);

      if (user && user?.auth) {
        const isPasswordValid: boolean | undefined = await passwordValidator(
          password,
          user.auth?.password
        );
        if (isPasswordValid) {
          const token: string = generateToken(user.auth?.password);
          const successfulResponse: LoginSuccessfulMessageTypes = {
            message: "Login successfully",
            statusCode: 200,
            token,
          };
          res.status(200).json(successfulResponse);
        } else {
          const failedResponse: LoginFailedMessageMessageTypes = {
            message: "Incorrect password",
            statusCode: 401,
            response: "The password you sent is incorrect.",
          };
          res.status(401).json(failedResponse);
        }
      } else {
        const failedResponse: LoginFailedMessageMessageTypes = {
          message: "Not Found",
          statusCode: 404,
          response: "User with given profile not found",
        };
        res.status(404).json(failedResponse);
      }
    } catch (error) {
      throw new Error("There is an error in logining process." + error);
    }
  }
})();
