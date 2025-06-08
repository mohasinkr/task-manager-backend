import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { UnauthorizedError } from "@/exceptions/error";
import { JWT_SECRET } from "@/config/secrets";
import { TokenPayload } from "@/types/user.types";

export const validatePassword = async (
  plainPassword: string,
  hashedPassword: string
) => {
  const isMatch = await bcrypt.compare(plainPassword, hashedPassword);

  if (!isMatch) {
    throw new UnauthorizedError("Invalid credentials");
  }
};

export const generateAuthToken = (payload: TokenPayload) => {
  return jwt.sign({ payload }, JWT_SECRET, {
    expiresIn: "1h",
  });
};
