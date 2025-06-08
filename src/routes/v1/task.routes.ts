import { Router } from "express";
import { createTask, getTasks } from "../../controllers/task.controller";
import { authMiddleware } from "@/middlewares/auth.middleware";

const router = Router();

router.use(authMiddleware);

router.get("/", getTasks);
router.post("/", createTask);

export default router;
