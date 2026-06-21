import express from "express";
import { getMe, login, register } from "../controllers/authController.js";
import { authGuard } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.post("/login", login);
router.post("/register", register);
router.get("/me", authGuard, getMe)

export default router;