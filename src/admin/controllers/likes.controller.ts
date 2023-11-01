import { Request, Response } from "express";
import prismaService from "../../prisma/prismaService";
import { LikeTypes } from "../interfaces/likes.interface";
import { Prisma } from "@prisma/client";

export default new (class {
  async addToLikes(
    req: Request,
    res: Response
  ): Promise<Response<any, Record<string, any>>> {
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
      console.error(error);
      return res.status(500).json({
        message: "Success",
        statusCode: 500,
        response:
          "An error occurred while creating adding product to likes list.",
      });
    }
  }

  async getAllLikes(req: Request, res: Response): Promise<void> {
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
      console.error(error);
      res.status(500).json({
        message: "Success",
        statusCode: 500,
        response: "An error occurred while adding product to likes list.",
      });
    }
  }
  async getLikeById(req: Request, res: Response): Promise<void> {
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
      console.error(error);
      res.status(500).json({
        message: "Success",
        statusCode: 500,
        response: "An error occurred while adding product to likes list.",
      });
    }
  }
})();
