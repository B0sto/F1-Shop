import express from "express";
import {
    createVintage,
    deleteVintage,
    getVintage,
    getVintages,
    updateVintage
} from "../controllers/vintageController.js";

const router = express.Router();

router.get("/", getVintages);
router.post("/", createVintage);
router.get("/:id", getVintage);
router.put("/:id", updateVintage);
router.delete("/:id", deleteVintage);

export default router;
