import { validationResult } from "express-validator";
import {
  AuthValidationErrorTypes,
  AuthValidationResponseTypes,
} from "../interfaces/auth.interface";

import { NextFunction, Request, Response } from "express";

export default function validationResults(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const result = validationResult(req);
  if (!result.isEmpty()) {
    const errors = result.array();
    let errorMessage: any = [];
    errors.forEach((err: any) => {
      errorMessage.push(err);
    });
    const filteredMessage: AuthValidationErrorTypes[] = errorMessage.map(
      (error: any) => {
        return { field: error.path, erroror: error.msg };
      }
    );
    const response: AuthValidationResponseTypes = {
      message: "Validaion error!",
      statusCode: 400,
      response: filteredMessage,
    };
    res.status(400).json(response);
  } else {
    next();
  }
}
