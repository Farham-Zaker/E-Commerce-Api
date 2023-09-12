import { Request, Response } from "express";
import prismaService from "./../prisma/prismaService";

import hashPassword from "./../middlewares/hashPassword";

export default new (class Controller {
  async registerRoute(req: Request, res: Response): Promise<void> {
    const { firstName, lastName, email, phone, password } = req.body;

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

        const newUser = await prismaService.users.create({
          data: {
            firstName: firstName,
            lastName: lastName,
            email: email,
            image: "",
            phone: phone,
            auth: {
              create: {
                isAdmin: "T",
                password: hashedPassword,
                token: "",
              },
            },
          },
        });
        res.status(201).json({
          message: "ok",
          statusCode: 201,
          response: "The account was created.",
          data: newUser,
        });
      } else {
        const response = {
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
})();
