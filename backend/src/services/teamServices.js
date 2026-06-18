import teamModel from "../models/teamModel.js"


export const getTeams = async () => {
    return teamModel.find();
}


export const getTeamById = async (id) => {
    return teamModel.findById(id);
}


export const createTeam = async (data) => {
    return teamModel.create(data);
}


export const updateTeam = async (id, newData) => {
    return teamModel.findByIdAndUpdate(id, newData, {
        new: true,
        runValidators: true,
    });
};


export const deleteTeam = async (id) => {
    return teamModel.findByIdAndDelete(id);
}
