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
    } catch (error) {}
  }
})();
