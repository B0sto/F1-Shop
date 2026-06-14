import express from "express";
import { createTeam, getTeams } from "../controllers/teamController.js";

const router = express.Router();

router.get("/", getTeams);
router.post("/", createTeam);

export default router;
