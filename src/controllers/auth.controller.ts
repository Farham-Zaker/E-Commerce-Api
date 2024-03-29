import { Request, Response, NextFunction } from "express";
import prismaService from "./../prisma/prismaService";
import hashPassword from "../util/hashPassword";
import {
  RegisterUserDataTypes,
  LoginUserDataTypes,
} from "./../interfaces/auth.interface";

import userFinder from "../util/userFinder";
import passwordValidator from "../util/passwordValidator";
import generateToken from "../util/generateToken";

export default new (class Controller {
  async registerRoute(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    const { firstName, lastName, email, phone, password } = req.body;

    try {
      const user: RegisterUserDataTypes | null =
        await prismaService.users.findFirst({
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

        const newUser: RegisterUserDataTypes = await prismaService.users.create(
          {
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
          }
        );
        res.status(201).json({
          message: "Created",
          statusCode: 201,
          response: "The account has been successfully created.",
          data: newUser,
        });
      } else {
        res.status(409).json({
          message: "Conflict",
          statusCode: 409,
          response: "An account with similar information already exists.",
        });
      }
    } catch (error) {
      next(error);
    }
  }
  async loginRoute(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    const { phoneOrEmail, password } = req.body;

    try {
      const user: LoginUserDataTypes | null = (await userFinder(
        phoneOrEmail
      )) as LoginUserDataTypes;

      if (user && user?.auth) {
        const isPasswordValid: boolean = await passwordValidator(
          password,
          user.auth?.password
        );
        if (isPasswordValid && user.auth.password) {
          const token: string = generateToken(user.userId);

          res.status(200).json({
            message: "Login successfully",
            statusCode: 200,
            token,
          });
        } else {
          res.status(401).json({
            message: "Incorrect password",
            statusCode: 401,
            response: "The password you sent is incorrect.",
          });
        }
      } else {
        res.status(404).json({
          message: "Not Found",
          statusCode: 404,
          response: "User with given profile not found",
        });
      }
    } catch (error) {
      next(error);
    }
  }
  googleCallbackRoute(req: Request, res: Response) {
    const response = req.user;
    res.status(200).json(response);
  }
})();
