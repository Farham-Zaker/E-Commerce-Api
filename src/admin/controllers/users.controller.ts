import { Request, Response, NextFunction } from "express";
import prismaService from "../../prisma/prismaService";
import hashPassword from "../../util/hashPassword";
import { UploadedFile } from "express-fileupload";
import path from "path";
import { UserTypes } from "../interfaces/users.interface";

export default new (class {
  async createUser(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response<any, Record<string, any>> | void> {
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
      next(error);
    }
  }
  async uploadImage(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response<any, Record<string, any>> | void> {
    const userId: string = req.body.userId;
    try {
      const user = await prismaService.users.findFirst({
        where: {
          userId,
        },
        select: {
          userId: true,
          firstName: true,
          lastName: true,
        },
      });
      if (!user) {
        return res.status(404).json({
          message: "Failed",
          statusCode: 404,
          response: "There is no any user with such specification.",
        });
      }

      const { files } = req;
      if (!files || !files.image) {
        return res.status(400).json({
          message: "Failed",
          statusCode: 400,
          response: "Not any image has been selected.",
        });
      }

      const image = files.image as UploadedFile;
      const imageName: string = image.name;

      const parts: string[] = imageName.split(".");
      const extension: string = parts.pop()!;

      const acceptableExtentions: string[] = [
        "jpeg",
        "jpg",
        "png",
        "svg",
        "webp",
      ];

      const [isExtentionCorrect]: string[] = acceptableExtentions.filter(
        (ext) => {
          if (ext === extension) {
            return ext;
          }
          return null;
        }
      );

      if (!isExtentionCorrect) {
        return res.status(400).json({
          message: "Failed",
          statusCode: 400,
          response:
            "You can just upload image with '.jpeg', '.jpg', '.png', '.svg', '.webp' extenstion.",
        });
      }

      if (image.size > 1048576) {
        return res.status(400).json({
          message: "Failed",
          statusCode: 400,
          response: "The size of image must be less than 1.5 MG.",
        });
      }

      const relativeDirOfImage: string = `./../../../src/upload/users/${userId}-${user.firstName}_${user.lastName}.${extension}`;
      const absoluteDirOfImage: string = path.join(
        __dirname,
        relativeDirOfImage
      );

      image.mv(absoluteDirOfImage, async (err) => {
        if (err) {
          console.error(err);
          return res.status(500).json({
            message: "Error",
            statusCode: 500,
            response: "Error while uploading the image.",
          });
        }

        await prismaService.users.update({
          data: {
            image: absoluteDirOfImage,
          },
          where: {
            userId,
          },
        });

        return res.status(200).json({
          message: "Success",
          statusCode: 200,
          response: "Image uploaded successfully.",
        });
      });
    } catch (error) {
      next(error);
    }
  }
  async getUsers(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response<any, Record<string, any>> | void> {
    const { searchTerm, orderBy } = req.query;

    let orderOption: any = {};
    if (orderBy === "firstName") {
      orderOption = {
        firstName: "asc",
      };
    }
    if (orderBy === "lastName") {
      orderOption = {
        lastName: "asc",
      };
    }

    try {
      const contain: { contains: string } = {
        contains: searchTerm as string,
      };
      const users: UserTypes[] = await prismaService.users.findMany({
        include: {
          auth: true,
        },
        where: {
          OR: [
            {
              firstName: contain,
            },
            {
              lastName: contain,
            },
            {
              email: contain,
            },
            {
              phone: contain,
            },
            {
              userId: contain,
            },
          ],
        },
        orderBy: orderOption,
      });
      return res.status(200).json({
        message: "Success",
        statusCode: 200,
        users,
      });
    } catch (error) {
      next(error);
    }
  }
  async getUserById(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response<any, Record<string, any>> | void> {
    const userId = req.params.userId;

    try {
      const user: UserTypes | null = await prismaService.users.findFirst({
        include: {
          auth: true,
        },
        where: {
          userId,
        },
      });
      if (!user) {
        return res.status(404).json({
          message: "Failed",
          statusCode: 404,
          response: "There is no any user with such id.",
        });
      }
      return res.status(200).json({
        message: "Success",
        statusCode: 200,
        user,
      });
    } catch (error) {
      next(error);
    }
  }
  async updateUser(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    const { userId, firstName, lastName, phone, email, password, isAdmin } =
      req.body;
    try {
      await prismaService.users.update({
        data: {
          firstName,
          lastName,
          phone,
          email,
          auth: {
            update: {
              data: {
                password: password ? await hashPassword(password) : undefined,
                isAdmin: isAdmin ? 1 : 0,
              },
              where: {
                userId,
              },
            },
          },
        },
        where: {
          userId,
        },
      });
      res.status(200).json({
        message: "Success",
        statusCode: 200,
        response: "Desire user was updated successfully.",
      });
    } catch (error) {
      next(error);
    }
  }
  async deleteUser(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    const userId: string = req.params.userId;
    try {
      await prismaService.auth.delete({
        where: {
          userId,
        },
      });
      await prismaService.users.delete({
        where: {
          userId,
        },
      });
      res.status(200).json({
        message: "Success",
        statusCode: 200,
        response: "Desire user was deleted successfully.",
      });
    } catch (error) {
      next(error);
    }
  }
})();
