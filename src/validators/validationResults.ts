import { validationResult } from "express-validator";
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
    const filteredMessage: FilterMessageTypes = errorMessage.map(
      (error: any) => {
        return { field: error.path, message: error.msg };
      }
    );
    res.status(400).json({
      message: "Validaion error!",
      statusCode: 400,
      response: filteredMessage,
    });
  } else {
    next();
  }
}
interface FilterMessageTypes {
  field: string;
  message: string;
}