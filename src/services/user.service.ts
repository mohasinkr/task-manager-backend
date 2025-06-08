import User from "@/models/User";
import bcrypt from "bcrypt";
import { CreateUserDto } from "@/types/user.types";

async function createUserService(user: CreateUserDto) {
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(user.password, salt);

  const newUser = new User({
    username: user.username,
    email: user.email,
    password: hashedPassword,
  });
  
  return newUser.save();
}

const getUserByUsernameOrEmail = async (identifier: string) => {
  const isEmail = identifier.includes("@");

  const user = await User.findOne({
    [isEmail ? "email" : "username"]: identifier,
  });

  return user;
};

export { createUserService, getUserByUsernameOrEmail };
