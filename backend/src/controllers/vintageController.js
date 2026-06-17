import {
    createVintage as createVintageService,
    deleteVintageById,
    getAllVintages,
    getVintageById,
    updateVintageById
} from "../services/vintageService.js";

export const getVintages = async (req, res) => {
    try {
        const vintages = await getAllVintages();
        res.status(200).json({
            success: true,
            data: vintages
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        })
    }
}

export const getVintage = async (req, res) => {
    try {
        const vintage = await getVintageById(req.params.id);

        if (!vintage) {
            return res.status(404).json({
                success: false,
                message: "Vintage not found"
            })
        }

        res.status(200).json({
            success: true,
            data: vintage
        })
    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message
        })
    }
}

export const createVintage = async (req, res) => {
    try {
        const vintage = await createVintageService(req.body);
        res.status(201).json({
            success: true,
            data: vintage
        })
    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message
        })
    }
}

export const updateVintage = async (req, res) => {
    try {
        const vintage = await updateVintageById(req.params.id, req.body);

        if (!vintage) {
            return res.status(404).json({
                success: false,
                message: "Vintage not found"
            })
        }

        res.status(200).json({
            success: true,
            data: vintage
        })
    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message
        })
    }
}

export const deleteVintage = async (req, res) => {
    try {
        const vintage = await deleteVintageById(req.params.id);

        if (!vintage) {
            return res.status(404).json({
                success: false,
                message: "Vintage not found"
            })
        }

        res.status(200).json({
            success: true,
            data: vintage
        })
    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message
        })
    }
}
