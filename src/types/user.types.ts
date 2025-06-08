import type { IUser } from "@/models/User";

export type CreateUserDto = Pick<IUser, "username" | "email" | "password">;
