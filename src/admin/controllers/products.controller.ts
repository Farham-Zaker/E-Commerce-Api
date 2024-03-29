import { Request, Response, NextFunction } from "express";
import prismaService from "../../prisma/prismaService";
import {
  ProductDiscountPercentTypes,
  ProductTypes,
} from "../interfaces/products.interface";
import discountCalculator from "../../util/discountCalculator";
import getFinalPrice from "../../util/getFinalPrice";
import { UploadedFile } from "express-fileupload";
import { v4 as uuidv4 } from "uuid";
import path from "path";

export default new (class {
  async createProduct(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response<any, Record<string, any>> | void> {
    const {
      title,
      price,
      discountStatus,
      discountPercent,
      discountEndTime,
      categoryId,
    } = req.body;

    const isProductAvialable = !!(await prismaService.products.findFirst({
      where: {
        title,
      },
      select: {
        productId: true,
      },
    }));
    if (isProductAvialable) {
      return res.status(409).json({
        message: "Failed",
        statusCode: 406,
        response: "There is a product with such specification.",
      });
    }
    try {
      const product: ProductTypes = await prismaService.products.create({
        data: {
          title,
          price,
          discountStatus: discountStatus ? 1 : 0,
          discountPercent,
          discountEndTime,
          finalPrice: discountStatus
            ? discountCalculator(price, discountPercent)
            : price,
          categoryId,
        },
      });
      return res.status(201).json({
        message: "Success",
        statusCode: 201,
        response: "The product successfully was created.",
        product,
      });
    } catch (error) {
      next(error);
    }
  }
  async updateProduct(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response<any, Record<string, any>> | void> {
    const {
      productId,
      title,
      price,
      discountStatus,
      discountPercent,
      discountEndTime,
      categoryId,
    } = req.body;

    try {
      const product: ProductDiscountPercentTypes | null =
        await prismaService.products.findFirst({
          where: {
            productId,
          },
          select: {
            discountPercent: true,
          },
        });
      if (!product) {
        return res.status(404).json({
          message: "Failed",
          statusCode: 404,
          response: "There is no any product with such id.",
        });
      }

      const updateProduct: ProductTypes = await prismaService.products.update({
        data: {
          title,
          price,
          discountStatus: discountStatus ? 1 : 0,
          discountPercent: discountPercent || null,
          discountEndTime: discountEndTime || null,
          categoryId,
          finalPrice: getFinalPrice(
            discountStatus,
            product.discountPercent,
            discountPercent,
            price
          ),
        },
        where: {
          productId,
        },
      });

      res.status(200).json({
        message: "Success",
        statusCode: 200,
        response: "Desire product was updated successfully.",
        updateProduct,
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
    const { productId } = req.body;

    try {
      const product: ProductTypes | null =
        await prismaService.products.findFirst({
          where: {
            productId,
          },
        });
      if (!product) {
        return res.status(404).json({
          message: "Failed",
          statusCode: 404,
          response: "There is no ant product with such specification.",
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

      const uuid = uuidv4();

      const relativeDirOfImage: string = `./../../../src/upload/products/${uuid}-${product.title}.${extension}`;
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
            response: "Error uploading the image.",
          });
        }

        await prismaService.product_images.create({
          data: {
            imageId: uuid,
            imageUrl: absoluteDirOfImage,
            productId,
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
  async deleteImage(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response<any, Record<string, any>> | void> {
    const imageId = req.params.imageId;

    try {
      await prismaService.product_images.delete({
        where: {
          imageId,
        },
      });
      return res.status(200).json({
        message: "Success",
        statusCode: 200,
        response: "Desire image was deleted successfully.",
      });
    } catch (error) {
      next(error);
    }
  }
})();
