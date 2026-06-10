import { useState } from "react"

import CarsCircle, { type TeamInfo } from "./CarsCircle"
import F1StartLights from "./F1StartLights"

const HeroSection = () => {
    const [selectedTeam, setSelectedTeam] = useState<TeamInfo | null>(null)

    return (
        <div className="px-6 sm:px-12 flex items-start justify-center gap-x-34 mt-20 text-white">
            <div className="w-112.5">
                <F1StartLights />
                {selectedTeam ? (
                    <>
                        <h3 className="font-akshar text-[56px] leading-none">{selectedTeam.title}</h3>
                        <p className="mt-5 font-akshar text-[28px] leading-10">{selectedTeam.description}</p>
                        <p className="mt-7 font-akshar text-[30px] leading-10">2026 Lineup:</p>
                        <div className="mt-2 font-akshar text-[28px] leading-10">
                            {selectedTeam.lineup.map((driver) => (
                                <p key={driver}>{driver}</p>
                            ))}
                        </div>
                    </>
                ) : (
                    <>
                        <h3 className="font-akshar text-[64px] leading-none">
                            Lights Out <br />
                            and Away We Go
                        </h3>
                        <p className="mt-5 font-akshar text-[28px] leading-8">
                            Formula One is the highest class of worldwide racing for open-wheel,
                            single-seater formula racing cars run by Formula One Group and sanctioned
                            by the Federation Internationale de l'Automobile.
                        </p>
                    </>
                )}
            </div>

            <CarsCircle onTeamSelect={setSelectedTeam} />
        </div>
    )
}

export default HeroSection
