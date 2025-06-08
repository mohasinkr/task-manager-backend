import { JWT_SECRET } from "@/config/secrets";
import { UnauthorizedError } from "@/exceptions/error";
import { TokenPayload } from "@/types/user.types";
import { NextFunction, Request, Response } from "express";
import type { JwtPayload } from "jsonwebtoken";
import jwt from "jsonwebtoken";

export const authMiddleware = (
  req: Request,
  _res: Response,
  next: NextFunction
) => {
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) throw new UnauthorizedError("Missing auth token");

  try {
    const decoded = jwt.verify(token, JWT_SECRET) as JwtPayload;
    req.user = decoded.payload as TokenPayload;
    next();
  } catch (err) {
    throw new UnauthorizedError("Invalid token");
  }
};
