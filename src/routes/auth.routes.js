import express from "express";
import { signup, login, profile } from "../controllers/auth.controller.js";
import { authGuard } from "../middleware/auth.middleware.js";

const router = express.Router();

router.post("/signup", signup);
router.post("/login", login);
router.get("/me", authGuard, profile);

export default router;
