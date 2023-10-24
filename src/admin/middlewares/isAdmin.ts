import { NextFunction, Request, Response } from "express";
import decodeToken from "../../util/decodeToekn";
import prismaService from "../../prisma/prismaService";

async function isAdmin(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<Response<any, Record<string, any>> | void> {
  const token: string = req.header("token")!;
  const decodedToken = decodeToken(token);

  const errorMessage = {
    message: "bad",
    statusCode: 401,
    response: "Your token is expired or invalid.",
  };

  if (!decodedToken) {
    return res.status(401).json(errorMessage);
  }

  const user: { isAdmin: number } | null = await prismaService.auth.findFirst({
    where: {
      userId: decodedToken?.userId,
    },
    select: {
      isAdmin: true,
    },
  });

  if (!user) {
    res.status(404).json(errorMessage);
  }

  if (!user?.isAdmin) {
    return res.status(401).json({
      message: "Failed",
      statusCode: 401,
      response: "Your are not admin.",
    });
  }

  next();
}

export default isAdmin;
