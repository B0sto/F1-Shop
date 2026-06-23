import express from "express";
import { getMe, login, logout, refresh, register } from "../controllers/authController.js";
import { authGuard } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.post("/login", login);
router.post("/register", register);
router.get("/me", authGuard, getMe)
router.post("/refresh", refresh);
router.post("/logout", logout);

export default router;