import express from "express";
import "dotenv/config";
import cors from "cors";
import { connectToDB } from "./src/configs/db.js";
import teamRoutes from "./src/routes/teamRoutes.js";
import collectionRoutes from "./src/routes/collectionRoutes.js";
import discountRoutes from "./src/routes/discountRoutes.js"
import vintageRoutes from "./src/routes/vintageRoutes.js";
import authRoutes from "./src/routes/authRoutes.js"
import cartRoutes from "./src/routes/cartRoutes.js";
import orderRoutes from "./src/routes/orderRoutes.js"
import cookieParser from "cookie-parser";

const app = express();
await connectToDB();

app.use(cors({
    origin: [process.env.CLIENT_URL, "http://localhost:5173", "http://192.168.0.5:5173"],
    credentials: true
}));

app.use(cookieParser());
app.use(express.json());

app.use("/api/teams", teamRoutes);
app.use("/api/collections", collectionRoutes);
app.use("/api/discounts", discountRoutes);
app.use("/api/vintages", vintageRoutes);

app.use("/api/orders", orderRoutes)


app.use("/api/auth", authRoutes);
app.use("/api/cart", cartRoutes);


app.get("/", (req, res) => {
    res.send("Hello World");
})



app.listen(3000, "0.0.0.0", () => {
    console.log("Server started");
});
