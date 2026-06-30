import mongoose from "mongoose";

const orderItemSchema = new mongoose.Schema(
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
    },
    {
        _id: false,
    }
);

const customerSchema = new mongoose.Schema(
    {
        fullName: {
            type: String,
            required: true,
            trim: true,
        },
        phone: {
            type: String,
            required: true,
            trim: true,
        },
        email: {
            type: String,
            required: true,
            trim: true,
            lowercase: true,
        },
        location: {
            type: String,
            required: true,
            trim: true,
        },
    },
    {
        _id: false,
    }
);

const paymentSchema = new mongoose.Schema(
    {
        cardLast4: {
            type: String,
            required: true,
            minlength: 4,
            maxlength: 4,
        },
    },
    {
        _id: false,
    }
);

const orderSchema = new mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
            index: true,
        },
        items: {
            type: [orderItemSchema],
            required: true,
            validate: {
                validator: (items) => items.length > 0,
                message: "Order must contain at least one item",
            },
        },
        customer: {
            type: customerSchema,
            required: true,
        },
        payment: {
            type: paymentSchema,
            required: true,
        },
        subtotal: {
            type: Number,
            required: true,
            min: 0,
        },
        shipping: {
            type: Number,
            required: true,
            default: 10,
            min: 0,
        },
        total: {
            type: Number,
            required: true,
            min: 0,
        },
        status: {
            type: String,
            enum: ["paid", "cancelled"],
            default: "paid",
        },
    },
    {
        timestamps: true,
    }
);

orderSchema.pre("validate", function () {
    this.items.forEach((item) => {
        item.totalPrice = item.unitPrice * item.quantity;
    });

    this.subtotal = this.items.reduce((sum, item) => sum + item.totalPrice, 0);
    this.total = this.subtotal + this.shipping;
});

export default mongoose.model("Order", orderSchema);