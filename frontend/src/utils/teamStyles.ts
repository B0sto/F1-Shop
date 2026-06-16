export type TeamVariant = "ferrari"
  | "mercedes"
  | "redbull"
  | "mclaren"
  | "alpine"
  | "williams"
  | "haas"
  | "racingBulls"
  | "audi"
  | "astonMartin"
  | "cadillac"

type TeamClasses = {
    teamNameStyles: string
    teamDescStyles: string
    buttonStyles: string
}

export const getTeamVariant = (team: string): TeamVariant => {
    const normalizedTeam = team.toLowerCase();

    if (normalizedTeam.includes("mercedes")) return "mercedes";
    if (normalizedTeam.includes("red bull")) return "redbull";
    if (normalizedTeam.includes("mclaren")) return "mclaren";
    if (normalizedTeam.includes("alpine")) return "alpine";
    if (normalizedTeam.includes("williams")) return "williams";
    if (normalizedTeam.includes("haas")) return "haas";
    if (normalizedTeam.includes("racing bulls")) return "racingBulls";
    if (normalizedTeam.includes("audi")) return "audi";
    if (normalizedTeam.includes("aston martin")) return "astonMartin";
    if (normalizedTeam.includes("cadillac")) return "cadillac";

    return "ferrari";
};

export const teamClasses: Record<TeamVariant, TeamClasses> = {
    ferrari: {
        teamNameStyles: "text-[#AA1414]",
        teamDescStyles: "text-[#680004]",
        buttonStyles: "bg-[#AA1414] hover:bg-[#B54D4D]"
    },
    mercedes: {
        teamNameStyles: "text-[#005871]",
        teamDescStyles: "text-[#005871]",
        buttonStyles: "bg-[#005871] hover:bg-[#3A7484]"
    },
    redbull: {
        teamNameStyles: "text-[#3671C6]",
        teamDescStyles: "text-[#1E3F7A]",
        buttonStyles: "bg-[#1E41FF] hover:bg-[#4D67FF]"
    },
    mclaren: {
        teamNameStyles: "text-[#FF8000]",
        teamDescStyles: "text-[#FF9E3D]",
        buttonStyles: "bg-[#FF8000] hover:bg-[#D96C00]"
    },
    alpine: {
        teamNameStyles: "text-[#2293D1]",
        teamDescStyles: "text-[#FF87BC]",
        buttonStyles: "bg-[#2293D1] hover:bg-[#FF87BC]"
    },
    williams: {
        teamNameStyles: "text-[#00A3E0]",
        teamDescStyles: "text-[#64C4FF]",
        buttonStyles: "bg-[#00A3E0] hover:bg-[#0077B6]"
    },
    haas: {
        teamNameStyles: "text-[#B6BABD]",
        teamDescStyles: "text-[#E6002B]",
        buttonStyles: "bg-[#E6002B] hover:bg-[#B00020]"
    },
    racingBulls: {
        teamNameStyles: "text-[#6692FF]",
        teamDescStyles: "text-[#F4F4F4]",
        buttonStyles: "bg-[#1434CB] hover:bg-[#E10600]"
    },
    audi: {
        teamNameStyles: "text-[#E4002B]",
        teamDescStyles: "text-[#B6BABD]",
        buttonStyles: "bg-[#E4002B] hover:bg-[#B00020]"
    },
    astonMartin: {
        teamNameStyles: "text-[#006F62]",
        teamDescStyles: "text-[#00A99D]",
        buttonStyles: "bg-[#006F62] hover:bg-[#00584E]"
    },
    cadillac: {
        teamNameStyles: "text-[#C8A45D]",
        teamDescStyles: "text-[#B6BABD]",
        buttonStyles: "bg-[#1F1F1F] hover:bg-[#C8A45D]"
    },
};
