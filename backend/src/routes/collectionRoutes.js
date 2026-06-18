import express from "express";
import {
    addCollectionProduct,
    createCollection,
    deleteCollection,
    deleteCollectionProduct,
    getCollectionDriver,
    getCollectionProducts,
    getCollections,
    updateCollectionDriver,
    updateCollectionProduct,
} from "../controllers/collectionController.js";

const router = express.Router();

router.get("/", getCollections);
router.post("/", createCollection);
router.get("/:id/driver", getCollectionDriver);
router.get("/:id/products", getCollectionProducts);
router.patch("/:id/driver", updateCollectionDriver);
router.post("/:id/products", addCollectionProduct);
router.patch("/products/:productId", updateCollectionProduct);
router.delete("/products/:productId", deleteCollectionProduct);
router.delete("/:id", deleteCollection);

export default router;
