import { Request, Response, NextFunction } from "express";
import prismaService from "../../prisma/prismaService";
import { LikeTypes } from "../interfaces/likes.interface";
import { Prisma } from "@prisma/client";

export default new (class {
  async addToLikes(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response<any, Record<string, any>> | void> {
    const { userId, productId } = req.body;
    try {
      const like: boolean = !!(await prismaService.likes.findFirst({
        where: {
          userId,
          productId,
        },
        select: {
          likeId: true,
        },
      }));
      if (like) {
        return res.status(409).json({
          message: "Failed",
          statusCode: 409,
          response: "There is already a liked item with such specification.",
        });
      }

      await prismaService.likes.create({
        data: {
          userId,
          productId,
        },
      });
      return res.status(201).json({
        message: "Success",
        statusCode: 201,
        response: "Desire product was added to likes successfuly.",
      });
    } catch (error) {
      next(error);
    }
  }

  async getAllLikes(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    const { user, product } = req.query;

    let include: Prisma.likesInclude = {};
    if (user === "true") {
      include = { user: true };
    }
    if (product === "true") {
      include = { ...include, product: true };
    }

    try {
      const likes: LikeTypes[] = await prismaService.likes.findMany({
        include,
      });
      res.status(200).json({
        message: "Success",
        statusCode: 200,
        likes,
      });
    } catch (error) {
      next(error);
    }
  }
  async getLikeById(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    const likeId: string = req.params.id;

    const { user, product } = req.query;

    let include: Prisma.likesInclude = {};
    if (user === "true") {
      include = { user: true };
    }
    if (product === "true") {
      include = { ...include, product: true };
    }

    try {
      const likes: LikeTypes | null = await prismaService.likes.findFirst({
        include,
        where: {
          likeId,
        },
      });
      res.status(200).json({
        message: "Success",
        statusCode: 200,
        likes,
      });
    } catch (error) {
      next(error);
    }
  }
  async updateLikes(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    const { likeId, userId, productId } = req.body;
    try {
      await prismaService.likes.update({
        data: {
          productId,
          userId,
        },
        where: {
          likeId,
        },
      });
      res.status(200).json({
        message: "Success",
        statusCode: 200,
        response: "Desire liked item was updated successfuly.",
      });
    } catch (error) {
      next(error);
    }
  }
  async deleteLike(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    const likeId: string = req.params.likeId;
    try {
      await prismaService.likes.delete({
        where: {
          likeId,
        },
      });
      res.status(200).json({
        message: "Success",
        statusCode: 200,
        response: "Desire liked item was deleted successfuly.",
      });
    } catch (error) {
      next(error);
    }
  }
})();
