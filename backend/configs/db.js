import mongoose from "mongoose"

export const connectToDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log("Connected to Mongo DB");
    } catch (error) {
        console.log("Error with connecting to database", error);
    }
};