import {
    createTeam as createTeamService,
    deleteTeam as deleteTeamService,
    getTeamById,
    getTeams as getTeamsService,
    updateTeam as updateTeamService,
} from "../services/teamServices.js";

export const getTeams = async (req, res) => {
    try {
        const teams = await getTeamsService();

        res.status(200).json({
            success: true,
            data: teams,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

export const getTeam = async (req, res) => {
    try {
        const team = await getTeamById(req.params.id);

        if (!team) {
            return res.status(404).json({
                success: false,
                message: "Team not found",
            });
        }

        res.status(200).json({
            success: true,
            data: team,
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message,
        });
    }
};

export const createTeam = async (req, res) => {
    try {
        const team = await createTeamService(req.body);

        res.status(201).json({
            success: true,
            data: team,
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message,
        });
    }
};

export const updateTeam = async (req, res) => {
    try {
        const team = await updateTeamService(req.params.id, req.body);

        if (!team) {
            return res.status(404).json({
                success: false,
                message: "Team not found",
            });
        }

        res.status(200).json({
            success: true,
            data: team,
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message,
        });
    }
};

export const deleteTeam = async (req, res) => {
    try {
        const team = await deleteTeamService(req.params.id);

        if (!team) {
            return res.status(404).json({
                success: false,
                message: "Team not found",
            });
        }

        res.status(200).json({
            success: true,
            data: team,
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message,
        });
    }
};
