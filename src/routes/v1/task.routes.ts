import { authMiddleware } from "@/middlewares/auth.middleware";
import { Router } from "express";
import { createTask, deleteTask, getTasks, updateTask } from "../../controllers/task.controller";

const router = Router();

router.use(authMiddleware);

router.get("/", getTasks);
router.post("/", createTask);
router.patch("/:id", updateTask);
router.delete("/:id", deleteTask);

export default router;
