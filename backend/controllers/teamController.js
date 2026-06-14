import teamModel from "../models/teamModel.js";

export const getTeams = async (req, res) => {
    try {
        const teams = await teamModel.find();

        res.status(200).json({
            success: true,
            data: teams
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        })
    }
}

export const createTeam = async (req, res) => {
    try {
        const team = await teamModel.create(req.body);

        res.status(201).json({
            success: true,
            data: team
        })
    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message
        })
    }
}
