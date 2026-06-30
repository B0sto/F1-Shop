import express from "express";
import {
    checkout,
    getOrderById,
    getOrders,
    getRecentOrders,
} from "../controllers/orderController.js";
import { authGuard } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.use(authGuard);

router.post("/checkout", checkout);
router.get("/recent", getRecentOrders);
router.get("/", getOrders);
router.get("/:id", getOrderById);

export default router;