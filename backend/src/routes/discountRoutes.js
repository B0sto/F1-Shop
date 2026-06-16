import express from "express";
import { createDiscount, getDiscounts } from "../controllers/discountController.js";


const router = express.Router();

router.get("/", getDiscounts);
router.post("/", createDiscount);

export default router;
