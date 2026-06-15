import mongoose from "mongoose";

const driverSchema = new mongoose.Schema(
    {
        imgSrc: {
            type: String,
            required: true,
        },

        name: {
            type: String,
            required: true,
        },

        desc: {
            type: String,
            default: "",
        },

        team: {
            type: String,
            required: true,
        },
    },
    {
        _id: false,
    }
);

const productSchema = new mongoose.Schema(
    {
        imgSrc: {
            type: String,
            required: true,
        },

        name: {
            type: String,
            required: true,
        },

        price: {
            type: Number,
            required: true,
            min: 0,
        },
    },
    {
        _id: false,
    }
);

const collectionSchema = new mongoose.Schema(
    {
        driver: {
            type: driverSchema,
            required: true,
        },

        products: {
            type: [productSchema],
            default: [],
        },
    },
    {
        timestamps: true,
    }
);

export default mongoose.model("Collection", collectionSchema);
