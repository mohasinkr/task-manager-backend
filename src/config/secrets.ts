import dotenv from "dotenv";

dotenv.config();

const MONGODB_URL = process.env.MONGODB_URL || "";
const JWT_SECRET = process.env.JWT_SECRET || "";

export { MONGODB_URL, JWT_SECRET };
