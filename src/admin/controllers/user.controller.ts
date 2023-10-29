import { Request, Response } from "express";
import prismaService from "../../prisma/prismaService";
import hashPassword from "../../util/hashPassword";

export default new (class {
  async createUser(
    req: Request,
    res: Response
  ): Promise<Response<any, Record<string, any>>> {
    const { firstName, lastName, phone, email, image, password } = req.body;

    try {
      const user: { email: string } | null =
        await prismaService.users.findFirst({
          where: { email },
          select: { email: true },
        });
      if (user) {
        return res.status(409).json({
          message: "Failed",
          statusCode: 409,
          response: "There is already an user with such email address.",
        });
      }
      await prismaService.users.create({
        data: {
          firstName,
          lastName,
          email,
          phone,
          image: image || "",
          auth: {
            create: {
              isAdmin: 0,
              password: await hashPassword(password),
            },
          },
        },
      });
      return res.status(200).json({
        message: "Success",
        statusCode: 200,
        response: "The user account was created successfully.",
      });
    } catch (error) {
      console.error(error);
      return res.status(500).json({
        message: "Error",
        statusCode: 500,
        response: "An error occurred while creating user.",
      });
    }
  }
})();
