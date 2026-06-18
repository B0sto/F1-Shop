import discountModel from "../models/discountModel.js";

export const getAllDiscounts = async () => {
    return discountModel.find().sort({ createdAt: 1, _id: 1 });
};

export const getDiscountById = async (id) => {
    return discountModel.findById(id);
};

export const createDiscount = async (data) => {
    return discountModel.create(data);
};

export const updateDiscountById = async (id, data) => {
    return discountModel.findByIdAndUpdate(id, data, {
        new: true,
        runValidators: true,
    });
};

export const deleteDiscount = async (id) => {
    return discountModel.findByIdAndDelete(id);
};
