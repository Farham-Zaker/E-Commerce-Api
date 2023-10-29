import { Request, Response } from "express";
import prismaService from "../../prisma/prismaService";
import hashPassword from "../../util/hashPassword";
import { UploadedFile } from "express-fileupload";
import path from "path";
import { UserTypes } from "../interfaces/user.interface";

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
  async uploadImage(
    req: Request,
    res: Response
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
      console.error(error);
      return res.status(500).json({
        message: "Error",
        statusCode: 500,
        response: "An error occurred while uploading image of user.",
      });
    }
  }
  async getUsers(
    req: Request,
    res: Response
  ): Promise<Response<any, Record<string, any>>> {
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
      console.error(error);
      return res.status(500).json({
        message: "Error",
        statusCode: 500,
        response: "An error occurred while getting all user.",
      });
    }
  }
})();
