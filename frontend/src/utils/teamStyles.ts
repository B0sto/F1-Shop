export type TeamVariant = "ferrari" | "mercedes";

export const getTeamVariant = (team: string): TeamVariant => {
    const normalizedTeam = team.toLowerCase();

    if (normalizedTeam.includes("mercedes")) return "mercedes";

    return "ferrari";
};

export const teamTextColorClasses: Record<TeamVariant, string> = {
    ferrari: "text-[#680004]",
    mercedes: "text-[#005871]",
};
