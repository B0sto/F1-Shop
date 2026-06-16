import discountModel from "../models/discountModel.js";

export const getDiscounts = async (req, res) => {
    try {
        const discounts = await discountModel.find().sort({ createdAt: 1, _id: 1 });
        res.status(200).json({
            success: true,
            data: discounts
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        })
    }
};


export const createDiscount = async (req, res) => {
    try {
        const discount = await discountModel.create(req.body);
        res.status(201).json({
            success: true,
            data: discount
        })
    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message
        })
    }
}
