import mongoose from "mongoose";
import { MONGODB_URL } from "./secrets";

export async function connectDB() {
  try {
    await mongoose.connect(MONGODB_URL);
    console.log("Connected to MongoDB");
  } catch (err) {
    console.error(err);
  }
}
