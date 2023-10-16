import { Request, Response } from "express";
import prismaService from "../prisma/prismaService";
import {
  SetPasswordRouteUpdatedUserTypes,
  UserAuthInfoTypes,
  UserInfoTypes,
} from "./../interfaces/account.interface";
import decodeToken from "../middlewares/decodeToekn";
import hashPassword from "../middlewares/hashPassword";
import passwordValidator from "../middlewares/passwordValidator";
import { UploadedFile } from "express-fileupload";
import path from "path";

export default new (class accountController {
  async updateInfoRoute(req: Request, res: Response): Promise<void> {
    const { userId, newData } = req.body;
    try {
      const updatedUser: SetPasswordRouteUpdatedUserTypes =
        await prismaService.users.update({
          data: newData,
          where: { userId },
        });
      res.status(200).json({
        message: "Updated",
        statusCode: 200,
        response: "User data successfully was updated.",
        user: updatedUser,
      });
    } catch (error) {
      res.status(400).json({
        message: "bad",
        statusCode: 400,
        response: "The input data is incorrect.",
      });
    }
  }
  async uploadImage(
    req: Request,
    res: Response
  ): Promise<Response<any, Record<string, any>> | void> {
    const token = req.header("token") as string;
    const decodedToken = decodeToken(token) as { userId: string };
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

    const parts = imageName.split(".");
    const extension = parts.pop();

    const acceptableExtentions = ["jpeg", "jpg", "png", "svg", "webp"];

    const [isExtentionCorrect] = acceptableExtentions.filter((ext) => {
      if (ext === extension) {
        return ext;
      }
      return null;
    });

    if (image.size > 1024000) {
      return res.status(400).json({
        message: "Failed",
        statusCode: 400,
        response: "The size of image must be less than 1.5 MG.",
      });
    }
    if (!isExtentionCorrect) {
      return res.status(400).json({
        message: "Failed",
        statusCode: 400,
        response:
          "You can just upload image with '.jpeg', '.jpg', '.png', '.svg', '.webp' extenstion.",
      });
    }

    const user = (await prismaService.users.findFirst({
      where: {
        userId: decodedToken.userId,
      },
    })) as { firstName: string; lastName: string };

    const newFileName = `${decodedToken.userId}-${user?.firstName}_${user?.lastName}.${extension}`;

    image.mv(`./src/upload/users/` + newFileName, async (err) => {
      if (err) {
        console.error(err);
        return res.status(500).json({
          message: "Error",
          statusCode: 500,
          response: "Error uploading the image.",
        });
      }
      const relativeDirOfImage =
        "./../../src/upload/users/e2fab14a-1618-472a-8ffa-920225628ccc-F_Z.png";
      const absoluteDirOfImage = path.join(__dirname, relativeDirOfImage);

      await prismaService.users.update({
        data: {
          image: absoluteDirOfImage,
        },
        where: {
          userId: decodedToken.userId,
        },
      });

      return res.status(200).json({
        message: "Success",
        statusCode: 200,
        response: "Image uploaded successfully.",
      });
    });
  }
  async setPasswordRoute(req: Request, res: Response) {
    const token: string = req.header("token")!;
    const { newPassword, confirmPassword } = req.body;
    const decodedToken: { userId: string } = decodeToken(token)!;
    try {
      const userAuthInfo: UserAuthInfoTypes | null =
        await prismaService.auth.findFirst({
          where: { userId: decodedToken.userId },
        });
      if (userAuthInfo?.password?.length === 0) {
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
      throw new Error(error as string);
    }
  }
  async changePasswordRoute(req: Request, res: Response) {
    const { currentPassword, newPassword, confirmNewPassword } = req.body;
    try {
      if (newPassword === confirmNewPassword) {
        const token: string = req.header("token")!;
        const decodedToken = decodeToken(token);
        const userAuth: UserAuthInfoTypes | null =
          await prismaService.auth.findFirst({
            where: { userId: decodedToken?.userId },
          });
        if (userAuth?.password) {
          const isPasswordValid: boolean = await passwordValidator(
            currentPassword,
            userAuth?.password
          );
          if (isPasswordValid) {
            const hashedPassword: string = await hashPassword(newPassword);
            await prismaService.auth.update({
              data: {
                password: hashedPassword,
              },
              where: {
                userId: userAuth.userId,
              },
            });
            res.status(200).json({
              message: "Updated",
              statusCode: 200,
              response: "Your password was successfully changed.",
            });
          } else
            res.status(401).json({
              message: "bad",
              statusCode: 401,
              response: "Your current password is incorrect",
            });
        } else {
          res.status(400).json({
            message: "bad",
            statusCode: 400,
            response:
              "Your current password is not set. Please set a new password to continue.",
          });
        }
      } else {
        res.status(400).json({
          message: "bad",
          statusCode: 400,
          response: "The new password does not match.",
        });
      }
    } catch (error) {
      throw new Error(error as string);
    }
  }
  async getUserInfo(req: Request, res: Response): Promise<void> {
    const query = req.query;

    let filteroption: { [key: string]: boolean } = {};

    for (let key in query) {
      if (query[key] === "true") {
        filteroption[key] = true;
      } else {
        filteroption = {};
      }
    }

    if (Object.keys(filteroption).length === 0) {
      filteroption = {
        userId: true,
        firstName: true,
        lastName: true,
        image: true,
        email: true,
        phone: true,
        createdAt: true,
      };
    }

    try {
      const token: string = req.header("token") as string;
      const decodedToken: { userId: string } = decodeToken(token)!;

      const user: UserInfoTypes | null = await prismaService.users.findUnique({
        where: { userId: decodedToken.userId },
        select: filteroption,
      });

      res.status(200).json({ message: "ok", statusCode: 200, user });
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      } else {
        console.error(error);
      }
    }
  }
})();
