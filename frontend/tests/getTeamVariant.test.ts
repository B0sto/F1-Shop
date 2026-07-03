import { describe, it, expect } from "vitest";
import { getTeamVariant, teamClasses } from "../src/utils/teamStyles";

describe("getTeamVariant", () => {
    it("returns 'ferrari' as default for unknown teams", () => {
        expect(getTeamVariant("Unknown Team")).toBe("ferrari");
    });

    it("returns 'mercedes' for team names containing 'mercedes'", () => {
        expect(getTeamVariant("Mercedes AMG")).toBe("mercedes");
    });

    it("returns 'redbull' for team names containing 'red bull'", () => {
        expect(getTeamVariant("Oracle Red Bull Racing")).toBe("redbull");
    });

    it("returns correct variants for all supported teams", () => {
        expect(getTeamVariant("Ferrari")).toBe("ferrari");
        expect(getTeamVariant("Mercedes")).toBe("mercedes");
        expect(getTeamVariant("Red Bull Racing")).toBe("redbull");
        expect(getTeamVariant("McLaren F1 Team")).toBe("mclaren");
        expect(getTeamVariant("Alpine F1")).toBe("alpine");
        expect(getTeamVariant("Williams Racing")).toBe("williams");
        expect(getTeamVariant("Haas F1 Team")).toBe("haas");
        expect(getTeamVariant("Racing Bulls")).toBe("racingBulls");
        expect(getTeamVariant("Audi")).toBe("audi");
        expect(getTeamVariant("Aston Martin")).toBe("astonMartin");
        expect(getTeamVariant("Cadillac")).toBe("cadillac");
    });

    it("is case-insensitive", () => {
        expect(getTeamVariant("MCLAREN")).toBe("mclaren");
        expect(getTeamVariant("Alpine F1")).toBe("alpine");
        expect(getTeamVariant("RED BULL")).toBe("redbull");
        expect(getTeamVariant("aston MARTIN")).toBe("astonMartin");
    });

    it("matches partial team names correctly", () => {
        expect(getTeamVariant("I love Mercedes cars")).toBe("mercedes");
        expect(getTeamVariant("Something with Red Bull inside")).toBe("redbull");
        expect(getTeamVariant("Best McLaren ever")).toBe("mclaren");
    });
});


describe("teamClasses", () => {
    it("contains all TeamVariant keys", () => {
        const keys = Object.keys(teamClasses);

        expect(keys).toContain("ferrari");
        expect(keys).toContain("mercedes");
        expect(keys).toContain("redbull");
        expect(keys).toContain("mclaren");
        expect(keys).toContain("alpine");
        expect(keys).toContain("williams");
        expect(keys).toContain("haas");
        expect(keys).toContain("racingBulls");
        expect(keys).toContain("audi");
        expect(keys).toContain("astonMartin");
        expect(keys).toContain("cadillac");
    });

    it("each team has required style properties", () => {
        for (const key of Object.keys(teamClasses)) {
            const team = teamClasses[key as keyof typeof teamClasses];

            expect(team).toHaveProperty("teamNameStyles");
            expect(team).toHaveProperty("teamDescStyles");
            expect(team).toHaveProperty("buttonStyles");

            expect(typeof team.teamNameStyles).toBe("string");
            expect(typeof team.teamDescStyles).toBe("string");
            expect(typeof team.buttonStyles).toBe("string");
        }
    });

    it("Ferrari fallback styles exist", () => {
        expect(teamClasses.ferrari.teamNameStyles).toBeTruthy();
        expect(teamClasses.ferrari.buttonStyles).toBeTruthy();
    });
});