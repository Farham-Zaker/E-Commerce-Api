import {
  Router,
  ErrorRequestHandler,
  Request,
  Response,
  NextFunction,
} from "express";

function errorHandler(
  error: ErrorRequestHandler,
  req: Request,
  res: Response,
  next: NextFunction
): void {
  res.status(500).send({
    message: "Internal Server Error",
    statusCode: 500,
    response: error,
  });
  console.error(error);
}

export default errorHandler;
