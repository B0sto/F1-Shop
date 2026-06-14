import express from "express";
import "dotenv/config";
import cors from "cors";
import { connectToDB } from "./configs/db.js";
import teamRoutes from "./routes/teamRoutes.js";

const app = express();
await connectToDB();

app.use(cors({
    origin: process.env.CLIENT_URL
}));
app.use(express.json());

app.use("/api/teams", teamRoutes);


app.get("/", (req, res) => {
    res.send("Hello World");
})



app.listen(3000, () => {
    console.log("server has started on http://localhost:3000");
})
