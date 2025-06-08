import { createUser, loginUser } from "@/controllers/user.controller";
import { Router } from "express";

const router = Router();

router.post("/login", loginUser);
router.post("/signup", createUser);

export default router;
