import mongoose from "mongoose";

const teamSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
        },

        carImage: {
            type: String,
            required: true,
        },

        description: {
            type: String,
            default: "",
        },

        drivers: {
            type: [String],
            default: [],
        },
    },
    {
        timestamps: true,
    }
);

export default mongoose.model("Team", teamSchema);