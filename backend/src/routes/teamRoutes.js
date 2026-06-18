import express from "express";
import {
    createTeam,
    deleteTeam,
    getTeam,
    getTeams,
    updateTeam,
} from "../controllers/teamController.js";

const router = express.Router();

router.get("/", getTeams);
router.post("/", createTeam);
router.get("/:id", getTeam);
router.patch("/:id", updateTeam);
router.delete("/:id", deleteTeam);

export default router;
