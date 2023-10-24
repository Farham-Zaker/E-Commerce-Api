import jwt, { verify, JwtPayload, Secret } from "jsonwebtoken";
import { RequestHandler, Request, Response, NextFunction } from "express";
import decodeToken from "../util/decodeToekn";

interface ErrorResponseTypes {
  message: string;
  statusCode: number;
  response: string;
}

const isLogged: RequestHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token: string = req.header("token")!;

  const errorResponse: ErrorResponseTypes = {
    message: "bad",
    statusCode: 401,
    response: "Your token is expired or invalid.Login again.",
  };

  if (token) {
    const decodedToken = decodeToken(token);

    if (decodedToken) {
      next();
    } else {
      res.status(401).json(errorResponse);
    }
  } else {
    res.status(401).json(errorResponse);
  }
};

export default isLogged;
