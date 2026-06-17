import vintageModel from "../models/vintageModel.js";

export const getAllVintages = async () => {
    return vintageModel.find().sort({ createdAt: 1, _id: 1 });
}

export const getVintageById = async (id) => {
    return vintageModel.findById(id);
}

export const createVintage = async (data) => {
    return vintageModel.create(data);
}

export const updateVintageById = async (id, data) => {
    return vintageModel.findByIdAndUpdate(id, data, {
        new: true,
        runValidators: true
    });
}

export const deleteVintageById = async (id) => {
    return vintageModel.findByIdAndDelete(id);
}
