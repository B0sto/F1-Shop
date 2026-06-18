import express from "express";
import {
    createDiscount,
    deleteDiscount,
    getDiscount,
    getDiscounts,
    updateDiscount,
} from "../controllers/discountController.js";


const router = express.Router();

router.get("/", getDiscounts);
router.post("/", createDiscount);
router.get("/:id", getDiscount);
router.patch("/:id", updateDiscount);
router.delete("/:id", deleteDiscount);

export default router;
