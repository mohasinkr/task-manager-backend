import express from "express";
import type { Express, Request, Response } from "express";
import v1Router from "./routes/v1/v1.routes";
import { connectDB } from "./config/db-connection";
import { errorMiddleware } from "./middlewares/error.middleware";

const app: Express = express();

const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (_req: Request, res: Response) => {
  res.send("Hello World!");
});

app.use("/api/v1/", v1Router);

app.use(errorMiddleware);

app.listen(PORT, () => {
  console.log(`Backend is running on port ${PORT}`);
  connectDB();
});
