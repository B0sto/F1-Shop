import express from "express";
import { createCollection, getCollections } from "../controllers/collectionController.js";

const router = express.Router();

router.get("/", getCollections);
router.post("/", createCollection);

export default router;
