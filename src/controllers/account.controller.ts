import { Request, Response } from "express";
import prismaService from "../prisma/prismaService";
import {
  UpdateInfoRouteUserInputTypes,
  UpdateInfoRouteSuccessResponseTyepe,
} from "./../interfaces/account.interface";

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
      const failedResponse = {
        message: "bad",
        statusCode: 400,
        response:
          "The data that you sent is incorrect.You can just update 'firstName', 'lastName', 'phone', 'email, 'email' and 'image'.",
      };
      res.status(400).json(failedResponse);
    }
  }
})();
