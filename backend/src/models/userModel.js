import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
    {
        username: {
            type: String,
            required: true,
            trim: true,
        },

        email: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            trim: true,
        },

        password: {
            type: String,
            required: true,
            select: false,
        },

        address: {
            type: String,
            trim: true,
            default: "",
        },

        avatar: {
            type: String,
            default: "",
        },
        totalSpent: {
            type: Number,
            default: 0
        }
    },
    {
        timestamps: true,
    }
);

export default mongoose.model("User", userSchema);