import mongoose from "mongoose";

const discountSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    imgSrc: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true,
    },
    discount: {
        type: Number,
        required: true,
    },
    sizes: {
        type: [String],
        required: true
    }

}, {
    timestamps: true,
});

export default mongoose.model("Discount", discountSchema);