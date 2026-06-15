import collectionModel from "../models/collectionModel.js";

export const getCollections = async (req, res) => {
    try {
        const collections = await collectionModel.find();
        res.status(200).json({
            success: true,
            data: collections
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        })
    }
}


export const createCollection = async (req, res) => {
    try {
        const collection = await collectionModel.create(req.body);
        res.status(201).json({
            success: true,
            data: collection
        })
    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message
        })
    }
}
