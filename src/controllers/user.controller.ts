import { BadRequestError, NotFoundError } from "@/exceptions/error";
import User from "@/models/User";
import { generateAuthToken, validatePassword } from "@/services/auth.service";
import {
  createUserService,
  getUserByUsernameOrEmail,
} from "@/services/user.service";
import { successResponse } from "@/utils/http-response";
import { Request, Response } from "express";

async function getUsers(_req: Request, res: Response) {
  try {
    const users = await User.find();
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: "Internal Server Error" });
  }
}

async function createUser(req: Request, res: Response) {
  const { username, email, password } = req.body;

  if (!username || !email || !password) {
    throw new BadRequestError(
      "All fields (username, email, password) are required."
    );
  }

  try {
    const user = await createUserService({
      username,
      email,
      password,
    });
    // Omit sensitive data like password before responding
    const safeUser = {
      id: user._id,
      username: user.username,
      email: user.email,
      createdAt: user.createdAt,
    };
    res
      .status(201)
      .json(successResponse(safeUser, "User created successfully."));
  } catch (err) {
    throw new BadRequestError("username or email already exists.");
  }
}

const loginUser = async (req: Request, res: Response) => {
  const { identifier, password } = req.body;

  if (!identifier || !password) {
    throw new BadRequestError("Username/email and password are required");
  }

  try {
    const user = await getUserByUsernameOrEmail(identifier);

    if (!user) {
      throw new NotFoundError("User not found");
    }

    await validatePassword(password, user.password);

    const token = generateAuthToken({
      id: user._id,
      username: user.username,
      email: user.email,
    });

    res.json(successResponse({ token }, "Login successful"));
  } catch (error) {
    throw error;
  }
};

export { createUser, getUsers, loginUser };
