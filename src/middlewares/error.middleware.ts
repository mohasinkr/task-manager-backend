import { Request, Response, NextFunction } from "express";
import { AppError } from "@/exceptions/error";
import { errorResponse } from "@/utils/http-response";

export const errorMiddleware = (
  err: Error | AppError,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const status = err instanceof AppError ? err.statusCode : 500;
  const message = err.message || "Internal Server Error";

  res.status(status).json(errorResponse(message, status));
};
