import {
    createDiscount as createDiscountService,
    deleteDiscount as deleteDiscountService,
    getAllDiscounts,
    getDiscountById,
    updateDiscountById,
} from "../services/discountService.js";

export const getDiscounts = async (req, res) => {
    try {
        const discounts = await getAllDiscounts();

        res.status(200).json({
            success: true,
            data: discounts,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};


export const getDiscount = async (req, res) => {
    try {
        const discount = await getDiscountById(req.params.id);

        if (!discount) {
            return res.status(404).json({
                success: false,
                message: "Discount not found",
            });
        }

        res.status(200).json({
            success: true,
            data: discount,
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message,
        });
    }
};


export const createDiscount = async (req, res) => {
    try {
        const discount = await createDiscountService(req.body);

        res.status(201).json({
            success: true,
            data: discount,
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message,
        });
    }
};


export const updateDiscount = async (req, res) => {
    try {
        const discount = await updateDiscountById(req.params.id, req.body);

        if (!discount) {
            return res.status(404).json({
                success: false,
                message: "Discount not found",
            });
        }

        res.status(200).json({
            success: true,
            data: discount,
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message,
        });
    }
};


export const deleteDiscount = async (req, res) => {
    try {
        const discount = await deleteDiscountService(req.params.id);

        if (!discount) {
            return res.status(404).json({
                success: false,
                message: "Discount not found",
            });
        }

        res.status(200).json({
            success: true,
            data: discount,
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message,
        });
    }
};
