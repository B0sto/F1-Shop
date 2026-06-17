import mongoose from "mongoose";

const vintageSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,

    },
    imgSrc: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    }
}, {
    timestamps: true
})

export default mongoose.model("vintage", vintageSchema);