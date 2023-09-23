import { Request, Response } from "express";
import prismaService from "../prisma/prismaService";
import {
  UpdateInfoRouteUserInputTypes,
  UpdateInfoRouteSuccessResponseTyepe,
  SetPasswordRouteRequestBodyTypes,
  UserAuthInfoTypes,
} from "./../interfaces/account.interface";
import decodeToken from "../middlewares/decodeToekn";
import hashPassword from "../middlewares/hashPassword";

export default new (class accountController {
  async updateInfoRoute(req: Request, res: Response): Promise<void> {
    const { userId, newData }: UpdateInfoRouteUserInputTypes = req.body;
    try {
      const updatedUser = await prismaService.users.update({
        data: newData,
        where: { userId },
      });
      const sucessMessage: UpdateInfoRouteSuccessResponseTyepe = {
        message: "Updated",
        statusCode: 200,
        response: "User data successfully was updated.",
        user: updatedUser,
      };
      res.status(200).json(sucessMessage);
    } catch (error) {
      const failedResponse: PasswordRoutesResponseType = {
        message: "bad",
        statusCode: 400,
        response:
          "The data that you sent is incorrect.You can just update 'firstName', 'lastName', 'phone', 'email, 'email' and 'image'.",
      };
      res.status(400).json(failedResponse);
    }
  }
  async setPasswordRoute(req: Request, res: Response) {
    const token: string = req.header("token")!;
    const { newPassword, confirmPassword }: SetPasswordRouteRequestBodyTypes =
      req.body;
    const decodedToken: { userId: string } = decodeToken(token)!;
    try {
      const userAuthInfo: UserAuthInfoTypes | null =
        await prismaService.auth.findFirst({
          where: { userId: decodedToken.userId },
        });
      if (userAuthInfo?.password.length === 0) {
        if (newPassword === confirmPassword) {
          const hashedPassword: string = await hashPassword(newPassword);
          await prismaService.auth.update({
            data: {
              password: hashedPassword,
            },
            where: {
              userId: userAuthInfo.userId,
            },
          });
          res.status(200).json({
            message: "ok",
            statusCode: 200,
            response: "Password was successfully set.",
          });
        } else {
          res.status(400).json({
            message: "bad",
            statusCode: 400,
            response: "The new password does not match.",
          });
        }
      } else {
        res.status(401).json({
          message: "bad",
          statusCode: 401,
          response: "You have a password.You can just change.",
        });
      }
    } catch (error) {
      res.status(404).json({
        message: "bad",
        statusCode: 404,
        response: "Unexpectetd error.",
      });
    }
  }
})();
