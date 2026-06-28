import mongoose from "mongoose";

const cartItemSchema = new mongoose.Schema(
    {
        productId: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
        },
        source: {
            type: String,
            enum: ["collection", "vintage", "discount"],
            required: true,
        },
        name: {
            type: String,
            required: true,
            trim: true,
        },
        image: {
            type: String,
            required: true,
        },
        size: {
            type: String,
            default: "One Size",
        },
        quantity: {
            type: Number,
            required: true,
            default: 1,
            min: 1,
        },
        unitPrice: {
            type: Number,
            required: true,
            min: 0,
        },
        totalPrice: {
            type: Number,
            required: true,
            min: 0,
        },
        selected: {
            type: Boolean,
            default: true,
        },
    },
    {
        timestamps: true,
    }
);

const cartSchema = new mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
            unique: true,
            index: true,
        },
        items: {
            type: [cartItemSchema],
            default: [],
        },
        subtotal: {
            type: Number,
            default: 0,
            min: 0,
        },
    },
    {
        timestamps: true,
    }
);

cartSchema.pre("save", function () {
    this.items.forEach((item) => {
        item.totalPrice = item.unitPrice * item.quantity;
    });

    this.subtotal = this.items
        .filter((item) => item.selected)
        .reduce((sum, item) => sum + item.totalPrice, 0);
});

export default mongoose.model("Cart", cartSchema);
