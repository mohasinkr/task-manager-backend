import express from "express";
import type { Express, Request, Response } from "express";

const app: Express = express();

const PORT = process.env.PORT || 3000;

app.get("/", (req: Request, res: Response) => {
  res.json({
    message: "hello world!",
  });
});

app.listen(3000, () => {
  console.log(`Backend is running on port ${PORT}`);
});
