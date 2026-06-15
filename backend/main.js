import express from "express";
import "dotenv/config";
import cors from "cors";
import { connectToDB } from "./src/configs/db.js";
import teamRoutes from "./src/routes/teamRoutes.js";
import collectionRoutes from "./src/routes/collectionRoutes.js";

const app = express();
await connectToDB();

app.use(cors({
    origin: process.env.CLIENT_URL
}));
app.use(express.json());

app.use("/api/teams", teamRoutes);
app.use("/api/collections", collectionRoutes);


app.get("/", (req, res) => {
    res.send("Hello World");
})



app.listen(3000, () => {
    console.log("server has started on http://localhost:3000");
})
