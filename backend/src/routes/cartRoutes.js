import express from "express";
import {
    addCartItem,
    clearCart,
    deleteCartItem,
    getMyCart,
    updateCartItem,
} from "../controllers/cartController.js";
import { authGuard } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.get("/", authGuard, getMyCart);
router.post("/", authGuard, addCartItem);
router.post("/items", authGuard, addCartItem);
router.patch("/items/:itemId", authGuard, updateCartItem);
router.delete("/items/:itemId", authGuard, deleteCartItem);
router.delete("/", authGuard, clearCart);

export default router;
