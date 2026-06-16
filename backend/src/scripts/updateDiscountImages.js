import mongoose from "mongoose";
import dotenv from "dotenv";
import discountModel from "../models/discountModel.js";

dotenv.config({
    path: new URL("../../.env", import.meta.url),
});

const S3_URL = "https://f1shop.s3.eu-central-1.amazonaws.com";

const toS3Url = (imagePath) => {
    if (!imagePath) return imagePath;

    const baseUrl = S3_URL.replace(/\/$/, "");
    const imageName = imagePath.split("/").pop();

    return `${baseUrl}/discounts/${imageName}`;
};

const updateDiscountImages = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);

        const discounts = await discountModel.find();

        let updatedCount = 0;

        for (const discount of discounts) {
            const nextImage = toS3Url(discount.imgSrc);

            if (nextImage !== discount.imgSrc) {
                discount.imgSrc = nextImage;
                await discount.save();
                updatedCount += 1;
            }
        }

        console.log(
            `Discount images updated successfully. Updated ${updatedCount} discounts.`
        );
    } catch (error) {
        console.error("Error updating discount images:", error);
        process.exitCode = 1;
    } finally {
        await mongoose.disconnect();
    }
};

updateDiscountImages();