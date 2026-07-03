import express from "express";
import {
    getMe,
    login,
    logout,
    refresh,
    register,
    updateMe,
    deleteMe
} from "../controllers/authController.js";

import {authGuard} from "../middlewares/authMiddleware.js";
import {uploadAvatar} from "../middlewares/upload.js";

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.post("/refresh", refresh);
router.post("/logout", logout);

router.get("/me", authGuard, getMe);
router.put("/me", authGuard, uploadAvatar, updateMe);
router.delete("/me", authGuard, deleteMe);

export default router;