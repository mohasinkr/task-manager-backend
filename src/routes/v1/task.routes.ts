import { Router } from "express";
import { getTasks, createTask } from "../../controllers/task.controller";
import { getUsers, createUser } from "../../controllers/user.controller";

const router = Router();

router.get("/tasks", getTasks);
router.post("/task", createTask);

export default router;
