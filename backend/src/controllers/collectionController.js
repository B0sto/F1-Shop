import {
    addProductToCollection,
    createCollection as createCollectionService,
    deleteCollectionById,
    deleteProductByProductId,
    getAllCollections,
    getDriverByCollectionId,
    getProductsByCollectionId,
    updateDriverByCollectionId,
    updateProductByProductId,
} from "../services/collectionService.js";

export const getCollections = async (req, res) => {
    try {
        const collections = await getAllCollections();

        res.status(200).json({
            success: true,
            data: collections,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

export const getCollectionDriver = async (req, res) => {
    try {
        const collection = await getDriverByCollectionId(req.params.id);

        if (!collection) {
            return res.status(404).json({
                success: false,
                message: "Collection not found",
            });
        }

        res.status(200).json({
            success: true,
            data: collection.driver,
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message,
        });
    }
};

export const getCollectionProducts = async (req, res) => {
    try {
        const collection = await getProductsByCollectionId(req.params.id);

        if (!collection) {
            return res.status(404).json({
                success: false,
                message: "Collection not found",
            });
        }

        res.status(200).json({
            success: true,
            data: collection.products,
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message,
        });
    }
};

export const createCollection = async (req, res) => {
    try {
        const collection = await createCollectionService(req.body);

        res.status(201).json({
            success: true,
            data: collection,
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message,
        });
    }
};

export const updateCollectionDriver = async (req, res) => {
    try {
        const collection = await updateDriverByCollectionId(req.params.id, req.body);

        if (!collection) {
            return res.status(404).json({
                success: false,
                message: "Collection not found",
            });
        }

        res.status(200).json({
            success: true,
            data: collection.driver,
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message,
        });
    }
};

export const updateCollectionProduct = async (req, res) => {
    try {
        const collection = await updateProductByProductId(req.params.productId, req.body);

        if (!collection) {
            return res.status(404).json({
                success: false,
                message: "Product not found",
            });
        }

        const product = collection.products.id(req.params.productId);

        res.status(200).json({
            success: true,
            data: product,
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message,
        });
    }
};

export const addCollectionProduct = async (req, res) => {
    try {
        const collection = await addProductToCollection(req.params.id, req.body);

        if (!collection) {
            return res.status(404).json({
                success: false,
                message: "Collection not found",
            });
        }

        res.status(201).json({
            success: true,
            data: collection.products[collection.products.length - 1],
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message,
        });
    }
};

export const deleteCollection = async (req, res) => {
    try {
        const collection = await deleteCollectionById(req.params.id);

        if (!collection) {
            return res.status(404).json({
                success: false,
                message: "Collection not found",
            });
        }

        res.status(200).json({
            success: true,
            data: collection,
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message,
        });
    }
};

export const deleteCollectionProduct = async (req, res) => {
    try {
        const collection = await deleteProductByProductId(req.params.productId);

        if (!collection) {
            return res.status(404).json({
                success: false,
                message: "Product not found",
            });
        }

        res.status(200).json({
            success: true,
            data: collection,
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message,
        });
    }
};
