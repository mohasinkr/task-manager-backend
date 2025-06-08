import type { IUser } from "@/models/User";
import type { Types } from "mongoose";

export type CreateUserDto = Pick<IUser, "username" | "email" | "password">;

export type TokenPayload = {
  id: Types.ObjectId;
  username: string;
  email: string;
};